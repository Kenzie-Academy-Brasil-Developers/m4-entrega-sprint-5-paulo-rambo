import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/user/createUser.service";
import listUserService from "../services/user/listUser.service";
import updateUserService from "../services/user/updateUser.service";
import softDeleteUserService from "../services/user/softDeleteUser.service";

const createUserController = async (req: Request, resp: Response) => {
  const dataReq: IUserRequest = req.body;
  const dataResp = await createUserService(dataReq);
  return resp.status(201).json(dataResp);
};

const listUserController = async (req:Request, resp:Response) =>{
  const dataResp = await listUserService()
  return resp.status(200).json(dataResp);
}

const updateUserController = async (req:Request, resp:Response) =>{
const userId:string = req.params.id
const userData:IUserUpdate = req.body
const dataResp = await updateUserService(userData, userId)
return resp.status(200).json(dataResp)
}

const softDeleteUserController = async (req:Request, resp:Response) =>{
const userId:string = req.params.id
const dataResp = await softDeleteUserService(userId)
return resp.status(204).json(dataResp)
}

export { createUserController, listUserController, updateUserController, softDeleteUserController };
