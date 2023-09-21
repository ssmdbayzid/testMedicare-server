const mongoose = require("mongoose")

const DoctorSchema = new  mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
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
    bio: {type: String, maxLength: 50},
    about: {type: String},
    timeSlots: {type: Array},
    reviews: [{type: mongoose.Types.ObjectId, ref:  "Review"}],
    averageRating:  {
        type: Number,
        default: 0,
    },
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    appointments: [{type: mongoose.Types.ObjectId, ref: "Appointment"}],
});

export default mongoose.model("Doctor", DoctorSchema);