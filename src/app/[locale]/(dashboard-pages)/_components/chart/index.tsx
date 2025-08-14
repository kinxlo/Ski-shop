"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 70 },
  { month: "February", desktop: 305, mobile: 200, tablet: 70 },
  { month: "March", desktop: 237, mobile: 120, tablet: 70 },
  { month: "April", desktop: 73, mobile: 190, tablet: 70 },
  { month: "May", desktop: 209, mobile: 130, tablet: 70 },
  { month: "June", desktop: 214, mobile: 140, tablet: 70 },
  { month: "July", desktop: 214, mobile: 140, tablet: 70 },
  { month: "August", desktop: 214, mobile: 140, tablet: 70 },
  { month: "September", desktop: 214, mobile: 140, tablet: 70 },
  { month: "October", desktop: 214, mobile: 140, tablet: 70 },
  { month: "November", desktop: 214, mobile: 140, tablet: 70 },
  { month: "December", desktop: 214, mobile: 140, tablet: 70 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#28166F",
  },
  tablet: {
    label: "tablet",
    color: "#BDCDE1",
  },
  mobile: {
    label: "Mobile",
    color: "#007CC3",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <section className="rounded-[8px] border bg-white p-[24px]">
      <div className="mb-[36px] flex items-start justify-between lg:items-center">
        <div className="flex flex-col items-center gap-[30px] lg:flex-row">
          <h6 className="text-high-grey-III text-[14px] font-[700] lg:text-[18px]">Overview</h6>
          <div className="flex items-start lg:items-center">
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
        </div>
        <div>
          <IoEllipsisVerticalSharp />
        </div>
      </div>
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={1} />
          <Bar dataKey="tablet" fill="var(--color-tablet)" radius={1} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={1} />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
