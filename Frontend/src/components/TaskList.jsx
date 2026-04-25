import { useEffect, useState } from "react";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/tasks");

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      deadline: task.deadline.split("T")[0],
      priority: task.priority,
      status: task.status,
      estimatedHours: task.estimatedHours,
      courseId: task.courseId,
      userId: task.userId,
    });
  };

  // HANDLE CHANGE
  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE UPDATE
  const handleUpdate = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editData,
            estimatedHours: Number(editData.estimatedHours),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
  fetchTasks();

  const intervalId = setInterval(() => {
    fetchTasks();
  }, 10000);

  return () => {
    clearInterval(intervalId);
  };
  }, [refreshKey]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {editingTaskId === task._id ? (
                <>
                  <input
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                  />
                  <input
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="deadline"
                    value={editData.deadline}
                    onChange={handleEditChange}
                  />

                  <select
                    name="priority"
                    value={editData.priority}
                    onChange={handleEditChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <input
                    name="estimatedHours"
                    type="number"
                    value={editData.estimatedHours}
                    onChange={handleEditChange}
                  />

                  <button onClick={() => handleUpdate(task._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingTaskId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong> — {task.priority} — {task.status}
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;