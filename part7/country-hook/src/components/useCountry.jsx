import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) {
      setCountry(null);
      setLoading(false);
      return;
    };

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError("Country not found");
        setLoading(false);
      };
    };

    fetchCountry();
  }, [countryName]);

  return { country, loading, error };
};

export default useCountry;