const Booking = require("../models/BookingSchema")

exports.getAllBooking = async (req, res)=>{
    try {
        const data = await Booking.find()
        // .populate('user', '-password') 
        // .populate('doctor', '-password')
        return res
        .status(200)
        .json({message: "This is from get all booking", data})        
    } catch (error) {
        return res
        .status(500)
        .json({success:false, message: "Somethings wents wrong"})
    }
}

exports.getUserBooking = async (req, res) =>{
    const user = req.params.id

    try {            
        const data = await Booking.find(user)
        console.log(data)

    return res
    .status(200)
    .json({success: true, data})
    } catch (error) {
        return res
        .status(500)
        .json({success:false, message: "Somethings wents wrong"})
    }
}