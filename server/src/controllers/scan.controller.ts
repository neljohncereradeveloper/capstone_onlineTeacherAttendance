("use strict");
import { formatDate } from "./../lib/formatDate";
import { Request, Response } from "express";
import { google } from "googleapis";
import shortid from "shortid";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

// scan clasroom
export const classroomScanner = async (req: Request, res: Response) => {
  const {
    classId,
    teacher,
    idNumber,
    classRoom,
    subject,
    subjectTime,
    status,
    remarks,
  } = req.body;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    // Read rows from spreadsheet
    const classRoomAttendanceRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "ClassRoomAttendance!A:J",
    });

    const currentDate = new Date();
    const _classRoom = classRoomAttendanceRows.data.values?.some(
      (row: any[], index) => {
        if (row[0] === classId && status === "OUT") {
          new Promise((resolve, reject) => {
            googleSheets.spreadsheets.values.update(
              {
                auth,
                spreadsheetId,
                range: `ClassRoomAttendance!I${index + 1}:J${index + 1}`,
                valueInputOption: "USER_ENTERED",
                resource: {
                  values: [
                    [
                      currentDate.getHours() +
                        ":" +
                        currentDate.getMinutes() +
                        ":" +
                        currentDate.getSeconds(),
                      status,
                    ],
                  ],
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

            googleSheets.spreadsheets.values.append({
              auth,
              spreadsheetId,
              range: "Logs!A:F",
              valueInputOption: "USER_ENTERED",
              resource: {
                values: [
                  [
                    shortid.generate(),
                    currentDate.toLocaleString("en-US", {
                      timeZone: "Asia/Manila",
                    }),
                    teacher,
                    idNumber,
                    "Class Out",
                    `Class Ended for subject ${subject}on${subjectTime}, ${classRoom}`,
                  ],
                ],
              },
            } as any);
          });
          return true;
        }
        return false;
      }
    );

    if (_classRoom) {
      res.status(201).json({
        message: "Classroom Logout Successfull",
        logout: true,
        login: false,
      });
    } else {
      // [ 'Id', 'Date', 'ClassRoom', 'Subject', 'SubjectTime', 'Teacher', 'TeacherIdNumber', 'TimeIn' , 'TimeOut' ,'Status' ]
      const classRoomData = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "ClassRoomAttendance!A:K",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              shortid.generate(),
              formatDate(new Date()),
              classRoom,
              subject,
              subjectTime,
              teacher,
              idNumber,
              currentDate.getHours() +
                ":" +
                currentDate.getMinutes() +
                ":" +
                currentDate.getSeconds(),
              "",
              status,
              remarks,
            ],
          ],
        },
      } as any);

      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Logs!A:F",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              shortid.generate(),
              currentDate.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
              teacher,
              idNumber,
              "Class In",
              `Class Starts for subject ${subject}on${subjectTime}, ${classRoom}`,
            ],
          ],
        },
      } as any);

      const data = classRoomData.config.body;
      const _data = data.substr(11).slice(0, -2);
      const _classData = JSON.parse(_data);
      res.status(201).json({
        data: {
          classId: _classData[0],
          date: _classData[1],
          classRoom: _classData[2],
          subject: _classData[3],
          subjectTime: _classData[4],
          classIn: _classData[7],
        },
        message: "Classroom Login Successfull",
        logout: false,
        login: true,
      });
    }
  } catch (error) {
    console.log("/scan/classroom error : ", error);
    res.status(408).json({
      message: "Server Error",
      path: "/scan/classroom",
      err: error.code,
    });
  }
};
