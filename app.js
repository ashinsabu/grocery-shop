require("dotenv").config()
require("./config/conn")
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const orderRoute = require("./routes/orderRoute")
const adminRoute = require("./routes/adminRoute")
const homeRoute = require("./routes/homeRoute")

app.set("view engine", "hbs")
app.set("views", "./templates/views")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes
app.use("/", homeRoute)
app.use("/", orderRoute)
app.use("/", adminRoute)
module.exports = app
