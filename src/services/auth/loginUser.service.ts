import { IUserLogin } from "../../interfaces/users";
import User from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import  AppError  from "../../errors/appError";
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'

const loginUserService = async ( userDataReq: IUserLogin): Promise<object> => {
  const userModel = AppDataSource.getRepository(User);
  const findUser = await userModel.findOneBy({
      email: userDataReq.email,
    },);
  if (!findUser) {
    throw new AppError('Wrong email or password', 403);
  }

  const authPass = await compare(userDataReq.password, findUser.password)
  if(!findUser.isActive){
    throw new AppError('Cant acess user', 400);
  }

  if(!authPass){
    throw new AppError('Wrong email or password', 403);
}

const token = jwt.sign(
    {
        userId: findUser.id,
        isAdm: findUser.isAdm
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h'

    }
)
return {token: token}
};

export default loginUserService;