const Doctor = require("../models/DoctorSchema")
// Get all Doctor

exports.getAllDoctors = async (req, res) => {
    try {
        const {query} = req.query;
        let doctors;
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
        }
        return res.status(200).json({success: true, data: doctors})
    } catch (error) {
        return res.status(404).json({success: false,  message: "Not found"})
    }
}

// Get single Doctor
exports.getSingleDoctor = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const doctor = await Doctor.findById(doctorId).select("-password")

        return res.status(200).json({success: true, message: "Doctor Found", data: doctor})
    } catch (error) {
        return res.staus(404).json({message: "Doctor not found"})
    }
}

// Update Doctor
exports.updateDoctor = async (req, res)=> {
    const doctorId = req.params.id;
    try {
        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return res.status(404).json({message:  "doctor not found"})
        }
        const updateDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, { new: true })

        return res.status(200).json({success: true, message: "User update successfully", updateDoctor})
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