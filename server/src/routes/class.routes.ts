('use strict');
import {
  addClass,
  classRecords,
  teacherClasses,
} from '../controllers/class.controllers';
import express from 'express';
const router = express.Router();

// class registration
router.post('/registration', addClass);

// class records
router.get('/records', classRecords);

// teacher classes
router.get('/teacher/:idNumber', teacherClasses);

export default router;
