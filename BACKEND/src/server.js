const express = require("express")
const { notFoundHandler, badRequestHandler, genericErrorHandler } = require("./errorHeandlers")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const staticFolderPath = join(__dirname, "../public")
const profileRouter = require('./routes/profiles')
const port = process.env.PORT
const experienceRouter = require("./routes/experience")
const post = require("./routes/post")
const server = express()




server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/post", post)
server.use("/profiles", profileRouter)
server.use("/experiences", experienceRouter)

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


console.log(listEndpoints(server))



mongoose.connect("mongodb+srv://eriseld:troy1894@cluster0.j7g0j.mongodb.net/linkedindb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(
        server.listen(port || 3000, () => {
            console.log("Running on port", port || 3000)
        })
    )
    .catch((err) => console.log(err))

