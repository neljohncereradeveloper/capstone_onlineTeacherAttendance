("use strict");
import { Request, Response } from "express";
import { google } from "googleapis";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

// Subjects records
export const subjectsRecords = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const subjectsRecordsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Subjects!A2:A",
    });
    let subjects: any[] = [];
    subjectsRecordsRows.data.values?.map((row) => {
      subjects.push(row[0]);
    });

    res.status(200).json({
      data: subjects,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/subjects/records",
      err: error.code,
    });
  }
};
