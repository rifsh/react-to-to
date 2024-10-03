import express, { Express } from 'express';
import userRoutes from './routes/user.routes';
import toDoRoutes from './routes/todo.routes';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/to-do', toDoRoutes)

export default app;