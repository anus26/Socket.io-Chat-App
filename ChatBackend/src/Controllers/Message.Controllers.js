import Chat from "../models/Chat.models.js";
import Message from "../models/Message.models.js";

const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user._id;
const  receivedId = req.params.id.trim();
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
      receivedId ,  // or receivedId if that's correct
      message,
    });

    // chat.messages.push(newMessage._id);

    // await Promise.all([chat.save(), newMessage.save()]);


    await newMessage.save(); // ✅ Save message first
chat.messages.push(newMessage._id);
await chat.save();


    res.status(200).json({ message: "Message sent successfully", newMessage });

  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const getmessage = async (req, res) => {
  try {
    const chatUser=req.params.id.trim()
    const senderId = req.user._id;
 
    let chat = await Chat.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages").lean();
 if(!chat){
  return res.status(201).json({messages:[]})
 }


    return res.status(200).json({ message: "Get all messages", "messages":chat.messages });
  } catch (error) {
    console.error("Get Message Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


  

export { sendmessage,getmessage};
