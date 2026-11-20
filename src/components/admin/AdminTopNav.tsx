import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { activitiesData } from "../../data/crmData";
import { AdminTab } from "./AdminSidebar";

interface AdminTopNavProps {
  activeTab: AdminTab;
  onOpenSidebar: () => void;
  dark: boolean;
  onToggleDark: () => void;
  userRole: "Admin" | "Employee";
  onSwitchRole: (role: "Admin" | "Employee") => void;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToTab?: (tab: AdminTab) => void;
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({
  activeTab,
  onOpenSidebar,
  dark,
  onToggleDark,
  userRole,
  onSwitchRole,
  onSignOut,
  searchQuery,
  onSearchChange,
  onNavigateToTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const tabLabels: Record<AdminTab, string> = {
    dashboard: "Enterprise Operations Dashboard",
    sales: "Sale & Invoicing Management",
    purchase: "Purchase Orders & Procurement",
    expense: "Operating Expense & Vouchers",
    "profit-revenue": "Profit & Revenue Statement",
    "sales-report": "Sales & Commercial Report",
    "purchase-report": "Purchase Spend Report",
    "expense-report": "Expense & Overhead Report",
    customers: "Customer Directory",
    suppliers: "Supplier Directory",
    settings: "Company Profile & System Settings",
  };

  return (
    <header className="h-16 bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 transition-colors">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm"
          aria-label="Toggle Navigation Sidebar"
        >
          <Icon name="menu" size={20} />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Global CNC CRM</span>
            <span>/</span>
            <span className="text-[#F57C00]">{activeTab}</span>
          </div>
          <h2 className="text-sm sm:text-base font-black text-[#0B1F3A] dark:text-white leading-tight">
            {tabLabels[activeTab]}
          </h2>
        </div>
      </div>

      {/* Right: Search, Dark mode, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder={`Filter ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-[#3A6EA5]"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDark}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm transition-colors"
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          <Icon name={dark ? "sun" : "moon"} size={17} />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm relative transition-colors"
            title="Operational Alerts"
          >
            <Icon name="bell" size={17} />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#F57C00] ring-2 ring-white dark:ring-[#0B1F3A]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A] dark:text-white">
                    Live Workshop Alerts
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#F57C00] text-white text-[9px] font-black rounded-xs">
                    {activitiesData.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  <Icon name="close" size={14} />
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                {activitiesData.map((act, i) => (
                  <div key={i} className="py-2.5 text-xs">
                    <p className="font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                      {act.text}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span>{act.time}</span>
                      <span className="text-[#F57C00] font-bold">Pune Plant</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                  Connected to Bhosari Central Hub
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="size-8 rounded-xs bg-[#0B1F3A] text-white font-black text-xs flex items-center justify-center border border-slate-700">
              {userRole === "Admin" ? "SB" : "EP"}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-black text-[#0B1F3A] dark:text-white leading-none">
                {userRole === "Admin" ? "Shailesh Bhor" : "Employee"}
              </div>
              <div className="text-[10px] text-[#F57C00] font-bold leading-none mt-1">
                {userRole === "Admin" ? "Director Access" : "Staff Portal"}
              </div>
            </div>
            <Icon name="chevron-down" size={13} className="text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-bold text-[#0B1F3A] dark:text-white">
                  {userRole === "Admin" ? "Shailesh Bhor" : "Employee Access"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {userRole === "Admin" ? "admin@globalcnc.in" : "employee@globalcnc.in"}
                </p>
              </div>

              <div className="py-1">
                <div className="px-2 py-1 text-[9px] font-black uppercase text-slate-400">
                  Switch Role Mode
                </div>
                <button
                  onClick={() => {
                    onSwitchRole("Admin");
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-xs font-bold flex items-center justify-between ${
                    userRole === "Admin"
                      ? "bg-[#3A6EA5]/15 text-[#3A6EA5]"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>Admin (Full Control)</span>
                  {userRole === "Admin" && <Icon name="check" size={13} />}
                </button>

                <button
                  onClick={() => {
                    onSwitchRole("Employee");
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-xs font-bold flex items-center justify-between ${
                    userRole === "Employee"
                      ? "bg-[#3A6EA5]/15 text-[#3A6EA5]"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>Employee (View/Edit)</span>
                  {userRole === "Employee" && <Icon name="check" size={13} />}
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={onSignOut}
                  className="w-full text-left px-2 py-2 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xs flex items-center gap-2"
                >
                  <Icon name="close" size={14} />
                  <span>Exit to Public Website</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
