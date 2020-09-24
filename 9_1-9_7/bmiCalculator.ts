interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));
  let res = '';
  if (bmi < 15) {
    res = 'Very severly underweight';
    return (res);
  }
  if (bmi < 16) {
    res = 'Severly underweight';
    return (res);
  }
  if (bmi < 18.5) {
    res = 'Underweight';
    return (res);
  }
  if (bmi < 25) {
    res = 'Normal (healthy weiht)';
    return (res);
  }
  if (bmi < 30) {
    res = 'Overweight';
    return (res);
  }
  if (bmi < 35) {
    res = 'Obese Class I (Moderately obese)';
    return (res);
  }
  if (bmi < 40) {
    res = 'Obese Class II (Severly obese';
    return (res);
  }
  res = 'Obese Class III (Very severly obese)';
  return (res);
};

/*const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))*/

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, message: ', (e as Error).message);
}