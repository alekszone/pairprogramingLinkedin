const express = require("express")
const { notFoundHandler, badRequestHandler, genericErrorHandler } = require("./errorHeandlers")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const profileRouter = require('./routes/profiles')

const port = process.env.PORT
const experienceRouter = require("./routes/experience")
const post = require("./routes/post/index")
const server = express()



const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/profiles", profileRouter)
server.use("/post", post)
server.use("/experiences", experienceRouter)

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


console.log(listEndpoints(server))



mongoose.connect("mongodb://localhost:27017/linkedindb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(
        server.listen(port || 3000, () => {
            console.log("Running on port", port || 3000)
        })
    )
    .catch((err) => console.log(err))

