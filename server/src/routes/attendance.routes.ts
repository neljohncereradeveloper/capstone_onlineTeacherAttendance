("use strict");
import {
  classroomRecords,
  teacherAbsent,
  teacherClassroomRecords,
  teacherForgotScanQR,
  classroomTodayRecords,
} from "./../controllers/attendance.controller";
import express from "express";
const router = express.Router();

// attendance classroom records
router.get("/records/classroom", classroomRecords);
// attendance classroom records
router.get("/records/classroom/today", classroomTodayRecords);

// attendance teahcer classroom records
router.get(
  "/teacher/records/classroom/:teacher/:idNumber",
  teacherClassroomRecords
);

// attendance forgot logout
router.put("/forgot-logout", teacherForgotScanQR);

// attendance teacher absent
router.post("/teacher-absent", teacherAbsent);
export default router;
