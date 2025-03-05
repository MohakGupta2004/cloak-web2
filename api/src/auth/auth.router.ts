import express, { Router } from "express";
import { signupSchema } from "../schemas/signUpSchema";
import AuthService from "./auth.service";
import HttpStatusCode from "../lib/statusCode";
import authMiddleware from "../middleware/authMiddleware";
import type { AuthRequest } from "../lib/types";

const authRouter = Router();

authRouter.post('/register', async (req: express.Request, res: express.Response) => {
    const { success, data, error } = signupSchema.safeParse(req.body);
    if (!success) {
        res.status(HttpStatusCode.BAD_REQUEST).send(error.issues);
        return;
    }

    const result = await AuthService.register(data);
    if (!result.success) {
        res.status(HttpStatusCode.CONFLICT).json({
            message: result.message
        });
        return;
    }
    res.status(HttpStatusCode.OK).send({
        message: "Registration Successful"
    });
});

authRouter.post('/login', async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    const result = await AuthService.login(username, password);
    if (!result.success) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: result.message
        });
        return;
    }

    res.status(HttpStatusCode.OK).send({
        message: result.message,
        token: result.token
    });
});

// Example of a protected route
authRouter.get('/profile', authMiddleware, (req: AuthRequest, res: express.Response) => {
    if (!req.user) {
        res.status(HttpStatusCode.UNAUTHORIZED).send({ message: "User not authenticated" });
        return;
    }

    res.send({ message: "This is a protected route", user: req.user });
});


export default authRouter;  
