import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import commonRoutes from './routes/commonRoutes';
import matchRouter from './routes/matchRouter';
import teamRouter from './routes/teamRouter';
import authRouter from './routes/authRoutes';
import { AppDataSource } from './data-source';
import cors from 'cors';
import 'reflect-metadata';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', // 클라이언트에서 요청을 보내는 주소
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
}));
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.get("/", async  (req: Request, res: Response): Promise<any> => {
      res.send("Hello Meta")
    })
    // Register routes
    app.use('/user', userRoutes);
    app.use('/common', commonRoutes);
    app.use('/match', matchRouter);
    app.use('/team', teamRouter);
    app.use('/auth', authRouter);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => console.log('Database connection error: ', error));