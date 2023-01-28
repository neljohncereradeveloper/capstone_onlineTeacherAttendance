("use strict");
import { Request, Response } from "express";
import { google } from "googleapis";
import { KEYFILE, SPREADSHEET_SCOPE, SPREADSHEET_ID } from "../constants";

// Room records
export const roomsRecords = async (_: Request, res: Response) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE,
      scopes: SPREADSHEET_SCOPE,
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = SPREADSHEET_ID;
    const roomRecordsRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Classrooms!A2:A",
    });
    let rooms: any[] = [];
    roomRecordsRows.data.values?.map((row) => {
      rooms.push(row[0]);
    });

    res.status(200).json({
      data: rooms,
      success: true,
    });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Server error.",
      path: "/room/records",
      err: error.code,
    });
  }
};
