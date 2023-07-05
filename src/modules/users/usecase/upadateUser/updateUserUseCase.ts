import { inject, injectable } from "tsyringe";

import { AppResponse } from "@helpers/responseParser";
import { IResquestUpadeUser } from "@modules/users/dto/users";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { AppError } from "@helpers/errosHandler";
import { telephoneFormat } from "@utils/formatData";

interface IRequest extends IResquestUpadeUser {
  id: string;
}
@injectable()
class UpdateUserUsecase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    id,
    name,
    telephone,
    birthDate,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido",
      });
    }
    const listById = await this.userRepository.listById(id);

    if (!listById) {
      throw new AppError({
        message: "Usuário não encontrado",
      });
    }
    await this.userRepository.update({
      id,
      name,
      telephone: telephoneFormat(telephone),
      birthDate,
    });

    return new AppResponse({
      message: "Usuário atulizado com sucesso!",
    });
  }
}

export { UpdateUserUsecase };
