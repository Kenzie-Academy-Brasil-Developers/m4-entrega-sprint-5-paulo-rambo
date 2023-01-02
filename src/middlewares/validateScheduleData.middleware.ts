import { Request, Response, NextFunction } from "express"
import AppError from "../errors/appError"
import AppDataSource from "../data-source"
import SchedulesUserProperties from "../entities/schedules_user_properties.entity"
import Properties from "../entities/properties.entity"
import { createQueryBuilder } from "typeorm"

const validateSheduleDataMiddleware = async(req:Request, resp:Response, next: NextFunction)=>{
    const {date, hour, propertyId} = req.body
    const  userId  = req.user.userId
   
    /* const scheduleModel = AppDataSource.getRepository(SchedulesUserProperties)
    const checkSchedule = await scheduleModel.findOneBy(
        {
            date,
            hour      
        })
    if(checkSchedule){
        throw new AppError('Schedule already exist', 409)
    }
    console.log(`propertyId: ${propertyId}`) */
    /* const shedule = await AppDataSource.manager
    .createQueryBuilder(SchedulesUserProperties, "schedules_user_properties")
    .where("schedules_user_properties.properties = :propertyId", { property: propertyId })
    .andWhere("schedules_user_properties.date = :date", { date: date })
    .andWhere("schedules_user_properties.hour = :hour", { hour: hour })
    .getOne()

    if(shedule){
        throw new AppError('Schedule already exist.', 409)
    } */
    
    const hourValue = hour.split(":")[0]
    if(parseInt(hourValue) >= 18 || parseInt(hourValue) <= 8){
        throw new AppError ('Invalid hour', 400)
    }

    /* const propertiesModel = AppDataSource.getRepository(Properties)
    const validatePropertyId = await propertiesModel.findOneBy({
        id: propertyId
    })
    console.log(validatePropertyId)
    if(!validatePropertyId){
        throw new AppError('Invalid property id', 404)
    } */

    return next()
}

export default validateSheduleDataMiddleware
