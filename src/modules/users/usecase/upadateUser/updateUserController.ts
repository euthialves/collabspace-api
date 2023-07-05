import { IResquestUpadeUser } from "@modules/users/dto/users";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUsecase } from "./updateUserUseCase";

class UpdateUserController {
  async handle(resquest: Request, response: Response) {
    const { id } = resquest.params as { id: string };
    const { name, telephone, birthDate } = resquest.body as IResquestUpadeUser;

    const updateUseCase = container.resolve(UpdateUserUsecase);
    const result = await updateUseCase.execute({
      id,
      name,
      telephone,
      birthDate,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateUserController };
