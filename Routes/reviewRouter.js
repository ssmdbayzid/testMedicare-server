const { getAllReview, createReview } = require("../controller/reviewController");
const {authenticate, restrict} = require("../auth/verifyToken")

const reviewRouter = require("express").Router({mergeParams: true});


 reviewRouter.route('/').get(getAllReview).post( authenticate, restrict(["doctor"]), createReview)


module.exports = reviewRouter;