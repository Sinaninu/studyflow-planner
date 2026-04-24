import mongoose from "mongoose";
import Course from "../models/Course.js";

// GET ALL COURSES (/api/courses)
export const getCourses = async (req, res) => {
  try {
    const { userId } = req.query;

    const filter = {};

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      filter.userId = userId;
    }

    const courses = await Course.find(filter).sort({ title: 1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};