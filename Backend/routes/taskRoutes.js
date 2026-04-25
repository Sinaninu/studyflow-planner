import express from "express";
import {
  getTasks,
  getTasksByCourse,
  getTasksByUser,
  getTaskDetails,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/course/:courseId", getTasksByCourse);
router.get("/user/:userId", getTasksByUser);
router.get("/:id/details", getTaskDetails);
router.get("/stats/summary", getTaskStats);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;