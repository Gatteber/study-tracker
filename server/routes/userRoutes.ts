import express, { Router } from "express";
import { authUser, getUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController";


const router: Router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.get('/get_user', getUser)

export default router;