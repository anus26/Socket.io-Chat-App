import createTokensaveCookie from '../../jwt/genreatetoken.js';
import User from '../models/user.models.js';
import bcrypt  from "bcryptjs";

 const singnup= async (req,res)=>{
    const {fullname,email,password,confirmpassword}=req.body
    try {
        if(password!==confirmpassword){
            return res.status(400).json({error:"password not match"})
      }
      const users= await User.findOne({email})
      if(users){
          return res.status(400).json({error:"email already exist"})
        }
        const hashpassword=await bcrypt.hash(password,10)
      const user=new User({
          fullname,
          email,
          password:hashpassword,
      })
      user.save()
      if (user) {
        createTokensaveCookie(res,user._id)
          res.status(201).json({message:"user singnup successfully",user:{
              _id:user._id,
            fullname:user.fullname,
            email:user.email
          }})
      }
   
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}




const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
          }
      
          const isMatch = await bcrypt.compare(password, user.password); 

        if(!user ||!isMatch){
            return res.status(400).json({error:"invalid email or password"})
            } 
            createTokensaveCookie(res,user.id)
         
res.status(200).json({message:"user login successfully",user:{
    _id:user._id,
fullname:user.fullname,
email:user.email
}})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}


// const logout=async(req,res)=>{
//     const userId = req.user.userId;
//     try {
        
      
//     const user = await User.findByIdAndDelete(userId);
//         if(!user){
//             return res.status(400).json({error:"invalid email "})
//             } 
//             res.clearCookie("jwt", {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "strict"
//               });
//             res.status(200).json({message:"user delete successfully"})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:"internal server error"})
//     }
// }
const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(201).json({message:"clear cookie successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}


const allUser=async(req,res)=>{
    try {
        const loggedInuser=req.user._id 
        const filteruser = await User.find({ _id:{$ne: loggedInuser},}).select(
            "-password"
);
        res.status(200).json(filteruser)
    } catch (error) {
        console.log("Error ", error);
        
    }
}

//pakistan
export {singnup,login ,logout,allUser}