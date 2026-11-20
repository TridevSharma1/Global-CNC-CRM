import React from "react";
import { Brand } from "../common/Brand";
import { Icon } from "../common/Icons";

export type AdminTab =
  | "dashboard"
  | "sales"
  | "purchase"
  | "expense"
  | "profit-revenue"
  | "sales-report"
  | "purchase-report"
  | "expense-report"
  | "customers"
  | "suppliers"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onClose: () => void;
  userRole: "Admin" | "Employee";
  onSignOut: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  userRole,
  onSignOut,
}) => {
  const groups: {
    heading: string;
    items: { id: AdminTab; label: string; icon: string; badge?: string }[];
  }[] = [
    {
      heading: "Overview",
      items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }],
    },
    {
      heading: "Core Operations",
      items: [
        { id: "sales", label: "Sale", icon: "sales", badge: "100" },
        { id: "purchase", label: "Purchase", icon: "purchase", badge: "80" },
        { id: "expense", label: "Expense", icon: "expense", badge: "50" },
      ],
    },
    {
      heading: "Reports & Financials",
      items: [
        { id: "profit-revenue", label: "Profit Revenue", icon: "trend" },
        { id: "sales-report", label: "Sales Report", icon: "report" },
        { id: "purchase-report", label: "Purchase Report", icon: "receipt" },
        { id: "expense-report", label: "Expense Rept", icon: "cash" },
      ],
    },
    {
      heading: "Basic Master Data",
      items: [
        { id: "customers", label: "Customers", icon: "customer", badge: "50" },
        { id: "suppliers", label: "Suppliers", icon: "supplier", badge: "40" },
        { id: "settings", label: "Settings", icon: "settings" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1F3A] text-white border-r border-[#1B3B66] flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1B3B66] shrink-0">
          <Brand inverse={true} size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-xs"
            aria-label="Close Sidebar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Industrial Status Strip */}
        <div className="px-5 py-3 border-b border-[#1B3B66] bg-[#071526]/50 shrink-0">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold uppercase tracking-wider text-slate-400">
              Plant Location
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Bhosari, Pune
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
            Gera's Imperium Gateway · C442
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map((grp) => (
            <div key={grp.heading}>
              <div className="px-3 text-[9px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] mb-2">
                {grp.heading}
              </div>
              <div className="space-y-0.5">
                {grp.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xs transition-colors ${
                        isActive
                          ? "bg-[#F57C00] text-white shadow-sm"
                          : "text-slate-300 hover:bg-[#132D50] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon name={item.icon} size={15} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs ${
                            isActive ? "bg-white/20 text-white" : "bg-[#1B3B66] text-slate-300"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Role / Sign Out */}
        <div className="p-4 border-t border-[#1B3B66] bg-[#071526]/80 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-8 rounded-xs bg-[#F57C00] flex items-center justify-center font-bold text-xs text-white shrink-0">
                {userRole === "Admin" ? "SB" : "EMP"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-white truncate">
                  {userRole === "Admin" ? "Shailesh Bhor" : "Global CNC Staff"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {userRole === "Admin" ? "Managing Director" : "Operations Exec"}
                </div>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#132D50] rounded-xs"
              title="Sign Out"
            >
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
