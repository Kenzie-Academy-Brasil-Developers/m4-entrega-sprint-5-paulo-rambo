import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import AppError from "../errors/appError";


const isAdmAuthMiddleware = async (req :Request, resp:Response, next: NextFunction ) => {
    const headersToken : string | undefined = req.headers.authorization
    if(!headersToken){
        throw new AppError('Missing authorization headers', 401)
    }

    const token = headersToken.split (" ")[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if(error){
        throw new AppError('message: error.message', 403)
    }
    if(!decoded.isAdm){
        throw new AppError('message: Missing authorization headers', 403)
    }
    return next()
})

}
export default isAdmAuthMiddleware;