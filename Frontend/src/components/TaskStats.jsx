import { useEffect, useState } from "react";

function TaskStats({ refreshKey }) {
  const [stats, setStats] = useState(null);

  // Format hours into "Xh Ym"
  const formatHours = (hours) => {
    if (!hours) return "0h";

    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    if (m === 0) return `${h}h`;
    if (h === 0) return `${m}m`;

    return `${h}h ${m}m`;
  };

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
  }, [refreshKey]);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <section>
      <h2>Task Statistics</h2>
      <p>Total Tasks: {stats.totalTasks}</p>
      <p>Completed: {stats.completedTasks}</p>
      <p>Pending: {stats.pendingTasks}</p>
      <p>In Progress: {stats.inProgressTasks}</p>

      {/*FIXED DISPLAY */}
      <p>
        Total Estimated Time:{" "}
        <strong>{formatHours(stats.totalEstimatedHours)}</strong>
      </p>
    </section>
  );
}

export default TaskStats;