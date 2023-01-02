import { Request, Response } from "express";
import createScheduleService from "../services/shedule/createShedule.service";
import listSheduleService from "../services/shedule/listSchedule.service";
import { IScheduleRequest } from "../interfaces/schedules";

const createSheduleController = async (req:Request, resp:Response) => {
    const userId = req.user.userId
    const reqData: IScheduleRequest = {...req.body, userId}
    const respData = await createScheduleService(reqData)
    return resp.status(201).json(respData)
}

const listSheduleController = async (req:Request, resp:Response) => {
    const propertieId = req.params.id
    const respData = await listSheduleService(propertieId)
    return resp.status(200).json(respData)
}
export { createSheduleController, listSheduleController }