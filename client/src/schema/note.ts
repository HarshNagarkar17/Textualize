import {z} from "zod";

export const noteSchema = () => z.object({
    name:z.string().refine((val) => val !== "", {message:"name is required"})
})
