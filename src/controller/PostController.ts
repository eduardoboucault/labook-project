import { PostBusiness } from "../business/PostBusiness";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreatePostSchema } from "../dtos/dto-post/createPost.dto";
import { UpdatePostSchema } from "../dtos/dto-post/updatePost.dto";
export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public createPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      const result = await this.postBusiness.createPosts(input);

      res.status(201).send(result);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = CreatePostSchema.parse({
        q: req.query.q,
        token: req.headers.authorization,
      });

      const result = await this.postBusiness.getPosts(input);
      const output = {
        message: "Resultado da busca",
        post: result,
      };
      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public updatePosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = UpdatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      const result = await this.postBusiness.editPosts(input);

      res.status(201).send(result)

    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deletePosts = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.postBusiness.deletePosts();
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
