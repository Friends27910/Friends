
const express = require("express");
const path = require("path")
const app = express()
const router = express.Router()
const usersData = require("../Schema/Details.js")
const hbs = require("hbs")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
app.use(express.json())
const jwt = require("jsonwebtoken")
const Loggedin= require("../Middleware/Middleware.js")
const {promisify} = require("util")
const salt = 10
router.get("/",(req,res) => {
 res.render("Home")
  }
  )
router.get("/signup",async(req,res) => {
if(req.cookies.AM){
  const decode = await promisify(jwt.verify)(
    req.cookies.AM,
    process.env.SecretKey
  )}
  else{
  res.render("Login1")
  }
})
router.get("/login",async(req,res) => {

  if(req.cookies.AM){
  const decode = await promisify(jwt.verify)(
    req.cookies.AM,
    process.env.SecretKey
  )}
  else{
  res.render("Login")
  }

}

)
router.post("/signup",async(req,res) =>{
let { name,username,password,confirmpassword,acesstoken} = await req.body
const salt = 10


const existUsername = await usersData.findOne({ username: req.body.username});
   if (existUsername) {
      res.render("Login1",
       {msg : " username already taken ! ", msg_type:"alert"})
   }else if(password!==confirmpassword){
     res.render("Login1",
     {msg : "Password and Confirm Password does not match! ", msg_type:"alert"})
   }
   else{
     password = await bcrypt.hash(password,salt)
     const save =  await  usersData.insertMany([{name,username,password}])
     const presentData = await usersData.findOne({username:username})
     console.log(presentData)
  const acesstoken = await jwt.sign({id :presentData},process.env.SecretKey,{
     expiresIn:process.env.expiresin,})
     const cookieOptions = {
    expires : new Date(Date.now()+process.env.cookieExpires*24*60*60*1000),
    httpOnly:true,
    
  }
  
       res.cookie("AM",acesstoken,cookieOptions)

 

     
     const datasave1 = await usersData.updateOne({token:acesstoken})
 
  res.redirect("/home")
   }}
);
  
  
router.post("/login",async(req,res) => {
  try{
    const data2 = await usersData.findOne({username:req.body.username})
   const result = await bcrypt.compare(req.body.password,data2.password)
    
    if(result === true){
      
  const acesstoken = await jwt.sign({id : data2},process.env.SecretKey,{
   expiresIn:process.env.expiresin,})
   const datasave = await usersData.updateOne({token:acesstoken})
  console.log(acesstoken)
  const cookieOptions = {
    expires : new Date(Date.now()+process.env.cookieExpires*24*60*60*1000),
    httpOnly:true,
  }
  res.cookie("AM",acesstoken,cookieOptions)
      res.status(200).redirect("/index")
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
 router.get("/index(.html)?",Loggedin.Logedin,async(req,res)=>{
res.redirect("/profile")
   })
  router.get(["/profile"],Loggedin.Logedin,async(req,res) => {
  if(req.user){
    res.render("Newpage",{
      user : req.user,
      })
  }else{
    res.send("Not found")
  }
})
router.get("/home",Loggedin.Logedin,async(req,res) => {
  res.render("Interface")
})
  
module.exports = router
