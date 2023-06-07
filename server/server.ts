import * as dotenv from 'dotenv';
import express, {Express, Request, Response } from 'express';
dotenv.config();

import {notFound, errorHandler} from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

//error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
