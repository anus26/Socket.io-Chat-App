import mongoose from "mongoose";
import user from "./name";

const chatSchema= new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true
    }],
    isGroupChat:{
        type :Boolean,
        default:false
    },
    groupName:{
        type:String,
        trim:true,
        
    }
})
