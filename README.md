# Friends
# Friends
const express = require("express");
const path = require("path")
const app = express()
const router = express.Router()
const usersData = require("../Schema/Details.js")
const hbs = require("hbs")
router.get("/inf",(req,res) => {
  res.render("Access")
  
})
router.post("/inf",async (req,res) => {
  const {username,password} = await req.body
  if(req.body.username === "Akira_Aveon" && req.body.password === "Myfamily@007"){
    res.send(usersData.find())
  }else{
    res.redirect("/")
  }
})
module.exports = router