import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import HttpStatusCode from '../lib/statusCode';
import { db } from '../lib/db';

interface DecodedToken extends JwtPayload{
  userId: string
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
        res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as DecodedToken
        if(!decoded) return;
        const user = await db.user.findFirst({
          where:{id: decoded.userId}
        })
        if(!user) return;
        req.user = user; // Attach user info to request
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ message: 'Invalid token.' });
        return;
    }
};

export default authMiddleware; 
