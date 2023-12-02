const Doctor = require("../models/DoctorSchema");
const Review = require("../models/ReviewSchema");

exports.getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.status(200)
        .json({success: true, message: "Successfull", data: reviews})
    } catch (error) {
        return res.status(404).json({success: false, })
    }
}

exports.createReview = async (req, res) => {
    if(!req.body.doctor) req.body.doctor = req.params.doctorId;
    if(!req.body.user) req.body.user = req.userId;    
    const newReview = new Review(req.body)
       console.log(newReview)
    try {
        const createdReview = await newReview.save()
       await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: {reviews: createdReview._id},
        })
                
        return res.status(200)
        .json({success: true,  message: "Review submitted", data: createdReview})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}