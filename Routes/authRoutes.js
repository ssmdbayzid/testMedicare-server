const { register, login } = require("../controller/authController")

const express = require("express")
const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter