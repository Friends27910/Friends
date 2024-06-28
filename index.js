const express = require("express")
const dotenv = require("dotenv")
const app = express()
const hbs = require("hbs")
const path = require("path")
const hbsFile = path.join(__dirname,"Hbs")
const usersData = require("./Schema/Details.js")
//const bodyPraser = require("body-praser")
const cookieParser = require("cookie-parser")
dotenv.config({
    path:"./.env"
  })
const server = require("./Server/Server.js")
const PORT = process.env.PORT ;
app.set("view engine","hbs")
app.set("views",hbsFile)
app.use(cookieParser())
app.use(express.static("Css"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",require("./Homepage/Homepage.js"))
app.use("/api",require("./Homepage/Mongo.js"))
app.use("/data/post",require("./Api/Postapi.js"))

app.listen(PORT,() => {
  console.log("Server is running now.......!")
  console.log("port : ",PORT)
})