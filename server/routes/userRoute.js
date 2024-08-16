import express from 'express';
import { userSignUp, userLogin, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.post('/logout', logout);
export default router;
