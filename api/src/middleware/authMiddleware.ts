import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { AuthRequest } from '../lib/types';
import type { UserData } from '../auth/DTO/user.dto';

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        res.status(401).send({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as JwtPayload & UserData;
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
        return;
    }
};

export default authMiddleware; 