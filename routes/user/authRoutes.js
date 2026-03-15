const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../db/db");
const { signupSchema, signinSchema } = require("./schemas");

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;

function registerAuthRoutes(userRouter) {
    userRouter.post("/signup", async function(req, res){

        const parsedData = signupSchema.safeParse(req.body);

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid input",
                errors: parsedData.error.issues
            });
        }

        const { email, password, firstName, lastName } = parsedData.data;

        try{

            const existingUser = await userModel.findOne({ email });

            if(existingUser){
                return res.status(409).json({
                    message: "User already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await userModel.create({
                email,
                password: hashedPassword,
                firstName,
                lastName
            });

            res.json({
                message: "User signed up successfully"
            });

        }catch(err){
            res.status(500).json({
                message: "Error signing up"
            });
        }

    });

    userRouter.post("/signin", async function(req, res){

        try{

            const parsedData = signinSchema.safeParse(req.body);

            if(!parsedData.success){
                return res.status(400).json({
                    message: "Invalid input",
                    errors: parsedData.error.issues
                });
            }

            const { email, password } = parsedData.data;

            const user = await userModel.findOne({ email });

            if(!user){
                return res.status(403).json({
                    message: "User not found"
                });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if(passwordMatch){

                const token = jwt.sign(
                    { userId: user._id },
                    USER_JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.json({
                    message: "Signin successful",
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
    registerAuthRoutes
};