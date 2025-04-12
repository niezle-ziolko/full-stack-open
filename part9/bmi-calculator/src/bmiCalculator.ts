export interface BMIResult {
  weight: number;
  height: number;
  bmi: string;
};

export const calculateBmi = (height: number, weight: number): BMIResult => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be greater than zero.');
  };

  const heightInMeters = height / 100;
  const bmiValue = weight / (heightInMeters * heightInMeters);

  let bmiCategory = '';

  if (bmiValue < 18.5) {
    bmiCategory = 'Underweight';
  } else if (bmiValue < 25) {
    bmiCategory = 'Normal range';
  } else if (bmiValue < 30) {
    bmiCategory = 'Overweight';
  } else {
    bmiCategory = 'Obese';
  };

  return {
    weight,
    height,
    bmi: bmiCategory
  };
};

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: npm run calculateBmi <height(cm)> <weight(kg)>');
    process.exit(1);
  };

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    console.error('Provided values were not numbers!');
    process.exit(1);
  };

  try {
    const result = calculateBmi(height, weight);
    console.log(`BMI result: ${JSON.stringify(result)}`);
  } catch (error: unknown) {
    console.error((error as Error).message);
    process.exit(1);
  };
};