import { useEffect, useState } from 'react';
import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './diaryService';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: 'great',
    weather: 'sunny',
    comment: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };
  
  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const created = await createDiary(newEntry);
      setDiaries(diaries.concat(created));
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Unknown error');
      } else {
        setError('Unknown error');
      };
    };
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={addEntry}>
        <div>
          Date: <input type="date" name="date" value={newEntry.date} onChange={handleChange} />
        </div>
        <div>
          Visibility:
          {(['great', 'good', 'ok', 'poor'] as const).map(v => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={newEntry.visibility === v}
                onChange={handleChange}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          Weather:
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const).map(w => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={newEntry.weather === w}
                onChange={handleChange}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          Comment: <input name="comment" value={newEntry.comment} onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
      <h1>Flight Diaries</h1>
      {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>Weather: {d.weather}</p>
          <p>Visibility: {d.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;