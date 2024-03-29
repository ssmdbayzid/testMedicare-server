const Booking = require("../models/BookingSchema");
const Doctor = require("../models/DoctorSchema")
// Get all Doctor

exports.getAllDoctors = async (req, res) => {

    try {        
        // let doctors;
        /*
        if(query){
            doctors = await Doctor.find({
                isApproved: "approved",
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {specialization: {$regex: query, $options: "i"}},
                ]
            }).select("-password");
        }
        else{
        doctors = await Doctor.find({isApproved: "approved"})
        .select("-password");
        }*/
       const doctors = await Doctor.find()        
        .select("-password");        
        return res.status(200).json({success: true, data: doctors})
    } catch (error) {
        return res.status(404).json({success: false,  message: "Not found"})
    }
}

// Get single Doctor
exports.getSingleDoctor = async (req, res) => {        
    const doctorId = req.params.id;
    console.log(doctorId)
    try {
        const doctor = await Doctor.findById({_id: doctorId})        
        .populate("reviews")
        .populate({
            path: "appointments",
            populate: {
                path: "user",
                model: "User",
                select: "name, photo, gender email"
            }
        })
        .select("-password")
        

        return res.status(200).json({success: true, message: "Doctor Found", data: doctor})
    } catch (error) {
        return res.status(404).json({message: "Doctor not found"})
    }
}

// Update Doctor
exports.updateDoctor = async (req, res)=> {
    const doctorId = req.params.id;
    const  {name, ticketPrice} = req.body    
    // console.log(typeof(ticketPrice))
    try {
        const doctor = await Doctor.findById(doctorId).select("-password");
        if(!doctor){
            return res.status(404).json({message:  "doctor not found"})
        }
        // console.log("doctor details", doctor)
        
        const updateDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, { new: true })

        return res.status(200).json({success: true, message: "User update successfully", updateDoctor})
                       
    //    return doctor
    } catch (error) {
        return res.status(401).json({success:  false, message: error.message})
    }
}

// Delete Doctor

exports.deleteDoctor = async (req, res)=> {
    const doctorId = req.params.id;
try {
    const deleteDoctor = await Doctor.findByIdAndDelete(doctorId);
    return res.status(200).json({success:  true, message: `Delete ${deleteDoctor.name} user successfully`})
} catch (error) {
    return res.status(500).json({success: false, message: error.message})
}
}

// get Doctor profile

exports.doctorProfile = async (req, res) =>{
    const doctorId = req.params.id;
    try {
        const doctor = await Doctor.findById(doctorId)
        .populate({
            path: "appointments",
            populate: {
                path: "user",
                model: "User",
                select: "name photo gender email"
            }
        })
        .select("-password")
        if(!doctor){
            return res
            .status(404)
            .json({success: false, message: "Doctor not found"})
        }

        const {password, ...rest } = doctor._doc;
        const appointment = await Booking.find({doctor: doctorId})

        return res
        .status(200)
        .json({success: true, message: "Profile info is getting", 
    data: {...rest, appointment}})

    } catch (error) {
        return res
        .status(500)
        .json({success: true, message: "Somethings went wrong, cannot get info"})
}}