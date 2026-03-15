const express = require("express");
const courseRouter = express.Router();
const { registerPublicCourseRoutes } = require("./publicCourseRoutes");

registerPublicCourseRoutes(courseRouter);

module.exports = courseRouter;
