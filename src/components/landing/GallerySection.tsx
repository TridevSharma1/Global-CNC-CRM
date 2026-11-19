import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { Modal } from "../common/Modal";

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Factory" | "Machines" | "Projects" | "Videos"
  >("All");
  const [previewMedia, setPreviewMedia] = useState<{
    title: string;
    image: string;
    desc: string;
    category: string;
  } | null>(null);

  const galleryItems = [
    {
      title: "Assembly Bay 01 · Special Purpose Machines",
      category: "Factory",
      desc: "Temperature-controlled precision assembly floor in Bhosari, Pune with 25-ton overhead crane capacity.",
      image: "/global-cnc-factory.png",
      isVideo: false,
    },
    {
      title: "GCV-850 Heavy Duty VMC Final Runoff",
      category: "Machines",
      desc: "Continuous 72-hour runoff test checking spindle thermal growth and laser positioning error under 0.004mm.",
      image: "/global-cnc-factory.png",
      isVideo: false,
    },
    {
      title: "Tata Motors Brake Carrier Twin-Spindle SPM Cell",
      category: "Projects",
      desc: "Turnkey multi-station boring SPM designed for 35-second cycle times on automotive brake carriers.",
      image: "/global-cnc-factory.png",
      isVideo: false,
    },
    {
      title: "Robotic Gantry Tending & Optical Vision Station",
      category: "Machines",
      desc: "Integrated high-speed gantry arm loading forged gear blanks into twin turning centers.",
      image: "/global-cnc-factory.png",
      isVideo: false,
    },
    {
      title: "CMM Metrology & Calibration Laboratory",
      category: "Factory",
      desc: "Carl Zeiss coordinate measuring machine verifying sub-assembly housings in class 10,000 clean room.",
      image: "/global-cnc-factory.png",
      isVideo: false,
    },
    {
      title: "Video: Full Speed Machining of Aircraft Turbine Fixtures",
      category: "Videos",
      desc: "High-pressure through-spindle coolant demo on 5-axis vertical machining center.",
      image: "/global-cnc-factory.png",
      isVideo: true,
    },
    {
      title: "Video: Automated 6-Axis Robotic Machine Tending Cell",
      category: "Videos",
      desc: "Live demonstration of robotic part picking, blow cleaning, and auto air-gauge measurement.",
      image: "/global-cnc-factory.png",
      isVideo: true,
    },
    {
      title: "Heavy Bed Scraping & Box-Way Hand Finishing",
      category: "Factory",
      desc: "Master scrapers achieving 25 contact points per square inch on precision Meehanite machine slideways.",
      image: "/global-cnc-factory.png",
      isVideo: false,
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === "All" || item.category === activeTab,
  );

  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] dark:bg-[#071526] text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>VISUAL SHOP FLOOR & PROJECT REPOSITORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Inside Global CNC's Manufacturing Facility.
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            A visual overview of our precision machining shop floor, heavy assembly halls, automated
            cells, and delivered customer projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-3 border-b border-slate-200 dark:border-slate-800">
          {(["All", "Factory", "Machines", "Projects", "Videos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === tab
                  ? "bg-[#F57C00] text-white shadow-md shadow-orange-500/20"
                  : "bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400"
              }`}
            >
              {tab === "Videos" ? "Videos (Placeholder)" : tab}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setPreviewMedia(item)}
              className="group cursor-pointer bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:border-[#3A6EA5] hover:shadow-xl transition-all"
            >
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0B1F3A]/90 text-white text-[9px] font-black uppercase tracking-wider rounded-xs border border-slate-700">
                  {item.category}
                </span>

                {item.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-12 rounded-full bg-[#F57C00] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-xs font-bold truncate">{item.title}</h4>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                  <span>Click to view details</span>
                  <Icon name="eye" size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Preview Modal */}
        {previewMedia && (
          <Modal
            isOpen={Boolean(previewMedia)}
            onClose={() => setPreviewMedia(null)}
            title={previewMedia.title}
            subtitle={`Global CNC Visual Archive · Category: ${previewMedia.category}`}
            maxWidth="3xl"
          >
            <div className="space-y-4">
              <div className="relative aspect-video bg-slate-950 rounded-sm overflow-hidden flex items-center justify-center">
                <img
                  src={previewMedia.image}
                  alt={previewMedia.title}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-[#0B1F3A]/90 border border-slate-700 p-4 rounded-sm text-center text-white max-w-sm">
                    <p className="font-bold text-xs">High Resolution Manufacturing Asset</p>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Bhosari Industrial Hub, Pune 411034
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {previewMedia.desc}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};
