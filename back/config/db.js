const mongoose = require("mongoose")

module.exports = function(dbAddress, environment) {
    mongoose.set("useNewUrlParser", true)
    mongoose.set("useUnifiedTopology", true)
    mongoose.set("useFindAndModify", false)
    if (environment === "production") mongoose.set("autoIndex", false)

    mongoose.connect(dbAddress, () => {
        console.log("Connection to database stablished...")
    })

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from database!")
    })

    mongoose.connection.on("reconnected", () => {
        console.log("Reconnected to database...")
    })

    mongoose.connection.on("error", (err) => {
        console.log(err.stack)
        process.kill(process.pid, "SIGTERM")
    })
}