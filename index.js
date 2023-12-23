const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require("./Routes/authRoutes");
const userRouter = require('./Routes/userRoute');
const doctorRouter = require('./Routes/doctorRoute');
const reviewRouter = require('./Routes/reviewRouter');
// const paymentRoute = require('./Routes/paymentRoute');
const appointmentRoute = require('./Routes/paymentRoute');

const app = express();
const port = process.env.PORT || 8000;

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}



//* Middleware


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions))


// Define routes after setting up CORS middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/book-appointment", appointmentRoute);



//  web hook func ---------------------------
// controllers/webhookController.js


app.get('/', (req, res) => {
  res.send("medicare server running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
