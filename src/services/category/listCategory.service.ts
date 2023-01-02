import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { IcategoryResponse } from "../../interfaces/categories";


const listCategoryService = async (): Promise<IcategoryResponse[]> => {

    const categoryModel = AppDataSource.getRepository(Categories);
    const categoryList = await categoryModel.find();


    return  categoryList
}
export default listCategoryService

