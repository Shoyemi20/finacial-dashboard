import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useDarkMode } from "../context/DarkModeContext";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ expenses }) => {
  const { isDarkMode } = useDarkMode();

  // Sample data - replace with your actual expense categories
  const categories = {
    "Food & Dining": 1200,
    "Transportation": 800,
    "Housing": 2000,
    "Entertainment": 500,
    "Utilities": 600
  };

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#8AC24A", "#EA5545", "#F46A9B", "#EF9B20"
        ],
        hoverBackgroundColor: [
          "#FF4D6D", "#2A9D8F", "#FFB703", "#3AAFA9", "#7B6BFF",
          "#FF8A1F", "#7CB342", "#D32F2F", "#E91E63", "#FF9800"
        ],
        borderWidth: 2,
        borderColor: isDarkMode ? "#1E293B" : "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#E2E8F0" : "#64748B",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        bodyColor: isDarkMode ? "#E2E8F0" : "#1E293B",
        backgroundColor: isDarkMode ? "#334155" : "#F8FAFC",
        borderColor: isDarkMode ? "#475569" : "#E2E8F0",
        titleColor: isDarkMode ? "#F8FAFC" : "#1E293B",
      },
    },
    elements: {
      arc: {
        borderWidth: isDarkMode ? 1 : 2,
      },
    },
  };

  return (
    <div className={`p-6 shadow-lg rounded-xl w-full max-w-md mx-auto transition-colors ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <h3 className={`text-lg font-semibold text-center mb-4 ${
        isDarkMode ? "text-gray-200" : "text-gray-700"
      }`}>
        Expense Breakdown
      </h3>
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;

