const express = require('express')
const path = require('path')
const fs = require('fs-extra')
const multer = require('multer')
const q2m = ('query-to-mongo')


const profileModel = require("./schema")
const profileRouter = express.Router()
const upload = multer()
const port = process.env.PORT
const imagePath = path.join(__dirname, "../../../public/image/profile")

profileRouter.get('/', async(req, res, next)=>{})

profileRouter.get('/:username', async(req, res, next)=>{})

profileRouter.post('/', async(req, res, next)=>{})

profileRouter.put('/', async(req, res, next)=>{})

profileRouter.post('/:username/picture', async(req, res, next)=>{})

profileRouter.get('/:username/cv', async(req, res, next)=>{})

module.exports = profileRouter