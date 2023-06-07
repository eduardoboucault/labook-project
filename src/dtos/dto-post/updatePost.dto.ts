import z from 'zod';

export interface UpdatePostDTO {
    content: string;
    token: string;
}

export interface UpdateOutputDTO {
    message: string;
    content: string;
}

export const UpdatePostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as UpdatePostDTO)