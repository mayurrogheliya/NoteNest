const mongoose = require("mongoose");

connectToMongo().catch(err => console.log("No connection"))
async function connectToMongo() {
    await mongoose.connect("mongodb://127.0.0.1:27017/iNotebook");
    console.log("Connection Successfully...");
}