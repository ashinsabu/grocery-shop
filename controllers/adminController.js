const Admin = require("../model/Admin")
const { cookieToken } = require("../utils/cookieToken")
const bcrypt = require("bcryptjs")
const Order = require("../model/Orders")

exports.adminSignUp = async (req, res) => {
    const { name, email, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const admin = await Admin.create({
        name,
        email,
        password: hashPassword,
    })
    admin.password = undefined
    res.json({
        status: "ok",
        admin,
    })
}

exports.adminSignIn = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        return res.render("login", {
            output: "email & password is required",
        })
    }
    const admin = await Admin.findOne({ email }).select("+password")
    if (!admin) {
        return res.render("login", {
            output: "email or password is invalid",
        })
    }
    const validatePassword = await bcrypt.compare(password, admin.password)
    if (!validatePassword) {
        return res.render("login", {
            output: "email or password is invalid",
        })
    }
    admin.password = undefined
    cookieToken(admin, res)
}

exports.getAllOrders = async (req, res) => {
    try {
        const order = await Order.find()
        res.json({
            status: "ok",
            order,
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
        })
    }
}
exports.adminPanel = async (req, res) => {
    res.render("admin")
}
exports.adminLogout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        status: "ok",
        message: "successfully logout",
    })
}
