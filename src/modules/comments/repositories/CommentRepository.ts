import { prisma } from "@libs/prismaClient";
import { ICommentRepositories } from "../IRepositories/ICommentesRepositories";
import { ICreatComment, IComment } from "../dtos/comments";

class CommentRepository implements ICommentRepositories {
  create({ id, postId, userId, content }: ICreatComment): Promise<IComment> {
    return prisma.comments.create({
      data: {
        id,
        post_id: postId,
        user_id: userId,
        content,
      },
    });
  }
}

export { CommentRepository };
