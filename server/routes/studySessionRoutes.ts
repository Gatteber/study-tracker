import express, { Router } from "express";
import { createStudySession, deleteStudySession, getStudySessions } from "../controllers/studySessionController";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route('/').get(protect, getStudySessions).delete(protect, deleteStudySession);
router.route('/new').post(protect, createStudySession);

export default router;
