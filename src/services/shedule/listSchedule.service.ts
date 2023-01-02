import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import Schedules_users_properties from "../../entities/schedules_user_properties.entity";
import AppError from "../../errors/appError";

const listSheduleService = async(propertieId:string)=>{

    const propertiesModel = AppDataSource.getRepository(Properties);
    const chedulesModel = AppDataSource.getRepository(Schedules_users_properties);

    const propertyExist = await propertiesModel.findOneBy({
        id: propertieId,
    });
    if(!propertyExist){
        throw new AppError('Property with invalid id', 404)
    }
    const schedules = await propertiesModel.find(
        {
            relations: { schedules_users_properties: true }, 
            where: {id: propertieId}
        })

    return schedules
}

export default listSheduleService