import { ICreateFriend, IFriend, IUpdateActionStatus } from "../dtos/friends";

interface IFriendRepositories {
  create(data: ICreateFriend): Promise<IFriend>;
  listAlreadyExist(userId1: string, userId2: string): Promise<IFriend | null>;
  updateActionStatus(data: IUpdateActionStatus): Promise<void>;
}

export { IFriendRepositories };
