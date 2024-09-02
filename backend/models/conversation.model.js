import mongoose from "mongoose";

const ConversationSchema=new mongoose.Schema({
    participant:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }
],
messages:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }
]
},{Timestamp:true})

const Conversation=mongoose.model("Conversation",ConversationSchema)
export default Conversation;