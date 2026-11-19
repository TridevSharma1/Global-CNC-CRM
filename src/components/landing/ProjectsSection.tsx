import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { projectsData } from "../../data/projects";

interface ProjectsSectionProps {
  onOpenInquiry: (projectName?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenInquiry }) => {
  const [filterType, setFilterType] = useState<string>("All");

  const types = [
    "All",
    "Special Purpose Machine",
    "Vertical Machining Centre",
    "Automation Solution",
    "CNC Turning Centre",
  ];

  const filteredProjects = projectsData.filter(
    (p) => filterType === "All" || p.machineType === filterType,
  );

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
              <span className="h-px w-6 bg-[#F57C00]" />
              <span>DELIVERED ENGINEERING CASES (25 PROJECTS)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
              Real Shop Floor Solutions. Turnkey Precision.
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Explore how Global CNC partners with India’s foremost industrial leaders to solve
              complex machining challenges.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry("Custom Turnkey Project")}
            className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Discuss Your Project</span>
            <Icon name="arrow-right" size={14} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-3 border-b border-slate-200 dark:border-slate-800">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                filterType === t
                  ? "bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white"
                  : "bg-slate-100 dark:bg-[#0B1F3A] text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm flex flex-col justify-between hover:border-[#3A6EA5] hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-2">
                  <span className="font-mono text-[#F57C00] font-black">{proj.projectCode}</span>
                  <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-xs text-slate-700 dark:text-slate-300">
                    {proj.machineType}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-2 leading-snug">
                  {proj.name}
                </h3>

                <div className="space-y-1.5 py-3 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 my-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Client:</span>
                    <span className="font-bold text-slate-800 dark:text-white truncate max-w-[65%]">
                      {proj.clientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Project Budget:</span>
                    <span className="font-bold text-[#F57C00]">{formatPrice(proj.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lead Engineer:</span>
                    <span className="font-semibold">{proj.leadEngineer}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-[#3A6EA5]">
                      {proj.progress}% · {proj.status}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        proj.progress >= 90
                          ? "bg-emerald-500"
                          : proj.progress >= 60
                            ? "bg-[#3A6EA5]"
                            : "bg-[#F57C00]"
                      }`}
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Target: {proj.deadline}</span>
                <button
                  onClick={() => onOpenInquiry(`Project Reference: ${proj.name}`)}
                  className="text-xs font-bold text-[#F57C00] hover:underline flex items-center gap-1"
                >
                  <span>Request Similar SPM</span>
                  <Icon name="arrow-right" size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
