import { z } from "zod";

export const SignUpSchema = () => z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        { message: "Weak password" }
    ),
    // profileImage: z.union([
    //     z.instanceof(File),
    //     z.string().refine(val => val === "", {
    //         message: "Profile image must be a file or an empty string"
    //     })
    // ])
});


export const signInSchema = () => z.object({
    email:z.string().email({message:"Invalid email"}),
    password:z.string().refine(val => val !== "", {
        message:"Password is required"
    })
})