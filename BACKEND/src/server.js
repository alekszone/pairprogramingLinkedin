const express = require("express")

const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const profileRouter = require('./routes/profiles')

const server = express()
const port = process.env.PORT

const {
    notFoundHandler,
    badRequestHandler,
    otherGenericErrorHandler,
    newlyDefinedErrorHandler,
  } = require("./errorHandler")


const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/profiles", profileRouter)

server.use(notFoundHandler)
server.use(badRequestHandler)
server.use(newlyDefinedErrorHandler)
server.use(otherGenericErrorHandler)

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