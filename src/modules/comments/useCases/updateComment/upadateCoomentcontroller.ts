import { IRequestCreatComment } from "@modules/comments/dtos/comments";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpadteCommentUseCase } from "./updateCommentUseCase";

class UpdateCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };
    const { content } = request.body as IRequestCreatComment;

    const updateCommentUseCase = container.resolve(UpadteCommentUseCase);

    const result = await updateCommentUseCase.execute({
      usrId,
      id,
      content,
    });
    return response.status(result.statusCode).json(result);
  }
}

export { UpdateCommentController };
