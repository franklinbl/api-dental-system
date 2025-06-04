import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app: Express = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend del sistema odontológico funcionando con TypeScript 🦷' });
});

export default app;