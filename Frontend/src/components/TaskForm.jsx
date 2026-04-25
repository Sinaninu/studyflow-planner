import { useEffect, useState } from "react";

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

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // FETCH COURSES + USERS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await fetch("http://localhost:5000/api/courses");
        const userRes = await fetch("http://localhost:5000/api/users");

        const courseData = await courseRes.json();
        const userData = await userRes.json();

        setCourses(courseData);
        setUsers(userData);
      } catch (err) {
        setError("Failed to load courses or users");
      }
    };

    fetchData();
  }, []);

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
          step="0.5"
          min="0"
          placeholder="Estimated hours"
          value={formData.estimatedHours}
          onChange={handleChange}
        />

        {/* USER DROPDOWN */}
        <select name="userId" value={formData.userId} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* COURSE DROPDOWN */}
        <select name="courseId" value={formData.courseId} onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <button type="submit">Add Task</button>
      </form>
    </section>
  );
}

export default TaskForm;