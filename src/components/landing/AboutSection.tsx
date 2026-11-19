import React from "react";
import { Icon } from "../common/Icons";
import { companyInfo } from "../../data/companyInfo";

export const AboutSection: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const whyUs = [
    {
      title: "Process-First Custom Engineering",
      desc: "We don't sell off-the-shelf compromises. Every SPM and CNC solution is engineered around your component geometry, cycle time targets, and tooling path.",
      icon: "machine",
    },
    {
      title: "Rigid Cast Iron Stability",
      desc: "All machine frames are cast using premium grade Meehanite cast iron, naturally aged and vibration stress-relieved to guarantee zero thermal deformation.",
      icon: "shield",
    },
    {
      title: "World-Class Partner Components",
      desc: "Integrated with industry-leading CNC controllers (Siemens, FANUC), THK linear roller guideways, NSK precision spindle bearings, and Festo hydraulics.",
      icon: "layers",
    },
    {
      title: "Unmatched Pune Lifecycle Support",
      desc: "Our plant at Bhosari, Pune houses 25+ dedicated field engineers ensuring 2-hour response times, scheduled AMC checkups, and comprehensive local spares inventory.",
      icon: "wrench",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>ABOUT GLOBAL CNC PVT. LTD.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight leading-tight">
            Engineering Precision That Drives India’s Manufacturing Engine.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded and spearheaded by{" "}
            <strong className="text-[#0B1F3A] dark:text-white">{companyInfo.clientName}</strong>,
            Global CNC Pvt. Ltd. has grown into one of western India’s most trusted machine
            builders. Operating from our central manufacturing hub in Bhosari, Pune, we design,
            manufacture, and integrate specialized CNC machines, VMC machining centers, and
            automated turnkey solutions for high-precision components.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1F3A] p-8 rounded-sm relative overflow-hidden">
            <div className="size-1.5 bg-[#F57C00] absolute top-0 left-0" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#F57C00]/10 text-[#F57C00] rounded-xs">
                <Icon name="target" size={20} />
              </div>
              <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white">Our Mission</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To engineer and deliver rugged, ultra-precise Special Purpose Machines and CNC
              automation solutions that eliminate manufacturing bottlenecks, slash customer cycle
              times by 30-50%, and bring European-standard machining precision to Indian shop floors
              at competitive domestic economics.
            </p>
          </div>

          {/* Vision */}
          <div className="border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1F3A] p-8 rounded-sm relative overflow-hidden">
            <div className="size-1.5 bg-[#3A6EA5] absolute top-0 left-0" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#3A6EA5]/10 text-[#3A6EA5] rounded-xs">
                <Icon name="trend" size={20} />
              </div>
              <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white">Our Vision</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To be recognized globally as the vanguard of high-speed, intelligent machine tooling
              and smart factory automation, establishing Global CNC as the premier technology
              partner for Tier-1 automotive, aerospace, defense, and heavy engineering corporations.
            </p>
          </div>
        </div>

        {/* Why Choose Us Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl font-black text-[#0B1F3A] dark:text-white">
              Why Choose Global CNC?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Rigorous manufacturing standards, tested on over 950 production lines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm hover:border-[#3A6EA5] hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-[#3A6EA5] group-hover:bg-[#3A6EA5] group-hover:text-white rounded-xs transition-colors">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
