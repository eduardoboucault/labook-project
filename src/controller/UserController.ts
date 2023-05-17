import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public createUsers = async (req: Request, res: Response): Promise<void> => {
    await this.userBusiness.createUsers();
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
