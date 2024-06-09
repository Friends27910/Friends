const express = require("express");
const path = require("path")
const app = express()
const verifyLogin = require('./Exports.js')
require("dotenv").config
const router = express.Router()
const usersData = require("./Details.js")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
app.use(express.json())
const jwt = require("jsonwebtoken")
const {promisify} = require("util")
router.get("/",(req,res) => {
 res.render("Home")
  }
  )
router.get("/signup",async(req,res) => {
  if(req.cookies.Meena){
  const decode = await promisify(jwt.verify)(
    req.cookies.Meena,
    process.env.SecretKey
  )
  res.redirect("/index")
  }
  else{
  res.render("Login1")}
})
router.get("/login",async(req,res) => {
if(req.cookies.Meena){

  const decode = await promisify(jwt.verify)(
    req.cookies.Meena,
    process.env.SecretKey
  )
  res.redirect("/index")
  }
  
  
else{
  res.render("Login")
}
}

)
router.post("/signup",async(req,res) =>{
const { name,username,password,acesstoken} = await req.body

const existUsername = await usersData.findOne({ username: req.body.username});
   if (existUsername) {
      res.render("Login1",
       {msg : " username already taken ! ", msg_type:"alert"})
   }
   else{
   const acesstoken = await jwt.sign({id : {name,password,username}},process.env.SecretKey,{
     expiresIn:process.env.expiresin,})
     const datasave1 = await usersData.updateOne({token:acesstoken})
     console.log(acesstoken)
     const cookieOptions = {
    expires : new Date(Date.now()+process.env.cookieExpires*24*60*60*1000),
    httpOnly:true,
  }
       res.cookie("Meena",acesstoken,cookieOptions)
     await  usersData.insertMany([{name,username,password}])
    
  res.render("Newpage")
   }}
);
  
  
router.post("/login",async(req,res) => {
  try{
    const data2 = await usersData.findOne({username:req.body.username})
    if(data2.password == req.body.password){
  const acesstoken = await jwt.sign({id : data2},process.env.SecretKey,{
   expiresIn:process.env.expiresin,})
   const datasave = await usersData.updateOne({token:acesstoken})
  console.log(acesstoken)
  const cookieOptions = {
    expires : new Date(Date.now()+process.env.cookieExpires*24*60*60*1000),
    httpOnly:true,
  }
  res.cookie("Meena",acesstoken,cookieOptions)
      res.status(200).render("Newpage",{
        user : req.user
        }
        )
    }
    else if(data2.password!== req.body.password){
   return   res.render("Login",{msg:"wrong password !",msg_type : "error"})
     }
    
  }
 catch(error){
      res.render("failure",{
        msg:error
        })
    }
})
 router.get("/index(.html)?",async(req,res)=>{
   if(req.cookies.Meena){
  const decode = await promisify(jwt.verify)(
    req.cookies.Meena,
    process.env.SecretKey
  )
  res.render("Newpage",{
    name:decode.id.name})
  }
  
  
else{
  res.render("Login")
}
   })

  
module.exports = router
