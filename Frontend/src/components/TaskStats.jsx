import { useEffect, useState } from "react";

function TaskStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/tasks/stats/summary"
        );
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <section>
      <h2>Task Statistics</h2>
      <p>Total Tasks: {stats.totalTasks}</p>
      <p>Completed: {stats.completedTasks}</p>
      <p>Pending: {stats.pendingTasks}</p>
      <p>In Progress: {stats.inProgressTasks}</p>
      <p>Total Estimated Hours: {stats.totalEstimatedHours}</p>
    </section>
  );
}

export default TaskStats;