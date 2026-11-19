import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { Modal } from "../common/Modal";

export const CareersSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "3-5 years",
    resumeNotes: "",
  });

  const openings = [
    {
      title: "Senior Mechanical SPM Design Engineer",
      dept: "Design & R&D",
      exp: "4 - 8 Years",
      location: "Bhosari Works, Pune",
      desc: "Lead 3D SolidWorks / Creo modeling for multi-spindle boring & milling SPMs, finite element vibration analysis, and hydraulic fixture kinematics.",
    },
    {
      title: "Master CNC Programmer (VMC & 4-Axis)",
      dept: "Production & Tooling",
      exp: "3 - 6 Years",
      location: "Bhosari Works, Pune",
      desc: "Expertise in Mastercam / Siemens NX CAM, custom macro programming, cutting tool path optimization, and aerospace component runoff.",
    },
    {
      title: "Field Installation & Commissioning Specialist",
      dept: "Customer Service & AMC",
      exp: "2 - 5 Years",
      location: "Pune & Pan-India Travel",
      desc: "Hands-on experience in laser interferometer machine leveling, geometric alignment, Siemens/Fanuc drive tuning, and client plant handovers.",
    },
    {
      title: "Senior Quality & Metrology Inspector (CMM)",
      dept: "Quality Assurance",
      exp: "3 - 7 Years",
      location: "Bhosari Works, Pune",
      desc: "Operating Carl Zeiss / Mitutoyo CMMs, surface roughness testers, roundness testers, preparing PPAP documentation and MSA/SPC reports.",
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
      setForm({ name: "", email: "", phone: "", experience: "3-5 years", resumeNotes: "" });
    }, 2000);
  };

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>CAREERS AT GLOBAL CNC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Build The Future Of High-Precision Engineering.
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Join our 150+ strong engineering team in Pune. We build custom machine tools that power
            India's industrial transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm flex flex-col justify-between hover:border-[#F57C00] transition-all"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-400 mb-2">
                  <span className="text-[#3A6EA5] dark:text-[#60A5FA]">{job.dept}</span>
                  <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-xs text-slate-700 dark:text-slate-300">
                    Exp: {job.exp}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white mb-2">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {job.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  <Icon name="location" size={13} className="inline mr-1 text-[#F57C00]" />
                  {job.location}
                </span>
                <button
                  onClick={() => setSelectedJob(job.title)}
                  className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xs transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Apply Modal */}
        {selectedJob && (
          <Modal
            isOpen={Boolean(selectedJob)}
            onClose={() => setSelectedJob(null)}
            title={`Apply for ${selectedJob}`}
            subtitle="Global CNC Pvt. Ltd. HR Recruitment · Bhosari, Pune"
            maxWidth="lg"
          >
            {applied ? (
              <div className="py-8 text-center space-y-3">
                <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Icon name="check" size={24} />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-500">
                  Our HR & Engineering Recruitment team will review your profile and reach out
                  within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name *
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Rahul Patil"
                      className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                    />
                  </label>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address *
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@email.com"
                      className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Phone Number *
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98..."
                      className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                    />
                  </label>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Total Experience
                    <select
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                    >
                      <option value="1-3 years">1 - 3 Years</option>
                      <option value="3-5 years">3 - 5 Years</option>
                      <option value="5-8 years">5 - 8 Years</option>
                      <option value="8+ years">8+ Years Senior Level</option>
                    </select>
                  </label>
                </div>

                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Key Skills & Machine Tool Experience
                  <textarea
                    rows={3}
                    value={form.resumeNotes}
                    onChange={(e) => setForm({ ...form, resumeNotes: e.target.value })}
                    placeholder="Briefly describe your CNC machine experience, software skills (SolidWorks, NX, Mastercam), or metrology background..."
                    className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                  />
                </label>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </section>
  );
};
