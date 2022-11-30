import "./Charts.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts({ title, data, dataKey1,dataKey2, grid }) {
  return (
    <div className="chart">
      {/* <h3 className="chartTitle">{title}</h3> */}
      <h3 className="h3Title">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" padding={{ left: 30, right: 30 }} />
          {/* <YAxis /> */}
          <Line type="monotone" dataKey={dataKey1} stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey2} stroke="#82ca9d" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
