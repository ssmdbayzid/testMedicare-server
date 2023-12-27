const mongoose = require("mongoose")

const DoctorSchema = new  mongoose.Schema({
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    name: {type: String, required: true, trim: true},
    phone: {type: String},
    photo: {type: String},
    ticketPrice: {type: Number},
    role: {
        type: String,
    },

    // Field for doctor only 
    specialization: {type : String},
    qualification: {
        type: Array,
    },

    experience: {
        type: Array,
    },
    bio: {type: String, maxLength: 50, trim: true},
    about: {type: String, trim: true},
    availableTime: {type: Array},
    reviews: [{type: mongoose.Types.ObjectId, ref:  "Review"}],
    averageRating:  {
        type: Number,
        default: 0,
    },
    totalRating: {
        type: Number,
        default: 0,
    },
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    appointments: [{type: mongoose.Types.ObjectId, ref: "Booking"}],
});

module.exports = mongoose.model("Doctor", DoctorSchema);