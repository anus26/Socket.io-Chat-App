import { getReciverSocketId, io } from "../../ScokietIo/server.js";
import Chat from "../models/Chat.models.js";
import Message from "../models/Message.models.js";
import mongoose from "mongoose";







 const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id:  receivedId } = req.params;
    const senderId = req.user._id; // current logged in user
    let chat = await Chat.findOne({
    participants: { $all: [senderId,  receivedId] },
    });
    if (!chat) {
      chat = await Chat.create({
        participants: [senderId,  receivedId],
      });
    }
    const newMessage = new Message({
      senderId,
      receivedId,
      message,
    });
    if (newMessage) {
      chat.messages.push(newMessage._id);
    }
    await Promise.all([chat.save(), newMessage.save()]);

const populatedMessage = await Message.findById(newMessage._id).lean();

const receiverSocketId = getReciverSocketId(receivedId);
if (receiverSocketId) {
  io.to(receiverSocketId).emit("newMessage", populatedMessage);
}
console.log("receiversocketid",receiverSocketId);
res.status(201).json(newMessage);
console.log("Sender:", senderId);
console.log("Receiver:", receivedId);
  } catch (error) {
    console.log("Error in sendMessage", error);
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
    const messages = chat.messages;
    return res.status(200).json({ message: "Get all messages", messages });
  } catch (error) {
    console.error("Get Message Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



//  const getmessage = async (req, res) => {
//   try {
//     const { id: chatUser } = req.params;
//     const senderId = req.user._id; // current logged in user
//     let chat= await Chat.findOne({
//       participants: { $all: [senderId, chatUser] },
//     }).populate("messages");
//     if (!chat) {
//       return res.status(201).json([]);
//     }
//     const messages = chat.messages;
//     res.status(201).json(messages);
//   } catch (error) {
//     console.log("Error in getMessage", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


  

export { sendmessage,getmessage};
