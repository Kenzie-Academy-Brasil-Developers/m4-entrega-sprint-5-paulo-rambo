import { Router } from "express";
import isAdmAuthMiddleware from "../middlewares/isAdm.auth.middleware";
import userSessionAuthMiddleware from "../middlewares/userSession.auth.middleware";
import { createCategoryController, listPropertyByCategoryController, listCategoryController } from "../controllers/category.controller";
import validateReqDataMiddleware from "../middlewares/validateReqData.middleware";
import { categoryRequestSerializer } from "../serializers/category.serializers";

const categoriesRoutes = Router();

categoriesRoutes.post('', userSessionAuthMiddleware, isAdmAuthMiddleware, validateReqDataMiddleware(categoryRequestSerializer), createCategoryController)
categoriesRoutes.get('/:id/properties', listPropertyByCategoryController)
categoriesRoutes.get('', listCategoryController)


export default categoriesRoutes;