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
        validate: {
            validator: async (value) => {
                if(!v.isEmail(value)){
                    throw new Error("Email not valid!")
                }
                else {
                    const checkEmail = await ProfileModel.findOne({email: value})
                    if(checkEmail){
                        throw new Error("Email already in use!")
                    }
                }
            }
        },
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

const ProfileModel = model("Profile", ProfileSchema)
module.exports = ProfileModel

