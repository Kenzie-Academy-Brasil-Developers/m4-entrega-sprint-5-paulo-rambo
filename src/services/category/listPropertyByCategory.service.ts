import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import Categories from "../../entities/categories.entity";

const listPropertyByCategoryService = async (id:string) :Promise<Categories |  null>  => {

    const categoryModel = AppDataSource.getRepository(Categories);

    const checkIfPropertyByCategoryExists = await categoryModel.findOneBy({
        id:id
    });
    if (!checkIfPropertyByCategoryExists){
        throw new AppError ('Category Not found', 404)
    }

    const listByCategory = await categoryModel.findOne({
        where: {
            id:id
        },
        relations: {
            properties: true
        }
        
    })
  

    return listByCategory
}
export default listPropertyByCategoryService
