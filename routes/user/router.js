const express = require("express");
const userRouter = express.Router();
const { registerAuthRoutes } = require("./authRoutes");
const { registerProfileRoutes } = require("./profileRoutes");
const { registerEnrollmentRoutes } = require("./enrollmentRoutes");
const { registerCourseProgressRoutes } = require("./courseProgressRoutes");

registerAuthRoutes(userRouter);
registerProfileRoutes(userRouter);
registerEnrollmentRoutes(userRouter);
registerCourseProgressRoutes(userRouter);

module.exports = userRouter;
