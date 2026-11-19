import React from "react";
import { Icon } from "./Icons";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No records found",
  description = "Try adjusting your search criteria, clearing filters, or create a new entry.",
  actionText,
  onAction,
  icon = "search",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm">
      <div className="flex items-center justify-center size-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4">
        <Icon name={icon} size={28} />
      </div>
      <h4 className="text-base font-bold text-slate-800 dark:text-white">{title}</h4>
      <p className="max-w-md text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs rounded-sm transition-colors shadow-sm"
        >
          <Icon name="plus" size={14} />
          {actionText}
        </button>
      )}
    </div>
  );
};
