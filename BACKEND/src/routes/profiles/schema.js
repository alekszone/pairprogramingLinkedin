const { Schema, model } = require("mongoose")
const mongoose = require("mongoose")
const v = require("validator")

const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    bio: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
      
},{ timestamps: true })

const ProfileModel = model("profiles", ProfileSchema)
module.exports = ProfileModel

