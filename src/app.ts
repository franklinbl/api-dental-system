import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app: Express = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend del sistema odontológico funcionando con TypeScript 🦷' });
});

export default app;