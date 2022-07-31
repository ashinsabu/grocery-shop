const jwt = require("jsonwebtoken")
const Admin = require("../model/Admin")

exports.isLoggedIn = (req, res, next) => {
    const token = req.cookies.token || false
    if (!token) {
        return res.render("login")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.render("login", {
                output: "session has expired",
            })
        }
        req.id = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.render("login", {
            output: "session has expired",
        })
    }
}
