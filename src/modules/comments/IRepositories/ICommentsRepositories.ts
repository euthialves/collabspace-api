import { IComment, ICreatComment, IUpdateComment } from "../dtos/comments";

interface ICommentsRepositories {
  create(comment: ICreatComment): Promise<IComment>;
  listById(id: string): Promise<IComment | null>;
  update(data: IUpdateComment): Promise<void>;
  delete(id: string): Promise<void>;
}

export { ICommentsRepositories };
