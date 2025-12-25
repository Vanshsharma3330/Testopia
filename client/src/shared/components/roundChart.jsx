import { PieChart, Pie, Cell } from "recharts";

export default function RoundChart({ data }) {
  // Colors for the chart
  const COLORS = ["#1ca985", "#F5F5F5"]; // Green for accuracy, Light gray for remaining

  return (
    <PieChart width={30} height={30}>
      <Pie
        data={data}
        cx={10}
        cy={10}
        innerRadius={9}
        outerRadius={14}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
        startAngle={90}
        endAngle={450} // Changed from -270 to 450
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} strokeWidth={0} />
        ))}
      </Pie>
    </PieChart>
  );
}
