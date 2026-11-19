import React from "react";

interface BrandProps {
  inverse?: boolean;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Brand: React.FC<BrandProps> = ({
  inverse = false,
  showSubtitle = true,
  size = "md",
}) => {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap select-none">
      {/* Industrial Logo Mark */}
      <div
        className={`flex items-center justify-center font-black tracking-tight rounded-sm transition-transform shrink-0 ${
          isLarge ? "size-11 text-lg" : isSmall ? "size-8 text-xs" : "size-9 text-sm"
        } bg-[#F57C00] text-white shadow-sm border border-[#F57C00]/30`}
      >
        <span>G</span>
        <span className="text-[10px] text-[#0B1F3A] font-extrabold ml-0.5">C</span>
      </div>

      <div className="shrink-0 text-left">
        <div
          className={`font-black leading-tight tracking-[0.03em] whitespace-nowrap ${
            isLarge ? "text-xl" : isSmall ? "text-sm" : "text-[14px] sm:text-[15px]"
          } ${inverse ? "text-white" : "text-[#0B1F3A] dark:text-white"}`}
        >
          GLOBAL CNC <span className="text-[#F57C00] font-bold text-xs ml-0.5">PVT. LTD.</span>
        </div>
        {showSubtitle && (
          <div
            className={`font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] whitespace-nowrap leading-tight mt-0.5 ${
              isLarge ? "text-[10px]" : "text-[8.5px] sm:text-[9px]"
            } ${inverse ? "text-white/70" : "text-slate-500 dark:text-slate-400"}`}
          >
            Bhosari, Pune <span className="text-[#F57C00]">·</span> Shailesh Bhor Enterprise
          </div>
        )}
      </div>
    </div>
  );
};
