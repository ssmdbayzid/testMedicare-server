const { 
    getSingleDoctor, 
    getAllDoctors, 
    updateDoctor, 
    deleteDoctor 
} = require("../controller/doctorCollection")

const doctorRouter = require("express").Router()

doctorRouter.get("/", getAllDoctors)
doctorRouter.get("/:id", getSingleDoctor)
doctorRouter.put("/:id", authenticate, restrict(["doctor"]), updateDoctor)
doctorRouter.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor)

module.exports = doctorRouter;