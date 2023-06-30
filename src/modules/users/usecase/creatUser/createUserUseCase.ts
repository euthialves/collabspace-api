import { v4 } from "uuid";

import { IRequestCreateUser } from "@modules/users/dto/users";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { telephoneFormat } from "@/utils/formatData";
import { encryptPassoword } from "@/utils/bcrypt";

class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    telephone,
    birthDate,
  }: IRequestCreateUser): Promise<any> {
    if (password !== confirmPassword) {
      return { message: "As senhas não coincidem!" };
    }

    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      return { message: "Senha fraca" };
    }

    if (email !== confirmEmail) {
      return { message: "Os e-mails não coincidem!" };
    }

    const listByEmail = await this.userRepository.listByEmail(email);
    if (listByEmail) {
      return { message: "Usuário já cadastrado" };
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

    return {
      createUser,
    };
  }
}

export { CreateUserUseCase };
