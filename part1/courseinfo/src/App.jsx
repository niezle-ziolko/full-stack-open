// Header component that displays the course name
const Header = ({ course }) => <h1>{course}</h1>

// Part component that displays the name and number of exercises for a single part
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

// Content component that maps over the parts and renders a Part component for each
const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.name} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

// Total component that calculates and displays the total number of exercises across all parts
const Total = ({ parts }) => (
  <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
);

// Main App component that defines the course structure and renders the header, content, and total
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;