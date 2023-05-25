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

  public insertNewUser = async (newUserDB: UserDBPost): Promise<void> => {
    await BaseDatabase.conection(UserDatabase.TABLE_USERS).insert(newUserDB);
  };
}
