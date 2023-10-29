import { Request, Response, Router } from "express";
import { UserController } from "../../controller/user.controller";
import { validationRequest } from "../../middleware/validation";
import { createUser, loginUser } from '../../schema/user'
import isAuth from "../../middleware/auth";
const route = Router();

export default (app: Router) => {
    app.use('/user', route);

    route.post('/signup',validationRequest(createUser), signUpUserAPI);
    route.post('/login',validationRequest(loginUser), loginUserAPI);
    route.post('/protected',isAuth, checkProtectedAPI)
    route.get('/connection',isAuth, userConnectionAPI);
}

async function signUpUserAPI(req: Request, res: Response) {
    const data = req.body;
    UserController.SignUpUser(data).then(response => {
        res.status(response.status).json(response);
    }).catch(e => {
        res.status(500).json({ status: 500, message: 'Something went wrong!' })
    })
}

async function loginUserAPI(req: Request, res: Response) {
    const data = req.body;
    UserController.LoginUser(data).then(response => {
        res.status(response.status).json(response);
    }).catch(e => {
        res.status(500).json({ status: 500, message: 'Something went wrong!' })
    })
}

async function checkProtectedAPI(req: Request, res: Response) {
    UserController.checkProtectedAPI().then(response => {
        res.status(response.status).json(response);
    }).catch(e => {
        res.status(500).json({ status: 500, message: 'Something went wrong!' })
    })
}

async function userConnectionAPI(req: Request, res: Response) {
    const search = req.query.search;
    UserController.userConnectionList(search).then(response => {
        res.status(response.status).json(response);
    }).catch(e => {
        res.status(500).json({ status: 500, message: 'Something went wrong!' })
    })
}