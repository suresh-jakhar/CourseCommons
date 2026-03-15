const mongoose = require("mongoose");
const { instructorAuth } = require("../../middleware");
const { courseModel } = require("../../db/db");
const { courseSchema } = require("./schemas");

function registerInstructorCourseRoutes(instructorRouter) {
    instructorRouter.post("/course/create", instructorAuth, async function(req,res){

        const parsedData = courseSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid course input",
                errors: parsedData.error.issues
            });
        }

        try{

            const instructorId = req.instructorId;

            const { title, description, price, imageUrl, isFree } = parsedData.data;

            const course = await courseModel.create({
                title,
                description,
                price: isFree ? 0 : price,
                imageUrl,
                isFree,
                creatorId: instructorId
            });

            res.json({
                message: "Course created successfully",
                courseId: course._id
            });

        }catch(err){
            res.status(500).json({
                message: "Error creating course"
            });
        }

    });

    instructorRouter.put("/course/update/:courseId", instructorAuth, async function(req,res){

        const parsedData = courseSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid course input",
                errors: parsedData.error.issues
            });
        }

        try{

            const instructorId = req.instructorId;
            const courseId = req.params.courseId;

            if(!mongoose.Types.ObjectId.isValid(courseId)){
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const course = await courseModel.findOne({
                _id: courseId,
                creatorId: instructorId
            });

            if(!course){
                return res.status(403).json({
                    message: "You can update only your own courses"
                });
            }

            const { title, description, price, imageUrl, isFree } = parsedData.data;

            await courseModel.updateOne(
                { _id: courseId },
                { title, description, price: isFree ? 0 : price, imageUrl, isFree }
            );

            res.json({
                message: "Course updated successfully"
            });

        }catch(err){
            res.status(500).json({
                message: "Error updating course"
            });
        }

    });

    instructorRouter.delete("/course/delete/:courseId", instructorAuth, async function(req, res){

        try{

            const instructorId = req.instructorId;
            const courseId = req.params.courseId;

            if(!mongoose.Types.ObjectId.isValid(courseId)){
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const course = await courseModel.findOne({
                _id: courseId,
                creatorId: instructorId
            });

            if(!course){
                return res.status(403).json({
                    message: "You can delete only your own courses"
                });
            }

            await courseModel.deleteOne({ _id: courseId });

            res.json({
                message: "Course deleted successfully"
            });

        }catch(err){
            res.status(500).json({
                message: "Error deleting course"
            });
        }

    });

    instructorRouter.get("/course/bulk", instructorAuth, async function(req, res) {

        try {

            const instructorId = req.instructorId;

            if (!instructorId) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            const courses = await courseModel.find({
                creatorId: instructorId
            });

            res.json({
                message: "Courses fetched successfully",
                courses
            });

        } catch (err) {

            res.status(500).json({
                message: "Error fetching courses"
            });

        }

    });
}

module.exports = {
    registerInstructorCourseRoutes
};
