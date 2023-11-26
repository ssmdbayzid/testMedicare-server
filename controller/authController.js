const jwt = require("jsonwebtoken");
const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs")

const generateAccessToken = user => {    
    return jwt.sign({email:user.email, id:user._id, role: user.role}, process.env.ACCESS_TOKEN, {expiresIn: "60s"})    
}
const generateRefreshToken = user => {    
    return jwt.sign({email:user.email, id:user._id, role: user.role}, process.env.REFRESH_TOKEN, {expiresIn: "7d"})    
}

exports.register = async (req, res) => {
    
    const {name, email, password, role, gender, photo} = req.body;    
    try {
        let  user = null;
        if(role === "patient"){            
            existUser = await User.findOne({email});            
            if(existUser){
              user = existUser;   
            }
        }
        else if (role === "doctor"){
            existUser = await Doctor.findOne({email})
            if(existUser){
               user = existUser;   
            }
        }

        if(user){                        
            return res.status(400).json({message: "User already exist"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        if(role === "patient"){
          const  newPatient = await User.create({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
            if(newPatient){
                user = newPatient;   
              }            
        }
        if(role === "doctor"){
          const newDoctor = await Doctor.create({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
            if(newDoctor){
                user = newDoctor;   
             }
        }
        return res.status(200).json({success:true, message: "User created successfully", user})

    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: error.message})
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;    
    try {
        let user = null;        
        const patient = await User.findOne({email});
        const doctor  = await Doctor.findOne({email});

        if(patient ||  doctor){
            user = patient || doctor
        }        
        // check  if not user  exist
        if(!user){
            return res.status(404).json({success: false, message: "Invalid credentials"})
        }
        
        // compare password 

        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordMatched){
            return res.status(400).json({message: "User or password invalid"})
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)        
        const {password, role, appointment, ...rest} = user._doc;       

       return res
       .status(200)
       .json({success: true, message: "Successfully login", accessToken, refreshToken, data: {...rest}, role})
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}

exports.refreshToken = async (req, res)=>{    
    const accessToken = generateAccessToken(req.user)
    return res
    .status(200).json({success: true, accessToken, messag: "New  accesstoken generated"})    
}