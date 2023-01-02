import { Request, Response } from "express";
import createPropertyService from "../services/property/createProperty.service"
import listPropertyService from "../services/property/listProperty.service";
import { IPropertyRequest } from "../interfaces/properties";

const createPropertyController = async (req:Request, resp:Response) => {
    const reqData : IPropertyRequest = req.body
    const respData = await createPropertyService(reqData)
    return resp.status(201).json(respData)
}

const listPropertyController = async (req:Request, resp:Response) => {
    const respData = await listPropertyService()
    return resp.status(200).json(respData)
}
export { createPropertyController, listPropertyController }