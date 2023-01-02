import { IPropertyRequest } from "../../interfaces/properties";
import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import AppError from "../../errors/appError";
import Properties from "../../entities/properties.entity";
import Categories from "../../entities/categories.entity";

const createPropertyService = async ( createPropertyData: IPropertyRequest)=> {
    const categoryModel = AppDataSource.getRepository(Categories)
    const adressModel = AppDataSource.getRepository(Addresses);
    const adressData = createPropertyData.address
    
    if(!adressData.zipCode){
        throw new AppError('Missing zipcode', 409)
    }
    const findCategory = await categoryModel.findOneBy({
        id: createPropertyData.categoryId
    });
    if(!findCategory){
        throw new AppError('Category not found', 404)
    }

    const findAdressProperty = await adressModel.findOneBy({
        zipCode:adressData.zipCode,
        number:adressData.number,
      });

    if(findAdressProperty){
        throw new AppError('Adress already exist', 409)
    }

    const adressInstance = adressModel.create(adressData)
    await adressModel.save(adressInstance)

    const propertyModel = AppDataSource.getRepository(Properties)
    const propertyInstance = propertyModel.create({...createPropertyData, address: adressInstance, category: findCategory })
    await propertyModel.save(propertyInstance)
    
    return propertyInstance
}
export default createPropertyService
