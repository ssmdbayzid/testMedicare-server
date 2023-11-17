const { checkOut } = require("../controller/paymentController");

const paymentRoute = require("express").Router()
// const stripe = require("stripe")

paymentRoute.post("/", checkOut)

module.exports = paymentRoute;
