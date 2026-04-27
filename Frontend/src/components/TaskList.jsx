import { useEffect, useState } from "react";

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");

  const formatHours = (hours) => {
    if (!hours && hours !== 0) return "";

    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    if (m === 0) return `${h}h`;
    if (h === 0) return `${m}m`;

    return `${h}h ${m}m`;
  };

  const fetchTasks = async (showLoading = false) => {
  try {
    if (showLoading) {
      setLoading(true);
    }

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
    if (showLoading) {
      setLoading(false);
    }
  }
 };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      fetchTasks(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (task) => {
    const hours = Math.floor(task.estimatedHours);
    const minutes = Math.round((task.estimatedHours - hours) * 60);

    setEditingTaskId(task._id);

    setEditData({
      title: task.title,
      description: task.description,
      deadline: task.deadline.split("T")[0],
      priority: task.priority,
      status: task.status,
      hours: hours,
      minutes: minutes,
      courseId: task.courseId,
      userId: task.userId,
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editData.title,
            description: editData.description,
            deadline: editData.deadline,
            priority: editData.priority,
            status: editData.status,
            estimatedHours:
              Number(editData.hours ?? 0) +
              Number(editData.minutes ?? 0) / 60,
            courseId: editData.courseId,
            userId: editData.userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      setEditingTaskId(null);
      fetchTasks(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
  fetchTasks(true);

  const intervalId = setInterval(() => {
    fetchTasks(false);
  }, 10000);

  return () => clearInterval(intervalId);
  }, [refreshKey]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Tasks</h2>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTasks.length === 0 ? (
        <p>No matching tasks found.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
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

                  {/* FIXED TIME INPUT */}
                  <div className="time-input">
                    <input
                      type="number"
                      placeholder="Hours"
                      min="0"
                      value={editData.hours ?? ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          hours: e.target.value,
                        })
                      }
                    />

                    <select
                      value={editData.minutes ?? ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          minutes: e.target.value,
                        })
                      }
                    >
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

                  <button onClick={() => handleUpdate(task._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingTaskId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong> | {task.priority} |{" "}
                  {task.status} | {task.deadline?.split("T")[0]} |{" "}
                  {formatHours(task.estimatedHours)}
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