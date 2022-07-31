const express = require("express")
const {
    adminSignIn,
    adminSignUp,
    getAllOrders,
    adminLogout,
    adminPanel,
} = require("../controllers/adminController")
const { isLoggedIn } = require("../middlewares/adminlogin")

const router = express.Router()

// router.route("/admin").get(isLoggedIn, adminPanel).post(adminSignIn)
router.route("/admin").get(adminPanel);
router.route("/adminSignUp").post(adminSignUp)
// router.route("/adminGetAllOrders").get(isLoggedIn, getAllOrders)
router.route("/adminGetAllOrders").get(getAllOrders)
router.route("/adminLogout").get(adminLogout)
module.exports = router
