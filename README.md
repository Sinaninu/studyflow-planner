# StudyFlow Planner

StudyFlow Planner is a fullstack web application that helps students manage course tasks, deadlines, priorities, progress, and estimated study time.

## Problem Statement

Students often have tasks from several courses at the same time. StudyFlow Planner helps organize deadlines, workload, and progress in one place.

## Tech Stack

- React with Vite
- Express.js
- MongoDB Atlas
- Mongoose
- Node.js
- Concurrently

## Features

- Create study tasks
- View all tasks
- Edit tasks inline
- Delete tasks with confirmation
- Search tasks by title
- Auto-refresh task list
- View task statistics
- Link tasks to users and courses

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/Sinaninu/studyflow-planner.git

cd studyflow-planner

### 2. Install dependencies

npm install
npm install --prefix backend
npm install --prefix frontend

### 3. Create the environment file

Inside the `backend` folder, create a file named `.env`.

Add the following:
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000

### Important:
- Replace `your_mongodb_atlas_connection_string` with your own MongoDB Atlas URI
- Do NOT commit the `.env` file to GitHub

### 4. Seed the database
 npm run seed --prefix backend

 ### 5. Run the project
  npm run dev

### 6. Access the application

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

## Author
Sina Estifanos

Kristianstad University

GitHub: https://github.com/Sinaninu