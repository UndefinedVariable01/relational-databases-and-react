require("dotenv").config()
const environment = process.env.NODE_ENV
const dbAddress = process.env.DB_ADDRESS
const port = process.env.PORT || 5000

const express = require("express")
const cors = require("cors")
require("express-async-errors")
const app = express()

require("./config/db")(dbAddress, environment)
app.use(cors())
require("./config/routes")(app)

const server = app.listen(port, () => {
    console.log(`${environment.trim()} - Listening on port ${port}...`)
})

process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Process terminated!")
    })
})
