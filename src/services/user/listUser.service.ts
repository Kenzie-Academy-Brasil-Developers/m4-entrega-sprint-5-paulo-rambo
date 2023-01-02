import User from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import  AppError  from "../../errors/appError";

const listUserService = async () : Promise<User[]> =>{
    const userModel = AppDataSource.getRepository(User);
    const usersData = await userModel.find({
        select:{
            name:true,
            email:true,
            isAdm:true,
            isActive:true,
            createdAt:true,
            updatedAt:true,
            id:true
        }
     })
    if(!usersData){
        throw new AppError ('Not found or empty', 404)
    }
    return usersData
}

export default listUserService
