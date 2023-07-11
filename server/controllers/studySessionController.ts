import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import StudySession from "../models/studySessionModel";
import User from "../models/userModel";

// @desc - Get study sessions
// @route  GET
// @access Private
const getStudySessions = asyncHandler(async (req: Request, res: Response) => {
    const findSessions = await StudySession.find( { user : req.user } );

    if(findSessions) {
        res.status(200).json(findSessions);
    } else {
        res.status(404)
        throw new Error('No sessions found');
    }
});

// @desc - store study session
// @route POST
// @access Private
const createStudySession = asyncHandler(async (req: Request, res: Response) => 
{
    const { _id, length, completed, comment } = req.body;

    const user = await User.findById(_id).select('uniqueId');
    if(user) {
    const studySession = await StudySession.create({
        user,
        length,
        completed,
        comment,
        });

        if (studySession) {
            res.status(201).json({studySession});
        } else {
            res.status(400)
            throw new Error('Invalid data');
        }
    };
});

export { 
    getStudySessions,
    createStudySession,
};
