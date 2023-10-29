import { NextFunction, Request, Response } from "express";
import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import { Container } from 'typedi';
import config from "../config";
import userModel from "../model/user.model";


const isAuth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ status: 401, message: 'Token not exists.' })
    }

    token = token.replace("Bearer ", '');

    jwt.verify(token, config.jwtSecret, async function (err, decoded) {
        if (err) {
            return res.status(401).json({ status: 401, message: 'Invalid Auth Token' })
        }
        res.locals.jwtTTL = { exp: decoded.sub, jwt: token };
        const bytes = crypto.AES.decrypt(decoded.sub, config.aesSecreteKey);
        const descryptData = bytes.toString(crypto.enc.Utf8);

        res.locals.jwtPayload = JSON.parse(descryptData);
        const user = await userModel.findOne({ _id: res.locals.jwtPayload.userId });
        if (!user) {
            return res.status(401).json({ status: 401, message: 'User Not Found' })
        }

        Container.set('auth-token', res.locals.jwtPayload);
        next();
    });

}

export default isAuth;