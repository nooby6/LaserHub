"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * AttendanceChart component renders a bar chart displaying attendance data.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - The attendance data to be displayed in the chart.
 * @param {string} props.data[].name - The name of the individual or entity.
 * @param {number} props.data[].present - The number of present days.
 * @param {number} props.data[].absent - The number of absent days.
 *
 * @returns {JSX.Element} A responsive bar chart visualizing attendance data.
 *
 * @example
 * const data = [
 *   { name: 'John Doe', present: 20, absent: 5 },
 *   { name: 'Jane Smith', present: 18, absent: 7 },
 * ];
 * 
 * <AttendanceChart data={data} />
 */
const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart width={500} height={300} data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
        />
        <Bar
          dataKey="present"
          fill="#FAE27C"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="absent"
          fill="#C3EBFA"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;