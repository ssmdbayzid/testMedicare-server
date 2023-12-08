const { checkOut, bookAppointment } = require("../controller/paymentController");

const paymentRoute = require("express").Router()
// const stripe = require("stripe")

paymentRoute.post("/", bookAppointment)

module.exports = paymentRoute;
