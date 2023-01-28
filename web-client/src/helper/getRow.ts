import { formatDate } from './formatDate';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { credentials } from '../credentials';

interface Props {
  qrCode: string;
}

export const getRow = async ({ qrCode }: Props) => {
  const doc = new GoogleSpreadsheet(
    '1LT7xDwNs-me98BEOcYerWK9FW1wQO2a4bundyAa8TRc'
  );

  try {
    await doc.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    });

    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    // Get all the rows
    let rows = await sheet.getRows();

    // map the rows

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      // get specifi row base on condition
      if (
        row.qrCode === qrCode &&
        row.Status === 'IN' &&
        row.Date === formatDate(new Date())
      ) {
        console.log('row : ', row);
        row.TimeOut = '=NOW()';
        row.Status = 'OUT';
        row.save();
      }
      //   if (row.Date === formatDate(new Date())) {
      //     console.log('row : ', row);
      //   }
    }
  } catch (error) {}
};
