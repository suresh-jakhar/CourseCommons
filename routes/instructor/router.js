const express = require("express");
const instructorRouter = express.Router();
const { registerInstructorAuthRoutes } = require("./authRoutes");
const { registerInstructorCourseRoutes } = require("./courseRoutes");
const { registerInstructorLearnerRoutes } = require("./learnerRoutes");

registerInstructorAuthRoutes(instructorRouter);
registerInstructorCourseRoutes(instructorRouter);
registerInstructorLearnerRoutes(instructorRouter);

module.exports = instructorRouter;
