const mongoose = require("mongoose")

const bookingSchema  = new mongoose.Schema({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
        required:  true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticketPrice: {type: String, required: true},
    appointmentDate: {
        type: Date,
        required: true,
    },
    time: {
    type:  String,
    required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    isPaid: {
    type: String,
    default: "pending",
    },
},
{timestamps: true}
)

module.exports = mongoose.model("Booking", bookingSchema)