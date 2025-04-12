import { CoursePart } from '../App';

type TotalProps = {
  parts: CoursePart[];
};

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;