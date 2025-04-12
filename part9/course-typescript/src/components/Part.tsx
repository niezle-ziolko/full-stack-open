import { CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name} ({part.exerciseCount})</h3>
          <em>{part.description}</em>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name} ({part.exerciseCount})</h3>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name} ({part.exerciseCount})</h3>
          <em>{part.description}</em>
          <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name} ({part.exerciseCount})</h3>
          <em>{part.description}</em>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      // exhaustive check
      const _exhaustiveCheck: never = part;
      return _exhaustiveCheck;
  }
};

export default Part;