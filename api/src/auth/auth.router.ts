import express, { Router } from "express";
import { signupSchema } from "../schemas/signUpSchema";
const authRouter = Router()

authRouter
  .post('/register', (req: express.Request, res: express.Response)=>{
    const {success, data, error} = signupSchema.safeParse(req.body);
    if(!success) res.send(400).send(error.issues)
    
    
})


export default authRouter
