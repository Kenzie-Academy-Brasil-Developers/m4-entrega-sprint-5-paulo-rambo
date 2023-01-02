import { Request, Response } from "express";
import loginUserService from "../services/auth/loginUser.service";
import { IUserLogin } from "../interfaces/users";

const loginUserController = async (req: Request, resp: Response) => {
    const dataReq: IUserLogin = req.body;
    const dataResp = await loginUserService(dataReq);
    return resp.status(200).json(dataResp);
  };

export { loginUserController };