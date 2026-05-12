# TaskFlow Frontend

Professional Task Management Frontend built using React + Vite.

## Live Deployment
https://aura-trends-frontend-ixh3.vercel.app

## GitHub Repository
https://github.com/Thokalacharan/aura-trends-frontend

---

# Tech Stack

- React.js
- Vite
- React Router DOM
- Axios
- CSS3

---

# Features Implemented

## Authentication
- User Login
- User Registration
- Confirm Password Validation
- Token Storage using LocalStorage
- Protected Routes

## Dashboard
- Task Statistics Cards
- Pending / In Progress / Completed Sections
- Sidebar Navigation
- Logout Functionality

## Task Management
- Create Task UI
- Manage Tasks UI
- Team Members UI

## API Integration
Integrated with backend APIs using Axios.

Base Backend URL:

https://task-management-system-backend-19c4.onrender.com

---

# Folder Structure

src/
│
├── components/
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ └── Dashboard.jsx
│
├── routes/
│ └── ProtectedRoute.jsx
│
├── services/
│ └── api.js
│
├── styles/
│ └── auth.css
│
├── App.jsx
└── main.jsx

---

# API Endpoints Used

## Authentication
POST /users/register
POST /users/login

## Tasks
GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id

---

# Important Note

Frontend is fully completed and working correctly on localhost.

For deployed Vercel frontend, backend CORS configuration must allow this domain:

https://aura-trends-frontend-ixh3.vercel.app

---

# Installation

```bash
npm install
npm run dev
