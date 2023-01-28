("use strict");
import { comparePassword } from "./../lib/comparePassword";
import { formatDate } from "./../lib/formatDate";
import { Request, Response } from "express";
import { google } from "googleapis";
import shortid from "shortid";
import bcrypt from "bcryptjs";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

// teacher logins
export const teacherLogin = async (req: Request, res: Response) => {
  // body
  const { UserName, Password } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const accountRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Account!A:E",
    });
    const teacherRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Teacher!A:F",
    });

    let teacherQR: string = "";
    let HashPassword: string = "";

    const login = accountRows.data.values?.some((row: any) => {
      if (row[1] === UserName && row[4] === "TRUE") {
        teacherQR = row[0];
        HashPassword = row[2];
        return true;
      }
      return false;
    });

    if (login) {
      const isValidPass = await comparePassword(Password, HashPassword);
      if (!isValidPass) {
        res.status(401).json({
          message: "Password Incorect",
          success: false,
        });
      }
      // map teacher sheet
      // using some for breaking the loop if condition met
      let teacher: any = {};

      teacherRows.data.values?.some((row: any[]) => {
        if (row[0] === "QrCode") return null;
        if (row[0] === teacherQR) {
          teacher = {
            QrCode: row[0],
            Name: row[1],
            IdNumber: row[2],
            BirthDate: row[3],
            Department: row[4],
          };
          return true;
        }
        return false;
      });
      res.status(200).json({
        teacher,
        message: "Login Successfull",
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Username not found.",
        success: false,
      });
    }
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      success: false,
      path: "/records",
      err: error.code,
    });
  }
};
// teacher records
export const teacherRecords = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFilename: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const teacherRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Teacher!A:F",
    });

    const teacher: any[] = [];

    teacherRows.data.values?.map((row: any[]) => {
      if (row[5] === "TRUE") {
        teacher.push({
          qrCode: row[0],
          name: row[1],
          idNumber: row[2],
          birthDate: row[3],
          department: row[4],
          isActive: row[5],
        });
      }
    });
    res.status(200).json({
      data: teacher,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      path: "/teacher/records",
      err: error.code,
    });
  }
};
// teacher registration
export const teacherRegistration = async (req: Request, res: Response) => {
  const { Name, IdNumber, BirthDate, Department, UserName, Password } =
    req.body;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const isActive = true;
    // inserting teacher data ...
    const teacherAdd = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Teacher!A2:F2",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [shortid.generate(), Name, IdNumber, BirthDate, Department, isActive],
        ],
      },
    } as any);

    // if teacher added successfully procced to add account data
    if (teacherAdd.status === 200) {
      const data = teacherAdd.config.body;
      const _data = data.substr(11).slice(0, -2);
      const _teacher = JSON.parse(_data);

      // setting up bcrypt salt
      bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
          // hashing password
          bcrypt.hash(Password, salt, async function (err, hash) {
            if (!err) {
              // inserting account data
              const accountAdd = await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Account!A:E",
                valueInputOption: "USER_ENTERED",
                resource: {
                  values: [
                    [
                      _teacher[0],
                      UserName,
                      hash,
                      formatDate(new Date()),
                      "TRUE",
                    ],
                  ],
                },
              } as any);
              if (accountAdd.status === 200) {
                await googleSheets.spreadsheets.values.append({
                  auth,
                  spreadsheetId,
                  range: "Logs!A:F",
                  valueInputOption: "USER_ENTERED",
                  resource: {
                    values: [
                      [
                        shortid.generate(),
                        new Date(),
                        Name,
                        IdNumber,
                        "Registration",
                        "Registration Successfull",
                      ],
                    ],
                  },
                } as any);
                res.status(200).json({
                  message: "Registration Successfull.",
                });
              } else {
                res.status(500).json({
                  message: "Server error.",
                  path: "/register",
                  err: accountAdd.status,
                });
              }
            }
          });
        }
      });
    } else {
      res.status(teacherAdd.status).json({
        path: "/register",
        message: teacherAdd.statusText,
        success: false,
      });
    }
  } catch (error) {
    console.log("error : ", error);
  }
};
// teacher update
export const teacherUpdate = async (req: Request, res: Response) => {
  const { name, idNumber, birthDate, department } = req.body;
  const { qrCode } = req.params;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const teacherRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Teacher!A:B",
    });

    teacherRows.data.values?.some((row: any[], index) => {
      if (row[0] === qrCode) {
        new Promise((resolve, reject) => {
          googleSheets.spreadsheets.values.update(
            {
              auth,
              spreadsheetId,
              range: `Teacher!B${index + 1}:E${index + 1}`,
              valueInputOption: "USER_ENTERED",
              resource: {
                values: [[name, idNumber, birthDate, department]],
              },
            } as any,
            (err: any, resp: any) => {
              if (err) {
                console.log("Data Error :", err);
                reject(err);
                res.status(408).json({
                  success: false,
                  message: "Teacher update failed",
                });
              }
              resolve(resp);
              res.status(200).json({
                success: true,
                message: "Teacher Updated Successfully",
              });
            }
          );
        });
        return true;
      }
      return false;
    });
    return;
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/teacher/update/:qrCode",
      err: error.code,
    });
  }
};
// teacher account update
export const teacherUpdateAccount = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const { qrCode } = req.params;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const teacherRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Teacher!A:B",
    });

    teacherRows.data.values?.some((row: any[], index) => {
      if (row[0] === qrCode) {
        bcrypt.genSalt(10, (err, salt) => {
          if (!err) {
            bcrypt.hash(password, salt, function (err, hash) {
              if (!err) {
                new Promise((resolve, reject) => {
                  googleSheets.spreadsheets.values.update(
                    {
                      auth,
                      spreadsheetId,
                      range: `Account!B${index + 1}:C${index + 1}`,
                      valueInputOption: "USER_ENTERED",
                      resource: {
                        values: [[userName, hash]],
                      },
                    } as any,
                    (err: any, resp: any) => {
                      if (err) {
                        console.log("Data Error :", err);
                        reject(err);
                        res.status(408).json({
                          success: false,
                          message: "Account UPDATE failed",
                        });
                      }
                      resolve(resp);
                      res.status(200).json({
                        success: true,
                        message: "Account UPDATED Successfully",
                      });
                    }
                  );
                });
              }
            });
          }
        });
        return true;
      }
      return false;
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/teacher/account/update/:qrCode",
      err: error.code,
    });
  }
};
// teacher delete
export const teacherDelete = async (req: Request, res: Response) => {
  const { qrCode } = req.params;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const teacherRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Teacher!A:B",
    });
    const accountRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Account!A:B",
    });

    const _teacher = teacherRows.data.values?.some((row: any[], index) => {
      if (row[0] === qrCode) {
        new Promise((resolve, reject) => {
          googleSheets.spreadsheets.values.update(
            {
              auth,
              spreadsheetId,
              range: `Teacher!F${index + 1}`,
              valueInputOption: "USER_ENTERED",
              resource: {
                values: [["FALSE"]],
              },
            } as any,
            (err: any, resp: any) => {
              if (err) {
                console.log("Data Error :", err);
                reject(err);
              }
              resolve(resp);
            }
          );
        });
        return true;
      }
      return false;
    });

    if (_teacher) {
      accountRows.data.values?.some((row: any[], index) => {
        if (row[0] === qrCode) {
          new Promise((resolve, reject) => {
            googleSheets.spreadsheets.values.update(
              {
                auth,
                spreadsheetId,
                range: `Account!E${index + 1}`,
                valueInputOption: "USER_ENTERED",
                resource: {
                  values: [["FALSE"]],
                },
              } as any,
              (err: any, resp: any) => {
                if (err) {
                  console.log("Data Error :", err);
                  reject(err);
                  res.status(408).json({
                    success: false,
                    message: "Teacher DELETE failed",
                  });
                }
                resolve(resp);
                res.status(200).json({
                  success: true,
                  message: "Teacher DELETED Successfully",
                });
              }
            );
          });
          return true;
        }
        return false;
      });
    }
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/teacher/delete/:qrCode",
      err: error.code,
    });
  }
};

// teacher name records
export const teacherNames = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const teacherNamesRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Teacher!B:F",
    });

    const teacherNames: any[] = [];

    teacherNamesRows.data.values?.map((row: any[]) => {
      if (row[4] === "TRUE") {
        teacherNames.push(`${row[0]},${row[1]}`);
      }
    });
    res.status(200).json({
      data: teacherNames,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      path: "/teacher/name",
      err: error.code,
    });
  }
};
