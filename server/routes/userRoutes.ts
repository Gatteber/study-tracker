import express, { Router } from "express";
import { authUser, getUser } from "../controllers/userController";


const router: Router = express.Router();

router.post('/auth', authUser);
router.get('/get_user', getUser)

export default router;