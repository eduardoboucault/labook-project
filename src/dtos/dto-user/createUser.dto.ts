import { z } from "zod"

export interface CreateUserInputDTO {
    id: string
    name: string,
    email: string,
    password: string,
    role: string
}

export const createUserSchema = z.object({
    id: z.string(),
    name: z.string({invalid_type_error: "'name' precisa ser no formato string"}).min(2),
    email: z.string({invalid_type_error: "'email' precisa ser no formato string"}).email(),
    password: z.string({invalid_type_error: "'password' precisa ser no formato string"}).min(4),
    role: z.string()
}).transform(data => data as CreateUserInputDTO)