import React from "react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
  const norm = (status || "").toLowerCase();

  let style =
    "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  let dotColor = "bg-slate-400";

  if (
    norm.includes("approved") ||
    norm.includes("completed") ||
    norm.includes("operational") ||
    norm.includes("active") ||
    norm.includes("in stock") ||
    norm.includes("paid") ||
    norm.includes("won") ||
    norm.includes("cleared") ||
    norm.includes("preferred")
  ) {
    style =
      "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
    dotColor = "bg-emerald-500";
  } else if (
    norm.includes("progress") ||
    norm.includes("transit") ||
    norm.includes("testing") ||
    norm.includes("assembly") ||
    norm.includes("quotation") ||
    norm.includes("negotiation") ||
    norm.includes("scheduled") ||
    norm.includes("tier")
  ) {
    style =
      "bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800";
    dotColor = "bg-sky-500";
  } else if (
    norm.includes("pending") ||
    norm.includes("review") ||
    norm.includes("new") ||
    norm.includes("contacted") ||
    norm.includes("renewal") ||
    norm.includes("low stock") ||
    norm.includes("maintenance") ||
    norm.includes("on hold")
  ) {
    style =
      "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
    dotColor = "bg-[#F57C00]";
  } else if (
    norm.includes("out of stock") ||
    norm.includes("rejected") ||
    norm.includes("lost") ||
    norm.includes("expired") ||
    norm.includes("breakdown") ||
    norm.includes("overdue") ||
    norm.includes("returned")
  ) {
    style =
      "bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800";
    dotColor = "bg-rose-500";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-sm border whitespace-nowrap transition-colors ${
        size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"
      } ${style}`}
    >
      <span className={`size-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
};
