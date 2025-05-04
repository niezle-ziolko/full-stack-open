# Full Stack Open 2024 - Part 9: Patientor Backend

This is the backend service for the Patientor application, a simple medical record system. It serves as an API that manages patients and diagnoses, handling validation and ensuring data integrity.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part9/
├── course-typescript
├── flight-diary-backend
├── flight-diary-frontend
├── bmi-calculator
├── patientor-frontend
└── patientor-backend/
    ├── data/
    │   ├── diagnoses.ts
    │   └── patients.ts
    ├── src/
    │   ├── routes/
    │   │   ├── diagnoses.ts
    │   │   └── patients.ts
    │   ├── schemas/
    │   │   └── patientSchema.ts
    │   ├── services/
    │   │   ├── diagnoses.ts
    │   │   ├── diagnosesService.ts
    │   │   └── patientService.ts
    │   ├── index.ts
    │   ├── types.ts
    │   └── utils.ts
    ├── .gitignore
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── tsconfig.json
```

All course materials for "Patientor Backend" exercises **9.8.–9.14.** are located inside the `patientor-backend` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 9.8: Patientor backend, step 1

- Initialized backend with TypeScript and ESLint.
- Added npm scripts for development and production.
- Created a basic `GET /api/ping` endpoint returning "pong".

### 9.9: Patientor backend, step 2

- Forked and cloned frontend project.
- Ensured the frontend connects successfully to `GET /api/ping`.
- Verified using browser DevTools console that no ping errors occur.

### 9.10: Patientor backend, step 3

- Created a new Diagnosis type:
  ```ts
  interface Diagnosis {
    code: string;
    name: string;
    latin?: string; // optional
  }
  ```
- Implemented `GET /api/diagnoses` to return all diagnoses from `data/diagnoses.ts`.
- Split code into routes and services for better structure.

### 9.11: Patientor backend, step 4

- Defined a `Patient` type.
- Added utility type PublicPatient to hide sensitive fields like ssn:
  ```ts
  type PublicPatient = Omit<Patient, 'ssn'>;
  ```
- Implemented GET /api/patients returning only public patient data.
- Verified frontend correctly renders list of patients.

### 9.12: Patientor backend, step 5

- Implemented `POST /api/patients` endpoint.
- Used `uuid.v1()` to generate unique string IDs for new patients.
- Updated patient data in memory.
- Enabled frontend to successfully add patients.

### 9.13: Patientor backend, step 6

- Added type guard and validation functions for new patients.
- Introduced `Gender` enum:
  ```ts
  enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }
  ```
- Added runtime type-checking utilities (e.g., `isDate`, `isGender`).

### 9.14: Patientor backend, step 7

- Replaced custom type guards with Zod schema validation.
- Created schema in utils/validators.ts:
  ```ts
  const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().refine(isDate),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
  });
  ```
- Ensured invalid requests to /api/patients return 400 Bad Request.

## 📬 API Endpoints

| Method | Endpoint         | Description                             |
|--------|------------------|-----------------------------------------|
| GET    | `/api/ping`      | Health check.                           |
| GET    | `/api/diagnoses` | Returns all diagnosis entries.          |
| GET    | `/api/patients`  | Returns all patients **excluding SSN**. |
| POST   | `/api/patients`  | Adds a new patient.                     |

### POST /api/patients
- **Request Body**: 

  ```json
  {
    "name": "Alice Smith",
    "dateOfBirth": "1992-04-01",
    "ssn": "120492-123A",
    "gender": "female",
    "occupation": "Teacher"
  }
  ```

- **Response**:

  ```json
  {
    "id": "c3fba2a2-3f2d-41b9-bb7c-f764fd1b973c",
    "name": "Alice Smith",
    "dateOfBirth": "1992-04-01",
    "ssn": "120492-123A",
    "gender": "female",
    "occupation": "Teacher"
  }
  ```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part9/patientor-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Development mode:

```bash
npm run dev
```

5. Production mode:

```bash
npm run start
```

The server is available at [http://localhost:3003](http://localhost:3003).

## 🧠 Notes

- All fields in the `POST /api/patients` route are validated using **Zod**.
- The backend is built to integrate seamlessly with the existing frontend.
- The backend does not persist data between restarts; it's an in-memory demo.