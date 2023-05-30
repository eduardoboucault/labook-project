import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}

    public getPost = async (req: Request, res: Response) => {
        const input = {q: req.query.q as string}

        const output = await this.postBusiness.getPost(input)
    
        res.status(200).send(output)
    }

    public createPost = async (req: Request, res: Response) => {

    }

    public updatePost = async (req:Request, res: Response) => {
        
    }

    public deletePost = async (req:Request, res: Response) => {
        
    }

}