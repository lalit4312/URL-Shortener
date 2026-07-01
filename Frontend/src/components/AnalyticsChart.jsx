import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAnalytics } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsChart({ urlId, refreshKey }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!urlId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAnalytics(urlId);
        setData(result);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlId, refreshKey]);

  if (!urlId) {
    return (
      <div className="chart-container">
        <p className="empty">Select a URL to view analytics.</p>
      </div>
    );
  }

  const labels = data.map((d) => d.date);
  const values = data.map((d) => d.clicks);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Clicks",
        data: values,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Clicks (Last 7 Days)" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="chart-container">
      {loading ? (
        <p>Loading chart...</p>
      ) : values.length === 0 ? (
        <p className="empty">No clicks recorded yet.</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}

export default AnalyticsChart;
