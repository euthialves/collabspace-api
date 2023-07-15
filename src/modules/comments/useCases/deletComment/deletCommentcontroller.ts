import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCommnetUseCase } from "./deletCommentUseCase";

class DeletCommentController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id, postId } = request.params as { id: string; postId: string };

    const deleteCommentUseCase = container.resolve(DeleteCommnetUseCase);

    const result = await deleteCommentUseCase.execute({
      usrId,
      postId,
      id,
    });
    return response.status(result.statusCode).json(result);
  }
}

export { DeletCommentController };
