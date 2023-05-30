import { UserDatabase } from "../database/UserDatabase";
import { CreateInputUserDTO } from "../dtos/dto-user/createUser.dto";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { UserDB, UserDBPost } from "../types/interface";
import { NotFoundError } from "../errors/NotFound";
export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator
  ) {}

  public createUsers = async (input: CreateInputUserDTO) => {
    const { name, email, password, role } = input;

    const newUser: User = new User(
      this.idGenerator.generate(),
      name,
      email,
      password,
      role
    );

    const newUserDB: UserDBPost = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
    };

    await this.userDatabase.insertNewUser(newUserDB);

    const output = {
      message: "Usuário cadastrado com sucesso",
      user: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
      },
    };

    return output;
  };

  public getUsers = async (input: string) => {
    const userExistDB: UserDB[] = await this.userDatabase.findUserByName(input);

    return userExistDB;
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
