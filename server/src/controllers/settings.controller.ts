("use strict");
import { Request, Response } from "express";
import { google } from "googleapis";
import { formatDate } from "./../lib/formatDate";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

// scan clasroom
export const updateSettings = async (req: Request, res: Response) => {
  const { semester, term, year } = req.body;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const currentDate = new Date();
    new Promise((resolve, reject) => {
      googleSheets.spreadsheets.values.update(
        {
          auth,
          spreadsheetId,
          range: `Settings!A2:E2`,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [
              [
                semester,
                term,
                year,
                formatDate(new Date()),
                currentDate.getHours() +
                  ":" +
                  currentDate.getMinutes() +
                  ":" +
                  currentDate.getSeconds(),
              ],
            ],
          },
        } as any,
        (err: any, resp: any) => {
          if (err) {
            console.log("Data Error :", err);
            reject(err);
            res.status(408).json({
              success: false,
              message: "Settings Failed to update",
            });
          }
          resolve(resp);
          res.status(200).json({
            success: true,
            message: "Settings Updated Successfully",
          });
        }
      );
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(408).json({
      message: "Check your internet connection.",
      path: "/settings/update",
      err: error.code,
    });
  }
};
// Settings records
export const settingsRecords = async (_: Request, res: Response) => {
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
      range: "Settings!A2:C2",
    });
    let settings = {};
    classroomRecordsRows.data.values?.map((row) => {
      settings = {
        semester: row[0],
        term: row[1],
        year: row[2],
      };
    });
    res.status(200).json({
      data: settings,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/settings/records",
      err: error.code,
    });
  }
};
