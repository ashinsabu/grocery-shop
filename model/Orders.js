const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        number: {
            type: Number,
        },
        alternativeField: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    items: [
        {
            itemName: { type: String },
            itemPrice: { type: Number },
            itemQty: { type: String },
            types: [{ type: String }],
        },
    ],
    totalPrice: {
        type: Number,
    },
    paymentMethod: {
        type: String,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentId: {
        type: String,
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Order", orderSchema)
