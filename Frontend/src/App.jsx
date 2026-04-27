import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskStats from "./components/TaskStats";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState("home");

  const refreshTasks = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main>
      <section className="hero">
        <h1>StudyFlow Planner</h1>
        <p>Your personal study dashboard for tasks, deadlines, and progress.
          Create course tasks, set deadlines, track progress, and view
      statistics about your workload. Use the navigation below to add a
      new task, manage your task list, or check your study progress.

        </p>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("add")}>Add Task</button>
          <button onClick={() => setPage("tasks")}>View Tasks</button>
          <button onClick={() => setPage("stats")}>Statistics</button>
        </div>
      </section>

      {page === "home" && (
        <section className="home-empty">
          <p>Select an option above to get started.</p>
        </section>
      )}

      {page === "add" && <TaskForm onTaskCreated={refreshTasks} />}

      {page === "tasks" && <TaskList refreshKey={refreshKey} />}

      {page === "stats" && <TaskStats refreshKey={refreshKey} />}
    </main>
  );
}

export default App;