import React from "react";
import { Icon } from "../common/Icons";

interface ServicesSectionProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const servicesList = [
    {
      title: "Machine Manufacturing",
      desc: "In-house precision machining, sub-assembly, scraping, electrical wiring, and full CE/ISO certified turnkey machine building in Bhosari, Pune.",
      icon: "machine",
      tag: "CORE CAPABILITY",
    },
    {
      title: "Custom Machine Design (SPM)",
      desc: "3D CAD finite element modeling, kinematic simulation, and custom pneumatic/hydraulic circuit design engineered strictly around your component drawing.",
      icon: "layers",
      tag: "APPLICATION LED",
    },
    {
      title: "Machine Installation & Commissioning",
      desc: "On-site laser interferometer alignment, geometric leveling, foundation bolting, tooling setup, and initial trial batch part runoff verification.",
      icon: "check",
      tag: "TURNKEY DISPATCH",
    },
    {
      title: "Annual Maintenance Contracts (AMC)",
      desc: "Scheduled 52-point preventive maintenance audits, thermal imaging of drive cabinets, vibration analysis, and 24/7 priority emergency breakdown support.",
      icon: "shield",
      tag: "GUARANTEED UPTIME",
    },
    {
      title: "Preventive & Breakdown Maintenance",
      desc: "Rapid on-demand maintenance teams across Pune, Chakan, Talegaon, and Aurangabad with emergency spindle, turret, and hydraulic power pack repair.",
      icon: "wrench",
      tag: "2-HOUR RESPONSE",
    },
    {
      title: "CNC Retrofit & Control Upgrades",
      desc: "Modernize legacy CNC machines with latest Siemens 828D / FANUC 0i-MF controllers, high-torque digital AC servo drives, and optical scales.",
      icon: "refresh",
      tag: "MODERNIZATION",
    },
    {
      title: "High Precision Machine Repair",
      desc: "Complete overhaul of worn cartridge spindles, regrinding of box-ways, replacement of precision C3 ball screws, and hydraulic chuck refurbishment.",
      icon: "wrench",
      tag: "SUB-MICRON QUALITY",
    },
    {
      title: "Manufacturing Process Consultation",
      desc: "Cycle time reduction studies, fixture design consultation, cutting tool selection optimization, and statistical process capability (Cp/Cpk) auditing.",
      icon: "target",
      tag: "OEE OPTIMIZATION",
    },
    {
      title: "Operator & Maintenance Staff Training",
      desc: "Hands-on classroom and shop floor training covering G-code programming, Siemens/Fanuc conversational cycles, safety protocols, and daily PM tasks.",
      icon: "users",
      tag: "WORKFORCE SKILLING",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>FULL LIFECYCLE INDUSTRIAL SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Complete Engineering Support From Concept To Commissioning.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Global CNC Pvt. Ltd. provides complete lifecycle backing. Whether designing an
            ultra-high-speed twin-spindle SPM from scratch or delivering scheduled AMC preventive
            service, our Bhosari engineering team stands by your plant.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm flex flex-col justify-between hover:border-[#3A6EA5] hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white dark:bg-slate-800 text-[#3A6EA5] group-hover:bg-[#3A6EA5] group-hover:text-white rounded-xs shadow-xs transition-colors">
                    <Icon name={srv.icon} size={22} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#F57C00] bg-orange-50 dark:bg-orange-950/40 px-2 py-1 rounded-xs">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">
                  Global CNC Service Guarantee
                </span>
                <button
                  onClick={() => onOpenInquiry(`Service: ${srv.title}`)}
                  className="text-xs font-black uppercase tracking-wider text-[#3A6EA5] group-hover:text-[#F57C00] flex items-center gap-1 transition-colors"
                >
                  <span>Inquire</span>
                  <Icon name="arrow-right" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
