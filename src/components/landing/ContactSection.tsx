import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { companyInfo } from "../../data/companyInfo";

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    machineInterest: "Special Purpose Machine (SPM)",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        machineInterest: "Special Purpose Machine (SPM)",
        message: "",
      });
    }, 4000);
  };

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>CONNECT WITH GLOBAL CNC ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Visit Our Bhosari Works Or Submit An RFQ.
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Have a machine requirement, component drawings to evaluate, or need prompt on-site
            service? Our application engineers are available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards + Google Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0B1F3A] text-[#F57C00] rounded-xs shrink-0">
                  <Icon name="location" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] dark:text-white">
                    Factory & Corporate Works
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {companyInfo.address.full}
                  </p>
                  <p className="text-[11px] text-[#F57C00] font-bold mt-2">
                    Landmark: Directly adjacent to Bhosari Metro Station
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#3A6EA5]/15 text-[#3A6EA5] dark:text-[#60A5FA] rounded-xs">
                    <Icon name="phone" size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Direct Line
                  </span>
                </div>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                  className="text-sm font-black text-[#0B1F3A] dark:text-white hover:text-[#F57C00] transition-colors"
                >
                  {companyInfo.phone}
                </a>
                <p className="text-[10px] text-slate-400 mt-0.5">Mon - Sat: 8:30 AM - 7:00 PM</p>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#F57C00]/15 text-[#F57C00] rounded-xs">
                    <Icon name="mail" size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Official Email
                  </span>
                </div>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-xs font-bold text-[#0B1F3A] dark:text-white hover:text-[#F57C00] transition-colors break-all"
                >
                  {companyInfo.email}
                </a>
                <p className="text-[10px] text-slate-400 mt-0.5">Technical & Commercial RFQs</p>
              </div>
            </div>

            {/* Google Map Interactive Placeholder */}
            <div className="bg-[#0B1F3A] text-white p-5 rounded-sm border border-slate-700/60 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Bhosari Metro Industrial Belt
                  </span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-xs font-mono">
                  18.6279° N, 73.8427° E
                </span>
              </div>

              <div className="aspect-[16/8] bg-slate-900 border border-slate-700 rounded-sm relative flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                {/* Stylized Industrial Map Grid */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #3A6EA5 1px, transparent 1px), linear-gradient(to bottom, #3A6EA5 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative z-10 size-10 rounded-full bg-[#F57C00] text-white flex items-center justify-center shadow-lg shadow-orange-500/50 mb-2 animate-bounce">
                  <Icon name="location" size={20} />
                </div>
                <div className="relative z-10 text-xs font-black text-white">
                  Gera's Imperium Gateway · C442
                </div>
                <div className="relative z-10 text-[10px] text-slate-300">
                  Old Mumbai Road, Opp. Bhosari Metro Station, Pune 411034
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-8 rounded-sm shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white">
                    Send Technical Inquiry / RFQ
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fill out the form below. Our Pune technical team responds within 2 working
                    hours.
                  </p>
                </div>
                <div className="size-2 bg-[#F57C00] rounded-xs" />
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Icon name="check" size={32} />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-white">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you. We have logged your request under reference code{" "}
                    <strong className="text-[#F57C00]">INQ-2026-LIVE</strong>. An engineering
                    manager from Global CNC Pvt. Ltd. will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Your Full Name *
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Anand Kulkarni"
                        className="mt-1 w-full px-3 py-2.5 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                      />
                    </label>

                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Company / Organization Name *
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Bharat Precision Works"
                        className="mt-1 w-full px-3 py-2.5 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Work Email *
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="mt-1 w-full px-3 py-2.5 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                      />
                    </label>

                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Phone Number *
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98..."
                        className="mt-1 w-full px-3 py-2.5 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                      />
                    </label>
                  </div>

                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Primary Machine / Service Requirement
                    <select
                      value={form.machineInterest}
                      onChange={(e) => setForm({ ...form, machineInterest: e.target.value })}
                      className="mt-1 w-full px-3 py-2.5 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                    >
                      <option value="Special Purpose Machine (SPM)">
                        Special Purpose Machine (SPM)
                      </option>
                      <option value="Vertical Machining Centre (VMC)">
                        Vertical Machining Centre (VMC)
                      </option>
                      <option value="CNC Turning Centre">CNC Turning Centre</option>
                      <option value="Robotic Automation & Machine Tending">
                        Robotic Automation & Machine Tending
                      </option>
                      <option value="CNC Retrofit & Control Upgrade">
                        CNC Retrofit & Control Upgrade
                      </option>
                      <option value="Annual Maintenance Contract (AMC)">
                        Annual Maintenance Contract (AMC)
                      </option>
                      <option value="Precision Machine Parts & Spares">
                        Precision Machine Parts & Spares
                      </option>
                    </select>
                  </label>

                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Project Specifications & Cycle Time Targets
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please specify part material (e.g. EN8, cast iron, aluminium), target cycle time, expected machine delivery timeline, or attach component drawings..."
                      className="mt-1 w-full px-3 py-2.5 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                    />
                  </label>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-[10px] text-slate-500">
                      * All technical drawings & discussions are covered by strict NDA.
                    </span>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-black text-xs uppercase tracking-[0.16em] rounded-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <span>Submit RFQ</span>
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
