import z from "zod";
export interface UpdateInputUsersDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateOutputUsersDTO {
  message: string;
  };


export const UpdateUserSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    role: z.string(),
  })
  .transform((data) => data as UpdateInputUsersDTO);
