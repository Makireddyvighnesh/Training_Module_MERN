import express from 'express';

import {getTopicVideos, getTopics, addTopic, updateTopic} from '../controllers/topicController.js';
import { protect } from '../middleware/authMiddleware.js';

const topicRouter = express.Router();

topicRouter.get("/",protect, getTopics);
topicRouter.get("/getTopicVideos",protect, getTopicVideos);
topicRouter.post("/addTopic", addTopic);
topicRouter.put("/updateTopic", updateTopic);

export default topicRouter;