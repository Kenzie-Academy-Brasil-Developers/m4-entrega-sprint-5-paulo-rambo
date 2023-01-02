import User from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import 'dotenv/config'
import AppError from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";

const updateUserService = async (user:IUserUpdate, userId:string) => {

    
    const userModel = AppDataSource.getRepository(User);
    const userData = await userModel.findOneBy(
        {
            id: userId
        }
    );
    if(!userData){
        throw new AppError ('User not found', 404)
    }
    
    const updateUser = userModel.create({
        ...userData, ...user
    })

    await userModel.save(updateUser)

    return {message: "Updated."}
}

export default updateUserService

/* const updatedUser = await AppDataSource
    .createQueryBuilder()
    .update(User)
    .set({ name: user.name, email: user.email, password: user.password })
    .where("id = :id", { id: userId })
    .execute() */