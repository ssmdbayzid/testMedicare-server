const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require("./Routes/authRoutes");
const userRouter = require('./Routes/userRoute');
const doctorRouter = require('./Routes/doctorRoute');
const reviewRouter = require('./Routes/reviewRouter');
// const paymentRoute = require('./Routes/paymentRoute');
const appointmentRoute = require('./Routes/paymentRoute');
const bookingRoute = require('./Routes/bookingRoute');
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://medicare-817a0.web.app",
  credentials: true,
  optionSuccessStatus: 200
};

//* Middleware

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions))

const connectDatabase = async ()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongodbb Database connected")
  } catch (error) {
    
    console.log(error.message, "MongoDB database is connection failed")
  }
}

connectDatabase().catch(err=> console.log(err))




// Define routes after setting up CORS middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/book-appointment", appointmentRoute);
app.use("/api/v1/appointments", bookingRoute);


//  web hook func ---------------------------
// controllers/webhookController.js

app.get('/', (req, res) => {
  res.send("medicare server running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // connectDB();
});


