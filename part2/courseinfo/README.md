# Full Stack Open 2024 - Part 2: Course Information Continued

This repository contains solutions for exercises **2.1.–2.5.** from Part 2 of the Full Stack Open 2024 course.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part2/
├── phonebook-frontend
├── countries
└── courseinfo/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.jsx
    │   ├── Course.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Course Information" exercises **2.1.–2.5.** are located inside the `courseinfo` folder.

## ✅ Exercises Overview

This part builds on the application from Part 2, expanding the component structure to support multiple courses and modularizing the code. Below is a summary of each exercise:

### 2.1: Course Information, step 6

- Refactored the App component to define a single course object with a nested list of parts.
- Created a new component called Course that is responsible for rendering:
  - The course name via the Header component.
  - The course parts via the Content and Part components.
- Application structure now follows:

```
App
  └── Course
      ├── Header
      └── Content
          └── Part
```

- Ensured the application correctly renders any number of course parts dynamically using `.map()`.
- No calculation of total exercises yet.
- Confirmed that the console is free of runtime errors.

### 2.2: Course Information, step 7

- Extended the `Course` component to display the total number of exercises.
- Summed up the exercise counts using the `reduce()` method.

### 2.3: Course Information, step 8

- Implemented the sum of exercises using the array method .reduce() explicitly (if not done in 2.2).
- Used console.log() for debugging the reducer if needed.
- Example reducer form:

```
const total = parts.reduce((sum, part) => sum + part.exercises, 0)
```

### 2.4: Course Information, step 9

- Modified the application to support rendering an arbitrary number of courses.
- The `App` component now holds an array of course objects.
- Used `.map()` to iterate over the courses and render a `Course` component for each one.

### 2.5: Course Information, step 10

- Extracted the `Course` component (along with `Header`, `Content`, `Part`, and `Total`) into a separate module file (`Course.jsx`).
- Imported the `Course` module into App.jsx for use.
- Ensured all related course logic is encapsulated within the `Course` module.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part2/courseinfo
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

- Submit only after completing all the exercises you wish to include from this part—no changes can be made afterward.
- Do not include `node_modules` in version control.
- Ensure your application runs without console errors.
- Prefer modular, maintainable code—especially when working with components like `Course`.