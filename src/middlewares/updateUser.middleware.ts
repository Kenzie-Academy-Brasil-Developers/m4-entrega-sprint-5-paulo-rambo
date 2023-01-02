import 'dotenv/config'
import { Request, Response, NextFunction } from "express";
import User from "../entities/user.entity";
import AppDataSource from "../data-source";
import jwt from "jsonwebtoken"
import { IUserUpdate } from '../interfaces/users';
import AppError from '../errors/appError';

const updateUserMiddleware = async (req :Request, resp:Response, next: NextFunction ) => {
    const headersToken = req.headers.authorization
    if(!headersToken){
        return resp.status(403).json({ message: "Missing authorization headers" })
    }

    const idParam:string = req.params.id
    const reqData:IUserUpdate = req.body


    const token: string = headersToken.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if(decoded.userId != idParam){
        return next()
        }
    })
    
    const userModel = AppDataSource.getRepository(User);
    const userData = await userModel.findOneBy(
        {
            id: idParam  
        }
    );
    if(!userData){
        throw new AppError('User not found', 404)
    }
    
    const updateUser = userModel.create({
        ...userData, ...reqData
    })

    await userModel.save(updateUser)

    return resp.status(200).json({message: "Updated."})
}

export default updateUserMiddleware


