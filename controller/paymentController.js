const SSLCommerzPayment = require('sslcommerz-lts')
const { v4: uuidv4 } = require('uuid');

const Booking = require("../models/BookingSchema");
const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema");
const stripe = require("stripe")("sk_test_51ODQzkSE1wNzm1KdnByaieqzJBTs0knlCmANiqspGUuUvzNv81ECbBjM46sP7iLqXRVRozAhzTme83QG58MoaG7c00D7V5LKre")

// ================= Book Appointment

// const bookAppointment = async (req, res)=>{
//     console.log(req.body)
//  return res.status(200).json({message: req.body});
// }

const store_id = 'test64266a735cb58'
const store_passwd = 'test64266a735cb58@ssl'
const is_live = false //true for live, false for sandbox


exports.checkOut = async (req, res) =>{
  
  const tran_id = uuidv4()
  console.log(req.body)
   const doctor = await Doctor.findById(req.body.doctorId)
   try {
    const data = {
      total_amount: doctor?.ticketPrice,
      currency: 'BDT',
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `https://medicare-server-ashy.vercel.app/api/v1/book-appointment/success/${tran_id}`,
      fail_url: `https://medicare-server-ashy.vercel.app/api/v1/book-appointment/failed/${tran_id}`,
      cancel_url: 'https://medicare-server-ashy.vercel.app/api/v1/book-appointment/cancel',
      ipn_url: 'https://medicare-server-ashy.vercel.app/api/v1/book-appointment/ipn',
      shipping_method: 'Courier',
      product_name: doctor?.specialization,
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
  };
  // console.log(data)
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then( async apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL

      res.send({url : GatewayPageURL})

      const newAppointment = {
        user: req.body.userId,
        doctor: req.body.doctorId,
        ticketPrice: doctor.ticketPrice,
        appointmentDate: req.body.date,
        time: req.body.time,
        transactionId: tran_id,
        paymentStatus: "pending",
      }

      const result = await new Booking(newAppointment)
      result.save()

      const updateUser = await User.updateOne({_id: req.body.userId}, {
        $push: {
          appointment: result._id,
        }
      })
      const updateDoctor = await Doctor.updateOne({_id: req.body.doctorId}, {
        $push: {
          appointments: result._id,
        }
      })
      // const updateDoctor = new Doctor (doctor.appointment.push(result._id)).save()
      
      

      console.log("user", updateUser)
      console.log("doctor", updateDoctor)

  });
   } catch (error) {
    
   return res
   .status(500)
   .json({success: false, message: "this is from checkout"})
   }
   
}


exports.booking = async (req, res) =>{  
  console.log("transaction Id", req.params.id)
  const result = await Booking.updateOne({transactionId: req.params.id}, {
    $set: {
      paymentStatus: "paid"
    }
  })

  if(result.modifiedCount > 0){
    res.redirect("https://medicare-817a0.web.app/payment-success")
  }  
}

exports.bookingFailed = async (req, res)=>{
  const result = await Booking.deleteOne({transactionId: req.params.id})
  if(result.deletedCount){
    res.redirect("https://medicare-817a0.web.app/payment-failed")
  }
}
exports.bookingCancel = async (req, res)=>{  
  return res.redirect("https://medicare-817a0.web.app/payment-cancel")  
}
