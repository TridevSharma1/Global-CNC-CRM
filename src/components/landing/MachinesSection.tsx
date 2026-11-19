import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { productsData } from "../../data/products";

interface MachinesSectionProps {
  onOpenInquiry: (productName?: string) => void;
  onViewAllProducts: () => void;
}

export const MachinesSection: React.FC<MachinesSectionProps> = ({
  onOpenInquiry,
  onViewAllProducts,
}) => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = [
    "All",
    "Special Purpose Machines",
    "CNC Machines",
    "VMC Machines",
    "Automation Solutions",
  ];

  // Pick top machines for showcase
  const showcaseMachines = productsData
    .filter((p) =>
      activeTab === "All"
        ? [
            "Special Purpose Machines",
            "CNC Machines",
            "VMC Machines",
            "Automation Solutions",
          ].includes(p.category)
        : p.category === activeTab,
    )
    .slice(0, 8);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="py-20 bg-[#F8FAFC] dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
              <span className="h-px w-6 bg-[#F57C00]" />
              <span>PRECISION MACHINE FLEET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
              Machinery Built For Uncompromising Precision.
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Explore our line-up of Special Purpose Machines (SPMs), heavy turning centres,
              high-speed VMCs and automated robotic cells.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] dark:bg-[#3A6EA5] hover:bg-[#3A6EA5] dark:hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-sm"
          >
            <span>View All 100 Products</span>
            <Icon name="arrow-right" size={14} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 dark:border-slate-800 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === cat
                  ? "bg-[#F57C00] text-white shadow-md shadow-orange-500/20"
                  : "bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseMachines.map((machine) => (
            <div
              key={machine.id}
              className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden flex flex-col hover:border-[#3A6EA5] hover:shadow-xl transition-all group"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="size-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0B1F3A]/90 border border-slate-700 text-white text-[9px] font-extrabold uppercase tracking-widest rounded-xs">
                  {machine.category}
                </span>
                <span className="absolute bottom-3 left-3 text-white text-xs font-black">
                  {formatPrice(machine.price)}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] text-slate-300 font-bold">
                  SKU: {machine.sku}
                </span>
              </div>

              {/* Machine Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white line-clamp-1 mb-2">
                    {machine.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {machine.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 py-3 border-y border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Spindle:</span>
                      <span className="font-semibold text-right max-w-[65%] truncate">
                        {machine.specifications.spindleSpeed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Travel:</span>
                      <span className="font-semibold text-right max-w-[65%] truncate">
                        {machine.specifications.travelXYZ}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Controller:</span>
                      <span className="font-semibold text-[#F57C00] text-right max-w-[65%] truncate">
                        {machine.specifications.controller}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-auto flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenInquiry(machine.name)}
                    className="w-full py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Icon name="cart" size={13} />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
