const mongoose = require("mongoose");

// All User related models


const userSchema = new mongoose.Schema ({
    username: {type: String},
    password: {type: String},
    emailid: {type: String},
    phone: {type: Number, required: false},
    category: {type: String}
})

const UserModel = mongoose.model("users", userSchema);

module.exports = {
    UserModel,
}