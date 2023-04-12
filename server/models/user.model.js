const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User

/*,
    age: {
      type: Number,
      min: 18,
      max: 120
    },
    createdAt: {
      type: Date,
      default: Date.now
    }*/