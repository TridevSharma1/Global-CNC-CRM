import React from "react";
import { Icon } from "../common/Icons";

interface IndustriesSectionProps {
  onOpenInquiry: (industryName?: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenInquiry }) => {
  const industriesList = [
    {
      name: "Automobile & EV Manufacturing",
      desc: "Brake carriers, steering knuckles, cylinder heads, differential housings, transmission gear blanks, EV motor shafts, and battery pack structural enclosures.",
      icon: "machine",
      components: "Brake Discs, Knuckles, Gear Blanks, EV Rotors",
    },
    {
      name: "Defense & Ordnance Factories",
      desc: "High-strength alloy armor components, projectile casings, artillery breech mechanisms, optical sighting brackets, and precision military vehicle fixtures.",
      icon: "shield",
      components: "Armor Plates, Breech Mechanisms, Mortar Casings",
    },
    {
      name: "Aerospace & Avionics",
      desc: "Titanium and Inconel turbine fixtures, structural airframe brackets, hydraulic flight-control actuator valve bodies, and lightweight avionics housings.",
      icon: "target",
      components: "Turbine Mounts, Actuator Valves, Titanium Brackets",
    },
    {
      name: "Medical Devices & Implants",
      desc: "Orthopedic bone plates, titanium femoral stems, surgical instrument assemblies, dental fixture machining, and precision diagnostic scanner components.",
      icon: "check",
      components: "Orthopedic Screws, Bone Plates, Titanium Implants",
    },
    {
      name: "Agriculture & Tractor Machinery",
      desc: "Heavy tractor rear axle housings, hydraulic hitch lift cylinders, transmission casing castings, harvester bevel gears, and power tiller components.",
      icon: "cog",
      components: "Rear Axles, Lift Cylinders, Transmission Castings",
    },
    {
      name: "Textile Machinery Engineering",
      desc: "High-speed spinning rings, fluted drafting rollers, weaving machine side frames, spindle bolsters, and cam tracks requiring mirror surface finishes.",
      icon: "layers",
      components: "Drafting Rollers, Spindle Bolsters, Cam Tracks",
    },
    {
      name: "Packaging & Converting Equipment",
      desc: "High-finish embossing rollers, rotary die cutters, blister packaging mold plates, sealing jaws, and high-speed multi-axis carton folding assemblies.",
      icon: "boxes",
      components: "Rotary Dies, Sealing Jaws, Embossing Rollers",
    },
    {
      name: "Heavy Engineering & Energy",
      desc: "Subsea oil & gas high-pressure valve bodies, steam turbine diaphragm rings, large centrifugal pump impellers, and heavy mining excavator pivot pins.",
      icon: "building",
      components: "HP Valve Bodies, Pump Impellers, Excavator Pins",
    },
    {
      name: "Electronics & Semiconductor Tooling",
      desc: "Heat sink precision fin milling, aluminum RF shielded enclosures, semiconductor wafer carrier fixtures, and automated PCB pick-and-place gantry arms.",
      icon: "grid",
      components: "Fin Heat Sinks, RF Enclosures, Vacuum Fixtures",
    },
    {
      name: "Food & Dairy Processing Machinery",
      desc: "Food-grade SS316 sanitary homogenizer blocks, continuous filling rotary valves, stainless steel augers, and sterile packaging peristaltic pump heads.",
      icon: "cart",
      components: "Sanitary Valve Blocks, SS316 Augers, Pump Heads",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>CRITICAL SECTORS EMPOWERED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Industries We Serve Across India & Global Markets.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Our CNC machining centers, Special Purpose Machines, and robotic production cells are
            deployed across 10 vital industrial verticals, consistently delivering high cycle rates,
            CPK &gt; 1.67, and sub-micron repeatability.
          </p>
        </div>

        {/* 10 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {industriesList.map((ind, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm flex flex-col justify-between hover:border-[#F57C00] hover:shadow-lg transition-all group"
            >
              <div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-[#0B1F3A] dark:text-[#F57C00] group-hover:bg-[#F57C00] group-hover:text-white rounded-xs w-fit mb-3 transition-colors">
                  <Icon name={ind.icon} size={20} />
                </div>

                <h3 className="text-sm font-bold text-[#0B1F3A] dark:text-white mb-2 line-clamp-1">
                  {ind.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {ind.desc}
                </p>

                <div className="bg-slate-50 dark:bg-[#071526] p-2 rounded-xs border border-slate-200/60 dark:border-slate-800 mb-4">
                  <span className="block text-[9px] font-black uppercase text-slate-400">
                    Typical Components:
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">
                    {ind.components}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiry(`Industry Solutions: ${ind.name}`)}
                className="w-full py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#F57C00] text-slate-700 dark:text-slate-200 hover:text-white font-bold text-[11px] uppercase tracking-wider rounded-xs transition-colors text-center"
              >
                Inquire Solutions
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
