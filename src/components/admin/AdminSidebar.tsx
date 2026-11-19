import React from "react";
import { Brand } from "../common/Brand";
import { Icon } from "../common/Icons";

export type AdminTab =
  | "dashboard"
  | "sales"
  | "purchase"
  | "expense"
  | "customers"
  | "suppliers"
  | "products"
  | "inventory"
  | "employees"
  | "leads"
  | "inquiries"
  | "projects"
  | "machines"
  | "services"
  | "vendors"
  | "accounting"
  | "reports"
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
      items: [{ id: "dashboard", label: "Dashboard & KPIs", icon: "dashboard" }],
    },
    {
      heading: "Commerce & CRM",
      items: [
        { id: "sales", label: "Sales & Invoices", icon: "sales" },
        { id: "customers", label: "Customer Directory", icon: "customer" },
        { id: "leads", label: "Leads & Pipeline", icon: "lead" },
        { id: "inquiries", label: "Website RFQs", icon: "inquiry", badge: "New" },
      ],
    },
    {
      heading: "Procurement & Supply",
      items: [
        { id: "purchase", label: "Purchase Orders", icon: "purchase" },
        { id: "suppliers", label: "Suppliers List", icon: "supplier" },
        { id: "vendors", label: "Vendor Management", icon: "vendor" },
      ],
    },
    {
      heading: "Manufacturing & Works",
      items: [
        { id: "products", label: "Machine Products", icon: "product", badge: "100" },
        { id: "inventory", label: "Stores & Materials", icon: "inventory" },
        { id: "projects", label: "Client Projects", icon: "project", badge: "25" },
        { id: "machines", label: "Deployed Fleet", icon: "machine", badge: "30" },
        { id: "services", label: "Service & AMC", icon: "service" },
      ],
    },
    {
      heading: "People & Finance",
      items: [
        { id: "employees", label: "Staff & Attendance", icon: "employee" },
        { id: "expense", label: "Expenses & Vouchers", icon: "expense" },
        { id: "accounting", label: "Financial Ledger", icon: "accounting" },
      ],
    },
    {
      heading: "Analytics & Control",
      items: [
        { id: "reports", label: "Reports Dashboard", icon: "report" },
        { id: "settings", label: "Company Settings", icon: "settings" },
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

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1F3A] text-white border-r border-[#1B3B66] flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Branding */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1B3B66] shrink-0">
          <Brand inverse size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-xs"
            aria-label="Close Sidebar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Location & Status Pill */}
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

        {/* Navigation Scrollable Area */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {groups.map((group) => (
            <div key={group.heading}>
              <div className="px-3 text-[9px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] mb-2">
                {group.heading}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xs transition-colors ${
                        isActive
                          ? "bg-[#F57C00] text-white shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-[#132D50]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon name={item.icon} size={15} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-xs font-black ${
                            isActive ? "bg-[#0B1F3A] text-white" : "bg-[#1B3B66] text-[#F57C00]"
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

        {/* User Info & Sign Out Footer */}
        <div className="p-3 border-t border-[#1B3B66] bg-[#071526]/80 shrink-0">
          <div className="flex items-center justify-between p-2 rounded-xs bg-[#0B1F3A] border border-[#1B3B66]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-8 rounded-xs bg-[#F57C00] text-[#0B1F3A] font-black text-xs flex items-center justify-center shrink-0">
                {userRole === "Admin" ? "SB" : "GC"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-white truncate">
                  {userRole === "Admin" ? "Shailesh Bhor" : "Operations User"}
                </div>
                <div className="text-[10px] text-slate-400">
                  {userRole === "Admin" ? "Managing Director" : "Employee Portal"}
                </div>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xs transition-colors"
              title="Sign Out to Website"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
