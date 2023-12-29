

const appointmentRoute = require("express").Router()

const { checkOut, webHook, booking, bookingFailed } = require("../controller/paymentController")

appointmentRoute.post("/", checkOut)
appointmentRoute.post("/success/:id", booking)
appointmentRoute.post("/failed/:id", bookingFailed)

module.exports = appointmentRoute;
