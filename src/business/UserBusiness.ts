import { UserDatabase } from "../database/UserDatabase";
import {
  CreateInputUserDTO,
  CreateOutputUserDTO,
} from "../dtos/dto-user/createUser.dto";
import { TokenPayLoad, User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { UserDB } from "../types/interface";
import { USER_ROLES } from "../models/User";
import { TokenManager } from "../services/TokenManager";
import {
  GetInputUsersDTO,
  GetOutputUsersDTO,
} from "../dtos/dto-user/getUsers.dto";
import { BadRequestError } from "../errors/BadRequest";
import { AlreadyExist } from "../errors/AlreadyExist";
export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createUsers = async (input: CreateInputUserDTO) => {
    const { name, email, password } = input;

    const id = this.idGenerator.generate();

    const idExist = await this.userDatabase.findUserById(id);

    if (idExist) {
      throw new AlreadyExist("Usuário já existente");
    }

    const emailDBexist: UserDB | null = await this.userDatabase.findUserByEmail(
      email
    );

    if (emailDBexist) {
      throw new AlreadyExist("Email já existente");
    }

    const newUser: User = new User(id, name, email, password, USER_ROLES.USER);

    await this.userDatabase.insertNewUser(newUser);

    const tokenPayLoad: TokenPayLoad = {
      id: newUser.getId(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayLoad);

    const output: CreateOutputUserDTO = {
      message: "Cadastro realizado com sucesso",
      token: token,
    };

    return output;
  };

  public getUsers = async (
    input: GetInputUsersDTO
  ): Promise<GetOutputUsersDTO> => {
    const { q, token } = input;

    const payload = this.tokenManager.getPayLoad(token);

    if (payload === null) {
      throw new BadRequestError("Requisição inválida");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("Somente admin pode fazer esta requisição");
    }

    const usersDB: UserDB[] = await this.userDatabase.findUserByName(q);

    const users = usersDB.map(
      (userDB) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role
        )
    );

    const output = users;
    return output;
  };

  public editUsers = async (input: any) => {
    const { id, name, email, password, role } = input;

    const userExistDB = await this.userDatabase.findUserById(id);

    if (!userExistDB) {
      throw new Error("USUÁRIO INEXISTENTE!");
    }

    const newEditedUser = new User(userExistDB.id, name, email, password, role);

    const editedUserDB = {
      id: newEditedUser.getId(),
      name: newEditedUser.setName(name),
      email: newEditedUser.setEmail(email),
      password: newEditedUser.setPassword(password),
      role: newEditedUser.setRole(role),
    };
    console.log(editedUserDB);
    const cu = editedUserDB.id;
    await this.userDatabase.editUser(editedUserDB);

    const output = {
      message: "cu",
      editedUser: newEditedUser,
    };
    return output;
  };

  public deleteUsers = () => {};
}
