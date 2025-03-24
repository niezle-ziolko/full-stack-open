import { useState } from 'react';
import Statistics from './Statistics'; // Importing the Statistics component
import Button from './Button'; // Importing the Button component

const App = () => {
  // State variables to keep track of feedback counts
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Function to handle the click event for good feedback
  const handleGoodClick = () => {
    setGood(good + 1);
  };

  // Function to handle the click event for neutral feedback
  const handleNeutralClick = () => {
    setNeutral(neutral + 1); // Increment the neutral feedback count
  };

  // Function to handle the click event for bad feedback
  const handleBadClick = () => {
    setBad(bad + 1); // Increment the bad feedback count
  };

  // Calculate the total feedback count
  const totalFeedback = good + neutral + bad;

  return (
    <div>
      <h1>Unicafe Feedback</h1> 
      <Button text="Good" onClick={handleGoodClick} />
      <Button text="Neutral" onClick={handleNeutralClick} />
      <Button text="Bad" onClick={handleBadClick} />

      {totalFeedback === 0 ? ( // Conditional rendering based on total feedback
        <p>No feedback given.</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

export default App;