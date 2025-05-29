import jwt from 'jsonwebtoken';

const createTokensaveCookie=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_TOkEN,{
        expiresIn:"10d",
    })
    res.cookie("jwt",token,{
        httpOnly:true,   //xss
        secure:true,
        sameSite:"None" , //csrf
        maxAge: 10 * 24 * 60 * 60 * 1000  // 10 days in milliseconds


    })
}

export default createTokensaveCookie