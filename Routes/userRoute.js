const { authenticate, restrict } = require("../auth/verifyToken")
const { getSingleUser, getAllUser, updateUser, deleteUser, getUserProfile, getMyAppointment } = require("../controller/userController")

const userRouter = require("express").Router()


// userRouter.get("/", authenticate, restrict(["admin"]), getAllUser)
userRouter.get("/",  getAllUser)
userRouter.get("/:id", authenticate, restrict(["patient"]), getSingleUser)
userRouter.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile)
userRouter.get("/appointment/my-appointments", authenticate, restrict(["patient"]), getMyAppointment)

userRouter.put("/:id", authenticate, restrict(["patient"]), updateUser)
userRouter.delete("/:id", authenticate, restrict(["patient"]), deleteUser)

module.exports =  userRouter;