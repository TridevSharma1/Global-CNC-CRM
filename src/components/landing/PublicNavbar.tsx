import React, { useState, useRef, useEffect } from "react";
import { Brand } from "../common/Brand";
import { Icon } from "../common/Icons";
import { companyInfo } from "../../data/companyInfo";

interface PublicNavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onOpenLogin: (role?: "Admin" | "Employee") => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenInquiry,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary navigation links visible directly on desktop
  const primaryLinks = [
    { id: "Home", label: "Home" },
    { id: "About Us", label: "About Us" },
    { id: "Our Machines", label: "Machines" },
    { id: "Products", label: "Products" },
    { id: "Services", label: "Services" },
    { id: "Industries", label: "Industries" },
  ];

  // Secondary company & media items neatly tucked into "More" dropdown
  const secondaryLinks = [
    {
      id: "Projects",
      label: "Projects",
      desc: "25 Turnkey SPM & automation engineering builds",
      icon: "project" as const,
    },
    {
      id: "Gallery",
      label: "Gallery",
      desc: "Machine photos, Bhosari shop floor & demo videos",
      icon: "camera" as const,
    },
    {
      id: "Certificates",
      label: "Certificates",
      desc: "ISO 9001:2015, CE & ZED Gold quality credentials",
      icon: "shield" as const,
    },
    {
      id: "Testimonials",
      label: "Testimonials",
      desc: "Industrial client reviews (Tata, Bharat Forge, L&T)",
      icon: "bell" as const,
    },
    {
      id: "Careers",
      label: "Careers",
      desc: "CNC programmers, machinists & assembly openings",
      icon: "user" as const,
    },
  ];

  const allLinksForMobile = [
    ...primaryLinks,
    ...secondaryLinks.map((s) => ({ id: s.id, label: s.label })),
    { id: "Contact", label: "Contact" },
  ];

  const isMoreActive = secondaryLinks.some((l) => l.id === currentPage);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top Corporate Industrial Strip */}
      <div className="bg-[#0B1F3A] text-white text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#F57C00] animate-pulse shrink-0" />
            <span className="font-semibold text-slate-200 truncate">
              ISO 9001:2015 Precision Machine Manufacturer & Automation Hub · Bhosari, Pune
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 font-medium shrink-0">
            <a
              href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
              className="hover:text-[#F57C00] transition-colors flex items-center gap-1.5"
            >
              <Icon name="phone" size={13} />
              <span>{companyInfo.phone}</span>
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="hover:text-[#F57C00] transition-colors hidden md:flex items-center gap-1.5"
            >
              <Icon name="mail" size={13} />
              <span>{companyInfo.email}</span>
            </a>
            <button
              onClick={() => onOpenLogin("Employee")}
              className="text-[#F57C00] hover:text-white transition-colors font-bold underline underline-offset-2 flex items-center gap-1"
            >
              <span>CRM Login</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Corporate Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo (Always unclipped & intact) */}
        <button
          onClick={() => {
            onNavigate("Home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-left shrink-0 focus:outline-none"
        >
          <Brand size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {primaryLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                  isActive
                    ? "text-[#F57C00] bg-orange-50 dark:bg-orange-950/40 shadow-xs"
                    : "text-slate-700 dark:text-slate-200 hover:text-[#0B1F3A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* "More" Corporate Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isMoreActive || moreMenuOpen
                  ? "text-[#F57C00] bg-orange-50 dark:bg-orange-950/40 shadow-xs"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#0B1F3A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>More</span>
              <Icon
                name={moreMenuOpen ? "chevron-up" : "chevron-down"}
                size={13}
                className="transition-transform"
              />
            </button>

            {/* Dropdown Menu */}
            {moreMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00] px-3 py-1 border-b border-slate-100 dark:border-slate-800 mb-1">
                  Company & Operations
                </div>
                {secondaryLinks.map((item) => {
                  const isItemActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setMoreMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-sm transition-colors flex items-start gap-3 group ${
                        isItemActive
                          ? "bg-orange-50 dark:bg-orange-950/40 text-[#F57C00]"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xs mt-0.5 ${
                          isItemActive
                            ? "bg-[#F57C00] text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-[#F57C00] group-hover:bg-orange-50 dark:group-hover:bg-slate-700"
                        }`}
                      >
                        <Icon name={item.icon} size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight flex items-center justify-between">
                          <span>{item.label}</span>
                          {item.id === "Projects" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900/50 text-[#3A6EA5] dark:text-blue-300 rounded-xs">
                              25 Live
                            </span>
                          )}
                          {item.id === "Careers" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xs">
                              Hiring
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact Direct Nav Link */}
          <button
            onClick={() => onNavigate("Contact")}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
              currentPage === "Contact"
                ? "text-[#F57C00] bg-orange-50 dark:bg-orange-950/40 shadow-xs"
                : "text-slate-700 dark:text-slate-200 hover:text-[#0B1F3A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons (Right) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onOpenInquiry("General Quotation")}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all hover:shadow-orange-500/20 shrink-0 whitespace-nowrap active:scale-[0.98]"
          >
            <Icon name="cart" size={14} />
            <span className="hidden xs:inline">Request Quote</span>
            <span className="xs:hidden">Quote</span>
          </button>

          <button
            onClick={() => onOpenLogin("Admin")}
            className="px-2.5 sm:px-3 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white hover:bg-[#3A6EA5] dark:hover:bg-blue-600 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            title="Access Enterprise Manufacturing CRM"
          >
            <Icon name="grid" size={14} />
            <span className="hidden sm:inline">Admin CRM</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm"
            aria-label="Toggle Navigation Menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800 px-4 py-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00] mb-2 px-1">
            Navigation Menu
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {allLinksForMobile.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-left text-xs font-bold rounded-sm border transition-colors ${
                  currentPage === link.id
                    ? "border-[#F57C00] bg-orange-50 dark:bg-orange-950/40 text-[#F57C00]"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onOpenInquiry("Mobile RFQ");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#F57C00] text-white font-bold text-xs uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-2"
            >
              <Icon name="cart" size={14} />
              <span>Request Machine Quote</span>
            </button>
            <button
              onClick={() => {
                onOpenLogin("Admin");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white font-bold text-xs uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-2"
            >
              <Icon name="grid" size={14} />
              <span>Sign In to CRM Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
