# Full Stack Open 2024 - Part 9: Flight Diary Frontend

This React + TypeScript application allows users to view and add flight diary entries. It communicates with an existing REST API backend. The form uses strongly typed inputs and proper UI elements to ensure data consistency and improve user experience.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part9/
├── bmi-calculator
├── course-typescript
├── patientor-backend
├── patientor-frontend
├── flight-diary-backend
└── flight-diary-frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── assets/
    │   │   └── react.svg
    │   ├── App.tsx
    │   ├── diaryService.ts
    │   ├── main.tsx
    │   ├── types.tsx
    │   └── vite-env.d.ts
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

All course materials for "Patientor Backend" exercises **9.17.–9.20.** are located inside the `flight-diary-frontend` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 9.17

- Connected to backend at `/api/diaries`
- Defined strict types for `DiaryEntry`
- Rendered each diary with `date`, `visibility`, and `weather`
- Ignored the `comment` field, as it wasn't returned by the API
- Added `diaryService.getAll()` to handle fetch logic

### 9.18

- Created `DiaryForm.tsx` with uncontrolled inputs
- Form submits data to backend using `diaryService.create()`
- App state updates on successful entry

### 9.19

- Used `try/catch` in `handleSubmit`
- Axios errors typed with `AxiosError`
- Displayed error message using a `Notification` component

### 9.20

- Switched `date` input to `<input type="date" />`
- Changed `weather` and `visibility` inputs to radio buttons
- Form state strongly typed and validated locally before submit

## 📦 Type Definitions

```ts
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor'
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part9/flight-diary-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Development mode:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) and server is available at [http://localhost:3000](http://localhost:3000).

## 🧠 Notes

- All components are strictly typed using TypeScript.
- No ESLint errors remain in the codebase.
- Error feedback to the user is visually shown in a styled alert.
- Assumes the backend is hosted on `http://localhost:3000`.