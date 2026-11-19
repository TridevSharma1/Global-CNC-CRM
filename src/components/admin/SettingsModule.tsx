import React, { useState } from "react";
import { Icon } from "../common/Icons";
import { companyInfo } from "../../data/companyInfo";

export const SettingsModule: React.FC = () => {
  const [profile, setProfile] = useState({
    clientName: companyInfo.clientName,
    companyName: companyInfo.companyName,
    phone: companyInfo.phone,
    email: companyInfo.email,
    gstNumber: companyInfo.gstNumber,
    address: companyInfo.address.full,
    plantArea: companyInfo.plantArea,
    workforce: companyInfo.workforce,
  });

  const [toastMessage, setToastMessage] = useState("");
  const [autoBackup, setAutoBackup] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Company profile information updated successfully.");
  };

  const handleDownloadBackup = () => {
    const backupData = {
      backupDate: new Date().toISOString(),
      company: profile,
      version: "Global CNC CRM v3.2 Enterprise",
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `global-cnc-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup JSON file downloaded successfully.");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0B1F3A] text-white px-4 py-3 rounded-sm shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <Icon name="check" size={16} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-[#0B1F3A] dark:text-white uppercase tracking-tight">
          Company Settings & Administrative Configuration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure legal entity details, Bhosari plant addresses, tax brackets, user RBAC
          privileges, and database backups.
        </p>
      </div>

      {/* 1. Company Profile Section */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F57C00]/15 text-[#F57C00] rounded-xs">
              <Icon name="building" size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white">
                Corporate Entity Details
              </h3>
              <p className="text-xs text-slate-500">
                Legal manufacturer information printed on all tax invoices and dispatch bills
              </p>
            </div>
          </div>
          <span className="size-2 bg-[#F57C00] rounded-xs" />
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Managing Director / Client Name *
              <input
                type="text"
                required
                value={profile.clientName}
                onChange={(e) => setProfile({ ...profile, clientName: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Company Legal Name *
              <input
                type="text"
                required
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Corporate Phone Number *
              <input
                type="text"
                required
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Official Email Address *
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              GSTIN Number (Maharashtra 27) *
              <input
                type="text"
                required
                value={profile.gstNumber}
                onChange={(e) => setProfile({ ...profile, gstNumber: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Facility Footprint
              <input
                type="text"
                value={profile.plantArea}
                onChange={(e) => setProfile({ ...profile, plantArea: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>
          </div>

          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Registered Bhosari Works Address *
            <textarea
              rows={2}
              required
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
            />
          </label>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
            >
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>

      {/* 2. Color Palette & Industrial Theme */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-xs">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white">
            Industrial Brand Color Palette & Typography
          </h3>
          <p className="text-xs text-slate-500">
            Corporate visual standards inspired by Siemens, Haas Automation, and DMG MORI
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
          <div className="border border-slate-200 dark:border-slate-800 p-3 rounded-xs space-y-2">
            <div className="h-10 rounded-xs bg-[#0B1F3A] border border-slate-700" />
            <div className="text-slate-700 dark:text-slate-300">Deep Navy Blue</div>
            <div className="font-mono text-[10px] text-slate-400">#0B1F3A (Primary)</div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 p-3 rounded-xs space-y-2">
            <div className="h-10 rounded-xs bg-[#3A6EA5]" />
            <div className="text-slate-700 dark:text-slate-300">Steel Blue</div>
            <div className="font-mono text-[10px] text-slate-400">#3A6EA5 (Secondary)</div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 p-3 rounded-xs space-y-2">
            <div className="h-10 rounded-xs bg-[#F57C00]" />
            <div className="text-slate-700 dark:text-slate-300">Industrial Orange</div>
            <div className="font-mono text-[10px] text-slate-400">#F57C00 (Accent)</div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 p-3 rounded-xs space-y-2">
            <div className="h-10 rounded-xs bg-[#F8FAFC] border border-slate-300" />
            <div className="text-slate-700 dark:text-slate-300">Slate Canvas</div>
            <div className="font-mono text-[10px] text-slate-400">#F8FAFC (Background)</div>
          </div>
        </div>
      </div>

      {/* 3. User Roles & Access Control (RBAC) */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-xs">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white">
            Role-Based Access Control (RBAC)
          </h3>
          <p className="text-xs text-slate-500">
            Configured operational privileges for shop floor and management teams
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {[
            {
              role: "Managing Director (Admin)",
              desc: "Full CRUD access across all 18 modules, PO sign-off, payroll, and statutory tax filing.",
              users: "Shailesh Bhor",
            },
            {
              role: "Operations Lead (Manager)",
              desc: "Create, view, and adjust machine projects, inventory stock transfers, and service visits.",
              users: "Aarav Kulkarni, Priya Deshmukh",
            },
            {
              role: "Field Service Engineer",
              desc: "View assigned machine serials, update maintenance tickets, and upload runoff inspection checklists.",
              users: "Vikram Pawar, Arjun More",
            },
            {
              role: "Sales & Proposals Desk",
              desc: "Generate sales orders, respond to website RFQs, submit quotations, and manage leads.",
              users: "Ananya Shah, Dev Malhotra",
            },
          ].map((item, idx) => (
            <div key={idx} className="py-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-800 dark:text-white">{item.role}</span>
                <p className="text-slate-500 mt-0.5 max-w-xl">{item.desc}</p>
                <span className="text-[10px] text-[#F57C00] font-semibold mt-1 block">
                  Active Users: {item.users}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xs font-bold text-[10px] uppercase">
                Active Tier
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Local Backup & System Persistence */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-6 rounded-sm shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#3A6EA5]/15 text-[#3A6EA5] rounded-xs">
              <Icon name="shield" size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white">
                CRM Local Data Backup & Recovery
              </h3>
              <p className="text-xs text-slate-500">
                100% Client-side JSON database snapshot exporter (No external cloud database
                required)
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
            System Healthy
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e.target.checked)}
              className="size-4 accent-[#F57C00]"
            />
            <span>Enable daily local browser cache snapshot</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast("Select JSON backup file to restore placeholder.")}
              className="px-3.5 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-sm"
            >
              Restore from JSON
            </button>
            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] hover:bg-[#3A6EA5] text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
            >
              <Icon name="download" size={14} />
              <span>Download Backup JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
