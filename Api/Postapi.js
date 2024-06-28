const express = require("express")
const app = express()
const router = express.Router()
const Loggedin= require("../Middleware/Middleware.js")
const usersData = require("../Schema/Details.js")
const post= require("../Schema/Post.js")
router.post("/",Loggedin.Logedin,async(req,res) => {
  console.log(req.user)
  
  const postData = {
    content : req.body.content,
PostedBy:req.user._id,
  }
  console.log(postData)
  post.create(postData).then(async(newpost)=>{
    res.status(200).send(newpost)
    })
    
})


module.exports = router