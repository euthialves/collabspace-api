import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { ICommentRepositories } from "@modules/comments/IRepositories/ICommentesRepositories";
import { IRequestCreatComment } from "@modules/comments/dtos/comments";
import { PostRepository } from "@modules/posts/repositories/PostRepository";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestCreatComment {
  postId: string;
  usrId: string;
}

@injectable()
class CreatCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentRepositories,
    @inject("PostRepository")
    private postREpository: PostRepository,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ postId, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }
    const listPostById = await this.postREpository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "post não encontrado!",
      });
    }

    const creatComment = await this.commentRepository.create({
      id: this.uuidProvider.createUUID(),
      postId,
      userId: usrId,
      content,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Comentário criado com sucesso!",
      data: {
        id: creatComment.id,
        postId: creatComment.post_id,
        usrId: creatComment.user_id,
        content: creatComment.content,
      },
    });
  }
}

export { CreatCommentUseCase };
