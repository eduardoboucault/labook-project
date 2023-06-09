import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../models/User";
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

  public findUserByEmail = async (email: string) => {
    if (email) {
      const result: UserDB = await BaseDatabase.conection(
        UserDatabase.TABLE_USERS
      )
        .where("email", email)
        .first();
      return result;
    }
    return null;
  };

  public insertNewUser = async (newUserDB: UserDB): Promise<number[]> => {
    const result = await BaseDatabase.conection(
      UserDatabase.TABLE_USERS
    ).insert(newUserDB);
    return result;
  };

  public editUser = async (editedUserDB: any, id: any) => {
    console.log(editedUserDB);
    const result = await BaseDatabase.conection(UserDatabase.TABLE_USERS)
      .update(editedUserDB)
      .where({ id });
    console.log(editedUserDB);
    return result;
  };

  public deleteUser = async (id: any) => {
    await BaseDatabase.conection(UserDatabase.TABLE_USERS).where({ id }).del();
  };
}
