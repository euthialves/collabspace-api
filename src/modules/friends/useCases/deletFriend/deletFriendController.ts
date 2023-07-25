import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletFriendUseCase } from "./deletFriendUseCase";

class DeletFriendController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };
    const deletFriendUseCase = container.resolve(DeletFriendUseCase);

    const result = await deletFriendUseCase.execute({
      usrId,
      id,
    });
    return response.status(result.statusCode).json(result);
  }
}

export { DeletFriendController };
