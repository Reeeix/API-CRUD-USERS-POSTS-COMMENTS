const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado con éxito a la BBDD")
    } catch (error) {
        console.log("Error conectando con la BBDD");
    }
}

module.exports = { connectDB }