# Full Stack Open 2024 - Part 5: Routed Anecdotes

This project is a simple Single Page Application (SPA) built with React, which allows users to browse, view, and create anecdotes. It has been incrementally enhanced following the exercise steps **7.1–7.6** of the Full Stack Open course. The key technologies used include React Router v6 and a custom hook called `useField`.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part7/
├── bloglist-frontend
├── country-hook
├── ultimate-hooks
└── routed-anecdotes/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── Anecdote.jsx
    │   │   ├── AnecdoteList.jsx
    │   │   ├── CreateAnecdote.jsx
    │   │   ├── Footer.jsx
    │   │   └── Menu.jsx
    │   ├── hooks/
    │   │   └── index.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Routed Anecdotes" exercises **7.1.-7.6.** are located inside the `routed-anecdotes` folder.

## ✅ Exercises Overview

During the development of the project in Part 5, the following tasks were performed.

### 7.1: Routed Anecdotes, step 1

- Added **React Router** for client-side routing.
- Three main routes created:
  - `/` – Displays a list of anecdotes.
  - `/create` – Displays the form for creating a new anecdote.
  - `/about` – Displays an informational page.
- The `Footer` component is always visible at the bottom of the page.

### 7.2: Routed Anecdotes, step 2

- Implemented a detailed view for each anecdote available at `/anecdotes/:id`.
- Clicking on an anecdote's name navigates to its corresponding detail page.
- Uses `useParams()` from React Router to extract the anecdote ID.

### 7.3: Routed Anecdotes, step 3

- After creating a new anecdote:
  - The app redirects the user from `/create` to `/`.
  - A notification is shown, confirming the creation of the anecdote.
- The notification automatically disappears after 5 seconds.

### 7.4: Bloglist frontend step 4

- Created a custom hook `useField` that manages:
  - `value`
  - `onChange` handler
  - `type`
- The CreateNew form was refactored to use this hook, reducing boilerplate and improving readability.
- The hook is stored in the `src/hooks/useField.js` file.

### 7.5: Bloglist frontend step 5

- Added a Reset button to the form to clear all input fields.
- Enhanced the `useField` hook to expose a `reset()` function for resetting the field’s value.

### 7.6: Bloglist frontend step 6

- Removed the warning: `Invalid value for prop reset on <input> tag`
- The issue was caused by using the spread operator (`{...field}`), which passed the `reset` property directly to the `<input>` element.
- The fix involved separating input props (`like` `type`, `value`, `onChange`) from non-input props (`reset`).
- The hook remains easy to use with spread syntax while avoiding unintended props being passed to DOM elements.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part7/routed-anecdotes
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development frontend:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 🧠 Notes

- The application is **fully frontend-only**; anecdotes are stored in React component state.
- No Redux or backend services are used.
- Demonstrates programmatic navigation, temporary notifications, and reusable form input logic via custom hooks.