import z from "zod";
import { User } from "../../models/User";

export interface GetInputUsersDTO {
  q: string;
  token: string;
}

export type GetOutputUsersDTO = User[];

export const GetUsersSchema = z
  .object({
    q: z.string().min(1).optional(),
    token: z.string().min(1),
  })
  .transform((data) => data as GetInputUsersDTO);
