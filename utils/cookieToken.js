const jwt = require("jsonwebtoken")

exports.cookieToken = (user, res) => {
    const token = getJwtToken(user._id)
    res.cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    res.redirect("/admin")
}
const getJwtToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    })
    return token
}
