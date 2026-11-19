import React from "react";
import { Icon } from "../common/Icons";
import { StatCard, MonthlyBarChart, DonutMetric } from "../common/TailwindCharts";
import { StatusBadge } from "../common/StatusBadge";
import { salesData } from "../../data/sales";
import { purchasesData } from "../../data/purchases";
import { expensesData } from "../../data/expenses";
import { customersData } from "../../data/customers";
import { suppliersData } from "../../data/suppliers";
import { inventoryData } from "../../data/inventory";
import { activitiesData } from "../../data/crmData";
import { AdminTab } from "./AdminSidebar";

interface DashboardModuleProps {
  onNavigateTab: (tab: AdminTab) => void;
  onQuickAction: (action: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  onNavigateTab,
  onQuickAction,
}) => {
  // Compute Key Financial Metrics
  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPurchases = purchasesData.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalExpenses = expensesData.reduce((acc, curr) => acc + curr.amount, 0);
  const estimatedProfit = totalRevenue - totalPurchases - totalExpenses;
  const inventoryValuation = inventoryData.reduce((acc, curr) => acc + curr.totalValuation, 0);

  const pendingOrders = salesData.filter(
    (s) => s.status.includes("Pending") || s.status.includes("In progress"),
  ).length;
  const completedOrders = salesData.filter((s) => s.status === "Completed").length;

  const formatLakhsCr = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(1)} L`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-5 rounded-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#F57C00]">
            <span className="size-2 rounded-full bg-[#F57C00] animate-pulse" />
            <span>GLOBAL CNC OPERATIONS CONTROL · EXECUTIVE SUITE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            Manufacturing & Commercial Pulse
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Bhosari Assembly Plant, Pune · Director:{" "}
            <strong className="text-slate-700 dark:text-slate-200">Shailesh Bhor</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab("sales")}
            className="px-3.5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xs shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>New Sales Order</span>
          </button>
          <button
            onClick={() => onNavigateTab("purchase")}
            className="px-3.5 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] hover:bg-[#3A6EA5] text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5"
          >
            <Icon name="cart" size={14} />
            <span>Create PO</span>
          </button>
          <button
            onClick={() => onQuickAction("print-summary")}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xs flex items-center gap-1"
            title="Print Production Summary"
          >
            <Icon name="print" size={14} />
          </button>
        </div>
      </div>

      {/* 12 Primary KPI Stat Cards */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Core Financial & Operational Indicators
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
          <StatCard
            title="Today's Sales"
            value="₹8.45 L"
            change="+14.2%"
            icon="sales"
            subtitle="3 machine orders booked"
            accentColor="orange"
            onClick={() => onNavigateTab("sales")}
          />
          <StatCard
            title="Monthly Sales"
            value="₹1.88 Cr"
            change="+18.5%"
            icon="trend"
            subtitle="Current cycle billing"
            accentColor="blue"
            onClick={() => onNavigateTab("sales")}
          />
          <StatCard
            title="Purchase (Spend)"
            value={formatLakhsCr(totalPurchases)}
            change="80 Active POs"
            icon="cart"
            subtitle="Raw steel, spindles, drives"
            accentColor="navy"
            onClick={() => onNavigateTab("purchase")}
          />
          <StatCard
            title="Operating Expenses"
            value={formatLakhsCr(totalExpenses)}
            change="50 Vouchers"
            icon="receipt"
            subtitle="Factory power, travel, upkeep"
            accentColor="navy"
            onClick={() => onNavigateTab("expense")}
          />
          <StatCard
            title="Gross Revenue"
            value={formatLakhsCr(totalRevenue)}
            change="+22.4% YoY"
            icon="wallet"
            subtitle="100 Invoiced contracts"
            accentColor="orange"
            onClick={() => onNavigateTab("accounting")}
          />
          <StatCard
            title="Net Profit (YTD)"
            value={formatLakhsCr(estimatedProfit)}
            change="24.8% Margin"
            icon="chart"
            subtitle="Net operational profit"
            accentColor="green"
            onClick={() => onNavigateTab("reports")}
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            change="Requires tooling"
            isPositive={false}
            icon="cog"
            subtitle="In machining / assembly"
            accentColor="orange"
            onClick={() => onNavigateTab("sales")}
          />
          <StatCard
            title="Completed Orders"
            value={completedOrders}
            change="100% PDI Passed"
            icon="check"
            subtitle="Dispatched & signed off"
            accentColor="green"
            onClick={() => onNavigateTab("sales")}
          />
          <StatCard
            title="Total Customers"
            value={customersData.length}
            change="50 Key Accounts"
            icon="customer"
            subtitle="Tata, Bharat Forge, Bajaj"
            accentColor="blue"
            onClick={() => onNavigateTab("customers")}
          />
          <StatCard
            title="Verified Suppliers"
            value={suppliersData.length}
            change="40 Partners"
            icon="supplier"
            subtitle="Siemens, Fanuc, THK, NSK"
            accentColor="navy"
            onClick={() => onNavigateTab("suppliers")}
          />
          <StatCard
            title="Inventory Value"
            value={formatLakhsCr(inventoryValuation)}
            change="60 SKU categories"
            icon="inventory"
            subtitle="Bhosari A1 & B3 stores"
            accentColor="blue"
            onClick={() => onNavigateTab("inventory")}
          />
          <StatCard
            title="Machine Fleet"
            value="30 Units"
            change="98% Uptime"
            icon="machine"
            subtitle="Active under warranty/AMC"
            accentColor="green"
            onClick={() => onNavigateTab("machines")}
          />
        </div>
      </div>

      {/* Visual Analytics Row: Tailwind Monthly Bar Chart + Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Monthly Sales vs Purchases Chart */}
        <div className="lg:col-span-8">
          <MonthlyBarChart />
        </div>

        {/* Circular Operational Health Gauges */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <DonutMetric
            title="Shop Floor OEE Efficiency"
            percentage={92}
            label="Spindle utilization rate across 3 shifts"
            color="#22C55E"
          />
          <DonutMetric
            title="On-Time Delivery Rate"
            percentage={96}
            label="SPM & VMC project milestone adherence"
            color="#F57C00"
          />
        </div>
      </div>

      {/* Bottom Row: Recent Sales Orders Table + Workshop Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071526]/50">
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1F3A] dark:text-white uppercase tracking-wider">
                Recent Machine Sales Orders
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest customer purchase requisitions and delivery schedules
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("sales")}
              className="text-xs font-bold text-[#3A6EA5] dark:text-[#60A5FA] hover:underline flex items-center gap-1"
            >
              <span>View All 100</span>
              <Icon name="arrow-right" size={13} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="px-4 py-3">Order Ref</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Machine / Part</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {salesData.slice(0, 6).map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => onNavigateTab("sales")}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                      {order.reference}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[160px] truncate">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                      {order.productName}
                    </td>
                    <td className="px-4 py-3 font-mono font-extrabold text-right text-slate-800 dark:text-white">
                      ₹{(order.totalAmount / 100000).toFixed(2)} L
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Workshop Activity Feed */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0B1F3A] dark:text-white">
                Live Workshop Activities
              </h3>
              <span className="size-2 rounded-full bg-[#F57C00] animate-ping" />
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {activitiesData.map((act, idx) => (
                <div key={idx} className="py-3 flex items-start gap-3">
                  <div
                    className={`size-7 rounded-xs flex items-center justify-center font-black text-[10px] shrink-0 ${
                      act.tone === "orange"
                        ? "bg-[#F57C00]/15 text-[#F57C00]"
                        : act.tone === "green"
                          ? "bg-emerald-500/15 text-emerald-600"
                          : act.tone === "red"
                            ? "bg-rose-500/15 text-rose-600"
                            : "bg-[#3A6EA5]/15 text-[#3A6EA5]"
                    }`}
                  >
                    {act.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-snug">
                      {act.text}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              onClick={() => onNavigateTab("projects")}
              className="text-xs font-bold text-[#F57C00] hover:underline"
            >
              Inspect Active Shop Floor Projects →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
