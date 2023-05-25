import z from "zod";

export interface CreateInputUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface CreateOutputUserDTO {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  };
}

export const CreateUserSchema = z
  .object({
    id: z.string().min(2),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(12),
    role: z.string(),
    created_at: z.string(),
  })
  .transform((data) => data as CreateInputUserDTO);
