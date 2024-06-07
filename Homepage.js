const express = require("express");
const path = require("path")
const app = express()
const router = express.Router()
const usersData = require("./Details.js")

router.get("",(req,res) => {
  res.render("Home")
})
router.get("/signup",(req,res) => {
  res.render("Login1")
})
router.get("/login",(req,res) => {
  res.render("Login")
})
router.post("/signup",async(req,res) =>{
  const data1 = {
    name: req.body.name,
    username:req.body.username,
    password:req.body.password,
    createdOn:req.body.createdOn
  }
  await usersData.insertMany([data1])
  res.render("Home")
})
router.post("/login",async(req,res) => {
  try{
    const data2 = await usersData.findOne({name:req.body.username})
    if(data2.password == req.body.password){
      res.render("Home")
    }
    else{
      res.render("failure")
    }
    
  }catch{
    res.render("failure")
  }
  
  
})
module.exports = router
