import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// @desc - Authorize User / Set token
// route - POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: 'authorize user'});
})

const getUser = (req: Request, res: Response) => {
    res.status(401)
    throw new Error('something went wrong.');
    res.status(200).json({message: 'get user'});
}

export { authUser, getUser };