import { useState } from "react";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
    status: "pending",
    estimatedHours: "",
    courseId: "",
    userId: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          estimatedHours: Number(formData.estimatedHours),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      setFormData({
        title: "",
        description: "",
        deadline: "",
        priority: "medium",
        status: "pending",
        estimatedHours: "",
        courseId: "",
        userId: "",
      });

      setError("");
      onTaskCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h2>Create New Task</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
        />

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          name="estimatedHours"
          type="number"
          step="0.25"
          placeholder="Estimated hours"
          value={formData.estimatedHours}
          onChange={handleChange}
        />

        <input
          name="courseId"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={handleChange}
        />

        <input
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
        />

        <button type="submit">Add Task</button>
      </form>
    </section>
  );
}

export default TaskForm;