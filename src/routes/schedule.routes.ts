import { Router } from "express";
import isAdmAuthMiddleware from "../middlewares/isAdm.auth.middleware";
import userSessionAuthMiddleware from "../middlewares/userSession.auth.middleware";
import { createSheduleController } from "../controllers/schedule.controller";
import { listSheduleController } from "../controllers/schedule.controller";
//import validateSheduleDataMiddleware from "../middlewares/validateScheduleData.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post('', userSessionAuthMiddleware, createSheduleController)
schedulesRoutes.get('/properties/:id', userSessionAuthMiddleware, isAdmAuthMiddleware,  listSheduleController)


export default schedulesRoutes;