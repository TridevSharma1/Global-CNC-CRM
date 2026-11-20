import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { MultiFilterBar, FilterOption } from "../common/MultiFilterBar";
import { matchesMachineFilter, matchesMonthFilter } from "../../utils/filterUtils";
import { expensesData, ExpenseItem } from "../../data/expenses";

export const ExpenseReportModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [machineFilter, setMachineFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const statusOptions: FilterOption[] = [
    { value: "All", label: "All Audit Statuses" },
    { value: "Approved", label: "Approved" },
    { value: "Pending Approval", label: "Pending Approval" },
    { value: "Paid", label: "Paid" },
  ];

  const categoryOptions: FilterOption[] = useMemo(() => {
    const set = new Set(expensesData.map((e) => e.category));
    return [
      { value: "All", label: "All Overheads" },
      ...Array.from(set).map((c) => ({ value: c, label: c })),
    ];
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setMachineFilter("All");
    setMonthFilter("All");
    setStatusFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
  };

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // Filtered expenses
  const filteredExpenses = useMemo(() => {
    return expensesData.filter((e) => {
      const matchSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.recordedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.notes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = categoryFilter === "All" || e.category === categoryFilter;
      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      const matchMachine = matchesMachineFilter(machineFilter, e.category, e.title, e.notes);
      const matchMonth = matchesMonthFilter(e.date, monthFilter);

      return matchSearch && matchCategory && matchStatus && matchMachine && matchMonth;
    });
  }, [searchQuery, categoryFilter, statusFilter, machineFilter, monthFilter]);

  // Totals calculated from filtered selection
  const totalAmount = useMemo(
    () => filteredExpenses.reduce((acc, e) => acc + e.amount, 0),
    [filteredExpenses],
  );
  const approvedAmount = useMemo(
    () =>
      filteredExpenses
        .filter((e) => e.status === "Approved" || e.status === "Paid")
        .reduce((acc, e) => acc + e.amount, 0),
    [filteredExpenses],
  );
  const approvedCount = useMemo(
    () => filteredExpenses.filter((e) => e.status === "Approved" || e.status === "Paid").length,
    [filteredExpenses],
  );
  const pendingCount = useMemo(
    () => filteredExpenses.filter((e) => e.status === "Pending Approval").length,
    [filteredExpenses],
  );

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / pageSize) || 1;
  const paginatedExpenses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredExpenses.slice(start, start + pageSize);
  }, [filteredExpenses, currentPage, pageSize]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = "Voucher Ref,Title,Category,Date,Amount,Payment Method,Recorded By,Status\n";
    const rows = filteredExpenses
      .map(
        (e) =>
          `"${e.reference}","${e.title}","${e.category}","${e.date}",${e.amount},"${e.paymentMethod}","${e.recordedBy}","${e.status}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Global_CNC_Expense_Report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Expense Report exported successfully as CSV.");
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
            <span>OPERATIONAL AUDIT · OVERHEADS & COST CONTROLS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            Expense & Voucher Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit of 50 operating expense vouchers, MIDC utility bills, tooling upkeep, and
            logistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Operational Expense
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {formatPrice(totalAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {expensesData.length} vouchers logged
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Approved Spend
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#22C55E] mt-1">
            {formatPrice(approvedAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{approvedCount} vouchers cleared</div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Pending Authorization
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#F57C00] mt-1">
            {pendingCount} Vouchers
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Awaiting management review</div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Top Spend Category
          </div>
          <div className="text-base sm:text-lg font-black text-[#3A6EA5] truncate mt-1">
            Electricity & Utilities
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Bhosari machining plant</div>
        </div>
      </div>

      {/* Multi-Filter Bar (Machine-Wise, Month, Status, Overhead Category, Search) */}
      <MultiFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        searchPlaceholder="Search voucher ref, title, or machine line..."
        machineFilter={machineFilter}
        onMachineChange={(m) => {
          setMachineFilter(m);
          setCurrentPage(1);
        }}
        monthFilter={monthFilter}
        onMonthChange={(mo) => {
          setMonthFilter(mo);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(st) => {
          setStatusFilter(st);
          setCurrentPage(1);
        }}
        statusOptions={statusOptions}
        secondaryFilter={categoryFilter}
        onSecondaryChange={(c) => {
          setCategoryFilter(c);
          setCurrentPage(1);
        }}
        secondaryLabel="Category"
        secondaryOptions={categoryOptions}
        totalItems={expensesData.length}
        filteredCount={filteredExpenses.length}
        totalFilteredAmount={totalAmount}
        onResetAll={handleResetFilters}
      />

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#071526] border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Voucher Ref</th>
                <th className="py-3 px-4">Title / Purpose</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4">Recorded By</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {paginatedExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#0B1F3A] dark:text-slate-200">
                    {exp.reference}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100 max-w-[200px] truncate">
                    {exp.title}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-xs text-[10px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{exp.date}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {exp.paymentMethod}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                    {formatPrice(exp.amount)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{exp.recordedBy}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={exp.status} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedExpense(exp)}
                      className="px-2.5 py-1 text-[11px] font-bold text-[#3A6EA5] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredExpenses.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedExpense(null)}
          title={`Expense Voucher: ${selectedExpense.reference}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-[#071526] rounded-xs border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Voucher Title</span>
              <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mt-0.5">
                {selectedExpense.title}
              </div>
              <div className="text-slate-500 mt-1">
                Category: <strong>{selectedExpense.category}</strong> · Date: {selectedExpense.date}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Payment Mode</span>
                <div className="font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {selectedExpense.paymentMethod}
                </div>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Recorded By</span>
                <div className="font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {selectedExpense.recordedBy}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center text-sm font-black text-[#0B1F3A] dark:text-white">
              <span>Disbursed Amount:</span>
              <span className="text-rose-600 dark:text-rose-400 font-mono text-base">
                {formatPrice(selectedExpense.amount)}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white font-bold rounded-xs flex items-center gap-1.5"
              >
                <Icon name="print" size={13} />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={() => setSelectedExpense(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 rounded-xs"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
