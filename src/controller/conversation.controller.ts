import Container from "typedi";
import conversationModel from "../model/conversation.model";
import { TokenInfo } from "../interface/token.interface";
import mongoose from 'mongoose';

export class ConversationController {
    static async getConversation(data) {
        const userInfo: TokenInfo = Container.get('auth-token');
        try {
            const findConversation = await conversationModel.find({
                $or: [
                    {
                        sender: userInfo.userId, receiver: data.receiverId
                    },
                    {
                        sender: data.receiverId, receiver: userInfo.userId
                    },
                ]


            }, null, { sort: { createdAt: 1 } });

            return {
                status: 200,
                message: 'Conversation Data retrived.',
                result: findConversation
            }

        } catch {
            return { statu: 500, message: 'Something went wrong!' }
        }
    }


    static async createConversation(data) {
        const userInfo: TokenInfo = Container.get('auth-token');
        try {
            const createConversation = new conversationModel({
                sender: mongoose.Types.ObjectId(userInfo.userId),
                receiver: mongoose.Types.ObjectId(data.senderId),
                text: data.text
            })
            await createConversation.save();

            return {
                status: 200,
                message: 'Conversation Created.'
            }

        } catch {
            return { statu: 500, message: 'Something went wrong!' }
        }
    }
}