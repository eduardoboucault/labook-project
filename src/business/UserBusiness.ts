import { UserDatabase } from "../database/UserDatabase";
import { CreateInputUserDTO } from "../dtos/dto-user/createUser.dto";
import { User } from "../models/User";
import { UserDB } from "../types/interface";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase) {}

  public createUsers = async (input: CreateInputUserDTO) => {
    const { id, name, email, password, role, created_at } = input;

    const userExistDB: UserDB | undefined = await this.userDatabase.findUserById(id);

    if (userExistDB) {
      throw new Error("Usuário já existe");
    }

    const newUser = new User(id, name, email, password, role, created_at);

    const newUserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
    };

    const output = await this.userDatabase.insertNewUser(newUserDB);
    return output;
  };

  public getUsers = () => {};
  public editUsers = () => {};
  public deleteUsers = () => {};
}
