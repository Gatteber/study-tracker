import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// @desc - Authorize User / Set token
// route - POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: 'authorize user'});
})

// @desc - Register new user
// route - POST /api/users
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: 'register user'});
})

// @desc - Logout user
// route - POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: 'logout user'});
})

// @desc - Get user profile
// route - GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: 'User Profile'});
})

// @desc - Update user profile
// route - PUT api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: 'authorize user'});
})
const getUser = (req: Request, res: Response) => {
    res.status(401)
    throw new Error('something went wrong.');
    res.status(200).json({message: 'get user'});
}

export { 
    authUser, 
    getUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile };