("use strict");
import { Request, Response } from "express";
import { google } from "googleapis";
import shortid from "shortid";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

interface SettingsProps {
  semester: string;
  term: string;
  year: string;
}

// class registration
export const addClass = async (req: Request, res: Response) => {
  const { classRoom, teacher, subject, subjectTime, schedule } = req.body;
  const teacherData = teacher.split(",");
  const _teacher = teacherData[0];
  const idNumber = teacherData[1];
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const _classRecords = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Classes!A:K",
    });
    const settingsRecords = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Settings!A2:C2",
    });

    let _settings = {} as SettingsProps;
    settingsRecords.data.values?.map((val: any) => {
      _settings = {
        semester: val[0],
        term: val[1],
        year: val[2],
      };
    });

    // class registrations
    const isClassExist = _classRecords.data.values?.some((row: any) => {
      // row[1] === classRoom &&
      // row[2] === teacher &&
      // row[3] === idNumber &&
      // row[8] === schedule &&
      if (
        row[4] === subject &&
        row[5] === subjectTime &&
        row[6] === _settings.semester &&
        row[7] === _settings.term &&
        row[9] === _settings.year
      ) {
        res.status(400).json({
          message: "Class already exists",
        });
        return true;
      }
      return false;
    });

    if (!isClassExist) {
      const _addClass = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Classes!A:K",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              shortid.generate(),
              classRoom,
              _teacher,
              idNumber,
              subject,
              subjectTime,
              _settings.semester,
              _settings.term,
              schedule,
              _settings.year,
              true,
            ],
          ],
        },
      } as any);
      if (_addClass.status === 200) {
        const data = _addClass.config.body;
        const _data = data.substr(11).slice(0, -2);
        const _class = JSON.parse(_data);
        res.status(201).json({
          success: true,
          message: "Class Registration Successfull",
          data: {
            id: _class[0],
            classRoom: _class[1],
            teacher: _class[2],
            idNumber: _class[3],
            subject: _class[4],
            subjectTime: _class[5],
            semester: _class[6],
            term: _class[7],
            schedule: _class[8],
            year: _class[9],
          },
        });
      }
    }
  } catch (error) {
    console.log("error : ", error);
    res.status(408).json({
      success: false,
      message: "Check your internet connection.",
      path: "/class/registration",
      err: error.code,
    });
  }
};

// class records
export const classRecords = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const _classRecords = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Classes!A:K",
    });
    if (_classRecords.status === 200) {
      const data: any[] = [];
      _classRecords.data.values?.map((row) => {
        if (row[0] !== "Id") {
          data.push({
            id: row[0],
            classRoom: row[1],
            teaher: row[2],
            idNumber: row[3],
            subject: row[4],
            subjectTime: row[5],
            semester: row[6],
            term: row[7],
            schedule: row[8],
            year: row[9],
            active: row[10],
          });
        }
      });
      res.status(200).json({
        data,
        success: true,
      });
    } else {
      res.status(_classRecords.status).json({
        data: null,
        success: false,
      });
    }
  } catch (error) {
    console.log("error : ", error);
    res.status(408).json({
      success: false,
      message: "Check your internet connection.",
      path: "/class/records",
      err: error.code,
    });
  }
};

// teacher classes
export const teacherClasses = async (req: Request, res: Response) => {
  const { idNumber } = req.params;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const _classRecords = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Classes!A:K",
    });
    if (_classRecords.status === 200) {
      const data: any[] = [];
      _classRecords.data.values?.map((row) => {
        if (row[3] === idNumber) {
          data.push({
            id: row[0],
            classRoom: row[1],
            teaher: row[2],
            idNumber: row[3],
            subject: row[4],
            subjectTime: row[5],
            semester: row[6],
            term: row[7],
            schedule: row[8],
            year: row[9],
            active: row[10],
          });
        }
      });
      res.status(200).json({
        data,
        success: true,
      });
    } else {
      res.status(_classRecords.status).json({
        data: null,
        success: false,
      });
    }
  } catch (error) {
    console.log("error : ", error);
    res.status(408).json({
      success: false,
      message: "Check your internet connection.",
      path: "/class/teacher/:idNumber",
      err: error.code,
    });
  }
};
