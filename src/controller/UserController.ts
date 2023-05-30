import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
import {
  CreateOutputUserDTO,
  CreateUserSchema,
} from "../dtos/dto-user/createUser.dto";
import { BaseError } from "../errors/BaseError";
import { UserDB } from "../types/interface";
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public createUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const output: CreateOutputUserDTO = await this.userBusiness.createUsers(
        input
      );
      res.status(201).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.query.q as string;

      const result:UserDB[] = await this.userBusiness.getUsers(input);
      const output = {
        message: "Resultado da busca",
        users: result,
      };
      res.status(201).send(output);
    } catch (error) {}
  };

  public updateUsers = async (req: Request, res: Response): Promise<void> => {
    const input = {
      id: req.query.id,
      name: req.body.name,
      email: req.body.email,
      passaword: req.body.passaword,
      role: req.body.role,
    };
    const result = await this.userBusiness.editUsers(input);
    const output = {
      message: "Alteração realizada",
      editedUser: result,
    };
    res.status(204).send(output);
  };

  public deleteUsers = async (req: Request, res: Response): Promise<void> => {
    await this.userBusiness.deleteUsers();
  };
}
