

const appointmentRoute = require("express").Router()

const { checkOut, webHook, booking, bookingFailed, bookingCancel } = require("../controller/paymentController")

appointmentRoute.post("/", checkOut)
appointmentRoute.post("/success/:id", booking)
appointmentRoute.post("/failed/:id", bookingFailed)
appointmentRoute.post("/cancel", bookingCancel)

module.exports = appointmentRoute;
