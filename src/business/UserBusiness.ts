import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/dto-user/createUser.dto";
import { BadRequest } from "../errors/BadRequest";
import { User, UserDB } from "../models/User";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ) { }

    public getUser = async (input: any): Promise<UserDB[]>=> {
        const { q } = input

        const userDB = await this.userDatabase.findUser(q)

        const users: User[] = userDB.map((user: any) => new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at
        ))

        const output = users.map((user) => ({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            created_at: user.getCreatedAt()
        }))

        return output
    }

    public createUser = async (input: CreateUserInputDTO): Promise<void> => {
        const {
            id,
            name,
            email,
            password,
            role
        } = input

        const idExist = await this.userDatabase.findUserById(id)
        const emailExist = await this.userDatabase.findUserByEmail(email)

        if (idExist) {
            throw new BadRequest("Erro incomum, por favor tente novamente")
        }
        if (emailExist) {
            throw new BadRequest("Email já cadastrado, faça o login ou cadastre um novo email")
        }
        
        const newUser = new User(
            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        )
        
        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        const 
    }

    public updateUser = async (input: any): Promise<void> => {

    }

    public deleteUser = async (input: any): Promise<void> => {

    }

}