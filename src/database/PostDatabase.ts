import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = 'posts'
    public insertPost = async (postDB : any, userID: any) => {
        await BaseDatabase.conection(PostDatabase.TABLE_POSTS).where({userID}).insert(postDB)
    }
}