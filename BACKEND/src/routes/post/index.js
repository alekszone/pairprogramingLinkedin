const express =  require("express")
const mongo = require("./postSchema")
const post = express.Router()
const uniqid= require("uniqid")

post.get("/", async(req,res,next)=>{
try{
const posts = await mongo.find(req.query)
res.send(posts)
}catch(err){
    next(err)
}
})
post.get("/:_id", async(req,res,next)=>{
try{
   
const posts = await mongo.findById(req.params._id)
res.send(posts)
}catch(err){
next(err)
}
})
post.post("/",async (req,res,next)=>{
try{ 
    const  text = "this is a text 12312 1 3 1"
const newPost =  new mongo( req.body)
const { _id } = await newPost.save()
res.send( _id )
}catch(err){
next(err)
}
})
post.put("/:_id",async(req,res,next)=>{
try{
const posts = await mongo.findByIdAndUpdate(req.params._id,req.body )

    res.send("ok")


}catch(err){
    next(err)
}
})

post.delete("/:_id",async (req,res,next)=>{
try{
const post = await mongo.findByIdAndDelete(req.params._id)
if(post){
    res.send("Deleted")
}else{
    res.send("Not exist in database")
}
}catch(err){
    next(err)
}
})


module.exports = post



