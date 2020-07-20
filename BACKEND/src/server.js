const express = require("express")

const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const port = process.env.PORT

const server = express()

server.use(express.json())

console.log(listEndpoints(server))

mongoose
    .connect("mongodb://localhost:27017/linkedindb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        server.listen(port || 3000, () => {
            console.log("Running on port", port || 3000)
        })
    )
    .catch((err) => console.log(err))