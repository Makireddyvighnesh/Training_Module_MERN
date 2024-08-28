import express from 'express';

import { getUserProgress, updateProgressAndCompletedVideos } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const pregressRouter = express.Router();

pregressRouter.get('/getUserProgress',protect,getUserProgress);
pregressRouter.post('/updateProgressAndCompletedVideos', updateProgressAndCompletedVideos);

export default pregressRouter;