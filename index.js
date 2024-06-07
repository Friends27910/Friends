const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const hbsFile = path.join(__dirname,"Hbs")
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Meena_27:Aveon@cluster0.axstjm6.mongodb.net/").then(
  () => {
    console.log("Database connected");
  })
.catch(
  ()=>{
    console.log("failed")
  })
const PORT = process.env.PORT || 2009;
app.set("view engine","hbs")
app.set("views",hbsFile)
app.use(express.static("Css"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("",require("./Homepage.js"))

app.listen(PORT,() => {
  console.log("Server is running now.......!")
  console.log("port : ",PORT)
})