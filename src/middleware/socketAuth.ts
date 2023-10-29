import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import config from "../config";


const socketAuth = (socket, next) => {
    const token = socket.handshake.auth.token;
    if(!token){
        return next(new Error('Token Invalid'))
    }

    jwt.verify(token,config.jwtSecret, function(err, decoded) {
        if(err){
            return next(new Error('Token Invalid'))
        }
        const bytes = crypto.AES.decrypt(decoded.sub, config.aesSecreteKey);
        const descryptData = bytes.toString(crypto.enc.Utf8);

        const decodeData = JSON.parse(descryptData);
        if(decodeData){
            socket.user = decodeData;
            return next();
        }
      });

}

export default socketAuth;