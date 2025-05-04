# Full Stack Open 2024 - Part 7: Advanced State Management and Styling

This documentation outlines the implementation of a blog application enhanced through exercises **7.9–7.21** from the Full Stack Open course. The project introduces **automatic code formatting, state management via Redux or React Query & Context, routing-based views, comment system**, and **styling improvements**.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part7/
├── country-hook
├── ultimate-hooks
├── routed-anecdotes
└── bloglist-frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── Blog.jsx
    │   │   ├── BlogDetails.jsx
    │   │   ├── BlogsList.jsx
    │   │   ├── CommentForm.jsx
    │   │   ├── Header.jsx
    │   │   ├── Loading.jsx
    │   │   ├── LoginForm.jsx
    │   │   ├── Notification.jsx
    │   │   ├── Togglable.jsx
    │   │   ├── UserDetails.jsx
    │   │   └── UsersList.jsx
    │   ├── reducers/
    │   │   ├── blogReducer.js
    │   │   ├── notificationReducer.js
    │   │   ├── userReducer.js
    │   │   └── usersReducer.js
    │   ├── services/
    │   │   ├── blogs.js
    │   │   ├── login.js
    │   │   └── users.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── store.js
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── .prettierrc.json
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Course Information" exercises **7.9.–7.21.** are located inside the `bloglist-frontend` folder.

## ✅ Exercises Overview

This part builds on the application from Part 1, expanding the component structure to support multiple courses and modularizing the code. Below is a summary of each exercise:

### 7.9: Automatic Code Formatting

- Integrated Prettier to auto-format code on save.
- Configured editor settings and added `.prettierrc` configuration file.

### 7.10: Redux, step 1

- Used Redux to manage **notification state**.

### 7.11: Redux, step 2

- Managed **blog post state** with Redux (viewing and creating).

### 7.12: Redux, step 3

- Added support for **liking** and **deleting** blogs via Redux.

### 7.13: Redux, step 4

- Stored the **logged-in user** in the Redux store for global access.

### 7.14: Users view

- Created a view (`/users`) showing a table of users with the number of blogs created.

### 7.15: Individual User View

- Implemented route `/users/:id` showing blogs created by a specific user.
- Handled conditional rendering to avoid errors before data loads.

### 7.16: Blog View

- Created individual blog view accessible via `/blogs/:id`.
- Removed in-place expansion of blog details in list view.

### 7.17: Navigation

- Added a navigation menu with links to **blogs**, **users**, and **login/logout**.
- Styled navigation for a cleaner user experience.

### 7.18: Comments, step 1

- Displayed list of anonymous comments per blog.
- Fetched via `GET /api/blogs/:id/comments`.

### 7.19: Comments, step 2

- Enabled users to add comments via a controlled input form.
- Sent `POST` request to `/api/blogs/:id/comments` to update backend.

### 7.20: Styles, step 1

- Enhanced the UI using a consistent styling strategy (e.g., CSS modules, TailwindCSS, or styled-components).

### 7.21: Styles, step 2

- Dedicated at least one hour to improve appearance and UX.
- Focused on layout, responsiveness, font hierarchy, and button styling.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part7/bloglist-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development frontend:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) and server from Part 4 is available at [http://localhost:3003](http://localhost:3003).

## 🧠 Notes

- Always use unique IDs for list rendering.
- Handle all asynchronous logic with try/catch or error boundaries.
- Avoid prop drilling by using context for globally shared state (e.g., notifications, user).
- Use React Router for clean and modular route-based navigation.
- Ensure that blog and user details are fetched before rendering to prevent runtime errors.