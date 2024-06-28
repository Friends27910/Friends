const mongoose = require("mongoose")
const data = new mongoose.Schema({
  name:{
    type:String,
    unique:true,
    trim:true,
  },
  username:{
    type:String,
    unique : true,
    trim:true,
  },
  password : {
    type:String,
  },
  createdOn:{
    type:Date,
    default:Date.now(),
    immutable:true
  },
},
{
  timestamps:true,
})
const usersData = new mongoose.model("UsersData",data)
module.exports = usersData