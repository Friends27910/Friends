const {promisify} = require("util")
const jwt = require("jsonwebtoken")
exports.Logedin = async (req,res,next)=>{
 if(req.cookies.AM){
  const decode = await promisify(jwt.verify)(
    req.cookies.AM,
    process.env.SecretKey
  )
  req.user = decode.id
  next()
    
 }
 
 
 else{
   res.redirect("/signup")
   
}

}