const mongoose = require("mongoose");
const { userAuth } = require("../../middleware");
const { courseModel, enrollmentModel, progressModel } = require("../../db/db");
const { progressUpdateSchema } = require("./schemas");

function registerCourseProgressRoutes(userRouter) {
    userRouter.get("/course/:courseId", userAuth, async function(req, res){

        try {

            const userId = req.userId;
            const courseId = req.params.courseId;

            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const enrollment = await enrollmentModel.findOne({
                userId: userId,
                courseId: courseId
            });

            if (!enrollment) {
                return res.status(403).json({
                    message: "You are not enrolled in this course"
                });
            }

            const course = await courseModel.findById(courseId);

            if (!course) {
                return res.status(404).json({
                    message: "Course not found"
                });
            }

            let progress = await progressModel.findOne({
                userId: userId,
                courseId: courseId
            });

            if (!progress) {
                progress = await progressModel.create({
                    userId: userId,
                    courseId: courseId,
                    percentComplete: 0,
                    lastOpenedAt: new Date()
                });
            } else {
                progress.lastOpenedAt = new Date();
                await progress.save();
            }

            res.json({
                course,
                progress: {
                    percentComplete: progress.percentComplete,
                    lastOpenedAt: progress.lastOpenedAt
                }
            });

        } catch (err) {

            res.status(500).json({
                message: "Error fetching course details"
            });

        }

    });

    userRouter.put("/course/:courseId/progress", userAuth, async function(req, res){

        const parsedData = progressUpdateSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json({
                message: "Invalid progress input",
                errors: parsedData.error.issues
            });
        }

        try {

            const userId = req.userId;
            const courseId = req.params.courseId;
            const { percentComplete } = parsedData.data;

            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const enrollment = await enrollmentModel.findOne({
                userId: userId,
                courseId: courseId
            });

            if (!enrollment) {
                return res.status(403).json({
                    message: "You are not enrolled in this course"
                });
            }

            const progress = await progressModel.findOneAndUpdate(
                { userId: userId, courseId: courseId },
                {
                    percentComplete,
                    lastOpenedAt: new Date()
                },
                {
                    new: true,
                    upsert: true
                }
            );

            res.json({
                message: "Progress updated successfully",
                progress: {
                    percentComplete: progress.percentComplete,
                    lastOpenedAt: progress.lastOpenedAt
                }
            });

        } catch (err) {

            res.status(500).json({
                message: "Error updating progress"
            });

        }

    });
}

module.exports = {
    registerCourseProgressRoutes
};