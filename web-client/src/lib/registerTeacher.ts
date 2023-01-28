import { TeacherProps } from './../types';
import { credentials } from './../credentials';
import shortid from 'shortid';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export const registerTeacher = async ({
  Name,
  IdNumber,
  BirthDate,
  Department,
  UserName,
  Password,
}: TeacherProps) => {
  const doc = new GoogleSpreadsheet(
    '1LT7xDwNs-me98BEOcYerWK9FW1wQO2a4bundyAa8TRc'
  );
  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo();
  // Sheet Teacher
  const sheet = doc.sheetsByIndex[1];
  // Sheet Account
  const sheetAccount = doc.sheetsByIndex[2];
  // Get all the rows
  let rowsAccount = await sheetAccount.getRows();
  let rows = await sheet.getRows();
  let err = {};
  // MAP teacher records
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    // get specific row base on condition
    if (row.IdNumber === IdNumber) {
      err = {
        infoError: 'ID nnumber already taken',
        accountError: '',
      };
    }
  }
  // MAP account records
  for (let index = 0; index < rowsAccount.length; index++) {
    const rowAccount = rowsAccount[index];
    // get specific row base on condition
    if (rowAccount.IdNumber === IdNumber || rowAccount.UserName === UserName) {
      err = {
        infoError: '',
        accountError: 'Username already taken',
      };
    }
  }
  let teacher;
  let account;
  if (Object.keys(err).length === 0) {
    teacher = await sheet.addRow({
      QrCode: shortid.generate(),
      Name,
      IdNumber,
      BirthDate,
      Department,
      isActive: true,
    } as any);
    teacher.save();
    account = await sheetAccount.addRow({
      IdNumber,
      UserName,
      Password,
      Date_Registered: '=TODAY()',
    } as any);
    account.save();
  }

  return { teacher, err };
};
