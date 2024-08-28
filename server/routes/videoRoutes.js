import { getVideo, updateVideo } from "../controllers/videoController.js";
import express from 'express';
import { protect } from "../middleware/authMiddleware.js";

const videoRouter = express.Router();

// videoRouter.post("/upload", addVideo);  // Consistent with the route used in server.js
videoRouter.get('/getVideo',protect, getVideo);
videoRouter.put('/updateVideo', updateVideo);

export default videoRouter;
