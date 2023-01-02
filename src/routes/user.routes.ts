import { Router } from "express";
import { createUserController, listUserController, updateUserController, softDeleteUserController } from "../controllers/user.controller";
import isAdmAuthMiddleware from "../middlewares/isAdm.auth.middleware";
import userSessionAuthMiddleware from "../middlewares/userSession.auth.middleware";
import updateUserMiddleware from "../middlewares/updateUser.middleware";
import validateReqDataMiddleware from "../middlewares/validateReqData.middleware";
import { createUserSerializer } from "../serializers/users.serializers";
import { userUpdateSerializer } from "../serializers/users.serializers";
import ValidateUserUpdadeDataMiddleware from "../middlewares/validateUserUpdateData.middleware";

const userRoutes = Router();

userRoutes.post('', validateReqDataMiddleware(createUserSerializer), createUserController)
userRoutes.get('',userSessionAuthMiddleware, isAdmAuthMiddleware, listUserController)
userRoutes.patch('/:id',userSessionAuthMiddleware, ValidateUserUpdadeDataMiddleware, validateReqDataMiddleware(userUpdateSerializer), updateUserMiddleware, isAdmAuthMiddleware, updateUserController)
userRoutes.delete('/:id',userSessionAuthMiddleware, isAdmAuthMiddleware, softDeleteUserController)


export default userRoutes;
