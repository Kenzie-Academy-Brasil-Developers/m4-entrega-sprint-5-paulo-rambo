import { Request, Response, NextFunction } from "express"
import AppError from "../errors/appError"

const ValidateUserUpdadeDataMiddleware = async (req :Request, resp:Response, next: NextFunction ) => {

    const bodyKeys = Object.keys(req.body)
    bodyKeys.forEach((value)=>{
        if(value == "id" || value == "isAdm" || value == "isActive"){
            throw new AppError('Invalid data', 401)
        }
    })
    return next()
}

export default ValidateUserUpdadeDataMiddleware
