import React from "react";
import { Icon } from "./Icons";

export interface FilterOption {
  value: string;
  label: string;
}

export const defaultMonthOptions: FilterOption[] = [
  { value: "All", label: "All Months (FY 25-26)" },
  { value: "2026-01", label: "January 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-03", label: "March 2026" },
  { value: "2026-04", label: "April 2026" },
  { value: "2026-05", label: "May 2026" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-08", label: "August 2026" },
  { value: "2026-09", label: "September 2026" },
  { value: "2026-10", label: "October 2026" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "December 2026" },
];

export const defaultMachineOptions: FilterOption[] = [
  { value: "All", label: "All Machine Lines" },
  { value: "VMC Machines", label: "VMC Machines (Vertical Machining)" },
  { value: "CNC Machines", label: "CNC Machines (Turning & Lathe)" },
  { value: "Special Purpose Machines", label: "Special Purpose Machines (SPMs)" },
  { value: "Automation Solutions", label: "Automation Solutions & Robotics" },
  { value: "Machine Parts", label: "Machine Parts & Tooling" },
];

interface MultiFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchPlaceholder?: string;
  machineFilter: string;
  onMachineChange: (val: string) => void;
  machineOptions?: FilterOption[];
  monthFilter: string;
  onMonthChange: (val: string) => void;
  monthOptions?: FilterOption[];
  statusFilter: string;
  onStatusChange: (val: string) => void;
  statusOptions: FilterOption[];
  secondaryFilter?: string;
  onSecondaryChange?: (val: string) => void;
  secondaryLabel?: string;
  secondaryOptions?: FilterOption[];
  totalItems: number;
  filteredCount: number;
  totalFilteredAmount?: number;
  onResetAll: () => void;
}

export const MultiFilterBar: React.FC<MultiFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search records...",
  machineFilter,
  onMachineChange,
  machineOptions = defaultMachineOptions,
  monthFilter,
  onMonthChange,
  monthOptions = defaultMonthOptions,
  statusFilter,
  onStatusChange,
  statusOptions,
  secondaryFilter,
  onSecondaryChange,
  secondaryLabel = "Category",
  secondaryOptions,
  totalItems,
  filteredCount,
  totalFilteredAmount,
  onResetAll,
}) => {
  const isAnyFilterActive =
    searchQuery.trim().length > 0 ||
    machineFilter !== "All" ||
    monthFilter !== "All" ||
    statusFilter !== "All" ||
    (secondaryFilter && secondaryFilter !== "All");

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm space-y-3 shadow-xs">
      {/* Top Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-2 lg:col-span-4 relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-xs text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-[#3A6EA5]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <Icon name="close" size={13} />
            </button>
          )}
        </div>

        {/* Machine-Wise Filter Dropdown */}
        <div className="lg:col-span-3">
          <label className="sr-only">Machine Filter</label>
          <div className="relative">
            <select
              value={machineFilter}
              onChange={(e) => onMachineChange(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-xs text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5] appearance-none pr-8 cursor-pointer"
            >
              {machineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">
              <Icon name="chevron-down" size={13} />
            </span>
          </div>
        </div>

        {/* Month Filter Dropdown */}
        <div className="lg:col-span-2">
          <label className="sr-only">Month Filter</label>
          <div className="relative">
            <select
              value={monthFilter}
              onChange={(e) => onMonthChange(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-xs text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5] appearance-none pr-8 cursor-pointer"
            >
              {monthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">
              <Icon name="chevron-down" size={13} />
            </span>
          </div>
        </div>

        {/* Status Filter Dropdown */}
        <div className="lg:col-span-2">
          <label className="sr-only">Status Filter</label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-xs text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5] appearance-none pr-8 cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">
              <Icon name="chevron-down" size={13} />
            </span>
          </div>
        </div>

        {/* Optional Secondary Dropdown (e.g. Type, Sourcing or Expense Category) */}
        {secondaryOptions && onSecondaryChange && (
          <div className="lg:col-span-1">
            <label className="sr-only">{secondaryLabel}</label>
            <div className="relative">
              <select
                value={secondaryFilter || "All"}
                onChange={(e) => onSecondaryChange(e.target.value)}
                className="w-full px-2.5 py-2 text-xs font-semibold bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-xs text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5] appearance-none pr-6 cursor-pointer"
                title={secondaryLabel}
              >
                {secondaryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-slate-400">
                <Icon name="chevron-down" size={11} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Active Multi-Select Filter Badges & Summary Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Active Filters:
          </span>

          {!isAnyFilterActive ? (
            <span className="text-slate-400 text-xs italic">Showing all {totalItems} records</span>
          ) : (
            <>
              {machineFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold bg-orange-50 dark:bg-orange-950/40 text-[#F57C00] border border-orange-200 dark:border-orange-800">
                  <span>Machine: {machineFilter}</span>
                  <button onClick={() => onMachineChange("All")} className="hover:text-red-600">
                    <Icon name="close" size={11} />
                  </button>
                </span>
              )}

              {monthFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#3A6EA5] border border-blue-200 dark:border-blue-800">
                  <span>
                    Month: {monthOptions.find((m) => m.value === monthFilter)?.label || monthFilter}
                  </span>
                  <button onClick={() => onMonthChange("All")} className="hover:text-red-600">
                    <Icon name="close" size={11} />
                  </button>
                </span>
              )}

              {statusFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                  <span>Status: {statusFilter}</span>
                  <button onClick={() => onStatusChange("All")} className="hover:text-red-600">
                    <Icon name="close" size={11} />
                  </button>
                </span>
              )}

              {secondaryFilter && secondaryFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 border border-purple-200 dark:border-purple-800">
                  <span>
                    {secondaryLabel}: {secondaryFilter}
                  </span>
                  <button
                    onClick={() => onSecondaryChange && onSecondaryChange("All")}
                    className="hover:text-red-600"
                  >
                    <Icon name="close" size={11} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button onClick={() => onSearchChange("")} className="hover:text-red-600">
                    <Icon name="close" size={11} />
                  </button>
                </span>
              )}

              <button
                onClick={onResetAll}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-1"
              >
                Reset All Filters
              </button>
            </>
          )}
        </div>

        {/* Results count & filtered total valuation */}
        <div className="flex items-center gap-3 text-xs">
          <div className="text-slate-500 dark:text-slate-400">
            Filtered:{" "}
            <strong className="text-slate-800 dark:text-slate-100">{filteredCount}</strong> of{" "}
            {totalItems} records
          </div>
          {typeof totalFilteredAmount === "number" && (
            <div className="text-xs font-mono font-bold text-slate-800 dark:text-white px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-xs">
              Total: {formatPrice(totalFilteredAmount)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
