
import mongoose from 'mongoose';
import conversationModel from '../../model/conversation.model';

export const insertMessageConversation = async (sessionUser, receiver, text) => {
    try {

        const createConversation = new conversationModel({
            sender: mongoose.Types.ObjectId(sessionUser.userId),
            receiver: mongoose.Types.ObjectId(receiver),
            text: text
        })
        await createConversation.save();

    } catch (error) {
        console.log('Error on Insert Message Conversation Socket Service', error);
    }
}
