import { v4 } from "uuid";

import { inject, injectable } from "tsyringe";
import { IRequestCreateUser } from "@modules/users/dto/users";
import { telephoneFormat } from "@utils/formatData";
import { encryptPassoword } from "@utils/bcrypt";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errosHandler";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories
  ) {}

  async execute({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    telephone,
    birthDate,
  }: IRequestCreateUser): Promise<AppResponse> {
    if (password !== confirmPassword) {
      throw new AppError({
        message: "As senhas não coincidem!",
      });
    }

    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      throw new AppError({
        message: "Senha fraca",
      });
    }

    if (email !== confirmEmail) {
      throw new AppError({
        message: "Os e-mails não coincidem!",
      });
    }

    const listByEmail = await this.userRepository.listByEmail(email);
    if (listByEmail) {
      throw new AppError({
        message: "Usuário já cadastrado",
      });
    }

    const passwordHash = await encryptPassoword(password);

    const createUser = await this.userRepository.create({
      id: v4(),
      name,
      email,
      telephone: telephoneFormat(telephone),
      birthDate,
      password: passwordHash.hash,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Usuário criado com sucesso",
      data: {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        telephone: createUser.telephone,
        birthDate: createUser.birth_date,
      },
    });
  }
}

export { CreateUserUseCase };
