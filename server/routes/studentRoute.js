import express from 'express';
import {
	addStudent,
	getAllStudents,
} from '../controllers/studentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', authMiddleware, getAllStudents);
router.post('/add', authMiddleware, addStudent);

export default router;
