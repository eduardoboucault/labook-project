import { PostDatabase } from "../database/PostDatabase";

export class PostBusiness {
  constructor(private postDatabase: PostDatabase) {}

  public createPosts = async () => {};
  public getPosts = async () => {};
  public editPosts = async () => {};
  public deletePosts = async () => {};
}
