import { inject, injectable } from "tsyringe";
import { IFriendRepositories } from "@modules/friends/iRepositories/IFriendRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { EnumFriendActions } from "src/enums/friendActions";

interface IRequest {
  usrId: string;
  targetId: string;
}
@injectable()
class CreatFriendUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendRepositories,
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, targetId }: IRequest) {
    if (!this.uuidProvider.validateUUID(targetId)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    if (usrId === targetId) {
      throw new AppError({
        message: "Não é possível enviar uma solicitação par você mesmo!",
      });
    }

    const listById = await this.userRepository.listById(targetId);

    if (!listById) {
      throw new AppError({
        message: "Usuário não encontrado",
      });
    }

    const listFriendshipAlreadyExist =
      await this.friendRepository.listAlreadyExist(usrId, targetId);

    if (listFriendshipAlreadyExist) {
      if (
        listFriendshipAlreadyExist.action_id_1 ===
          EnumFriendActions.requested &&
        !listFriendshipAlreadyExist.action_id_2
      ) {
        throw new AppError({
          message: "Solicitação já enviada!",
        });
      }

      if (
        listFriendshipAlreadyExist.action_id_1 === EnumFriendActions.canceled ||
        listFriendshipAlreadyExist.action_id_2 === EnumFriendActions.refused
      ) {
        await this.friendRepository.updateActionStatus({
          id: listFriendshipAlreadyExist.id,
          actionId1: EnumFriendActions.requested,
          actionId2: null,
        });
        return new AppResponse({
          message: "A solicitação já foi aceita!",
        });
      }

      if (
        listFriendshipAlreadyExist.action_id_2 === EnumFriendActions.accepted
      ) {
        throw new AppError({
          message: "Solicitação já foi aceita!",
        });
      }
    }

    const createFriend = await this.friendRepository.create({
      id: this.uuidProvider.createUUID(),
      userId1: usrId,
      userId2: targetId,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Solicitação enviada com sucesso!",
      data: {
        id: createFriend.id,
        userId1: createFriend.user_id_1,
        userId2: createFriend.user_id_2,
        actionId1: createFriend.action_id_1,
        actionId2: createFriend.action_id_2,
        createdAt: createFriend.created_at,
      },
    });
  }
}
export { CreatFriendUseCase };
