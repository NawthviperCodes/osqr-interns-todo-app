# OSQR Interns To-Do App

A full-stack To-Do application built as part of the OSQR internship training project. The app allows users to create an account, log in, manage personal tasks, update task status, and delete tasks.

## Live Demo

The application is deployed on Render and can be accessed here:

[https://osqr-interns-todo-app.onrender.com/](https://osqr-interns-todo-app.onrender.com/)

## Features

- User registration
- User login
- Protected user sessions using token-based authentication
- Create new to-do tasks
- View personal to-do tasks
- Update task title and completion status
- Delete tasks
- Backend API connected to MongoDB
- Responsive frontend built with React

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment

- Render

## Project Structure

```text
osqr-interns-todo-app/
├── client/          # React frontend
├── server/          # Express backend and API routes
│   ├── models/      # Mongoose models
│   └── app.js       # Main server file
├── package.json
├── render.yaml
├── vite.config.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NawthviperCodes/osqr-interns-todo-app.git
cd osqr-interns-todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the root of the project and add the following values:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 4. Run the project locally

Start the development server:

```bash
npm run dev
```

Start the backend server:

```bash
npm start
```

## Build for Production

```bash
npm run build
```

This creates a production-ready `dist` folder for the frontend. The Express server serves the built frontend files in production.

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Log in an existing user |
| GET | `/api/me` | Get the logged-in user profile |
| POST | `/api/logout` | Log out the user |
| GET | `/api/todos` | Get all tasks for the logged-in user |
| POST | `/api/todos` | Create a new task |
| PUT | `/api/todos/:id` | Update a task |
| DELETE | `/api/todos/:id` | Delete a task |

## Deployment Notes

The app is deployed on Render using the following commands:

```bash
npm install && npm run build
npm start
```

The backend runs with `node server/app.js`, and the frontend is served from the production build folder.

## Author

Developed as part of the OSQR internship program.
