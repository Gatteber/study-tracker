import mongoose, { Document, ObjectId } from "mongoose";

export interface IStudySessionSchema extends Document {
    user: ObjectId,
    length: number,
    completed: boolean,
}

const studySessionSchema = new mongoose.Schema<IStudySessionSchema>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    completed : {
        type: Boolean,
        required: true,
    },
},
    {
        timestamps: true,
}); 

const StudySession = mongoose.model('studySession', studySessionSchema);

export default StudySession;
