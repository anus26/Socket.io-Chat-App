import mongoose from "mongoose";
import Message from "./Message.models.js";
import User from "./user.models.js";


const chatSchema= new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }],

      messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Message,
            default:[]
        }
      ]














    // isGroupChat:{
    //     type :Boolean,
    //     default:false
    // },
    // groupName:{
    //     type:String,
    //     trim:true,
        
    // }
},{timestamps:true})

const Chat=mongoose.model("Chat",chatSchema);

export default Chat;
