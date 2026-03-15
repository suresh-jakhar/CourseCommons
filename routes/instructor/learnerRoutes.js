const mongoose = require("mongoose");
const { instructorAuth } = require("../../middleware");
const { courseModel, enrollmentModel, userModel } = require("../../db/db");

function registerInstructorLearnerRoutes(instructorRouter) {
    instructorRouter.get("/course/:courseId/learners", instructorAuth, async function(req, res) {

        try {

            const instructorId = req.instructorId;
            const courseId = req.params.courseId;

            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const course = await courseModel.findOne({
                _id: courseId,
                creatorId: instructorId
            }).select("title _id");

            if (!course) {
                return res.status(403).json({
                    message: "You can access learners only for your own courses"
                });
            }

            const enrollments = await enrollmentModel.find({ courseId }).select("userId");
            const learnerIds = enrollments.map((enrollment) => enrollment.userId);

            const learners = await userModel.find({
                _id: { $in: learnerIds }
            }).select("firstName lastName email");

            res.json({
                course,
                learners,
                totalLearners: learners.length
            });

        } catch (err) {

            res.status(500).json({
                message: "Error fetching enrolled learners"
            });

        }

    });
}

module.exports = {
    registerInstructorLearnerRoutes
};
