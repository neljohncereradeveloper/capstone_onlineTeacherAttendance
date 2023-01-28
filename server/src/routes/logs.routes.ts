('use strict');
import { logsTeacher } from './../controllers/logs.controller';
import express from 'express';
const router = express.Router();

// logs records
router.get('/:idNumber', logsTeacher);

export default router;
