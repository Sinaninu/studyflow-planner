import mongoose from "mongoose";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

// GET ALL TASKS (/api/tasks)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// GET ONE TASK (/api/tasks/:id)
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

//CREATE TASK (POST /api/tasks)
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      deadline,
      priority,
      status,
      estimatedHours,
      courseId,
      userId,
    } = req.body;

    if (
      !title ||
      !description ||
      !deadline ||
      !priority ||
      estimatedHours === undefined ||
      !courseId ||
      !userId
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    // Check if related data exists
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create task
    const newTask = await Task.create({
      title,
      description,
      deadline,
      priority,
      status,
      estimatedHours,
      courseId,
      userId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE TASK(PUT /api/tasks/:id)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      deadline,
      priority,
      status,
      estimatedHours,
      courseId,
      userId,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    if (
      !title ||
      !description ||
      !deadline ||
      !priority ||
      !status ||
      estimatedHours === undefined ||
      !courseId ||
      !userId
    ) {
      return res.status(400).json({ message: "All fields are required for update" });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        deadline,
        priority,
        status,
        estimatedHours,
        courseId,
        userId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE TASK (DELETE /api/tasks/:id)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};