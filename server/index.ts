import dotenv from "dotenv";
dotenv.config();
import teacherRouter from "./src/routes/teacher.routes";
import scanRoutes from "./src/routes/scan.routes";
import attendanceRoutes from "./src/routes/attendance.routes";
import classRoutes from "./src/routes/class.routes";
import logsRoutes from "./src/routes/logs.routes";
import settingsRoute from "./src/routes/settings.routes";
import roomsRoutes from "./src/routes/rooms.routes";
import subjectsRoutes from "./src/routes/subjects.routes";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { PORT } from "./src/constants";

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
  });
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(helmet());
  app.use(compression());

  // routes
  // teacher routee
  app.use("/api/teacher", teacherRouter);
  // teacher route
  app.use("/api/scan", scanRoutes);
  // teacher route
  app.use("/api/attendance", attendanceRoutes);
  // class route
  app.use("/api/class", classRoutes);
  // logs route
  app.use("/api/logs", logsRoutes);
  // logs route
  app.use("/api/settings", settingsRoute);
  // rooms route
  app.use("/api/rooms", roomsRoutes);
  // subjects route
  app.use("/api/subjects", subjectsRoutes);

  app.listen(PORT, () => console.log(`Server is Running on PORT:${PORT}`));
};

main().catch((err) => console.log("Main Server error : ", err));
