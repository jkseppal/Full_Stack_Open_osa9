import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

interface ReqType {
  daily_exercises: Array<number>;
  target: number;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    const result = {
      error: "malformated parameters"
    };
    res.send(result);
  }
  const result = calculateBmi(Number(height), Number(weight));
  const object = {
    weight: Number(weight),
    height: Number(height),
    bmi: result
  };
  res.send(object);
});

app.post('/exercises', (req, res) => {
  const body = req.body as ReqType;
  const period = body.daily_exercises;
  const target = body.target;

  if (!period || !target) {
    res.status(400).json({
      error: "parameters missing"
    });
  } else if (isNaN(target) || period.includes(NaN)) {
    res.status(400).json({
      error: "malformated parameters"
    });
  } else {
    const result = calculateExercises(period, target);
    res.json(result);
  }
});

/*app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const period: Array<number> = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = req.body.target;

  if (!period || !target) {
    res.status(400).json({
      error: "parameters missing"
    });
  } else if (isNaN(target) || period.includes(NaN)) {
    res.status(400).json({
      error: "malformated parameters"
    });
  } else {
    res.json(calculateExercises(period, target));
  }
});*/

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});