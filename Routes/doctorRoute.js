const { authenticate, restrict } = require("../auth/verifyToken")
const { 
    getSingleDoctor, 
    getAllDoctors, 
    updateDoctor, 
    deleteDoctor 
} = require("../controller/doctorCollection")
const reviewRouter = require("./reviewRouter")
const doctorRouter = require("express").Router()


// Nasted Route 
doctorRouter.use("/:doctorId/reviews", reviewRouter)

doctorRouter.get("/", getAllDoctors)
doctorRouter.get("/:id", getSingleDoctor)
doctorRouter.put("/:id", authenticate, restrict(["doctor"]), updateDoctor)
doctorRouter.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor)

module.exports = doctorRouter;