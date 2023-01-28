("use strict");
import { Request, Response } from "express";
import { google } from "googleapis";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

// logs
export const logsTeacher = async (req: Request, res: Response) => {
  const { idNumber } = req.params;

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const spreadsheetId = SPREADSHEET_ID;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    // Read rows from spreadsheet
    const logsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Logs!A:F",
    });
    const _logs: any[] = [];
    logsRows.data.values?.map((row) => {
      if (row[3] === idNumber) {
        _logs.push({
          id: row[0],
          date: row[1],
          name: row[2],
          idNumber: row[3],
          action: row[4],
          message: row[5],
        });
      }
    });

    res.status(200).json({
      success: true,
      data: _logs,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(408).json({
      success: false,
      message: "Check your internet connection.",
      path: "/logs/:idNumber",
      err: error.code,
    });
  }
};
