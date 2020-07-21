const express = require("express")
const path = require('path')
const fs = require('fs-extra')
const multer = require('multer')
const q2m = require("query-to-mongo")

const experienceSchema = require("./experienceSchema")

const experienceRouter = express.Router()

experienceRouter.get("/", async (req, res) => {
    try {
        const query = q2m(req.query)
        const experience = await experienceSchema.find(query.criteria, query.options.fields)
            .skip(query.options.skip)
            .limit(query.options.limit)
            .sort(query.options.sort)

        res.send(experience)
    } catch (error) {
        console.log(error)
    }
})

//get the single experience id
experienceRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const experience = await experienceSchema.findById(id)
        console.log(experience)

        res.send(experience)


    } catch (error) {
        console.log(error)
    }
})

//post a new experience with the experience id.
experienceRouter.post("/", async (req, res,) => {
    try {
        const newExperience = new experienceSchema(req.body)
        const { _id } = await newExperience.save()

        res.status(201).send(_id)
    } catch (error) {
        console.log(error)
    }
})

//edit a new experience using the experience id.
experienceRouter.put("/:id", async (req, res) => {
    try {
        const experience = await experienceSchema.findByIdAndUpdate(req.params.id, req.body)
        if (experience) {
            res.send(req.body)
        } else {
            const error = new Error(`experience with id ${req.params.id} dont exist`)
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }

})

//Delete a new experience using the student id.
experienceRouter.delete("/:id", async (req, res, next) => {
    try {
        const experience = await experienceSchema.findByIdAndDelete(req.params.id)
        if (experience) {
            res.send(`experience with id: ${req.params.id} was deleted successfully`)
        } else {
            console.log(`experience with id: ${req.params.id} not found in Database`)

        }
    } catch (error) {
        console.log(error)
    }
})

//upload a new image using the.
experienceRouter.post('/:username/picture', upload.single('user'), async (req, res, next) => {

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

module.exports = experienceRouter