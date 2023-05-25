import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
import { CreateUserSchema } from "../dtos/dto-user/createUser.dto";
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public createUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = CreateUserSchema.parse({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        created_at: req.body.role,
      });

      const output = await this.userBusiness.createUsers(input);
      res.status(201).send(output);
    } catch (error) {}
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    await this.userBusiness.getUsers();
  };

  public updateUsers = async (req: Request, res: Response): Promise<void> => {
    await this.userBusiness.editUsers();
  };

  public deleteUsers = async (req: Request, res: Response): Promise<void> => {
    await this.userBusiness.deleteUsers();
  };
}
