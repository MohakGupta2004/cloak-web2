import {z} from 'zod'

export const usernameValidation = z.string().min(2, "Username should be atleast 2 character long").max(10, "Username must be more than 10 characters")
                                  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special character")
export const passwordValidation = z.string().min(8, {message: "Password at least contain 8 characters"})
export const signupSchema = z.object({
  username: usernameValidation,
  email: z.string().email({message: "Invalid Email"}),
  password: passwordValidation 
})
