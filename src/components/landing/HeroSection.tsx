import React from "react";
import { Icon } from "../common/Icons";
import { companyInfo } from "../../data/companyInfo";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <section className="relative overflow-hidden bg-[#0B1F3A] text-white">
      {/* Background Factory Photography with Industrial Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/global-cnc-factory.png"
          alt="Precision CNC Machine on Global CNC Factory Floor in Bhosari Pune"
          className="size-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
      </div>

      {/* Grid Pattern overlay for Industrial Look */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xs bg-[#F57C00]/15 border border-[#F57C00]/40 text-[#F57C00] text-xs font-black uppercase tracking-[0.2em]">
              <span className="size-2 rounded-full bg-[#F57C00] animate-ping" />
              <span>PRECISION MACHINE ENGINEERING · BHOSARI, PUNE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              ENGINEERED FOR <br />
              <span className="text-[#F57C00]">MICRON-LEVEL</span> ACCURACY.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Special Purpose Machines (SPMs), heavy-duty CNC Turning Centres, VMC platforms, and
              intelligent robotic automation cells — purpose-built in Pune to empower automotive,
              aerospace, and defense manufacturing.
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3.5 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-black text-xs uppercase tracking-[0.16em] rounded-sm shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
              >
                <span>Request Machine Quote</span>
                <Icon name="arrow-right" size={16} />
              </button>

              <button
                onClick={() => onNavigate("Our Machines")}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-[0.16em] rounded-sm border border-white/25 transition-all flex items-center gap-2.5 backdrop-blur-xs"
              >
                <span>Explore Machines</span>
                <Icon name="cube" size={16} />
              </button>

              <button
                onClick={() => onNavigate("Contact")}
                className="px-5 py-3.5 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
              >
                <span>Contact Works</span>
                <Icon name="phone" size={14} />
              </button>
            </div>

            {/* Industrial Trust Badges */}
            <div className="pt-8 border-t border-slate-700/60 grid grid-cols-3 gap-6 max-w-xl text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  ±0.003<span className="text-[#F57C00] text-sm">mm</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Repeatability
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  950<span className="text-[#F57C00] text-sm">+</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Machines Running
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  45,000<span className="text-[#F57C00] text-sm">sq ft</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Pune Works
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Machine Feature Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#071526]/90 border border-slate-700/80 rounded-sm p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F57C00] text-[#0B1F3A] font-black text-[10px] uppercase tracking-widest px-3 py-1">
                FLAGSHIP 2026
              </div>

              <div className="text-[10px] font-bold text-[#F57C00] uppercase tracking-widest mb-1">
                HIGH SPEED VERTICAL MACHINING CENTRE
              </div>
              <h3 className="text-2xl font-black text-white mb-2">GCV-850 Heavy Duty VMC</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Class C3 precision preloaded ball screws, Meehanite 250 heavy cast bed, and high
                torque BT-40 spindle for continuous 3-shift production.
              </p>

              {/* Machine Specs Pill Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                <div className="bg-[#0B1F3A] border border-slate-700/60 p-2.5 rounded-xs">
                  <div className="text-[10px] text-slate-400 uppercase">Spindle Speed</div>
                  <div className="font-bold text-white mt-0.5">10,000 / 12,000 RPM</div>
                </div>
                <div className="bg-[#0B1F3A] border border-slate-700/60 p-2.5 rounded-xs">
                  <div className="text-[10px] text-slate-400 uppercase">Travel X / Y / Z</div>
                  <div className="font-bold text-white mt-0.5">850 x 510 x 560 mm</div>
                </div>
                <div className="bg-[#0B1F3A] border border-slate-700/60 p-2.5 rounded-xs">
                  <div className="text-[10px] text-slate-400 uppercase">Tool Magazine</div>
                  <div className="font-bold text-white mt-0.5">24-Pocket Arm ATC</div>
                </div>
                <div className="bg-[#0B1F3A] border border-slate-700/60 p-2.5 rounded-xs">
                  <div className="text-[10px] text-slate-400 uppercase">CNC Controller</div>
                  <div className="font-bold text-[#F57C00] mt-0.5">Siemens 828D / FANUC</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-400">
                  Client: <strong className="text-white">Shailesh Bhor</strong>
                </div>
                <button
                  onClick={() => onOpenInquiry()}
                  className="px-4 py-2 bg-[#3A6EA5] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Inquire Machine</span>
                  <Icon name="arrow-right" size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
