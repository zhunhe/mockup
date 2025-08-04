import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import './config';
import todoRoutes from './routes/todo.routes';
import { setupSwagger } from './swagger';

const app = express();

// CORS 설정 - 프론트엔드 연결을 위해
const corsOptions: cors.CorsOptions = {
  origin: [
    'http://localhost:3000', // React 기본 포트
    'http://localhost:5173', // Vite 기본 포트
    'http://localhost:8080', // Vue CLI 기본 포트
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/todos', todoRoutes);
setupSwagger(app);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Todo Backend API is running',
    timestamp: new Date().toISOString()
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러 발생' });
});

export default app;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
