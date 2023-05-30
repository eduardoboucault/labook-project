import { UserDB } from "../models/User"
import {BaseDatabase} from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    public async findUser(q: string | undefined): Promise<UserDB[]> {
        if (q) {
            return await BaseDatabase.connection(UserDatabase.TABLE_USERS).where("name", "LIKE", `%${q}%`)
        } else {
            return await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        }
    }

    public async findUserById(id: string): Promise<UserDB> {
        const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where(id)

        return userDB
    }

    public async findUserByEmail(email: string): Promise<UserDB> {
        const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where(email)

        return userDB
    }
    
}