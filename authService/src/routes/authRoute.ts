import {Router} from "express";
import { createUserController,loginUserController } from "../controllers/authContoller";  


const authRouter = Router();

authRouter.post("/create-user",createUserController);
authRouter.post("/login-user",loginUserController);

export default authRouter;