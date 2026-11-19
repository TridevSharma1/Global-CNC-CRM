import React, { useState } from "react";
import { Brand } from "../common/Brand";
import { Icon } from "../common/Icons";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: "Admin" | "Employee") => void;
  initialRole?: "Admin" | "Employee";
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = "Admin",
}) => {
  const [role, setRole] = useState<"Admin" | "Employee">(initialRole);
  const [email, setEmail] = useState(
    initialRole === "Admin" ? "admin@globalcnc.in" : "employee@globalcnc.in",
  );
  const [password, setPassword] = useState("globalcnc");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleRoleChange = (newRole: "Admin" | "Employee") => {
    setRole(newRole);
    setEmail(newRole === "Admin" ? "admin@globalcnc.in" : "employee@globalcnc.in");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "globalcnc") {
      setError("Invalid password. Demo password is: globalcnc");
      return;
    }
    onLoginSuccess(role);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0B1F3A]/85 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 rounded-sm shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <Brand size="md" />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xs"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00] mb-1">
            <span>ENTERPRISE CRM WORKSPACE</span>
          </div>
          <h2 className="text-xl font-black text-[#0B1F3A] dark:text-white">
            Staff & Management Login
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access Pune manufacturing operations, purchase approvals, sales orders, and fleet
            monitoring.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mt-5 grid grid-cols-2 p-1 bg-slate-100 dark:bg-[#071526] rounded-sm border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleRoleChange("Admin")}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all ${
              role === "Admin"
                ? "bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800"
            }`}
          >
            Admin / Director
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("Employee")}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all ${
              role === "Employee"
                ? "bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800"
            }`}
          >
            Employee / Staff
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xs text-xs font-bold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Work Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
            />
          </label>

          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-black text-xs uppercase tracking-[0.16em] rounded-sm shadow-md transition-all"
          >
            Sign In to {role} Portal
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-6 p-3 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            Pre-configured Hardcoded Credentials:
          </div>
          <div>
            <strong>Admin:</strong> admin@globalcnc.in / globalcnc
          </div>
          <div>
            <strong>Employee:</strong> employee@globalcnc.in / globalcnc
          </div>
        </div>
      </div>
    </div>
  );
};
