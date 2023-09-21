const { register, login } = require("../controller/authController")

const authRouter = require("express").Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

export default  authRouter