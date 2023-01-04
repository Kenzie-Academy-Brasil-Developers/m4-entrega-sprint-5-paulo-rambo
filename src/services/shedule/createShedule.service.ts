import AppDataSource from "../../data-source"
import Properties from "../../entities/properties.entity"
import Schedules_users_properties from "../../entities/schedules_user_properties.entity"
import User from "../../entities/user.entity"
import { IScheduleRequest } from "../../interfaces/schedules"
import AppError from "../../errors/appError"


const createScheduleService = async ( createScheduleData: IScheduleRequest) : Promise<object> => {
    const {date, hour, userId, propertyId} = createScheduleData
    
    if(parseInt(date.split("-")[2]) > 12 || parseInt(date.split("-")[1]) < 31 ){
        throw new AppError('Invalid date', 400)
    }
   
    var newDate = new Date(date);
    if(newDate.getDay() == 0 || newDate.getDay() == 6){
        throw new AppError('Invalid date', 400) 
    }

    const propertiesModel = AppDataSource.getRepository(Properties)
    const validatedPropertyId = await propertiesModel.findOneBy({
            id: propertyId 
    })
    
    if(!validatedPropertyId){
        throw new AppError('Propriety dont exist.', 404)
    }

    const schedulesModel = AppDataSource.getRepository(Schedules_users_properties)
    const findChedule = await schedulesModel.findOneBy({
        date: date,
        hour: hour,
    })
    
    if(findChedule){
        throw new AppError('Schedule already exist', 409)
    }

    const hourValue = hour.split(":")[0]
    if(parseInt(hourValue) >= 18 || parseInt(hourValue) <= 8){
        throw new AppError ('Invalid hour', 400)
    }

    const usersModel = AppDataSource.getRepository(User)
    const validatedUserId = await usersModel.findOneBy({
        id: userId
    })

    if(!validatedUserId){
        throw new AppError('User dont exist.', 404)
    }

    const dataSchedule = {
        date: date,
        hour: hour,
        properties:validatedPropertyId,
        users:validatedUserId
    }
    const scheduleModel = AppDataSource.getRepository(Schedules_users_properties)
    const scheduleInstance = scheduleModel.create(dataSchedule)
    await scheduleModel.save(scheduleInstance)

    return ({message: "Schedule created"})

}
export default createScheduleService

