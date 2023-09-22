const { getUser, getAllUser, updateUser, deleteUser } = require("../controller/userController")

const userRouter = require("express").Router()

userRouter.get("/", getAllUser)
userRouter.get("/:id", getUser)
userRouter.put("/:id", updateUser)
userRouter.put("/:id", deleteUser)

module.exports =  userRouter;