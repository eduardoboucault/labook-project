import { PostBusiness } from "../business/PostBusiness";
import { Request, Response } from "express";
export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public createPosts = async (req: Request, res: Response): Promise<void> => {
    const input = {
      content: req.body.content,
      token: req.headers.authorization
    }

    const result = await this.postBusiness.createPosts(input)
    res.status(201).send(result);
  };

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    await this.postBusiness.getPosts();
  };

  public updatePosts = async (req: Request, res: Response): Promise<void> => {
    await this.postBusiness.editPosts();
  };

  public deletePosts = async (req: Request, res: Response): Promise<void> => {
    await this.postBusiness.deletePosts();
  };
}
