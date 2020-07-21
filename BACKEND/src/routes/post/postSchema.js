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
// user:[{
// //   type :Schema.Types.ObjectId , ref:"profile"
// }],
image:{
    type:String
},
 },
{
timestamps:true
})
// post.static("addProfile", async function(id){
//     const profile = await PostsModel.findOne({_id:id}).populate("user")
// })

module.exports = mongoose.model("posts", post)