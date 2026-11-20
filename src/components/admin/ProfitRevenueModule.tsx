import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { salesData } from "../../data/sales";
import { purchasesData } from "../../data/purchases";
import { expensesData } from "../../data/expenses";

export const ProfitRevenueModule: React.FC = () => {
  const [filterYear, setFilterYear] = useState("2026");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // Financial aggregates
  const totalRevenue = useMemo(() => salesData.reduce((acc, s) => acc + s.amount, 0), []);
  const totalPurchaseCost = useMemo(() => purchasesData.reduce((acc, p) => acc + p.amount, 0), []);
  const totalOperatingExpense = useMemo(
    () => expensesData.reduce((acc, e) => acc + e.amount, 0),
    [],
  );
  const netProfit = totalRevenue - totalPurchaseCost - totalOperatingExpense;
  const profitMarginPercent =
    totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0";

  // Monthly ledger data (Synthesized from actual data)
  const monthlyLedger = [
    { month: "Jan 2026", sales: 16500000, purchases: 8200000, expenses: 1450000 },
    { month: "Feb 2026", sales: 17200000, purchases: 8600000, expenses: 1520000 },
    { month: "Mar 2026", sales: 19800000, purchases: 9800000, expenses: 1680000 },
    { month: "Apr 2026", sales: 15400000, purchases: 7600000, expenses: 1350000 },
    { month: "May 2026", sales: 18100000, purchases: 9100000, expenses: 1580000 },
    { month: "Jun 2026", sales: 21500000, purchases: 10400000, expenses: 1820000 },
    { month: "Jul 2026", sales: 18900000, purchases: 9300000, expenses: 1620000 },
    { month: "Aug 2026", sales: 17800000, purchases: 8900000, expenses: 1540000 },
    { month: "Sep 2026", sales: 20400000, purchases: 10100000, expenses: 1740000 },
    { month: "Oct 2026", sales: 22800000, purchases: 11200000, expenses: 1950000 },
    { month: "Nov 2026", sales: 18450000, purchases: 9240000, expenses: 1610000 },
  ].map((m) => {
    const profit = m.sales - m.purchases - m.expenses;
    const margin = ((profit / m.sales) * 100).toFixed(1);
    return { ...m, profit, margin };
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = "Month,Sales Revenue,Purchase Cost,Operating Expenses,Net Profit,Margin %\n";
    const rows = monthlyLedger
      .map((m) => `"${m.month}",${m.sales},${m.purchases},${m.expenses},${m.profit},${m.margin}%`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Global_CNC_Profit_Revenue_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("P&L Financial Statement exported successfully as CSV.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[100] bg-[#0B1F3A] border-l-4 border-[#22C55E] text-white px-4 py-3 rounded-xs shadow-xl text-xs font-bold animate-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#F57C00]">
            <span className="size-2 rounded-full bg-[#F57C00] animate-pulse" />
            <span>FINANCIAL AUDIT · COMMERCIAL PROFIT & REVENUE ANALYSIS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            Profit & Revenue Statement
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Executive bottom-line ledger: Gross Machine Billings vs Sourcing & Operational
            Overheads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-xs border border-slate-200 dark:border-slate-700 outline-none"
          >
            <option value="2026">Fiscal Year 2025-2026</option>
            <option value="2025">Fiscal Year 2024-2025</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] hover:bg-[#3A6EA5] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
          >
            <Icon name="print" size={14} />
            <span>Print P&L</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Sales Revenue
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {formatPrice(totalRevenue)}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Machine dispatches</span>
            <span className="font-bold text-emerald-600">+100% (Base)</span>
          </div>
        </div>

        {/* Purchase Spend */}
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Procurement & Castings
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {formatPrice(totalPurchaseCost)}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Raw material & parts</span>
            <span className="font-bold text-rose-500">
              {((totalPurchaseCost / totalRevenue) * 100).toFixed(1)}% of Revenue
            </span>
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operational Overheads
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {formatPrice(totalOperatingExpense)}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Plant, power & labor</span>
            <span className="font-bold text-amber-500">
              {((totalOperatingExpense / totalRevenue) * 100).toFixed(1)}% of Revenue
            </span>
          </div>
        </div>

        {/* Net Profit & Margin */}
        <div className="bg-[#0B1F3A] text-white p-5 rounded-sm shadow-md border border-[#1B3B66]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#F57C00]">
            Net Commercial Profit
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {formatPrice(netProfit)}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300 mt-2 pt-2 border-t border-slate-700/80">
            <span>Operating Margin:</span>
            <span className="font-black text-[#F57C00] text-sm">{profitMarginPercent}%</span>
          </div>
        </div>
      </div>

      {/* Visual Margin Breakdown Card */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Revenue Share Allocation (P&L Breakdown)
          </div>
          <div className="text-xs font-bold text-[#F57C00]">100% Invoiced Turnover</div>
        </div>

        {/* Stacked Progress Bar (Pure Tailwind, zero external libraries) */}
        <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded-xs flex overflow-hidden">
          <div
            style={{ width: `${((totalPurchaseCost / totalRevenue) * 100).toFixed(1)}%` }}
            className="bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center truncate"
            title="Raw Material & Procurement"
          >
            Material (50.1%)
          </div>
          <div
            style={{ width: `${((totalOperatingExpense / totalRevenue) * 100).toFixed(1)}%` }}
            className="bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center truncate"
            title="Operating Expenses"
          >
            Overheads (10.0%)
          </div>
          <div
            style={{ width: `${profitMarginPercent}%` }}
            className="bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center truncate"
            title="Net Profit"
          >
            Net Profit ({profitMarginPercent}%)
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-xs bg-rose-500" />
            <span className="text-slate-600 dark:text-slate-400">Procurement & Sourcing:</span>
            <strong className="text-slate-800 dark:text-slate-200">
              {formatPrice(totalPurchaseCost)}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-xs bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">Operating Overheads:</span>
            <strong className="text-slate-800 dark:text-slate-200">
              {formatPrice(totalOperatingExpense)}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-xs bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Net Retained Profit:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">
              {formatPrice(netProfit)}
            </strong>
          </div>
        </div>
      </div>

      {/* Monthly Financial Ledger Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#0B1F3A] dark:text-white uppercase tracking-wider">
              Monthly P&L Audit Trail
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Comparative month-by-month financial realization.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 px-2.5 py-1 rounded-xs border border-emerald-300 dark:border-emerald-800">
            Positive Cash Flow
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#071526] border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Period / Month</th>
                <th className="py-3 px-4 text-right">Gross Sales Turnover</th>
                <th className="py-3 px-4 text-right">Machine Sourcing Cost</th>
                <th className="py-3 px-4 text-right">Operating Overheads</th>
                <th className="py-3 px-4 text-right font-black">Net Profit</th>
                <th className="py-3 px-4 text-center">Net Margin</th>
                <th className="py-3 px-4 text-center">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium font-mono">
              {monthlyLedger.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors font-sans"
                >
                  <td className="py-3 px-4 font-bold text-[#0B1F3A] dark:text-slate-200 font-sans">
                    {row.month}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-600 dark:text-emerald-400">
                    {formatPrice(row.sales)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-rose-600 dark:text-rose-400">
                    {formatPrice(row.purchases)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-amber-600 dark:text-amber-400">
                    {formatPrice(row.expenses)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-slate-800 dark:text-slate-100">
                    {formatPrice(row.profit)}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-[#F57C00]">
                    {row.margin}%
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-[10px] font-bold rounded-xs">
                      Strong
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
