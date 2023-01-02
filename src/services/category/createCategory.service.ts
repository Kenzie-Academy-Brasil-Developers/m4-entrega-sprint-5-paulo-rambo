import Categories from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { ICategoryRequest, IcategoryResponse } from "../../interfaces/categories";
import { categoryResponseSerializer } from "../../serializers/category.serializers";
import AppError from "../../errors/appError";


const createCategoryService = async ( categoryData: ICategoryRequest) : Promise<IcategoryResponse> => {

    const categoryModel = AppDataSource.getRepository(Categories);

    const checkIfCategoryExists = await categoryModel.findOneBy({
        name: categoryData.name,
    });
    if (checkIfCategoryExists){
        throw new AppError ('Category already exist', 409)
    }
    
    const categoryInstance = categoryModel.create(categoryData);
    await categoryModel.save(categoryInstance)

    try {
      const createUserDataResp = await categoryResponseSerializer.validate(categoryInstance, {
        abortEarly: false,
        stripUnknown: true
      })
        return createUserDataResp
      
    } catch (err: any) {
        throw new AppError(err.errors)
    }
}

export default createCategoryService