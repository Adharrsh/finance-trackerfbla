import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieChartProps {
  data: { category: string; amount: number }[];
}

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

const CustomPieChart: React.FC<PieChartProps> = ({ data }) => {
  const totalAmount = data.reduce(
    (sum, category) => sum + parseFloat(category.amount),
    0
  );
  const chartData = data.map((category) => ({
    name: category.category,
    value: (parseFloat(category.amount) / parseFloat(totalAmount)) * 100,
  }));

  console.log("totalAmount:", parseFloat(totalAmount));
  console.log("chartData:", chartData);

  return (
    <PieChart width={430} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="60%"
        cy="60%"
        outerRadius={100}
        fill="#8884d8"
        /** */
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
