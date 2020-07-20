const express = require('express')
const path = require('path')
const fs = require('fs-extra')
const multer = require('multer')
const q2m = require('query-to-mongo')

const profileModel = require("./schema")
const profileRouter = express.Router()
const upload = multer()
const port = process.env.PORT
const imagePath = path.join(__dirname, "../../../public/image/profile")

profileRouter.get('/', async(req, res, next)=>{
    try {
        const query = q2m(req.query)
        console.log(query)
        const users = await profileModel.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
        res.send({totalUsers: users.length, data: users})
    } catch (error) {
        next(error)
    }
})

profileRouter.get('/:username', async(req, res, next)=>{
    try {
        const user = await profileModel.findOne({'username': req.params.username})
        if(user){
            res.status(200).send(user)
        }
        else res.status(404).send('not found!')
    } catch (error) {
        next(error)
    }
})

profileRouter.post('/', async(req, res, next)=>{
    try {
        const newUser = new profileModel(req.body)
        const {_id} = await newUser.save()
        res.status(200).send(_id)
    } catch (error) {
        next(error)
    }
})

profileRouter.put('/:username', async(req, res, next)=>{
    try {
        const user = await profileModel.findOneAndUpdate(req.params.username, req.body)
        if (user) {
          res.send("Record updated!")
        } else {
          const error = new Error(`User with username ${req.params.username} not found`)
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        next(error)
      }
})

profileRouter.post('/:username/picture', upload.single('user'), async(req, res, next)=>{
    
  try {
    await fs.writeFile(path.join(imagePath, `${req.params.username}.jpg`), req.file.buffer)
    
    req.body = {
      image: `http://127.0.0.1:${port}/image/profile/${req.params.username}.jpg`
    }
    const user = await profileModel.findOneAndUpdate(req.params.username, req.body)
    if (user) {
      res.send("Record updated!")
    } else {
      const error = new Error(`User with username ${req.params.username} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

profileRouter.get('/:username/cv', async(req, res, next)=>{
    try {
        // file as a stream (source) [--> transform optional] --> response (destination)
        const source = fs.createReadStream(
            path.join(imagePath, `${req.params.username}`)
        )
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${req.params.username}`
        ) // please open "Save file to disk window" in browsers
        source.pipe(res)

        source.on("error", (error) => {
            next(error)
        })
    } catch (error) {
        next(error)
    }
})

module.exports = profileRouter