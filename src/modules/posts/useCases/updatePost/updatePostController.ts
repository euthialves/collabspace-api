import { IRequestCreatePost } from "@modules/posts/dtos/posts";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePostUseCase } from "./updatePostUseCase";

class UpdatePostController {
  async handle(request: Request, reponse: Response) {
    const { usrId } = request;

    const { id } = request.params as { id: string };
    const { content, tags, visibility } = request.body as IRequestCreatePost;

    const upadatePostUseCase = container.resolve(UpdatePostUseCase);
    const result = await upadatePostUseCase.execute({
      usrId,
      id,
      content,
      tags,
      visibility,
    });
    return reponse.status(result.statusCode).json(result);
  }
}

export { UpdatePostController };
