import { Router } from "express";
import { CreateUserController } from "@modules/users/usecase/creatUser/createUserUseContoller";
const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

export { userRoutes };
