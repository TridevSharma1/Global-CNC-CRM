import React from "react";
import { Icon } from "../common/Icons";
import { testimonialsData } from "../../data/testimonials";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>CUSTOMER ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Trusted By India’s Leading Manufacturers.
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Hear directly from production heads, capital equipment buyers, and manufacturing
            directors running Global CNC platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-8 rounded-sm shadow-xs flex flex-col justify-between hover:border-[#3A6EA5] transition-all"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[#F57C00] mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Icon key={i} name="star" size={16} />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] dark:text-white">
                    {item.client}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.designation} ·{" "}
                    <strong className="text-slate-700 dark:text-slate-200">{item.company}</strong>
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#F57C00] bg-orange-50 dark:bg-orange-950/40 px-2 py-1 rounded-xs">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
