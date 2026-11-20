import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { salesData, SaleOrder } from "../../data/sales";

export const SalesReportModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSale, setSelectedSale] = useState<SaleOrder | null>(null);
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

  // Filtered sales
  const filteredSales = useMemo(() => {
    return salesData.filter((s) => {
      const matchSearch =
        s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.salesPerson.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [searchQuery, statusFilter]);

  // Totals
  const totalAmount = useMemo(() => salesData.reduce((acc, s) => acc + s.amount, 0), []);
  const totalGst = useMemo(() => salesData.reduce((acc, s) => acc + s.gstAmount, 0), []);
  const totalInvoiced = useMemo(() => salesData.reduce((acc, s) => acc + s.totalAmount, 0), []);
  const paidCount = useMemo(() => salesData.filter((s) => s.status === "Paid").length, []);
  const pendingCount = useMemo(() => salesData.filter((s) => s.status !== "Paid").length, []);

  // Pagination
  const totalPages = Math.ceil(filteredSales.length / pageSize) || 1;
  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSales.slice(start, start + pageSize);
  }, [filteredSales, currentPage, pageSize]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers =
      "Reference,Customer,Product,Date,Taxable Amount,GST Amount,Total Amount,Status,Salesperson\n";
    const rows = filteredSales
      .map(
        (s) =>
          `"${s.reference}","${s.customerName}","${s.productName}","${s.date}",${s.amount},${s.gstAmount},${s.totalAmount},"${s.status}","${s.salesPerson}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Global_CNC_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Sales Report exported successfully as CSV.");
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
            <span>EXECUTIVE AUDIT · COMMERCIAL SALES PERFORMANCE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            Sales & Revenue Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Detailed breakdown of 100 machine orders, tax invoices, and realization across India.
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
            Total Taxable Sales
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {formatPrice(totalAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {salesData.length} total orders booked
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            GST Output (18%)
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#3A6EA5] mt-1">
            {formatPrice(totalGst)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Statutory tax liability</div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Invoiced Value
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#22C55E] mt-1">
            {formatPrice(totalInvoiced)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Gross billing with GST</div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Realization Status
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#F57C00] mt-1">
            {paidCount} Paid / {pendingCount} Pending
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Payment clearance health</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Paid", "Pending", "Partially Paid", "Overdue"].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-colors ${
                statusFilter === st
                  ? "bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search order, customer, product..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-[#3A6EA5]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#071526] border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Machine / Product</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Taxable</th>
                <th className="py-3 px-4 text-right">GST (18%)</th>
                <th className="py-3 px-4 text-right">Gross Total</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {paginatedSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#0B1F3A] dark:text-slate-200">
                    {sale.reference}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">
                    {sale.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                    {sale.productName}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{sale.date}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                    {formatPrice(sale.amount)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-500">
                    {formatPrice(sale.gstAmount)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatPrice(sale.totalAmount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedSale(sale)}
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
          totalItems={filteredSales.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Sale Detail Modal */}
      {selectedSale && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSale(null)}
          title={`Tax Invoice: ${selectedSale.reference}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-[#071526] rounded-xs border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Customer</span>
                <div className="font-bold text-sm text-[#0B1F3A] dark:text-white mt-0.5">
                  {selectedSale.customerName}
                </div>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Order Date</span>
                <div className="font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                  {selectedSale.date}
                </div>
              </div>
            </div>

            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold">
                Machine Equipment
              </span>
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-0.5">
                {selectedSale.productName}
              </div>
              <div className="text-slate-500 mt-0.5">
                Quantity: {selectedSale.quantity} Units · Sales Engineer: {selectedSale.salesPerson}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Taxable Basic Amount:</span>
                <span>{formatPrice(selectedSale.amount)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST Output (18%):</span>
                <span>{formatPrice(selectedSale.gstAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#0B1F3A] dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>Total Payable Amount:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {formatPrice(selectedSale.totalAmount)}
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
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedSale(null)}
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
