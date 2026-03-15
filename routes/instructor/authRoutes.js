const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { instructorModel } = require("../../db/db");
const { signupSchema, signinSchema } = require("./schemas");

const INSTRUCTOR_JWT_SECRET = process.env.INSTRUCTOR_JWT_SECRET;

function registerInstructorAuthRoutes(instructorRouter) {
    instructorRouter.post("/signup", async function(req, res){

        const parsedData = signupSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid input",
                errors: parsedData.error.issues
            });
        }

        const { email, password, firstName, lastName } = parsedData.data;

        try{

            const existingInstructor = await instructorModel.findOne({ email });

            if(existingInstructor){
                return res.status(409).json({
                    message: "Instructor already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await instructorModel.create({
                email,
                password: hashedPassword,
                firstName,
                lastName
            });

            res.json({
                message: "Instructor signup successful"
            });

        }catch(err){
            res.status(500).json({
                message: "Error signing up instructor"
            });
        }

    });

    instructorRouter.post("/signin", async function(req, res){

        try{

            const parsedData = signinSchema.safeParse(req.body);

            if(!parsedData.success){
                return res.status(400).json({
                    message: "Invalid input",
                    errors: parsedData.error.issues
                });
            }

            const { email, password } = parsedData.data;

            const instructor = await instructorModel.findOne({ email });

            if(!instructor){
                return res.status(403).json({
                    message: "Instructor not found"
                });
            }

            const passwordMatch = await bcrypt.compare(password, instructor.password);

            if(passwordMatch){

                const token = jwt.sign(
                    { instructorId: instructor._id },
                    INSTRUCTOR_JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.json({
                    message: "Instructor signin successful",
                    token: token
                });

            }else{
                res.status(403).json({
                    message: "Invalid password"
                });
            }

        }catch(err){
            res.status(500).json({
                message: "Signin failed"
            });
        }

    });
}

module.exports = {
    registerInstructorAuthRoutes
};
