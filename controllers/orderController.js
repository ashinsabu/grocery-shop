const Order = require("../model/Orders")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
})

exports.createOrder = async (req, res) => {
    try {
        const { user, items, totalPrice, paymentMethod } = req.body
        if (!user || !items || !totalPrice || !paymentMethod) {
            return res.json({
                status: "error",
                message: "all fields are required",
            })
        }
        if (paymentMethod === "cod") {
            const createdOrder = await Order.create({
                ...req.body,
                paymentStatus: "accepted",
            })
            return res.json({
                status: "ok",
                order: createdOrder,
            })
        } else if (paymentMethod === "online") {
            const options = {
                amount: totalPrice * 100,
                currency: "INR",
            }
            instance.orders.create(options, async (err, orderId) => {
                if (err) {
                    console.log(err)
                    return res.json({
                        status: "error",
                    })
                }
                const createdOrder = await Order.create({
                    ...req.body,
                    paymentId: orderId.id,
                })
                console.log(orderId)
                res.json({
                    status: "ok",
                    orderId,
                    order: createdOrder,
                })
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
        })
    }
}
exports.deleteOrder = async (req, res) => {
    const { oid } = req.body
    try {
        const order = await Order.deleteOne({ paymentId: oid })
        console.log(order)
        res.json({ status: "ok" })
    } catch (error) {
        console.log(error)
        res.json({ status: "error" })
    }
}
exports.verifyOrder = async (req, res) => {
    const secret = "12345678"

    const shasum = crypto.createHmac("sha256", secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")

    console.log(digest, req.headers["x-razorpay-signature"])

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit")
        const { order_id } = req.body.payload.payment.entity
        const order = Order.findOneAndUpdate(
            { paymentId: order_id },
            { paymentStatus: "accepted" }
        )
        console.log(order)
    } else {
        const order = Order.deleteOne({ paymentId: order_id })
        console.log(order)
    }
    res.json({ status: "ok" })
}
