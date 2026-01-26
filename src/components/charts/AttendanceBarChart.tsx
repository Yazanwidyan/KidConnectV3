// src/components/charts/AttendanceBarChart.tsx

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface AttendanceBarChartProps {
  labels: string[]
  data: number[]
  label?: string
}

export const AttendanceBarChart = ({
  labels,
  data,
  label = 'Students Checked In',
}: AttendanceBarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: ['#2081E2', '#67A9F0', '#105FAF'], // shades of 2081E2
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: false,
        text: label,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30, // adjust if your max students per room differs
      },
    },
  }

  return <Bar data={chartData} options={options} />
}
