import { IPropertyRequest } from "../../interfaces/properties"
import AppError from "../../errors/appError";
import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";

const listPropertyService = async ():Promise<Properties[]> => {
    const propertyModel = AppDataSource.getRepository(Properties);
    const propertiesData = await propertyModel.find()
    if(!propertiesData){
        throw new AppError ('Not found or empty', 404)
    }
    return propertiesData
}
export default listPropertyService
