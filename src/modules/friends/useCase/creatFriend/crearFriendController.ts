import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatFriendUseCase } from "./creatFriendUseCase";

class CreateFriendController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { targetId } = request.params as { targetId: string };

    const creatFriendUseCase = container.resolve(CreatFriendUseCase);
    const result = await creatFriendUseCase.execute({
      usrId,
      targetId,
    });
    return response.status(result.statusCode).json(result);
  }
}

export { CreateFriendController };
