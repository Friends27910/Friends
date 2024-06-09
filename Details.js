const mongoose = require("mongoose")
const data = new mongoose.Schema({
  name:{
    type:String,
  },
  username:{
    type:String
  },
  password : {
    type:String
  },
  createdOn:{
    type:Date,
    default:Date.now(),
    immutable:true
  },
  token:String,
})
const usersData = new mongoose.model("Users Data",data)
module.exports = usersData