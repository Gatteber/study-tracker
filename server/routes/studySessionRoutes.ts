import express, { Router } from "express";
import { createStudySession } from "../controllers/studySessionController";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route('/new').post(protect, createStudySession);

export default router;
