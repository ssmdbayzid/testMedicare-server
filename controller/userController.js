const Booking = require("../models/BookingSchema");
const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema")
// Get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({success: true, data: users})
    } catch (error) {
        return res.status(404).json({success: false,  message: "Not found"})
    }
}

// Get single user
exports.getSingleUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select("-password")

        return res.status(200).json({success: true, message: "User Found", data: user})
    } catch (error) {
        return res.staus(404).json({message: "User not found"})
    }
}

// Update User
exports.updateUser = async (req, res)=> {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:  "User not found"})
        }
        const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true })

        return res.status(200).json({success: true, message: "User update successfully", updateUser})
    } catch (error) {
        return res.status(401).json({success:  false, message: error.message})
    }
}

// Delete User

exports.deleteUser = async (req, res)=> {
    const userId = req.params.id
try {
    const deleteUser = await User.findByIdAndDelete(userId);
    return res.status(200).json({success:  true, message: `Delete ${deleteUser.name} user successfully`})
} catch (error) {
    return res.status(500).json({success: false, message: error.message})
}
}

// get user profile

exports.getUserProfile = async (req, res) =>{
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if(!user){
            return res
            .status(404)
            .json({ success: false, message: "User not found"})
        }

        const {password, ...rest} = user._doc;

        return res
        .status(200)
        .json({success:true, message: "Profile info getting",
        data: {...rest},
    })        
    } catch (error) {
       return res
       .status(500)
       .json({success: false, message: "Something wents wrong"}) 
    }   
}

exports.getMyAppointment = async (req, res) =>{
    try {
        // stpep 1 : retrive appointments from booking
        const booking = await Booking.find({user: req.userId})

        //  step 2 : extract doctor ids from appointment booking

        const doctorIds = booking.map(el=> el.doctor.id)
        // step 3 : retrive  doctors using ids
        const doctors = await Doctor.find({_id: {$in: doctorIds}}).select("-password")

        return res.status(200)
        .json({success: true, message: "Appointment are getting", data: doctors})
    } catch (error) {
         
    }
}