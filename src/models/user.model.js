const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    avatar: { type: String },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    post: { type: String },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);