import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User, { IUserDoc } from "../models/userModel";
import { Request, Response, NextFunction } from 'express';

interface IJwtPayload {
    userId: string
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized, no token.');
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;

        req.user = await User.findById(decoded.userId).select('-password');
        
        next();
    } catch (err) {
        res.status(401);
        throw new Error('Not Authorized, invalid token.');
    };
});

export { protect };