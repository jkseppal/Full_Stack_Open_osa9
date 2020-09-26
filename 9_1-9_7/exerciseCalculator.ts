interface ExerciseValues {
  target: number;
  period: Array<number>;
}

interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let periodD = new Array<number>();
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    periodD = periodD.concat(Number(args[i]));
  }
  if (!isNaN(Number(args[2]))) {
    return {
      target: Number(args[2]),
      period: periodD
    };
  }
  throw new Error('Provided values were not numbers');
};

export const calculateExercises = (period: Array<number>, target: number): result => {
  
  const periodLength = period.length;
  let trainingDays = 0;
  for (let i = 0; i < period.length; i++) {
    if (period[i] !== 0) {
      trainingDays++;
    }
  }
  let sum = 0;
  for (let i = 0; i < period.length; i++) {
    sum = sum + period[i];
  }
  const average = sum / periodLength;
  let success = false;
  if (average >= target) {
    success = true;
  }
  let rating = 1;
  if ((target - average) < 0.3) {
    rating = 2;
  }
  if ((average - target) > 0.3) {
    rating = 3;
  }
  let ratingDescription = 'losing streak';
  if (rating === 2) {
    ratingDescription = 'average';
  }
  if (rating === 3) {
    ratingDescription = 'good job!';
  }

  function printResult(res: result) {
    console.log(res);
  }

  const obj = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };

  printResult(obj);
  return(obj);
};

//calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)

try {
  const { target, period } = parseExArguments(process.argv);
  calculateExercises(period, target);
} catch (e) {
  console.log('Error: ', (e as Error).message);
}