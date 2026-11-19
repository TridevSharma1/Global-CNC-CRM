import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { salesData } from "../../data/sales";
import { purchasesData } from "../../data/purchases";
import { expensesData } from "../../data/expenses";
import { inventoryData } from "../../data/inventory";
import { customersData } from "../../data/customers";
import { suppliersData } from "../../data/suppliers";
import { employeesData } from "../../data/employees";
import { servicesData } from "../../data/services";
import { leadsData } from "../../data/leads";
import { projectsData } from "../../data/projects";
import { machinesData } from "../../data/machines";

export const ReportsModule: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>("Sales Report");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toastMessage, setToastMessage] = useState("");

  const reportList = [
    "Sales Report",
    "Purchase Report",
    "Expense Report",
    "Profit Report",
    "Revenue Report",
    "Inventory Report",
    "Stock Report",
    "Customer Report",
    "Supplier Report",
    "Employee Report",
    "Service Report",
    "Lead Report",
    "Project Report",
    "Machine Report",
    "Monthly Report",
    "Yearly Report",
    "GST Report",
  ];

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

  // Generate dynamic table rows according to report type
  const reportRows = useMemo(() => {
    switch (selectedReport) {
      case "Sales Report":
      case "Revenue Report":
      case "Monthly Report":
      case "Yearly Report":
        return salesData.map((s) => ({
          col1: s.reference,
          col2: s.customerName,
          col3: s.productName,
          col4: s.date,
          col5: formatPrice(s.amount),
          col6: formatPrice(s.gstAmount),
          col7: formatPrice(s.totalAmount),
          status: s.status,
        }));
      case "Purchase Report":
        return purchasesData.map((p) => ({
          col1: p.reference,
          col2: p.supplierName,
          col3: p.itemDescription,
          col4: p.date,
          col5: formatPrice(p.amount),
          col6: formatPrice(p.gstAmount),
          col7: formatPrice(p.totalAmount),
          status: p.status,
        }));
      case "Expense Report":
        return expensesData.map((e) => ({
          col1: e.reference,
          col2: e.title,
          col3: e.category,
          col4: e.date,
          col5: e.recordedBy,
          col6: e.paymentMethod,
          col7: formatPrice(e.amount),
          status: e.status,
        }));
      case "Profit Report":
        return salesData.slice(0, 40).map((s, idx) => {
          const cost = Math.round(s.amount * 0.72);
          const profit = s.amount - cost;
          return {
            col1: s.reference,
            col2: s.customerName,
            col3: s.productName,
            col4: s.date,
            col5: formatPrice(s.amount),
            col6: formatPrice(cost),
            col7: formatPrice(profit),
            status: "28% Margin",
          };
        });
      case "Inventory Report":
      case "Stock Report":
        return inventoryData.map((i) => ({
          col1: i.itemCode,
          col2: i.name,
          col3: i.category,
          col4: i.warehouse,
          col5: `${i.currentStock} ${i.unit}`,
          col6: formatPrice(i.unitCost),
          col7: formatPrice(i.totalValuation),
          status: i.status,
        }));
      case "Customer Report":
        return customersData.map((c) => ({
          col1: c.code,
          col2: c.name,
          col3: c.industry,
          col4: `${c.city}, ${c.state}`,
          col5: c.gstNumber,
          col6: `${c.salesHistoryCount} Orders`,
          col7: formatPrice(c.outstanding),
          status: c.status,
        }));
      case "Supplier Report":
        return suppliersData.map((s) => ({
          col1: s.code,
          col2: s.name,
          col3: s.category,
          col4: s.city,
          col5: s.gstNumber,
          col6: s.paymentTerms,
          col7: formatPrice(s.outstanding),
          status: s.status,
        }));
      case "Employee Report":
        return employeesData.map((e) => ({
          col1: e.empCode,
          col2: e.name,
          col3: e.department,
          col4: e.designation,
          col5: `${e.attendancePercent}%`,
          col6: e.shift,
          col7: formatPrice(e.salary),
          status: `${e.performanceScore}/100`,
        }));
      case "Service Report":
        return servicesData.map((srv) => ({
          col1: srv.ticketNo,
          col2: srv.customerName,
          col3: srv.machineModel,
          col4: srv.serviceType,
          col5: srv.engineerAssigned,
          col6: srv.visitDate,
          col7: formatPrice(srv.cost),
          status: srv.status,
        }));
      case "Lead Report":
        return leadsData.map((l) => ({
          col1: l.leadCode,
          col2: l.companyName,
          col3: l.machineInterest,
          col4: l.source,
          col5: `${l.probability}%`,
          col6: l.nextFollowUp,
          col7: formatPrice(l.estimatedBudget),
          status: l.status,
        }));
      case "Project Report":
        return projectsData.map((p) => ({
          col1: p.projectCode,
          col2: p.name,
          col3: p.clientName,
          col4: p.leadEngineer,
          col5: `${p.progress}%`,
          col6: p.deadline,
          col7: formatPrice(p.budget),
          status: p.status,
        }));
      case "Machine Report":
        return machinesData.map((m) => ({
          col1: m.serialNo,
          col2: m.modelName,
          col3: m.clientName,
          col4: m.controllerType,
          col5: `${m.runningHours.toLocaleString()} Hrs`,
          col6: m.amcStatus,
          col7: `${m.healthScore}%`,
          status: m.operationalStatus,
        }));
      case "GST Report":
        return salesData.slice(0, 50).map((s) => ({
          col1: s.invoiceNo,
          col2: s.customerName,
          col3: "27AABCG8921F1ZX (Pune)",
          col4: s.date,
          col5: formatPrice(s.amount),
          col6: formatPrice(s.gstAmount / 2) + " (CGST 9%)",
          col7: formatPrice(s.gstAmount / 2) + " (SGST 9%)",
          status: "Tax Invoiced",
        }));
      default:
        return salesData.map((s) => ({
          col1: s.reference,
          col2: s.customerName,
          col3: s.productName,
          col4: s.date,
          col5: formatPrice(s.amount),
          col6: formatPrice(s.gstAmount),
          col7: formatPrice(s.totalAmount),
          status: s.status,
        }));
    }
  }, [selectedReport]);

  const filteredRows = useMemo(() => {
    return reportRows.filter((r) =>
      `${r.col1} ${r.col2} ${r.col3} ${r.col4} ${r.status}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [reportRows, searchQuery]);

  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const displayedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0B1F3A] text-white px-4 py-3 rounded-sm shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <Icon name="check" size={16} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B1F3A] dark:text-white uppercase tracking-tight">
            Enterprise Intelligence & Reports Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit-ready statements for 17 modules: Sales, Purchases, GST, Inventory, Profit,
            Machines, and AMC SLA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast(`Printing official copy for ${selectedReport}...`)}
            className="px-3.5 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="print" size={14} />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => showToast(`Exporting ${selectedReport} to Excel / CSV format...`)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 17 Report Selector Tabs */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3 rounded-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {reportList.map((rep) => (
            <button
              key={rep}
              onClick={() => {
                setSelectedReport(rep);
                setCurrentPage(1);
                setSearchQuery("");
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-xs transition-colors shrink-0 ${
                selectedReport === rep
                  ? "bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {rep}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder={`Search records inside ${selectedReport}...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing <span className="text-[#F57C00]">{filteredRows.length}</span> audited line entries
        </div>
      </div>

      {/* Beautiful Dynamic Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Reference / Code</th>
                <th className="px-4 py-3">Primary Account</th>
                <th className="px-4 py-3">Specification / Detail</th>
                <th className="px-4 py-3">Date / Category</th>
                <th className="px-4 py-3 text-right">Metric / Base</th>
                <th className="px-4 py-3 text-right">Tax / Cost</th>
                <th className="px-4 py-3 text-right">Net Valuation</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    {row.col1}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[200px] truncate">
                    {row.col2}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[220px] truncate">
                    {row.col3}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{row.col4}</td>
                  <td className="px-4 py-3 font-mono text-right text-slate-700 dark:text-slate-300">
                    {row.col5}
                  </td>
                  <td className="px-4 py-3 font-mono text-right text-slate-700 dark:text-slate-300">
                    {row.col6}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {row.col7}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredRows.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};
