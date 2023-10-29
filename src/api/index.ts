import { Router } from "express";
import user from "./routes/user";
import conversation from "./routes/conversation";

export default () => {
    const app = Router();
    user(app);
    conversation(app);
    return app;
}