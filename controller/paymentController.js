const BookingSchema = require("../models/BookingSchema")

const stripe = require("stripe")("sk_test_51ODQzkSE1wNzm1KdnByaieqzJBTs0knlCmANiqspGUuUvzNv81ECbBjM46sP7iLqXRVRozAhzTme83QG58MoaG7c00D7V5LKre")

// ================= Book Appointment

exports.bookAppointment = async (req, res)=>{
  // const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}










exports.checkOut = async (req, res) =>{
    console.log("this is from payment controller", req.body)  
    
    // const {specializition, ticketPrice, name, photo}  = req.body;
    try {
          
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items:[{
            price_data: {
                currency: "bdt",
                name:"Doctor Appointment",
                product_data: {
                    name: specializition,
                    doctor_name: name,
                    doctor_photo: photo,
                    ticket_price: ticketPrice.toString()
                },
                unit_amount: ticketPrice,
            },
            quantity: 1,
        }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    })
    res
    .status(200).json({message: "success", id:session.id})
    
   res
    .status(200).json({message: "success"})
    } catch (error) {
        res
        .status(500).json({success:false, message: error.message})
        console.log(error.message)
    }
   
}