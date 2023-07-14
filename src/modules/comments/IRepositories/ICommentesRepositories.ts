import { IComment, ICreatComment } from "../dtos/comments";

interface ICommentRepositories {
  create(comment: ICreatComment): Promise<IComment>;
}

export { ICommentRepositories };
