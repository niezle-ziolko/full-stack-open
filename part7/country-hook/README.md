# Full Stack Open 2024 - Part 7: Countries Application

Country Info Finder is a React-based application that allows users to search for information about countries by name. It queries the public REST Countries API and displays relevant details such as capital, population, and national flag.

The project originally stems from Exercises 2.18–2.20 of the Full Stack Open course. In Exercise 7.7, the application was refactored to utilize a custom React hook called useCountry, which encapsulates the logic for fetching country data.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part7/
├── bloglist-frontend
├── routed-anecdotes
├── ultimate-hooks
└── country-hook/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   └── useCountry.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All application logic related to country data and weather integration is implemented inside the `country-hook` folder.

## ✅ Exercises Overview

### 7.7: Country hook

The major enhancement introduced in Exercise **7.7** was the creation of a custom hook `useCountry(name)`. Instead of fetching country data directly in the component logic, the data-fetching responsibility is now abstracted into a reusable hook.

**Benefits:**
- Improved separation of concerns
- Cleaner and more readable component code
- Reusability of the hook in other parts of the app (if needed)

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part7/country-hook
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development fronted:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 🧠 Notes

- A custom hook called `useCountry` was implemented to **encapsulate the logic for fetching data from the REST Countries API**.
- This abstraction removed side effects (like `axios.get`) from the main component (`App.js`), improving **readability** and **code separation**.
- The hook returns either `null`, a `{ found: true, data }` object if the country was found, or `{ found: false }` if not.
- The hook automatically re-runs when the `name` argument changes, thanks to `useEffect`.