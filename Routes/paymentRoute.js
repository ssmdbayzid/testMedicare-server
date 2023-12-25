

const appointmentRoute = require("express").Router()

const { checkOut, webHook } = require("../controller/paymentController")

appointmentRoute.post("/", checkOut)
appointmentRoute.post('/webhook', webHook)

module.exports = appointmentRoute;