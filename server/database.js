const dotenv = require('dotenv');
dotenv.config()
const mongoose = require("mongoose")
const mongoURI = process.env.mongoURI
//mongoURI if connecting to Atlas, otherwise Docker container
mongoose.set('strictQuery', false);
mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected Successfully");
});

module.exports = {
    mongoose,
    db
}