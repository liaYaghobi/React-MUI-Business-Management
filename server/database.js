const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const mongoURI = 'mongodb+srv://admin:EeOCvQHbRRvShduc@cluster1.kcxo9su.mongodb.net/BusinessManagement?retryWrites=true&w=majority'

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