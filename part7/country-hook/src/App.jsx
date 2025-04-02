import React, { useState } from "react";
import useCountry from "./components/useCountry";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const { country, loading, error } = useCountry(countryName);

  const handleSearch = (event) => {
    event.preventDefault();
    setCountryName(event.target.country.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input name="country" />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {country && (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        </div>
      )}
    </div>
  );
};

export default App;