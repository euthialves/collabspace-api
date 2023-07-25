import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { EnumFriendActions } from "src/enums/friendActions";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class DeletFriendUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UuidProvider")
    private UuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.UuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID inválido",
      });
    }

    const listFrienfById = await this.friendRepository.listById(id);

    if (!listFrienfById) {
      throw new AppError({
        message: "Amizade não encontrada",
      });
    }

    if (
      usrId !== listFrienfById.user_id_1 &&
      usrId !== listFrienfById.user_id_2
    ) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não é permitda",
      });
    }
    if (
      listFrienfById.action_id_1 !== EnumFriendActions.requested ||
      listFrienfById.action_id_2 !== EnumFriendActions.accepted
    ) {
      throw new AppError({
        message: "Amizade  não aceita, cancelada ou recusada",
      });
    }

    await this.friendRepository.delete(id);
    return new AppResponse({
      message: "Amizade desfeita com sucesso",
    });
  }
}

export { DeletFriendUseCase };
