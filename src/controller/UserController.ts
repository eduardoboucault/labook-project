import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { createUserSchema } from "../dtos/dto-user/createUser.dto";


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public getUser = async (req: Request, res: Response) => {
        try {
            const input = { q: req.query.q as string }

            const output = await this.userBusiness.getUser(input)

            res.status(200).send(output)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const randomId = () => { return Math.floor(Math.random() * Date.now()).toString(36) }

            const input = createUserSchema.parse({
                id: randomId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })

            await this.userBusiness.createUser(input)

            res.status(200).send("Cadastro realizado com sucesso")
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public updateUser = async (req: Request, res: Response) => {

    }

    public deleteUser = async (req: Request, res: Response) => {

    }
}