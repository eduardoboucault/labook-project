import { LikeDisBusiness } from "../business/LikeDisBusiness";
import { Request, Response } from "express";

export class LikeDisController {
  constructor(private likeDisBusiness: LikeDisBusiness) {}
  public createLikes = async (req: Request, res: Response) => {
    await this.likeDisBusiness.createLikes();
  };
  public getLikes = async (req: Request, res: Response) => {
    await this.likeDisBusiness.getLikes();
  };
  public updateLikes = async (req: Request, res: Response) => {
    await this.likeDisBusiness.editLikes();
  };
  public deleteLikes = async (req: Request, res: Response) => {
    await this.likeDisBusiness.deleteLikes();
  };
}
