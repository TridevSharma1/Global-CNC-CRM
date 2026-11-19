import React from "react";
import { Icon } from "./Icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-[#0B1F3A] text-xs">
      <div className="text-slate-500 dark:text-slate-400">
        Showing <span className="font-bold text-slate-800 dark:text-white">{startRecord}</span> to{" "}
        <span className="font-bold text-slate-800 dark:text-white">{endRecord}</span> of{" "}
        <span className="font-bold text-[#F57C00]">{totalRecords}</span> records
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span>Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071526] rounded-sm px-2 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-[#3A6EA5]"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex items-center justify-center size-8 border border-slate-300 dark:border-slate-700 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors"
            title="Previous page"
          >
            <Icon name="arrow-left" size={14} />
          </button>

          <span className="px-2 font-bold text-slate-700 dark:text-slate-300">
            {currentPage} / {Math.max(1, totalPages)}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="flex items-center justify-center size-8 border border-slate-300 dark:border-slate-700 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors"
            title="Next page"
          >
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
