import { Router } from "express";
import isAdmAuthMiddleware from "../middlewares/isAdm.auth.middleware";
import userSessionAuthMiddleware from "../middlewares/userSession.auth.middleware";
import { createPropertyController, listPropertyController } from "../controllers/property.controller";
import validateReqDataMiddleware from "../middlewares/validateReqData.middleware";
import { createPropertyResponseSerializer } from "../serializers/property.serializers";

const propertiesRoutes = Router();

propertiesRoutes.post('', userSessionAuthMiddleware, isAdmAuthMiddleware, validateReqDataMiddleware(createPropertyResponseSerializer), createPropertyController)
propertiesRoutes.get('', listPropertyController)

export default propertiesRoutes;