const BookingSchema = require("../models/BookingSchema");
const Doctor = require("../models/DoctorSchema");

const stripe = require("stripe")("sk_test_51ODQzkSE1wNzm1KdnByaieqzJBTs0knlCmANiqspGUuUvzNv81ECbBjM46sP7iLqXRVRozAhzTme83QG58MoaG7c00D7V5LKre")

// ================= Book Appointment

// const bookAppointment = async (req, res)=>{
//     console.log(req.body)
//  return res.status(200).json({message: req.body});
// }

//  Booking An Appointment
const bookAppointment =  async (customer, data) =>{
  const newAppointment = {
    doctor: customer.metadata.doctorId,
    user: customer.metadata.userId,
    ticketPrice: data.amount_total,
    appointmentDate: customer.metadata.appointmentDate,
    time: customer.metadata.time,
    isPaid: data.payment_status
  }
  console.log("new Appoitment",  newAppointment)
}

exports.checkOut = async (req, res) =>{
    // Create Customer 
    // console.log("checkout ", req.body)

    // res.send({message: "this is from checkout"})
    // /*

    const customer  = await stripe.customers.create({
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
    }
    
   
     catch (error) {
        res
        .status(500).json({success:false, message: error.message})
        console.log(error.message)
    }
    
   
}
// WebHook Endpoint Secret
let endpointSecret;
endpointSecret = "whsec_428cdddc66a46394b3a5317becd8a621189a265056e8f99fbffe78dd4f0de34a";
exports.webHook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  let event
  if(endpointSecret){
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    console.log("this is webhook")
    } catch (error) {
      console.log("error from webhook")
      console.log(error.message)
      return;
    }
    data = event.data.object
    eventType = req.body.type
  }else{
    data = event.data.object
    eventType = req.body.type
  }

  if(eventType ===  "checkout.session.completed"){
    
    stripe.customers
    .retrieve(data.customer)
    .then((customer)=>{
      // console.log("customer ---: ", customer)
      // console.log("data ---: ", data)
      bookAppointment(customer, data)
    })
    .catch(error => console.log("error message", error))
    
  }

  res.send().end()
}