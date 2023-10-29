import { Request, Response, Router } from "express";
import isAuth from "../../middleware/auth";
import { ConversationController } from "../../controller/conversation.controller";
const route = Router();

export default (app: Router) => {
    app.use('/conversation', route);

    route.post('/', isAuth, createConversationAPI);
    route.get('/', isAuth, getConversationAPI);
}

async function getConversationAPI(req: Request, res: Response) {
    const data = req.query;
    ConversationController.getConversation(data).then(response => {
        res.status(response.status).json(response);
    }).catch(e => {
        res.status(500).json({ status: 500, message: 'Something went wrong!' })
    })
}

async function createConversationAPI(req: Request, res: Response) {
    const data = req.body;
    ConversationController.createConversation(data).then(response => {
        res.status(response.status).json(response);
    }).catch(e => {
        res.status(500).json({ status: 500, message: 'Something went wrong!' })
    })
}