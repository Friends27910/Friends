const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Meena_27:Aveon@cluster0.axstjm6.mongodb.net/").then(
  () => {
    console.log("Database connected")
  })
.catch(
  ()=>{
    console.log("failed")
  })
const Signupschema = mongoose.Schema({
  name:String,
  dob:Date,
  email:String,
  password:String,
})
const signupdata = mongoose.model("Signupdata",Signupschema)
module.exports = signupdata