import React from 'react';

// Header component that displays the course name
const Header = ({ course }) => <h1>{course}</h1>;

// Part component that displays the name and number of exercises for a single part
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

// Content component that maps over the parts and renders a Part component for each
const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

// Total component that calculates and displays the total number of exercises across all parts
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log('Calculating total:', sum, part);
    return sum + part.exercises;
  }, 0);

  return <p><strong>Total {total} of exercises</strong></p>;
};

// Course component that renders the header, content, and total of the course
const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;