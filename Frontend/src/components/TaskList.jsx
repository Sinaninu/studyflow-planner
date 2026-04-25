import { useEffect, useState } from "react";

function TaskList({refreshKey}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> — {task.priority} — {task.status}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;