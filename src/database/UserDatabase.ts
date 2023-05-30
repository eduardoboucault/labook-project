import { BaseDatabase } from "./BaseDatabase";
import { UserDB, UserDBPost } from "../types/interface";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public findUserById = async (id: string): Promise<UserDB | undefined> => {
    const [result]: UserDB[] | undefined[] = await BaseDatabase.conection(
      UserDatabase.TABLE_USERS
    ).where({
      id,
    });
    return result;
  };

  public insertNewUser = async (newUserDB: UserDBPost): Promise<number[]> => {
    const result = await BaseDatabase.conection(
      UserDatabase.TABLE_USERS
    ).insert(newUserDB);
    return result;
  };

  public findUserByName = async (input: string): Promise<UserDB[]> => {
    let usersDB;
    if (input) {
      const result: UserDB[] = await BaseDatabase.conection(
        UserDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${input}%`);
      usersDB = result;
    } else {
      const result: UserDB[] = await BaseDatabase.conection(
        UserDatabase.TABLE_USERS
      );
      usersDB = result;
    }
    return usersDB;
  };

  public editUser = async (editedUserDB: any) => {
    console.log(editedUserDB);
    const result = await BaseDatabase.conection(
      UserDatabase.TABLE_USERS
    ).update(editedUserDB);
    console.log(editedUserDB);
    return result;
  };
}
