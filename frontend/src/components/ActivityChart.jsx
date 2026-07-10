import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ActivityChart({ data }) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)"
      }}
    >

      <h2>Security Activity</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="events"
            stroke="#2563eb"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ActivityChart;