const mongoose = require("mongoose")
const connect = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB CONNECTED")
    })
    .catch((error) => {
        console.log("DB NOT CONNECTED")
    })

module.exports = connect
