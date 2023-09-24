const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Mongodbb Database connected")
    } catch (error) {

        console.log(error.message, "MongoDB database is connection failed")
    }
}


module.exports = connectDB