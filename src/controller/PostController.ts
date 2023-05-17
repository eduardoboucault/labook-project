import { PostBusiness } from "../business/PostBusiness";
import { Request, Response } from "express";
export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public createPosts = async (req: Request, res: Response): Promise<void> => {
    await this.postBusiness.createPosts();
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
