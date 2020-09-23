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
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi < 15) {
    return ('Very severly underweight');
  }
  if (bmi < 16) {
    return ('Severly underweight');
  }
  if (bmi < 18.5) {
    return ('Underweight');
  }
  if (bmi < 25) {
    return ('Normal (healthy weiht)');
  }
  if (bmi < 30) {
    return ('Overweight');
  }
  if (bmi < 35) {
    return ('Obese Class I (Moderately obese)');
  }
  if (bmi < 40) {
    return ('Obese Class II (Severly obese');
  }
  return ('Obese Class III (Very severly obese)');
}

/*const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))*/

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, message: ', e.message);
}