('use strict');
import { classroomScanner } from './../controllers/scan.controller';
import express from 'express';
const router = express.Router();

// scan classrrom
router.post('/classroom', classroomScanner);

export default router;
