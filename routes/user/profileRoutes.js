const { userAuth } = require("../../middleware");
const { userModel } = require("../../db/db");

function registerProfileRoutes(userRouter) {
    userRouter.get("/profile", userAuth, async function(req, res){

        try{

            const user = await userModel.findById(req.userId).select("email firstName lastName");

            if(!user){
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.json({
                user
            });

        }catch(err){
            res.status(500).json({
                message: "Error fetching user profile"
            });
        }

    });
}

module.exports = {
    registerProfileRoutes
};