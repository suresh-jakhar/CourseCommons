const jwt = require("jsonwebtoken");
const { extractBearerToken } = require("./extractBearerToken");

const INSTRUCTOR_JWT_SECRET = process.env.INSTRUCTOR_JWT_SECRET;

function instructorAuth(req, res, next){

    const token = extractBearerToken(req.headers.authorization);

    if(!token){
        return res.status(401).json({
            message: "Token missing"
        });
    }

    try{

        const decoded = jwt.verify(token, INSTRUCTOR_JWT_SECRET);

        req.instructorId = decoded.instructorId;

        next();

    }catch(err){
        return res.status(403).json({
            message: "Invalid instructor token"
        });
    }
}

module.exports = {
    instructorAuth
};
