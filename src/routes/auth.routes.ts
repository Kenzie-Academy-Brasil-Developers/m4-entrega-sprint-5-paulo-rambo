import { Router } from "express";
import { loginUserController } from "../controllers/auth.controller"

const authRoutes = Router();

authRoutes.post('', loginUserController);

export default authRoutes;
