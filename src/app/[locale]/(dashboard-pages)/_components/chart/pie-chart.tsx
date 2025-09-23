"use client";

import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Data for Pie Chart
const pieData = [
  { name: "Desktop", value: 75.34 }, // Adjust percentages
  { name: "Mobile", value: 14.8 },
  { name: "Tablet", value: 17.1 },
];

// Config for Pie Chart colors and labels
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#28166F", // Dark blue
  },
  mobile: {
    label: "Mobile",
    color: "#007CC3", // Blue
  },
  tablet: {
    label: "Tablet",
    color: "#BDCDE1", // Light blue
  },
} satisfies ChartConfig;

const COLORS = [chartConfig.desktop.color, chartConfig.mobile.color, chartConfig.tablet.color];

// To display the center text inside the Pie chart
const renderCustomLabel = () => {
  return (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-dark fill-current text-[20px] font-[700]"
    >
      489{"\n"}
      <tspan fontSize="14px" fill="#666">
        Total Students
      </tspan>
    </text>
  );
};

export function PieChartComponent() {
  return (
    <section className="h-full rounded-[8px] border bg-white p-[24px]">
      <div className="mb-[36px] flex items-center justify-between">
        <h6 className="text-high-grey-III text-[14px] font-[700] lg:text-[18px]">Revenue Breakdown</h6>
        <div>
          <IoEllipsisVerticalSharp />
        </div>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={80} // Adjust inner radius for donut effect
              outerRadius={120} // Adjust outer radius for larger size
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(2)}%`} // Display percentage
              // Rendering central text inside pie
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              {renderCustomLabel()}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center">
        <span className="flex items-center text-[12px]">
          <LuDot className="inline h-[60px] w-[60px] text-[#28166F]" />
          <span>Data</span>
        </span>
        <span className="flex items-center text-[12px]">
          <LuDot className="inline h-[60px] w-[60px] text-[#BDCDE1]" />
          <span>Airtime</span>
        </span>
        <span className="flex items-center text-[12px]">
          <LuDot className="inline h-[60px] w-[60px] text-[#007CC3]" />
          <span>Bills</span>
        </span>
      </div>
    </section>
  );
}
