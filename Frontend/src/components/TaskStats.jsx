import { useEffect, useState } from "react";

function TaskStats({ refreshKey }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/tasks/stats/summary");

        if (!res.ok) {
          throw new Error("Failed to fetch task statistics");
        }

        const data = await res.json();
        setStats(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [refreshKey]);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="message error-message">{error}</p>;
  if (!stats) return <p>No statistics available.</p>;

  return (
    <section>
      <h2>Task Statistics</h2>
      <p>Total Tasks: {stats.totalTasks}</p>
      <p>Completed: {stats.completedTasks}</p>
      <p>Pending: {stats.pendingTasks}</p>
      <p>In Progress: {stats.inProgressTasks}</p>
      <p>
        Total Estimated Time:{" "}
        <strong>{formatHours(stats.totalEstimatedHours)}</strong>
      </p>
    </section>
  );
}

export default TaskStats;