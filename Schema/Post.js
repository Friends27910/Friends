const mongoose = require("mongoose")
const Schema = mongoose.Schema
const posts = new mongoose.Schema({
  content:{
    type:String,
    trim:true,
  },
  PostedBy:{
    type:Schema.Types.ObjectId,
    ref:"usersData",
  },
  pinned:Boolean,
})
const post = mongoose.model("post",posts)
module.exports = post