const jwt = require("jsonwebtoken")
exports.verifyRefreshToken = async (req, res, next) =>{
    const authToken = req.headers.authorization;    
    if(!authToken || !authToken.startsWith("Bearer ")){
        res
        .status(401)
        .json({success: false, message: "No token"})
    }
    try {
        const refreshToken = authToken.split(" ")[1];
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        if(!decoded){
            res
            .status(401).json({success: false, message: "Invalid  refresh token"})
        }
        console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({success:false, message:error.message})
    }
}