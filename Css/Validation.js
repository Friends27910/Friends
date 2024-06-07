$(document).ready(function(){
  $("#signupform").validate({
    rules:{
      name:{
        required:true,
        minlength:5,
      },
      username:{
        required:true,
        minlength:5,
        
      },
      password:{
        minlength:6,
        required:true,
      }
    }
  })
})