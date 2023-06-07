import z from 'zod';

export interface loginInputUserDTO {
    email: string;
    password: string;
}

export interface loginOutputUserDTO {
    message: string;
    token:string;
}

export const LoginCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
}).transform(data => data as loginInputUserDTO)