('use strict');
import {
  teacherDelete,
  teacherLogin,
  teacherNames,
  teacherRecords,
  teacherRegistration,
  teacherUpdate,
  teacherUpdateAccount,
} from './../controllers/teacher.controller';
import express from 'express';
const router = express.Router();

// teachers data
router.get('/records', teacherRecords);
// teachers names data
router.get('/names', teacherNames);
// teacher login
router.post('/login', teacherLogin);
// teacher login
router.post('/registration', teacherRegistration);
// teacher update
router.put('/update/:qrCode', teacherUpdate);
// teacher account update
router.put('/account/update/:qrCode', teacherUpdateAccount);
// teacher delete
router.put('/delete/:qrCode', teacherDelete);

export default router;
