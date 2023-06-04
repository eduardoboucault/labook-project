import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
import {
  CreateOutputUserDTO,
  CreateUserSchema,
} from "../dtos/dto-user/createUser.dto";
import { BaseError } from "../errors/BaseError";
import { GetUsersSchema } from "../dtos/dto-user/getUsers.dto";
import { ZodError } from "zod";
import {
  UpdateUserSchema,
} from "../dtos/dto-user/updateUser.dto";
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public createUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output: CreateOutputUserDTO = await this.userBusiness.createUsers(
        input
      );
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

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = GetUsersSchema.parse({
        q: req.query.q,
        token: req.headers.authorization,
      });

      const result = await this.userBusiness.getUsers(input);
      const output = {
        message: "Resultado da busca",
        users: result,
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

  public updateUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = { token: req.headers.authorization };

      const input = UpdateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const result = await this.userBusiness.editUsers(input, token);

      const output = result;

      res.status(204).send(output);
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

  public deleteUsers = async (req: Request, res: Response): Promise<void> => {
    try {

      const token = req.headers.authorization
      
      const output = await this.userBusiness.deleteUsers(token);

      res.status(200).send(output)
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
