import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { ICommentsRepositories } from "@modules/comments/IRepositories/ICommentsRepositories";
import { IRequestUpdateComment } from "@modules/comments/dtos/comments";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateComment {
  id: string;
  usrId: string;
}
@injectable()
class UpadteCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ id, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é invalido!",
      });
    }
    const listCommentById = await this.commentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        message: "Comentário não encontrado!",
      });
    }

    if (usrId !== listCommentById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não é permitido!",
      });
    }

    await this.commentRepository.update({
      id,
      content,
    });

    return new AppResponse({
      message: "comentário editado com sucesso!",
    });
  }
}

export { UpadteCommentUseCase };
