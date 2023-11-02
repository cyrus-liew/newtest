import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorResponserHandler, invalidPatHandler } from './middleware/errorHandler';
import cors from 'cors';
import path from "path";

// Routes
import userRoutes from './routes/userRoutes';
import postRoutes from "./routes/PostRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();
const app = express();
connectDB();

// Use CORS middleware
app.use(
  cors(
  //   {
  //   origin: 'http://localhost:3000', // Add the frontend URL you want to allow
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // }
  )
);

app.use(cors());

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is running..');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

//static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// Error handling middleware
app.use(invalidPatHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
