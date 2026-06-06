# Recruiter Management Frontend

A modern React-based frontend application for managing recruitment workflows. This application allows recruiters to create jobs, analyze resumes using AI, manage candidates, and track hiring pipelines.

---

## Tech Stack

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite
* JavaScript
* TypeScript

---

## Features

### Authentication

* Recruiter Registration
* Recruiter Login
* JWT Authentication
* Protected Routes

### Dashboard

* Recruitment Overview
* Total Jobs
* Total Candidates
* Active Jobs
* Top Candidates

### Job Management

* Create Job
* View Jobs
* Update Job
* Delete Job
* Search Jobs
* Filter Jobs by Status
* Sort Jobs by Date

### Candidate Management

* Upload Resume
* AI Resume Parsing
* Candidate Profile Extraction
* AI Fit Score Analysis
* Skills Matching
* Strengths & Weaknesses Analysis

### AI Features

* Resume Text Extraction
* Candidate Information Parsing
* Skills Extraction
* Experience Detection
* Job Matching
* Fit Score Calculation

---

## Project Structure

src/

├── components/

│ ├── dashboard/

│ ├── jobs/

│ ├── candidates/

│ └── layout/

│

├── pages/

│ ├── Auth.jsx

│ ├── Dashboard.jsx

│ ├── Jobs.jsx

│ ├── CreateJob.jsx

│ └── Candidates.jsx

│

├── routes/

│ ├── AppRoutes.jsx

│ └── ProtectedRoute.jsx

│

├── services/

│ ├── api.js

│ ├── authService.js

│ ├── jobService.js

│ └── candidateService.js

│

├── App.jsx

├── main.jsx

└── index.css

---

## Installation

### Clone Repository

git clone https://github.com/RahulGaniger/recruiter-management-frontend

cd recruiter-management-frontend

### Install Dependencies

npm install

### Start Development Server

npm run dev

Application will run on:

http://localhost:5173
https://recruiter-management-frontend.vercel.app

---

## Environment Configuration

Create a .env file in the root directory.

VITE_API_URL=https://recruiter-management-backend.onrender.com

---

## API Integration

The frontend communicates with the FastAPI backend using Axios.

Example:

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL
});

---

## Authentication Flow

1. Recruiter registers
2. Recruiter logs in
3. JWT token stored in localStorage
4. Axios interceptor automatically attaches token
5. Protected routes validate authentication

---

## Candidate Analysis Flow

1. Recruiter selects a job
2. Recruiter uploads resume PDF
3. Resume is sent to backend
4. AI extracts candidate information
5. AI calculates fit score
6. Candidate is stored in database
7. Results are displayed on UI

---

## Available Pages

### Login / Register

Route:

/

### Dashboard

Route:

/dashboard

### Jobs

Route:

/jobs

### Create Job

Route:

/jobs/create

### Candidates

Route:

/candidates

---

## Build for Production

npm run build

Generated build files will be located inside:

dist/

---

## Future Enhancements

* Candidate Ranking
* Candidate Comparison
* Interview Scheduling
* Recruiter Analytics
* Email Notifications
* Resume Download
* Candidate Notes
* Multi-Recruiter Support

---

## Author

Rahul Ganiger

Software Engineer | React | Next.js | FastAPI | Django | AI Applications
