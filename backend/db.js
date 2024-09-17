const mongoose = require("mongoose");

connectToMongo().catch(err => console.log("No connection"))
async function connectToMongo() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection Successfully...");
}