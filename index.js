const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const hbsFile = path.join(__dirname,"Hbs")
const signupdata = require("./Mongodb.js")
const PORT = process.env.PORT || 2009;
app.use(express.static("Css"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")
app.set("views",hbsFile)
app.get("/",(req,res) => {
  res.render("Login")
})

app.get("/signup",(req,res) =>{
  res.render("Signup")
})
app.post("/signup",async (req,res) =>{
  const data = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    dob : req.body.dob,
  }
  await signupdata.insertMany([data]);
  res.render("Home")
})
app.post("/login",async(req,res) =>{
try {
 const data1 = await signupdata.findOne({email:req.body.email})
 if(data1.password===req.body.password){
   res.render("Home")
 }
 else{
   res.send("Wrong password")
 }
} catch {
  res.send("wrong")
}
})
app.listen(PORT,() => {
  console.log("Server is running now.......!")
  console.log("port : ",PORT)
})