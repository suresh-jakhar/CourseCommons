const mongoose = require("mongoose");
const { userAuth } = require("../../middleware");
const { courseModel, enrollmentModel } = require("../../db/db");
const { courseIdSchema } = require("./schemas");

function registerEnrollmentRoutes(userRouter) {
    userRouter.post("/course/enroll", userAuth, async function(req, res){

        const parsedData = courseIdSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid input",
                errors: parsedData.error.issues
            });
        }

        try{

            const userId = req.userId;
            const { courseId } = parsedData.data;

            if(!mongoose.Types.ObjectId.isValid(courseId)){
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const course = await courseModel.findById(courseId);

            if(!course){
                return res.status(404).json({
                    message: "Course not found"
                });
            }

            const alreadyEnrolled = await enrollmentModel.findOne({
                userId: userId,
                courseId: courseId
            });

            if(alreadyEnrolled){
                return res.json({
                    message: "Already enrolled in this course",
                    alreadyEnrolled: true
                });
            }

            if(course.isFree){
                await enrollmentModel.create({
                    userId: userId,
                    courseId: courseId
                });

                return res.json({
                    message: "Enrolled in free course successfully"
                });
            }

            res.json({
                message: "This is a paid course, proceed to purchase",
                courseId: course._id,
                price: course.price,
                paymentRequired: true
            });

        }catch(err){
            res.status(500).json({
                message: "Error enrolling in course"
            });
        }

    });

    userRouter.post("/course/purchase", userAuth, async function(req, res){

        const parsedData = courseIdSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid input",
                errors: parsedData.error.issues
            });
        }

        try{

            const userId = req.userId;
            const { courseId } = parsedData.data;

            if(!mongoose.Types.ObjectId.isValid(courseId)){
                return res.status(400).json({
                    message: "Invalid course ID"
                });
            }

            const course = await courseModel.findById(courseId);

            if(!course){
                return res.status(404).json({
                    message: "Course not found"
                });
            }

            if(course.isFree){
                return res.status(400).json({
                    message: "This is a free course, use the enroll endpoint instead"
                });
            }

            const alreadyEnrolled = await enrollmentModel.findOne({
                userId: userId,
                courseId: courseId
            });

            if(alreadyEnrolled){
                return res.json({
                    message: "Already enrolled in this course",
                    alreadyEnrolled: true
                });
            }

            await enrollmentModel.create({
                userId: userId,
                courseId: courseId
            });

            res.json({
                message: "Course purchased and enrolled successfully"
            });

        }catch(err){
            res.status(500).json({
                message: "Error purchasing course"
            });
        }

    });

    userRouter.get("/my-courses", userAuth, async function(req, res){

        try{

            const userId = req.userId;

            const enrollments = await enrollmentModel.find({
                userId: userId
            });

            const courseIds = enrollments.map(e => e.courseId);

            const courses = await courseModel.find({
                _id: { $in: courseIds }
            });

            res.json({
                courses
            });

        }catch(err){

            res.status(500).json({
                message: "Error fetching my courses"
            });

        }

    });
}

module.exports = {
    registerEnrollmentRoutes
};
