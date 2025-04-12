import cors from 'cors';
import express, { Request, Response } from 'express';

import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3003;

app.listen(PORT, (): void => {
  console.log(`The server is running on port ${PORT}`);
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req: Request, res: Response): void => {
  res.json({ message: 'pong' });
});