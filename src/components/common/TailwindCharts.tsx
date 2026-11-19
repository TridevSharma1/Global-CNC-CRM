import React from "react";
import { Icon } from "./Icons";

interface BarDataPoint {
  label: string;
  sales: number;
  purchases: number;
}

export const MonthlyBarChart: React.FC<{ data?: BarDataPoint[] }> = ({
  data = [
    { label: "Jan", sales: 75, purchases: 45 },
    { label: "Feb", sales: 88, purchases: 52 },
    { label: "Mar", sales: 110, purchases: 65 },
    { label: "Apr", sales: 95, purchases: 58 },
    { label: "May", sales: 125, purchases: 72 },
    { label: "Jun", sales: 140, purchases: 80 },
    { label: "Jul", sales: 130, purchases: 76 },
    { label: "Aug", sales: 155, purchases: 85 },
    { label: "Sep", sales: 168, purchases: 92 },
    { label: "Oct", sales: 180, purchases: 98 },
    { label: "Nov", sales: 210, purchases: 115 },
    { label: "Dec", sales: 195, purchases: 105 },
  ],
}) => {
  const maxVal = Math.max(...data.flatMap((d) => [d.sales, d.purchases]), 220);

  return (
    <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-extrabold text-[#0B1F3A] dark:text-white uppercase tracking-wider">
            Commercial Volume Overview
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monthly Sales vs Material Purchases (₹ Lakhs)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="size-3 bg-[#3A6EA5] rounded-xs" />
            Machine Sales
          </span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="size-3 bg-[#F57C00] rounded-xs" />
            Purchases & Stores
          </span>
        </div>
      </div>

      {/* Tailwind Chart Area */}
      <div className="relative h-56 flex items-end justify-between gap-2 border-b border-l border-slate-200 dark:border-slate-800 pt-6 px-2">
        {/* Horizontal reference grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
          <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
          <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
          <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
        </div>

        {data.map((item, idx) => {
          const salesHeight = Math.round((item.sales / maxVal) * 100);
          const purHeight = Math.round((item.purchases / maxVal) * 100);

          return (
            <div
              key={idx}
              className="group relative flex-1 flex flex-col items-center justify-end h-full z-10"
            >
              <div className="w-full flex items-end justify-center gap-1 h-full">
                {/* Sales Bar */}
                <div
                  style={{ height: `${salesHeight}%` }}
                  className="w-1/2 max-w-[14px] bg-[#3A6EA5] group-hover:bg-[#2563EB] transition-all rounded-t-xs"
                  title={`Sales: ₹${item.sales}L`}
                />
                {/* Purchases Bar */}
                <div
                  style={{ height: `${purHeight}%` }}
                  className="w-1/2 max-w-[14px] bg-[#F57C00] group-hover:bg-amber-500 transition-all rounded-t-xs"
                  title={`Purchases: ₹${item.purchases}L`}
                />
              </div>

              {/* Month label */}
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2">
                {item.label}
              </span>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-[#0B1F3A] text-white text-[10px] p-2 rounded-sm shadow-xl z-30 whitespace-nowrap pointer-events-none">
                <span className="font-bold text-[#F57C00]">{item.label} 2026</span>
                <span>Sales: ₹{item.sales}L</span>
                <span>Purchases: ₹{item.purchases}L</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DonutMetric: React.FC<{
  title: string;
  percentage: number;
  label: string;
  color?: string;
}> = ({ title, percentage, label, color = "#F57C00" }) => {
  const strokeDashoffset = 100 - percentage;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{title}</span>
      <div className="relative size-24 flex items-center justify-center">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-200 dark:text-slate-800"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            style={{ stroke: color }}
            strokeDasharray="100, 100"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="3.5"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-lg font-black text-slate-800 dark:text-white">{percentage}%</span>
        </div>
      </div>
      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
        {label}
      </span>
    </div>
  );
};

export const StatCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: string;
  subtitle?: string;
  accentColor?: "blue" | "orange" | "green" | "navy";
  onClick?: () => void;
}> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  accentColor = "blue",
  onClick,
}) => {
  const colorMap = {
    blue: "bg-sky-500/10 text-[#3A6EA5] border-sky-200 dark:border-sky-800/40",
    orange: "bg-[#F57C00]/10 text-[#F57C00] border-amber-200 dark:border-amber-800/40",
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800/40",
    navy: "bg-[#0B1F3A]/10 text-[#0B1F3A] dark:text-slate-200 border-slate-300 dark:border-slate-700",
  }[accentColor];

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm transition-all hover:border-[#3A6EA5]/60 hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-xs border ${colorMap}`}>
          <Icon name={icon} size={18} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
          {value}
        </div>
        {change && (
          <span
            className={`text-xs font-bold ${
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">{subtitle}</div>
      )}
    </div>
  );
};
