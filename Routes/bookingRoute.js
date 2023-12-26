const { getAllBooking, getUserBooking } = require("../controller/bookingController")

const bookingRoute = require("express").Router()

bookingRoute.get("/", getAllBooking)
bookingRoute.get("/:id", getUserBooking)

module.exports = bookingRoute;