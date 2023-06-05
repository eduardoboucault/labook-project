import z from 'zod';

export interface CreatePostInputDTO {
    q:string;
    token: string;
}
export interface CreatePostOutputDTO {}

export const CreatePostSchema = z.object({
    q: z.string(),
    token: z.string().min(3)
}).transform(data => data as CreatePostInputDTO)