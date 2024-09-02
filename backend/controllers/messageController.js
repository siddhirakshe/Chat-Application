import Conversation from "../models/conversation.model.js";
import Message from "../models/message.models.js";

export const sendMessage=async(req,res)=>{
    // console.log("message sent")
    try{

        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        

      let conversation=  await Conversation.findOne({
            paricipants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation=await Conversation.create({
                participant:[senderId,receiverId],
            })
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //socket io functionality goes here 


        // await conversation.save();
        // await newMessage.save()

        //this will run parallel;
        await Promise.all([conversation.save(),newMessage.save()])
        
        res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error in sendMessage controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages=async (req,res)=>{
    try{
        const {id:userToChatId}=req.params
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participant:{$all:[senderId,userToChatId]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([])
        }

        const messages=conversation.messages;

        res.status(200).json(conversation.messages)
    }
    catch(error){
        console.log("Error in getMessage controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}