import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

import connectDB from './db/connect.js';
import userRoutes from './routes/userRoutes.js';
import videoRouter from './routes/videoRoutes.js';
import topicRouter from './routes/topicRoutes.js';
import progressRouter from './routes/progressRoutes.js';
import { addVideo } from './controllers/videoController.js';
// import { protect } from './middleware/authMiddleware.js';
// import adminMiddleware from './middleware/adminMiddleware.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
console.log(__dirname)
const PORT =  5000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRoutes);
app.use('/api/video', videoRouter);
app.use('/api/topic', topicRouter);
app.use('/api/progress', progressRouter);

app.post('/api/video/upload', upload.single('video'), addVideo);

app.get('/', (req, res) => {
    res.send("Server is ready!");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
