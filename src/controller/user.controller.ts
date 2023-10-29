import Container from "typedi";
import userModel from "../model/user.model";
import config from "../config";
import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export class UserController {
    static async SignUpUser(data) {
        try {
            const userCheck = await userModel.findOne({ email: data.email });

            if (userCheck) return { status: 302, message: 'Email Already Exists' };

            const createUser = new userModel(data);
            await createUser.save();

            return {
                status: 200,
                message: 'User Register Succesfully.'
            }

        } catch {
            return { statu: 500, message: 'Something went wrong!' }
        }
    }

    static async LoginUser(data) {
        try {
            const user = await userModel.findOne({ email: data.email });

            if (!user) return { status: 302, message: 'Invalid Email' };

            const checkPassword = await user.comparePassword(data.password);

            if (!checkPassword) return { status: 302, message: 'Invalid Password' };

            const token_data = {
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastname: user.lastName
            }

            const ciphertext = crypto.AES.encrypt(JSON.stringify(token_data), config.aesSecreteKey);

            const token = jwt.sign({ sub: ciphertext.toString() }, config.jwtSecret, {
                expiresIn: parseInt(config.jwtExpireTime)
            })

            return {
                status: 200,
                message: 'Login Succesfully.',
                result: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    user_id: user._id,
                    token: token
                }
            }
        } catch {
            return { statu: 500, message: 'Something went wrong!' }
        }
    }

    static async checkProtectedAPI() {
        const userInfo = Container.get('auth-token');
        try {


            return {
                status: 200,
                message: 'Test',
                result: userInfo
            }

        } catch {
            return { statu: 500, message: 'Something went wrong!' }
        }
    }

    static async userConnectionList(search) {
        const userInfo: any = Container.get('auth-token');
        try {
            let user = [];
            if (search && search !== '') {
                var reg = new RegExp(`/${search}/`, 'i');
                console.log(reg, '-reg')
                user = await userModel.aggregate([
                    {
                        "$project": {
                            _id: 1,
                            name: { "$concat": ["$firstName", " ", "$lastName"] },
                            firstName: 1,
                            lastName: 1,
                            email: 1
                        }
                    },
                    {
                        $match: {
                            $and: [
                                { _id: { $ne: mongoose.Types.ObjectId(userInfo.userId) } },
                                { name: { $regex: search, $options: 'i' } }
                            ]
                        }
                    }
                ])
            } else {
                user = await userModel.find({ _id: { $ne: userInfo.userId } }, { password: 0 });
            }


            return {
                status: 200,
                message: 'Connection List',
                result: user
            }

        } catch {
            return { statu: 500, message: 'Something went wrong!' }
        }
    }
}