import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

  public static TABLE_POSTS = "posts";

  public insertPost = async (postDB: any, userID: any) => {
    await BaseDatabase.conection(PostDatabase.TABLE_POSTS)
      .where({ userID })
      .insert(postDB);
  };

  public getPosts = async (q: any) => {
    let postsDB;
    if (q) {
      const result = await BaseDatabase.conection(
        PostDatabase.TABLE_POSTS
      ).where("content", "LIKE", q);
      postsDB = result;
      return result;
    } else {
      const result = await BaseDatabase.conection(PostDatabase.TABLE_POSTS);
      postsDB = result;
      return result;
    }
  };
   public editPost (content:any, idUser:any) {}
}
