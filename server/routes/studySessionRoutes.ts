import express, { Router } from "express";
import { createStudySession, deleteStudySession, getStudySessions, updateStudySession } from "../controllers/studySessionController";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route('/')
    .get(protect, getStudySessions)
    .put(protect, updateStudySession)
    .delete(protect, deleteStudySession);
router.route('/new').post(protect, createStudySession);

export default router;
