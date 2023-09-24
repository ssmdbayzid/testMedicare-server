const { authenticate, restrict } = require("../auth/verifyToken")
const { getSingleUser, getAllUser, updateUser, deleteUser } = require("../controller/userController")

const userRouter = require("express").Router()


userRouter.get("/", authenticate, restrict(["patient"]), getAllUser)
userRouter.get("/:id", authenticate, restrict(["patient"]), getSingleUser)
userRouter.put("/:id", authenticate, restrict(["patient"]), updateUser)
userRouter.put("/:id", authenticate, restrict(["patient"]), deleteUser)

module.exports =  userRouter;