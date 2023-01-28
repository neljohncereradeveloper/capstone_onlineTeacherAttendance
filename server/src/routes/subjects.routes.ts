('use strict');
import { subjectsRecords } from './../controllers/subjects.controller';
import express from 'express';
const router = express.Router();

// records subjects
router.get('/records', subjectsRecords);

export default router;
