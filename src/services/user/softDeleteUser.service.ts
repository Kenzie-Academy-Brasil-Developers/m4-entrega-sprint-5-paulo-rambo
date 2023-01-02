import AppDataSource from "../../data-source"
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";

const softDeleteUserService = async (userId:string) =>{

    const userModel = AppDataSource.getRepository(User);
    const userData = await userModel.findOneBy(
        {
            id: userId
        }
    );
    
    if (!userData){
        throw new AppError ('Not found', 404)
    }

    if(!userData.isActive){
        throw new AppError ('User is already inactive', 400)
    }
    userData.isActive = false
    await userModel.save(userData)

   
    return {message: "User deleted."}
}

export default softDeleteUserService;