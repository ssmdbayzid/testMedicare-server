const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
exports.checkOut = async (req, res) =>{
    console.log("this is from payment controller", req.body)    
}