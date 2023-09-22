const jwt = require("jsonwebtoken")
const Doctor = require("../models/DoctorSchema")
const User = require("../models/UserSchema")

exports.authenticate = async (req, res, next)  =>{
    const authToken = req.headers.authorization;
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res
        .status(401)
        .json({success: false, message: "No token, access denied"});
    }
    try {
        const  token = authToken.split(" ")[1];

        // verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded)

        req.role = decoded.id;
        req.role = decoded.role;
        next()
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token is expired"})
        }
        return res.status(401).json({success: false, message: "Invalid token"})
    }
}


// Restrict 

exports.restrict = roles => async  (req, res, next) => {
    const userId = req.userId;

    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if(patient || doctor){
        user = (patient || doctor)
    }

    if(!roles.includes(user.role)){
        return res
        .status(401)
        .json({success: false, message: "you're not authorized"})
    }
    next()
}