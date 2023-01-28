("use strict");
import { Request, Response } from "express";
import { google } from "googleapis";
import shortid from "shortid";
import { formatDate } from "./../lib/formatDate";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

interface ClassRoomProps {
  id: string;
  date: string;
  classRoom: string;
  subject: string;
  subjectTime: string;
  teacher: string;
  teacherid: string;
  timeIn: string;
  timeOut: string;
  status: string;
  remarks: string;
}

// Classroom records
export const classroomRecords = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const classroomRecordsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "ClassRoomAttendance!A:K",
    });

    return res.status(200).json({
      data: classroomRecordsRows.data.values,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      message: "Server error.",
      path: "attendance/records/classroom",
      err: error.code,
    });
  }
};
// Classroom records of todays
export const classroomTodayRecords = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const classroomRecordsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "ClassRoomAttendance!A:K",
    });
    let todayClasses: ClassRoomProps[] = [];
    classroomRecordsRows.data.values?.map((data) => {
      if (data[0] === "ID") return null;
      return todayClasses.push({
        id: data[0],
        date: data[1],
        classRoom: data[2],
        subject: data[3],
        subjectTime: data[4],
        teacher: data[5],
        teacherid: data[6],
        timeIn: data[7],
        timeOut: data[8],
        status: data[9],
        remarks: data[10],
      });
    });
    return res.status(200).json({
      data: todayClasses.filter((data) => data.date === formatDate(new Date())),
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      message: "Server error.",
      path: "attendance/records/classroom",
      err: error.code,
    });
  }
};
// Teacher Classroom records
export const teacherClassroomRecords = async (req: Request, res: Response) => {
  const { teacher, idNumber } = req.params;

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const classroomRecordsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "ClassRoomAttendance!A:K",
    });

    const records: any[] = [];
    classroomRecordsRows.data.values?.map((row) => {
      if (row[5] === teacher && row[6] === idNumber) {
        records.push({
          date: row[1],
          classRoom: row[2],
          subject: row[3],
          subjectTime: row[4],
          timeIn: row[7],
          timeOut: row[8],
          status: row[9],
          remarks: row[10],
        });
      }
    });

    res.status(200).json({
      data: records,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "attendance/teacher/records/classroom",
      err: error.code,
    });
  }
};
// Teacher forgot to logout or scan the time out qrcode
export const teacherForgotScanQR = async (req: Request, res: Response) => {
  const { classId } = req.body;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const classroomIdsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "ClassRoomAttendance!A:K",
    });

    let currentDate = new Date();

    classroomIdsRows.data.values?.some((row: any, index) => {
      if (row[0] === classId) {
        console.log("row : ", row);
        new Promise((resolve, reject) => {
          googleSheets.spreadsheets.values.update(
            {
              auth,
              spreadsheetId,
              range: `ClassRoomAttendance!I${index + 1}:J${index + 1}`,
              valueInputOption: "USER_ENTERED",
              resource: {
                values: [["Force Logout", "OUT"]],
              },
            } as any,
            (err: any, resp: any) => {
              if (err) {
                console.log("Data Error :", err);
                reject(err);
              }
              res.status(200).json({
                message: "Force logout success.",
                success: true,
              });
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
                  row[5],
                  row[6],
                  "Force Logout",
                  `Force Logout for subject ${row[3]}on${row[4]}, ${row[2]}`,
                ],
              ],
            },
          } as any);
        });
        return true;
      }
      return false;
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/attebdabce/forgot-logout",
      err: error.code,
    });
  }
};

// Teacher absent
export const teacherAbsent = async (req: Request, res: Response) => {
  const { classRoomAttendanceId } = req.body;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    // Read rows from spreadsheet
    const classRoomAttendanceRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "ClassRoomAttendance!A:K",
    });

    classRoomAttendanceRows.data.values?.some((row: any, index) => {
      if (row[0] === classRoomAttendanceId) {
        new Promise((resolve, reject) => {
          googleSheets.spreadsheets.values.update(
            {
              auth,
              spreadsheetId,
              range: `ClassRoomAttendance!K${index + 1}`,
              valueInputOption: "USER_ENTERED",
              resource: {
                values: [["absent"]],
              },
            } as any,
            (err: any, resp: any) => {
              if (err) {
                console.log("Data Error :", err);
                reject(err);
                res.status(408).json({
                  success: false,
                  message: "Teacher absent failed",
                });
              }
              resolve(resp);
              res.status(200).json({
                success: true,
                message: "Teacher absent Successfully",
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
      succes: false,
      message: "Server error.",
      path: "/attendance/teacher-absent",
      err: error.code,
    });
  }
};
