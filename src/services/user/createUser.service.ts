import { IUserRequest, IUser } from "../../interfaces/users";
import User from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { createUserResponseSerializer } from "../../serializers/users.serializers";
import  AppError  from "../../errors/appError";

const createUserService = async ( userDataReq: IUserRequest): Promise<IUser> => {

  const userModel = AppDataSource.getRepository(User);
  const checkIfEmailExists = await userModel.findOneBy({
      email: userDataReq.email,
    });
  if(checkIfEmailExists) {
    throw new AppError("Email already exists", 409);
  }
  const userInstance = userModel.create(userDataReq);
  await userModel.save(userInstance);

  try {
    const createUserDataResp = await createUserResponseSerializer.validate(userInstance, {
      abortEarly: true,
      stripUnknown: true
  })
    return createUserDataResp
    
} catch (err: any) {
    throw new AppError(err.errors)
}
};

export default createUserService;
