const { verifyRefreshToken } = require("../auth/verifyRefreshToken")
const { register, login, refreshToken } = require("../controller/authController")

const express = require("express")
const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/refresh-token', verifyRefreshToken, refreshToken)
// authRouter.post('/refresh-token',  refreshToken)

module.exports = authRouter