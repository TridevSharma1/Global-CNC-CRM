import React from "react";

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 p-4 animate-pulse">
      <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-sm w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-sm flex-1" />
          <div className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-sm w-32" />
          <div className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-sm w-24" />
        </div>
      ))}
    </div>
  );
};
