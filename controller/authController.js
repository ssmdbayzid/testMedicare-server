const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs")


exports.register = async (req, res) => {
    const {name, email, password, role, gender, photo} = req.body;

    console.log(req.body)
    try {
        let  user = null;
        if(role === "patient"){
            user = User.findOne({email});
        }
        else if (role === "doctor"){
            user = User.findOne({email})
        }

        if(user){
            return res.status(400).json({message: "User already exist"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        if(role === "patient"){
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role

            })
        }
        if(role === "doctor"){
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role

            })
        }


        await user.save()

        res
        .status(200)
        .json({success: true, message: "User  successfully created"})
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "Internal server error"})
    }
}

exports.login = async (req, res) => {
    try {
        res.status(200).json({message: "this is from login"})
    } catch (error) {
        res.status(500).json({message: "this is from login error"})
        
    }
}