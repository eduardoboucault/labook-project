import z from "zod";
import { USER_ROLES } from "../../models/User";

export interface SignupInputUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
}

export interface SignupOutputUserDTO {
  message: string;
  token: string;
}

export const CreateUserSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
  })
  .transform((data) => data as SignupInputUserDTO);