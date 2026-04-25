import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <main>
      <h1>StudyFlow Planner</h1>
      <p>Student task planner for courses, deadlines, and study sessions.</p>

      <TaskForm onTaskCreated={refreshTasks} />
      <TaskList refreshKey={refreshKey} />
    </main>
  );
}

export default App;