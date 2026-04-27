import { useEffect, useState } from "react";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    status: "",
    hours: "",
    minutes: "",
    courseId: "",
    userId: "",
  });

  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 

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

    setSuccess(""); // Clear success when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estimatedHours =
      Number(formData.hours || 0) + Number(formData.minutes || 0) / 60;

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          deadline: formData.deadline,
          priority: formData.priority,
          status: formData.status,
          estimatedHours: estimatedHours,
          courseId: formData.courseId,
          userId: formData.userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        deadline: "",
        priority: "",
        status: "",
        hours: "",
        minutes: "",
        courseId: "",
        userId: "",
      });

      setError("");
      setSuccess("Task created successfully!"); // SUCCESS MESSAGE

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

      onTaskCreated();
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <section>
      <h2>Create New Task</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

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
          <option value="" disabled>
            Select Priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="" disabled>
            Select Progress
          </option>
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="hours"
            type="number"
            min="0"
            placeholder="Hours"
            value={formData.hours}
            onChange={handleChange}
          />

          <select name="minutes" value={formData.minutes} onChange={handleChange}>
            <option value="">Minutes</option>
            <option value="0">00 min</option>
            <option value="5">05 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="20">20 min</option>
            <option value="25">25 min</option>
            <option value="30">30 min</option>
            <option value="35">35 min</option>
            <option value="40">40 min</option>
            <option value="45">45 min</option>
            <option value="50">50 min</option>
            <option value="55">55 min</option>
          </select>
        </div>

        <select name="userId" value={formData.userId} onChange={handleChange}>
          <option value="" disabled>
            Select User
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select name="courseId" value={formData.courseId} onChange={handleChange}>
          <option value="" disabled>
            Select Course
          </option>
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