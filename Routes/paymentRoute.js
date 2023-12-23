
const express = require("express")
const Doctor = require("../models/DoctorSchema")
// const bodyParser = require("body-parser")
const appointmentRoute = require("express").Router()

const stripe = require("stripe")("sk_test_51ODQzkSE1wNzm1KdnByaieqzJBTs0knlCmANiqspGUuUvzNv81ECbBjM46sP7iLqXRVRozAhzTme83QG58MoaG7c00D7V5LKre")


// appointmentRoute.use(
//     bodyParser.json({
//         verify: function(req, res, buf) {
//             req.rawBody = buf;
//         }
//     })
//   );
//   //* Middleware
  
//   appointmentRoute.use(bodyParser.json());
  

  // payment Route
  appointmentRoute.post('/', async (req, res)=>{
      const customer = await stripe.customers.create({
          metadata: {
              user: req.body.userId,
              doctor: req.doctorId,                
              appointmentDate: req.body.date,
              time: req.body.time,        
            }
        })
        const doctor = await Doctor.findById(req.body.doctorId)
        try {        
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items:[{
                    price_data: {
                        currency: "bdt",                
                        product_data: {
                            name: doctor?.specialization,
                            images: [doctor?.photo],
                            metadata: {
                                id: doctor?._id,
                            }
                        },
                        unit_amount: doctor?.ticketPrice,
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            customer: customer.id,
            success_url: "http://localhost:3000/payment-success",
            cancel_url: "http://localhost:3000/payment-cancel",
        })
        res
        .status(200).json({url: session.url})
    } catch (error) {
        res
        .status(500).json({success:false, message: error.message})
        console.log(error.message)
    }
})



appointmentRoute.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    (req, res) => {
      const sig = req.headers['stripe-signature'];
      const endpointSecret =
        'whsec_428cdddc66a46394b3a5317becd8a621189a265056e8f99fbffe78dd4f0de34a';
  
      let data;
      let eventType;
  
      try {
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          endpointSecret
        );
        console.log('Webhook received:', event.type);
        data = event.data.object;
        eventType = event.type;
      } catch (err) {
        console.error('Error verifying webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
  
      if (eventType === 'checkout.session.completed') {
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            // Process further based on the completed session
            console.log('Customer retrieved:', customer);
            // Implement the logic to create an order or perform other actions
          })
          .catch((err) => console.error('Error retrieving customer:', err.message));
      }
  
      // Return a 200 response to acknowledge receipt of the event
      res.status(200).end();
    }
  );
  

module.exports = appointmentRoute
