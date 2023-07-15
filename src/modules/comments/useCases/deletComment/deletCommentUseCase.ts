import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { ICommentsRepositories } from "@modules/comments/IRepositories/ICommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";

import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  postId: string;
  id: string;
}

@injectable()
class DeleteCommnetUseCase {
  constructor(
    @inject("CommentRepository")
    private CommentRepository: ICommentsRepositories,
    @inject("PostRository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, postId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "CommetID é inválido!",
      });
    }

    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "PostID é inválido!",
      });
    }

    const listCommentById = await this.CommentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        statusCode: 401,
        message: "comentário não enocntrado!",
      });
    }

    const listPostById = await this.CommentRepository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "Post não encontrado!",
      });
    }
    if (usrId !== listCommentById.user_id && usrId !== listPostById.user_id) {
      throw new AppError({
        message: "Operação não é permitida!",
      });
    }

    await this.CommentRepository.delete(id);

    return new AppResponse({
      message: "Comentário deletado com sucesso!",
    });
  }
}

export { DeleteCommnetUseCase };
