('use strict');
import { roomsRecords } from '../controllers/rooms.controller';
import express from 'express';
const router = express.Router();

// records rooms
router.get('/records', roomsRecords);

export default router;
