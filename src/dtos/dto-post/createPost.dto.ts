import z from 'zod';

export interface CreatePostInputDTO {
    content:string;
    token: string;
}
export interface CreatePostOutputDTO {}

export const CreatePostSchema = z.object({
    content: z.string(),
    token: z.string().min(3)
}).transform(data => data as CreatePostInputDTO)