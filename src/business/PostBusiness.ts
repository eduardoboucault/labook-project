import { PostDatabase } from "../database/PostDatabase";
import { NotFoundError } from "../errors/NotFound";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createPosts = async (input: any) => {
    const { content, token } = input;
    const likes = 0;
    const dislikes = 0;
    const postId = this.idGenerator.generate();
    const userDBexist = this.tokenManager.getPayLoad(token);
    if (!userDBexist) {
      throw new NotFoundError("Usuário não cadastrado");
    }

    const userID = userDBexist.id

    const newPost = new Post(postId, userID, content, likes, dislikes);
    
    const postDB = newPost.toDBmodel();

    await this.postDatabase.insertPost(postDB,userID);

    const output = { message: "post xuxado com sucesso", content: content };
    return output;
  };
  public getPosts = async (input:any) => {
    const {q, token} = input

    const id = this.tokenManager.getPayLoad(token)

    if(!id){
      throw new NotFoundError('Token inválido')
    }

    const result = await this.postDatabase.getPosts(q)

    const output = {
      result: result
    }

    return output
  };
  public editPosts = async (input: any) => {
    const {
      content, token
    } = input;

    const validToken = this.tokenManager.getPayLoad(token)

    if(!validToken){
      throw new NotFoundError('Token inválido')
    }

    const idUser = validToken.id

    await this.postDatabase.editPost(content, idUser)
  };
  public deletePosts = async () => {};
}
