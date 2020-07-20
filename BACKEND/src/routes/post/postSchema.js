const {Schema} =  require("mongoose")
const mongoose = require("mongoose")

const post = new Schema({

name:{
    type:String,
    required: true,
},
username : {
    type:String
},
user:{
    type:String,
    required:true
},
image:{
    type:String
},
 

},
{
timestamps:true
})


module.exports = mongoose.model("posts",post)