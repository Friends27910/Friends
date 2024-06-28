const mongo = process.env.Mongodb;
const mongoose = require("mongoose");
const server =  mongoose.connect(mongo).
then(
  () => {
    console.log("Database connected")
  })
.catch(
  (error)=>{
    console.log("failed",error)
  })
  
module.exports = server ;