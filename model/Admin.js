const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password must be atleast 6 character long"],
        select: false,
    },
    role: {
        type: String,
        default: "admin",
    },
})

module.exports = mongoose.model("Admin", adminSchema)
