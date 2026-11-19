import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { vendorsData } from "../../data/vendors";

export const VendorModule: React.FC = () => {
  const [vendors, setVendors] = useState(vendorsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedVendor, setSelectedVendor] = useState<(typeof vendorsData)[0] | null>(null);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState(50000);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vendors, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredVendors.length / pageSize);
  const displayedVendors = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredVendors.slice(start, start + pageSize);
  }, [filteredVendors, currentPage, pageSize]);

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendor) return;
    const amountPaid = Number(payAmount) || 0;
    const nextOutstanding = Math.max(0, selectedVendor.outstanding - amountPaid);
    const nextTotalPaid = selectedVendor.totalPaid + amountPaid;

    setVendors(
      vendors.map((v) =>
        v.id === selectedVendor.id
          ? {
              ...v,
              outstanding: nextOutstanding,
              totalPaid: nextTotalPaid,
            }
          : v,
      ),
    );
    setPayModalOpen(false);
    showToast(`Payment of ₹${amountPaid.toLocaleString()} processed to ${selectedVendor.name}.`);
    setSelectedVendor({
      ...selectedVendor,
      outstanding: nextOutstanding,
      totalPaid: nextTotalPaid,
    });
  };

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

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
            Vendor Management & Financial Settlement (40 Vendors)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track vendor performance ratings, total orders, disbursed payments, and outstanding
            balances.
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting Vendor Ledger Report...")}
          className="px-3.5 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
        >
          <Icon name="download" size={14} />
          <span>Export Vendor Ledger</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Vendors</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {vendors.length} Partners
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Total Settled (Paid)
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 truncate">
            {formatPrice(vendors.reduce((acc, curr) => acc + curr.totalPaid, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Vendor Outstanding</span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(vendors.reduce((acc, curr) => acc + curr.outstanding, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Preferred Tier Vendors
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {vendors.filter((v) => v.status === "Preferred" || v.status === "Approved").length}{" "}
            Active
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search vendor name, code, or category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="All">All Vendor Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Preferred">Preferred</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Vendor Code</th>
                <th className="px-4 py-3">Vendor Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Orders</th>
                <th className="px-4 py-3 text-right">Total Paid (₹)</th>
                <th className="px-4 py-3 text-right">Outstanding (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedVendors.map((ven) => (
                <tr
                  key={ven.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedVendor(ven)}
                      className="hover:underline text-left"
                    >
                      {ven.vendorCode}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[200px] truncate">
                    <button
                      onClick={() => setSelectedVendor(ven)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {ven.name}
                    </button>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {ven.city} · {ven.phone}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{ven.category}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800 dark:text-white">
                    {ven.totalOrders}
                  </td>
                  <td className="px-4 py-3 font-mono text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    {formatPrice(ven.totalPaid)}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-[#F57C00]">
                    {formatPrice(ven.outstanding)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ven.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedVendor(ven)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Vendor Card"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVendor(ven);
                          setPayAmount(Math.min(ven.outstanding, 50000) || 25000);
                          setPayModalOpen(true);
                        }}
                        className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-xs"
                        title="Disburse Payment"
                      >
                        <Icon name="wallet" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredVendors.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Vendor Modal */}
      {selectedVendor && (
        <Modal
          isOpen={Boolean(selectedVendor)}
          onClose={() => setSelectedVendor(null)}
          title={selectedVendor.name}
          subtitle={`Vendor: ${selectedVendor.vendorCode} · ${selectedVendor.category}`}
          maxWidth="2xl"
          footer={
            <>
              {selectedVendor.outstanding > 0 && (
                <button
                  onClick={() => {
                    setPayAmount(selectedVendor.outstanding);
                    setPayModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="wallet" size={14} />
                  <span>Settle Outstanding (₹)</span>
                </button>
              )}
              <button
                onClick={() => setSelectedVendor(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-sm hover:bg-slate-100"
              >
                Close
              </button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Outstanding Payable
                </span>
                <p className="text-base font-black text-[#F57C00]">
                  {formatPrice(selectedVendor.outstanding)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Total Paid Historically
                </span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatPrice(selectedVendor.totalPaid)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Total Fulfilled Orders
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedVendor.totalOrders} POs
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">GSTIN</span>
                <p className="font-mono font-bold text-slate-800 dark:text-white">
                  {selectedVendor.gstNumber}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Payment Terms
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedVendor.paymentTerms}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Performance Rating
                </span>
                <p className="font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                  {selectedVendor.rating} / 5.0
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Key Contact</span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5">
                  {selectedVendor.contactPerson} ({selectedVendor.phone})
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Sales Desk Email
                </span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5 break-all">
                  {selectedVendor.email}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Pay Modal */}
      {payModalOpen && selectedVendor && (
        <Modal
          isOpen={payModalOpen}
          onClose={() => setPayModalOpen(false)}
          title={`Disburse Payment: ${selectedVendor.name}`}
          subtitle={`Current Outstanding: ${formatPrice(selectedVendor.outstanding)}`}
          maxWidth="md"
        >
          <form onSubmit={handleMakePayment} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Payment Amount (₹) *
              <input
                type="number"
                min="1000"
                max={selectedVendor.outstanding || 10000000}
                required
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-sm outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="p-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs text-xs flex justify-between font-bold">
              <span>Remaining Balance:</span>
              <span className="text-[#F57C00]">
                {formatPrice(Math.max(0, selectedVendor.outstanding - Number(payAmount)))}
              </span>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPayModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
