import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { MultiFilterBar, FilterOption } from "../common/MultiFilterBar";
import { matchesMachineFilter, matchesMonthFilter } from "../../utils/filterUtils";
import { purchasesData, PurchaseOrder } from "../../data/purchases";

export const PurchaseReportModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [machineFilter, setMachineFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const statusOptions: FilterOption[] = [
    { value: "All", label: "All Sourcing Statuses" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received / Stocked" },
    { value: "Pending Approval", label: "Pending Approval" },
    { value: "In Transit", label: "In Transit" },
    { value: "Draft", label: "Draft" },
  ];

  const categoryOptions: FilterOption[] = [
    { value: "All", label: "All Categories" },
    { value: "CNC Controllers & Drives", label: "CNC Controllers & Drives" },
    { value: "Linear Motion & Bearings", label: "Linear Motion & Bearings" },
    { value: "Raw Steel & Castings", label: "Raw Steel & Castings" },
    { value: "Spindles & Motors", label: "Spindles & Motors" },
    { value: "Lubricants & Coolants", label: "Lubricants & Coolants" },
  ];

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

  // Filtered purchases
  const filteredPurchases = useMemo(() => {
    return purchasesData.filter((p) => {
      const matchSearch =
        p.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.itemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      const matchMachine = matchesMachineFilter(
        machineFilter,
        p.category,
        p.itemDescription,
        p.warehouse,
      );
      const matchMonth = matchesMonthFilter(p.date, monthFilter);

      return matchSearch && matchStatus && matchCategory && matchMachine && matchMonth;
    });
  }, [searchQuery, statusFilter, categoryFilter, machineFilter, monthFilter]);

  // Totals calculated from filtered selection
  const totalAmount = useMemo(
    () => filteredPurchases.reduce((acc, p) => acc + p.amount, 0),
    [filteredPurchases],
  );
  const totalGst = useMemo(
    () => filteredPurchases.reduce((acc, p) => acc + p.gstAmount, 0),
    [filteredPurchases],
  );
  const totalSpend = useMemo(
    () => filteredPurchases.reduce((acc, p) => acc + p.totalAmount, 0),
    [filteredPurchases],
  );
  const receivedCount = useMemo(
    () =>
      filteredPurchases.filter((p) => p.status === "Received" || p.status === "Approved").length,
    [filteredPurchases],
  );

  // Pagination
  const totalPages = Math.ceil(filteredPurchases.length / pageSize) || 1;
  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPurchases.slice(start, start + pageSize);
  }, [filteredPurchases, currentPage, pageSize]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers =
      "PO Reference,Supplier,Category,Item,Date,Basic Cost,GST (18%),Total Spend,Status,Approved By\n";
    const rows = filteredPurchases
      .map(
        (p) =>
          `"${p.reference}","${p.supplierName}","${p.category}","${p.itemDescription}","${p.date}",${p.amount},${p.gstAmount},${p.totalAmount},"${p.status}","${p.approvedBy}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Global_CNC_Purchase_Report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Purchase Report exported successfully as CSV.");
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
            <span>PROCUREMENT AUDIT · SOURCING & VENDOR SPEND</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            Purchase Spend Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit of 80 purchase orders, castings, ball screws, linear guides, and CNC drives for
            Bhosari plant.
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
            Total Basic Spend
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {formatPrice(totalAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {purchasesData.length} purchase orders issued
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Input Tax Credit (ITC)
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#3A6EA5] mt-1">
            {formatPrice(totalGst)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">GST recoverable credit</div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Gross Procurement Cost
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {formatPrice(totalSpend)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Total purchase commitment</div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Fulfillment Health
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#22C55E] mt-1">
            {receivedCount} Fulfilled
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Approved & delivered to store</div>
        </div>
      </div>

      {/* Multi-Filter Bar (Machine-Wise, Month, Status, Sourcing Category, Search) */}
      <MultiFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        searchPlaceholder="Search PO ref, supplier, or machine part..."
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
        totalItems={purchasesData.length}
        filteredCount={filteredPurchases.length}
        totalFilteredAmount={totalSpend}
        onResetAll={handleResetFilters}
      />

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#071526] border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">PO Reference</th>
                <th className="py-3 px-4">Supplier Partner</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Item / Description</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Taxable</th>
                <th className="py-3 px-4 text-right">GST (18%)</th>
                <th className="py-3 px-4 text-right">Total Cost</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {paginatedPurchases.map((po) => (
                <tr
                  key={po.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#0B1F3A] dark:text-slate-200">
                    {po.reference}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">
                    {po.supplierName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-xs text-[10px]">
                      {po.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
                    {po.itemDescription}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{po.date}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                    {formatPrice(po.amount)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-500">
                    {formatPrice(po.gstAmount)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                    {formatPrice(po.totalAmount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedPO(po)}
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
          totalItems={filteredPurchases.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* PO Detail Modal */}
      {selectedPO && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPO(null)}
          title={`Purchase Order: ${selectedPO.reference}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-[#071526] rounded-xs border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Supplier</span>
                <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mt-0.5">
                  {selectedPO.supplierName}
                </div>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Order Date</span>
                <div className="font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {selectedPO.date}
                </div>
              </div>
            </div>

            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold">
                Item Description
              </span>
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-0.5">
                {selectedPO.itemDescription}
              </div>
              <div className="text-slate-500 mt-0.5">
                Category: {selectedPO.category} · Authorized By: {selectedPO.approvedBy}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Taxable Amount:</span>
                <span>{formatPrice(selectedPO.amount)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST (18% ITC):</span>
                <span>{formatPrice(selectedPO.gstAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#0B1F3A] dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>Total PO Value:</span>
                <span className="text-rose-600 dark:text-rose-400">
                  {formatPrice(selectedPO.totalAmount)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white font-bold rounded-xs flex items-center gap-1.5"
              >
                <Icon name="print" size={13} />
                <span>Print PO</span>
              </button>
              <button
                onClick={() => setSelectedPO(null)}
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
