import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  // Calculate the total number of feedback received
  const totalFeedback = good + neutral + bad;
  
  // Calculate the average score based on good and bad feedback
  const averageScore = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;
  
  // Calculate the percentage of positive feedback
  const positivePercentage = totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <h2>Statistics</h2>
      {totalFeedback === 0 ? ( // Conditional rendering based on total feedback
        <p>No feedback given.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text="Good" value={good} /> 
            <StatisticLine text="Neutral" value={neutral} /> 
            <StatisticLine text="Bad" value={bad} /> 
            <StatisticLine text="Total feedback" value={totalFeedback} /> 
            <StatisticLine text="Average score" value={averageScore.toFixed(2)} />
            <StatisticLine text="Positive feedback" value={`${positivePercentage.toFixed(2)}%`} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;