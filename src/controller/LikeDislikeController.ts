import { Request, Response } from "express";
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness";


export class LikeDislikeController {
    constructor(
        private likeDislikeBusiness: LikeDislikeBusiness
    ){}
    
    public getLikeDislike = async (req: Request, res: Response) => {
        const input = {q: req.query.q}

        const output = await this.likeDislikeBusiness.getLikeDislike(input)

        res.status(200).send(output)
    }

    public createLikeDislike = async (req: Request, res: Response) => {

    }

    public updateLikeDislike = async (req:Request, res: Response) => {
        
    }

    public deleteLikeDislike = async (req:Request, res: Response) => {
        
    }

}