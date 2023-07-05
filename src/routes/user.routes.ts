import { Router } from "express";
import { CreateUserController } from "@modules/users/usecase/creatUser/createUserUseContoller";
import { UpdateUserController } from "@modules/users/usecase/upadateUser/updateUserController";
const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
userRoutes.put("/:id", new UpdateUserController().handle);

export { userRoutes };
