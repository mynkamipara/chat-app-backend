import *  as mongoose from 'mongoose';
import { Conversation } from '../interface/conversation.interface';


const ConversationSchema:any = new mongoose.Schema({
    sender: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver:  { type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: { type: String, required: true }
}, {
    timestamps: true
})

const conversationModel = mongoose.model<Conversation & mongoose.Document>('conversations',ConversationSchema);

export default conversationModel;