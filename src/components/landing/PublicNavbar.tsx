import React, { useState } from "react";
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

  const navLinks = [
    { id: "Home", label: "Home" },
    { id: "About Us", label: "About Us" },
    { id: "Our Machines", label: "Machines" },
    { id: "Products", label: "Products (100)" },
    { id: "Services", label: "Services" },
    { id: "Industries", label: "Industries" },
    { id: "Projects", label: "Projects" },
    { id: "Gallery", label: "Gallery" },
    { id: "Certificates", label: "Certificates" },
    { id: "Testimonials", label: "Testimonials" },
    { id: "Careers", label: "Careers" },
    { id: "Contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Corporate Strip */}
      <div className="bg-[#0B1F3A] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#F57C00] animate-pulse" />
            <span className="font-semibold text-slate-200">
              ISO 9001:2015 Precision Machine Manufacturer & Automation Hub · Bhosari, Pune
            </span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a
              href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
              className="hover:text-[#F57C00] transition-colors flex items-center gap-1.5"
            >
              <Icon name="phone" size={13} />
              <span>{companyInfo.phone}</span>
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="hover:text-[#F57C00] transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Icon name="mail" size={13} />
              <span>{companyInfo.email}</span>
            </a>
            <button
              onClick={() => onOpenLogin("Employee")}
              className="text-[#F57C00] hover:text-white transition-colors font-bold underline underline-offset-2 ml-2"
            >
              CRM Login →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <button
          onClick={() => {
            onNavigate("Home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-left"
        >
          <Brand />
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors ${
                currentPage === link.id
                  ? "text-[#F57C00] bg-orange-50 dark:bg-orange-950/30"
                  : "text-slate-700 dark:text-slate-300 hover:text-[#0B1F3A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenInquiry("General Quotation")}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all hover:shadow-orange-500/20"
          >
            <Icon name="cart" size={14} />
            <span>Request Quote</span>
          </button>

          <button
            onClick={() => onOpenLogin("Admin")}
            className="px-3 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white hover:bg-[#3A6EA5] dark:hover:bg-blue-600 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
            title="Access Enterprise Manufacturing CRM"
          >
            <Icon name="grid" size={14} />
            <span className="hidden md:inline">Admin CRM</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm"
            aria-label="Toggle Navigation Menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800 px-4 py-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-left text-xs font-bold rounded-sm border ${
                  currentPage === link.id
                    ? "border-[#F57C00] bg-orange-50 dark:bg-orange-950/40 text-[#F57C00]"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onOpenInquiry("Mobile RFQ");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#F57C00] text-white font-bold text-xs uppercase tracking-wider rounded-sm text-center"
            >
              Request Machine Quote
            </button>
            <button
              onClick={() => {
                onOpenLogin("Admin");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white font-bold text-xs uppercase tracking-wider rounded-sm text-center"
            >
              Sign In to CRM Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
