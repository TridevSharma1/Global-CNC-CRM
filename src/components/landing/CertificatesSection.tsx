import React from "react";
import { Icon } from "../common/Icons";
import { certificatesData } from "../../data/certificates";

export const CertificatesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>ACCREDITATIONS & INDUSTRY STANDARDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Certified Quality You Can Rely On.
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Global CNC Pvt. Ltd. complies with rigorous international quality, European safety, and
            Indian defense manufacturing benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm flex flex-col justify-between hover:border-[#F57C00] hover:shadow-lg transition-all"
            >
              <div>
                <div className="size-12 rounded-xs bg-[#0B1F3A] text-[#F57C00] flex items-center justify-center mb-4 border border-slate-700">
                  <Icon name="shield" size={24} />
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-2 leading-snug">
                  {cert.title}
                </h3>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 my-3">
                  <div>
                    <strong>Issued By:</strong> {cert.issuer}
                  </div>
                  <div>
                    <strong>Certificate No:</strong>{" "}
                    <span className="font-mono text-[#F57C00]">{cert.number}</span>
                  </div>
                  <div>
                    <strong>Valid Until:</strong> {cert.validUntil}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
                  {cert.scope}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Verified & Active
                </span>
                <span className="text-slate-400 uppercase">Audit Passed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
