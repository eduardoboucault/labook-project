import { UserDatabase } from "../database/UserDatabase";
import {
  CreateInputUserDTO,
  CreateOutputUserDTO,
} from "../dtos/dto-user/createUser.dto";
import { TokenPayLoad, User, UserDB } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { USER_ROLES } from "../models/User";
import { TokenManager } from "../services/TokenManager";
import {
  GetInputUsersDTO,
  GetOutputUsersDTO,
} from "../dtos/dto-user/getUsers.dto";
import { BadRequestError } from "../errors/BadRequest";
import { AlreadyExist } from "../errors/AlreadyExist";
import { HashManager } from "../services/HashManager";
import { NotFoundError } from "../errors/NotFound";
import { UpdateOutputUsersDTO } from "../dtos/dto-user/updateUser.dto";
export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public login = async (input: any) => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("Email não cadastrado");
    }

    const hashedPassword = userDB.password;

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("Email ou senha incorretos");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role
    );

    const payload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    };

    const token = this.tokenManager.createToken(payload);

    const output = {
      message: "Login realizado com sucesso",
      token,
    };

    return output;
  };

  public signup = async (input: any) => {
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

    const hashedPassword = await this.hashManager.hash(password);

    const newUser: User = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.USER
    );

    const userDB: UserDB = newUser.toDBmodel();

    await this.userDatabase.insertNewUser(userDB);

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

    const hashedPassword = await this.hashManager.hash(password);

    const newUser: User = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.USER
    );

    const userDB: UserDB = newUser.toDBmodel();

    await this.userDatabase.insertNewUser(userDB);

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
      throw new BadRequestError("Token inválido");
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

  public editUsers = async (input: any, tokenID: any) => {
    const { token } = tokenID;

    const { name, email, password } = input;

    const userExistDB: TokenPayLoad | null =
      this.tokenManager.getPayLoad(token);

    if (!userExistDB) {
      throw new Error("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(userExistDB.id);

    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const newEditedUser = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role
    );

    const id = newEditedUser.getId();
    newEditedUser.setName(name || userDB.name);
    newEditedUser.setEmail(email || userDB.email);
    newEditedUser.setPassword(password || userDB.password);

    const editedUserDB = newEditedUser.toDBmodel();

    await this.userDatabase.editUser(editedUserDB, id);

    const output: UpdateOutputUsersDTO = {
      message: "Usuário editado com sucesso",
    };
    return output;
  };

  public deleteUsers = async (token: any) => {
    try {

      const userExistDB = this.tokenManager.getPayLoad(token);

      if (!userExistDB) {
        throw new BadRequestError("Token inválido");
      }

      const id = userExistDB.id;

      await this.userDatabase.deleteUser(id);
      
      const output = {
        message:"Usuário deletado com sucesso",
        
      }
      return output
    } catch (error) {}
  };
}
