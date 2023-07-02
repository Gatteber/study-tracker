import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import StudySession from "../models/studySessionModel";
import User from "../models/userModel";

// @desc - Get study sessions
// @route  GET
// @access Private
const getStudySessions = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.body;

    const findSessions = await StudySession.find(); 
});

// @desc - store study session
// @route POST
// @access Private
const createStudySession = asyncHandler(async (req: Request, res: Response) => 
{
    const { _id, length, completed } = req.body;

    const user = await User.findById(_id).select('-password');
    if(user) {
    const studySession = await StudySession.create({
        user,
        length,
        completed,
        });

        if (studySession) {
            res.status(201).json({studySession});
        } else {
            res.status(400)
            throw new Error('Invalid data');
        }
    };
});

export { createStudySession };
