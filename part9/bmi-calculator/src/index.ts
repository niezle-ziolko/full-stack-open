import express, { Request, Response } from 'express';
import { calculateBmi, BMIResult } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

app.listen(PORT, (): void => {
  console.log(`The server is running on the port ${PORT}`);
});

app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response): void => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  };

  const heightNum = Number(height);
  const weightNum = Number(weight);

  try {
    const result: BMIResult = calculateBmi(heightNum, weightNum);
    res.json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  };
});

app.post('/exercises', (req: Request, res: Response): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
  };

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    !daily_exercises.every(d => typeof d === 'number')
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  };

  const result = calculateExercises(daily_exercises, Number(target));
  res.json(result);
});