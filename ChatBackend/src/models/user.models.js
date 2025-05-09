import mongoose  from "mongoose";

const userSchema =new mongoose.Schema({
    fullname:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        requried:true
    },
    confirmpassword:{
       type:String,
       requried:true
   }

  
},{timestamps:true})
const User=mongoose.model('user',userSchema)
export default User;