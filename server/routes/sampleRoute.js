import express from 'express';
import { sampleController } from '../controllers/sampleController.js';

const router = express.Router();

router.get('/api', sampleController);

export default router;
