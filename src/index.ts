import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './data-source';

import 'reflect-metadata';

const app = express();
const port = 3000;
app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');

    // Register routes
    app.use('/api', userRoutes);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log('Database connection error: ', error));