
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require("./config/connectDB")
const bodyParser = require("body-parser")
const dotenv  = require('dotenv');
dotenv.config();

const authRouter = require("./Routes/authRoutes");
const userRouter = require('./Routes/userRoute');
const doctorRouter = require('./Routes/doctorRoute');
const reviewRouter = require('./Routes/reviewRouter');
const paymentRoute = require('./Routes/paymentRoute');



const app = express();
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true,
}

//* Middleware

// pwd = k8OPP6YNT8CzZsG0

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/create-checkout-session", paymentRoute)
app.use(bodyParser.json())


app.get('/', (req, res)=> {
    res.send("medicare server runnning")
})

app.listen(port, ()=> {
    
    console.log(`Server is running with ` + port)
    connectDB()
})