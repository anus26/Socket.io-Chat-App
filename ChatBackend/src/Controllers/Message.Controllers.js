import { getReciverSocketId } from "../../ScokietIo/server.js";
import Chat from "../models/Chat.models.js";
import Message from "../models/Message.models.js";
import mongoose from "mongoose";


const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user._id;
    const receivedId = req.params.id.trim();

    // ✅ self-chat check with correct ObjectId comparison
    if (senderId.toString() === receivedId.toString()) {
      return res.status(400).json({ error: "آپ خود کو میسج نہیں بھیج سکتے۔" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receivedId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receivedId],
      });
    }

    const newMessage = new Message({
      senderId,
      receivedId,
      message,
    });

    await newMessage.save();
    const receivedsocketId=getReciverSocketId(receivedId)
    if (receivedsocketId) {
      io.to(receivedsocketId).emit('newMessage', newMessage);
      
    }
    chat.messages.push(newMessage.id);
    await chat.save();

    res.status(200).json({ newMessage });

  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const getmessage = async (req, res) => {
  try {
    const chatUserId =req.params.id.trim(); 
    const senderId =req.user._id;
    let chat = await Chat.findOne({
      participants: { $all: [senderId, chatUserId] },
    }).populate("messages").lean();
    
    
    if(!chat){
     return res.status(200).json({messages:[]})
    }
    return res.status(200).json({ message: "Get all messages", "messages":chat.messages });
  } catch (error) {
    console.error("Get Message Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


  

export { sendmessage,getmessage};
