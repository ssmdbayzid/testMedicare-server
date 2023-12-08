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
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    time: {
    type:  String,
    required: true,
    },
    isPaid: {
    type: Boolean,
    default: true,
    },
},
{timestamps: true}
)

module.exports = mongoose.model("Booking", bookingSchema)