import * as dotenv from 'dotenv';
import express, {Express, Request, Response } from 'express';
dotenv.config();

import connectDB from './config/db';
import {notFound, errorHandler} from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';


//MongoDB connection
connectDB();


const app: Express = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//routes
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

//error middleware
app.use(notFound);
app.use(errorHandler);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
