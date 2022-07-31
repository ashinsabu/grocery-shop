const express = require("express")
const { createOrder, deleteOrder } = require("../controllers/orderController")
const router = express.Router()

router.route("/createOrder").post(createOrder)
router.route("/deleteOrder").post(deleteOrder)
module.exports = router
