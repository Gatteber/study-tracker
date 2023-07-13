import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import StudySession from "../models/studySessionModel";
import User from "../models/userModel";

// @desc - Get study sessions
// @route - GET /api/study-sessions/
// @access - Private
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
// @route - POST /api/study-sessions/new/
// @access - Private
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
            res.status(400);
            throw new Error('Invalid data');
        }
    };
});

//@desc - update study session comment
//@route PUT /api/study-sessions/
//@access - Private
const updateStudySession = asyncHandler(async (req: Request, res: Response) =>
{
    const { _id, note } = req.body;
    const itemToUpdate = await StudySession.findOne({ _id });
    if (itemToUpdate) { 
        itemToUpdate.comment = note;
        await itemToUpdate.save();
        res.status(200).json({message: 'succesfully updated'});
    } else {
        res.status(404);
        throw new Error('Item not found');
    };
});
// @desc - delete study session
// @route - DELETE /api/study-sessions/
// @access - Private
const deleteStudySession = asyncHandler(async (req: Request, res: Response) =>
{
    const { _id } = req.body;
    const itemToDelete = await StudySession.findOne({ _id });
    if (itemToDelete) {
        await StudySession.deleteOne({ _id });
        res.status(200).json({message: 'item successfully deleted!'});
    } else {
        res.status(404);
        throw new Error('Item not found');
    };
});


export { 
    getStudySessions,
    createStudySession,
    updateStudySession,
    deleteStudySession,
};
