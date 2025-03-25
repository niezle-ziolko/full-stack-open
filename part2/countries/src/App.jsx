import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((response) => setCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
  };

  const fetchWeather = (capital) => {
    axios
      .get(`${WEATHER_API_URL}?q=${capital}&appid=${API_KEY}&units=metric`)
      .then((response) => setWeather(response.data));
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Search for a country..." />
      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="150" />
          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;