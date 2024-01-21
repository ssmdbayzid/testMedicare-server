const { authenticate, restrict } = require("../auth/verifyToken")
const { 
    getSingleDoctor, 
    getAllDoctors, 
    updateDoctor, 
    deleteDoctor, 
    doctorProfile
} = require("../controller/doctorCollection")
const reviewRouter = require("./reviewRouter")
const doctorRouter = require("express").Router()


// Nasted Route 
doctorRouter.use("/:doctorId/reviews", reviewRouter)

doctorRouter.get("/",  getAllDoctors)

doctorRouter.get("/:id", getSingleDoctor)
doctorRouter.put("/:id", updateDoctor)
doctorRouter.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor)

doctorRouter.get('/profile/:id', authenticate,  restrict(["doctor"]), doctorProfile)
// doctorRouter.get('/profile/:id', authenticate, restrict(["doctor"]), doctorProfile)
module.exports = doctorRouter;