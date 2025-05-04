# Full Stack Open 2024 - Part 2: Countries Application

This directory contains solutions for exercises **2.18–2.20** from Part 2 of the Full Stack Open 2024 course.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part2/
├── phonebook-frontend
├── courseinfo
└── countries/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All application logic related to country data and weather integration is implemented inside the `countries` folder.

## ✅ Exercises Overview

These exercises focus on building a dynamic React application that fetches and displays country data using a public REST API. The final version includes conditional rendering, state management, and external API integration for weather.

### 2.18: Data for countries, step 1

- Implemented a basic search feature that queries country data from the REST Countries API: [https://studies.cs.helsinki.fi/restcountries/](https://studies.cs.helsinki.fi/restcountries/)
- Displayed matching results based on the user's query input.
- Displayed different UI based on the number of matching countries:
  - **>10 matches**: prompt user to refine query.
  - **2–10 matches**: show a list of matching country names.
  - **1 match**: show detailed information for the country, including:
    - Capital
    - Area
    - Languages spoken
    - National flag

### 2.19: Data for Countries, step 2

- Enhanced the interface by adding a **"Show"** button next to each listed country.
- Clicking the button reveals detailed data for the selected country.
- This allows users to browse country data without refining their search further.
- Maintains the previous conditional rendering logic from **2.18**.

### 2.20: Data for Countries, step 3

- Integrated a weather report for the capital city of the selected country.
- Used the OpenWeatherMap API: [https://openweathermap.org](https://openweathermap.org)
- Weather information displayed includes:
    - Temperature
    - Weather description
    - Wind speed
    - Icon representing current conditions
  🌦️ Weather icons retrieved based on the `icon` code provided by OpenWeatherMap.

**🔐 API Key Management**
To protect the API key:
- Used environment variables prefixed with `VITE_`.
- Example usage:

```bash
# For macOS/Linux (bash)
export VITE_WEATHER_API_KEY=your_api_key_here && npm run dev

# For Windows PowerShell
($env:VITE_WEATHER_API_KEY="your_api_key_here") -and (npm run dev)

# For Windows CMD
set "VITE_WEATHER_API_KEY=your_api_key_here" && npm run dev
```

Accessed in the application with:

```js
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
```

🛑 Do not hardcode API keys in source code or commit them to version control.

🔁 After changing environment variables, you must restart the dev server for changes to take effect.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part2/countries
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development frontend:

```bash
export VITE_WEATHER_API_KEY=your_api_key && npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 🧠 Notes

- Make sure not to commit your `.env` or API keys.
- The application fulfills all requirements for exercises **2.18–2.20**.
- The country and weather APIs may sometimes return incomplete or unexpected data—handling of such edge cases is not required at this stage.
- This is the final exercise set for Part 2. Remember to mark your progress in the exercise submission system.