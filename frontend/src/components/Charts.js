import {
  PieChart, Pie, Tooltip,
  BarChart, Bar, XAxis, YAxis
} from "recharts";

export default function Charts({ data }) {
  return (
    <div className="glass" style={{ padding: 20 }}>
      <h3>📊 Analytics</h3>

      <PieChart width={300} height={200}>
        <Pie data={data} dataKey="amount" nameKey="category" outerRadius={80} />
        <Tooltip />
      </PieChart>

      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" />
      </BarChart>
    </div>
  );
}