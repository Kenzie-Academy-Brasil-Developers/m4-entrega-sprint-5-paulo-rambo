import { Router } from "express";
import isAdmAuthMiddleware from "../middlewares/isAdm.auth.middleware";
import userSessionAuthMiddleware from "../middlewares/userSession.auth.middleware";
import { listCategoryController } from "../controllers/category.controller";
import { createPropertyController } from "../controllers/property.controller";
import validateReqDataMiddleware from "../middlewares/validateReqData.middleware";
import { createPropertyResponseSerializer } from "../serializers/property.serializers";

const propertiesRoutes = Router();

propertiesRoutes.post('', userSessionAuthMiddleware, isAdmAuthMiddleware, validateReqDataMiddleware(createPropertyResponseSerializer), createPropertyController)
propertiesRoutes.get('', listCategoryController)

export default propertiesRoutes;