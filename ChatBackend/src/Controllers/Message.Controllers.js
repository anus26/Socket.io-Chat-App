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

    chat.messages.push(newMessage._id);

    await Promise.all([chat.save(), newMessage.save()]);

    res.status(200).json({ message: "Message sent successfully", newMessage });

  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getmessage=async(req,res)=>{
    try {
        const  receivedId = req.params.id.trim();
        const senderId = req.user._id;
        let chat=await  Chat.findOne({
            participants:{$all :[senderId,receivedId]}
        }).populate("messages")
        if(!chat){
            
            res.status(200).json({})
        }
        const message=chat.messages;
        res.status(200).json({messages:"get all messages" ,message})
    } catch (error) {
        console.error("Send Message Error:", error);
        res.status(500).json({ error: "Internal server error" });  
    }
}

export { sendmessage,getmessage};
