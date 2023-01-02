import { Request, Response } from "express";
import createCategoryService from "../services/category/createCategory.service";
import listCategoryService from "../services/category/listCategory.service";
import listPropertyByCategoryService from "../services/category/listPropertyByCategory.service";

const createCategoryController = async (req:Request, resp:Response) => {
    const reqData = req.body
    reqData.userId = req.user.userId
    const respData = await createCategoryService(reqData)
    return resp.status(201).json(respData)
}

const listCategoryController = async (req:Request, resp:Response) => {
    const respData = await listCategoryService()
    return resp.status(200).json(respData)
}

const listPropertyByCategoryController = async (req:Request, resp:Response) => {
    const respData = await listPropertyByCategoryService(req.params.id)
    return resp.status(200).json(respData)
}

export { createCategoryController, listCategoryController, listPropertyByCategoryController }