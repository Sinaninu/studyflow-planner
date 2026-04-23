import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Task from "../models/Task.js";
import StudySession from "../models/StudySession.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Course.deleteMany();
    await Task.deleteMany();
    await StudySession.deleteMany();

    const users = await User.insertMany([
      {
        name: "Joy Daniel",
        email: "joy@student.se",
        studyProgram: "Software Development",
      },
      {
        name: "Sara Andrew",
        email: "sara.andrew@student.se",
        studyProgram: "Computer Science",
      },
      {
        name: "Elias Johnson",
        email: "elias.johnson@student.se",
        studyProgram: "Web Development",
      },
      {
        name: "Hanna Berg",
        email: "hanna.berg@student.se",
        studyProgram: "Information Systems",
      },
      {
        name: "Josh Alan",
        email: "josh.alan@student.se",
        studyProgram: "Software Development",
      },
    ]);

    const courses = await Course.insertMany([
      {
        title: "Algorithms and Data Structures",
        code: "DA256G",
        semester: "Spring 2026",
        color: "blue",
        userId: users[0]._id,
      },
      {
        title: "Operating Systems",
        code: "DT271C",
        semester: "Spring 2026",
        color: "green",
        userId: users[0]._id,
      },
      {
        title: "Fullstack Development",
        code: "DA219B",
        semester: "Spring 2026",
        color: "purple",
        userId: users[0]._id,
      },
      {
        title: "Database Systems",
        code: "DB201A",
        semester: "Spring 2026",
        color: "orange",
        userId: users[1]._id,
      },
      {
        title: "Human Computer Interaction",
        code: "HCI102",
        semester: "Spring 2026",
        color: "pink",
        userId: users[2]._id,
      },
    ]);

    await Task.insertMany([
      {
        title: "Finish sorting report",
        description: "Complete the analysis and discussion for Seminar 1 sorting algorithms.",
        deadline: new Date("2026-04-25"),
        priority: "high",
        status: "pending",
        estimatedHours: 4,
        courseId: courses[0]._id,
        userId: users[0]._id,
      },
      {
        title: "Review process scheduling notes",
        description: "Read and summarize the CPU scheduling chapter before the seminar.",
        deadline: new Date("2026-04-24"),
        priority: "medium",
        status: "in-progress",
        estimatedHours: 2,
        courseId: courses[1]._id,
        userId: users[0]._id,
      },
      {
        title: "Build task API routes",
        description: "Implement CRUD routes for the StudyFlow Planner backend.",
        deadline: new Date("2026-04-26"),
        priority: "high",
        status: "pending",
        estimatedHours: 5,
        courseId: courses[2]._id,
        userId: users[0]._id,
      },
      {
        title: "Prepare ERD diagram",
        description: "Create the data model diagram for the report PDF.",
        deadline: new Date("2026-04-27"),
        priority: "medium",
        status: "pending",
        estimatedHours: 2,
        courseId: courses[3]._id,
        userId: users[1]._id,
      },
      {
        title: "Write usability reflection",
        description: "Draft a short reflection about user interface choices in the report.",
        deadline: new Date("2026-04-28"),
        priority: "low",
        status: "completed",
        estimatedHours: 1,
        courseId: courses[4]._id,
        userId: users[2]._id,
      },
    ]);

    await StudySession.insertMany([
      {
        date: new Date("2026-04-22T10:00:00"),
        durationMinutes: 90,
        topic: "QuickSort analysis",
        location: "Library",
        courseId: courses[0]._id,
        userId: users[0]._id,
      },
      {
        date: new Date("2026-04-22T14:00:00"),
        durationMinutes: 60,
        topic: "CPU scheduling revision",
        location: "Home desk",
        courseId: courses[1]._id,
        userId: users[0]._id,
      },
      {
        date: new Date("2026-04-23T09:00:00"),
        durationMinutes: 120,
        topic: "Backend route development",
        location: "Campus study room",
        courseId: courses[2]._id,
        userId: users[0]._id,
      },
      {
        date: new Date("2026-04-23T16:30:00"),
        durationMinutes: 45,
        topic: "ERD planning",
        location: "Library",
        courseId: courses[3]._id,
        userId: users[1]._id,
      },
      {
        date: new Date("2026-04-24T11:00:00"),
        durationMinutes: 75,
        topic: "Interface review",
        location: "Computer lab",
        courseId: courses[4]._id,
        userId: users[2]._id,
      },
    ]);

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedData();