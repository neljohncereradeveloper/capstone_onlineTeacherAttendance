('use strict');
import {
  settingsRecords,
  updateSettings,
} from './../controllers/settings.controller';
import express from 'express';
const router = express.Router();

// update settings
router.post('/update', updateSettings);
// records settings
router.get('/records', settingsRecords);

export default router;
