import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { expensesData } from "../../data/expenses";

export const ExpenseModule: React.FC = () => {
  const [expenses, setExpenses] = useState(expensesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedExpense, setSelectedExpense] = useState<(typeof expensesData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newExp, setNewExp] = useState({
    title: "",
    category: "Factory Utilities & Power",
    amount: 25000,
    recordedBy: "Neha Bhosale (Accounts)",
    paymentMethod: "NEFT Bank Transfer",
    isRecurring: false,
    notes: "",
  });

  const categories = [
    "All",
    "Factory Utilities & Power",
    "Tooling & Consumables",
    "Freight, Shipping & Logistics",
    "Machine Commissioning & Travel",
    "Workshop Maintenance & Upkeep",
    "R&D and Machine Prototyping",
    "Employee Training & Safety PPE",
    "Office Administration & Compliance",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recordedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredExpenses.length / pageSize);
  const displayedExpenses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredExpenses.slice(start, start + pageSize);
  }, [filteredExpenses, currentPage, pageSize]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...expenses.map((e) => e.id), 0) + 1;
    const created = {
      id: nextId,
      reference: `EXP-2026-${String(nextId).padStart(4, "0")}`,
      title: newExp.title || `${newExp.category} Voucher`,
      category: newExp.category,
      amount: Number(newExp.amount) || 5000,
      date: new Date().toISOString().slice(0, 10),
      recordedBy: newExp.recordedBy,
      approvedBy: "Shailesh Bhor",
      status: "Approved",
      isRecurring: newExp.isRecurring,
      paymentMethod: newExp.paymentMethod,
      notes: newExp.notes || "Recorded expense voucher for Pune manufacturing works.",
    };

    setExpenses([created, ...expenses]);
    setCreateModalOpen(false);
    showToast(`Expense voucher ${created.reference} approved and logged.`);
  };

  const handleApprove = (id: number) => {
    setExpenses(
      expenses.map((e) =>
        e.id === id ? { ...e, status: "Approved", approvedBy: "Shailesh Bhor" } : e,
      ),
    );
    showToast("Expense marked as Approved.");
    if (selectedExpense?.id === id) {
      setSelectedExpense({ ...selectedExpense, status: "Approved", approvedBy: "Shailesh Bhor" });
    }
  };

  const handleDelete = (id: number, ref: string) => {
    if (window.confirm(`Delete expense record ${ref}?`)) {
      setExpenses(expenses.filter((e) => e.id !== id));
      showToast(`Expense ${ref} deleted.`);
      if (selectedExpense?.id === id) setSelectedExpense(null);
    }
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
            Operating Expense & Cost Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log shop floor overheads, machine commissioning travel, logistics, and tooling
            consumables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Expense Report...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Expenses</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Create Expense Voucher</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Vouchers</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {expenses.length} Records
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Disbursed</span>
          <div className="text-xl font-black text-[#F57C00] mt-1">
            {formatPrice(expenses.reduce((acc, curr) => acc + curr.amount, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Recurring Monthly</span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {expenses.filter((e) => e.isRecurring).length} Subscriptions / Utilities
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Awaiting Director Sign-off
          </span>
          <div className="text-xl font-black text-rose-500 mt-1">
            {expenses.filter((e) => e.status.includes("Pending")).length} Vouchers
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search expenses by title or reference..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none max-w-xs"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Voucher Ref</th>
                <th className="px-4 py-3">Expense Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Amount (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedExpense(exp)}
                      className="hover:underline text-left"
                    >
                      {exp.reference}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[200px] truncate">
                    {exp.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{exp.category}</td>
                  <td className="px-4 py-3 text-slate-500">{exp.date}</td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(exp.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={exp.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedExpense(exp)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Details"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      {exp.status.includes("Pending") && (
                        <button
                          onClick={() => handleApprove(exp.id)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-xs"
                          title="Approve Voucher"
                        >
                          <Icon name="check" size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(exp.id, exp.reference)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Delete Voucher"
                      >
                        <Icon name="trash" size={14} />
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
          totalRecords={filteredExpenses.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Expense Modal */}
      {selectedExpense && (
        <Modal
          isOpen={Boolean(selectedExpense)}
          onClose={() => setSelectedExpense(null)}
          title={`Expense Voucher: ${selectedExpense.reference}`}
          subtitle={`${selectedExpense.title} · Category: ${selectedExpense.category}`}
          maxWidth="xl"
          footer={
            <>
              {selectedExpense.status.includes("Pending") && (
                <button
                  onClick={() => handleApprove(selectedExpense.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="check" size={14} />
                  <span>Approve Expense</span>
                </button>
              )}
              <button
                onClick={() => setSelectedExpense(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-sm hover:bg-slate-100"
              >
                Close
              </button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Voucher Amount
                </span>
                <p className="text-base font-black text-[#F57C00]">
                  {formatPrice(selectedExpense.amount)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Voucher Date</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedExpense.date}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Recorded By</span>
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedExpense.recordedBy}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Payment Method
                </span>
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedExpense.paymentMethod}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Audit Description & Notes
              </span>
              <p className="p-3 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedExpense.notes}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Log Operating Expense"
          subtitle="Record workshop overheads, travel, or maintenance expenses"
          maxWidth="lg"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Voucher Title *
              <input
                type="text"
                required
                value={newExp.title}
                onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                placeholder="e.g. Laser Alignment Kit Calibration Voucher"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Expense Category *
                <select
                  value={newExp.category}
                  onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Amount (₹) *
                <input
                  type="number"
                  min="100"
                  required
                  value={newExp.amount}
                  onChange={(e) => setNewExp({ ...newExp, amount: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Notes & Reason for Expenditure
              <textarea
                rows={2}
                value={newExp.notes}
                onChange={(e) => setNewExp({ ...newExp, notes: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Submit Voucher
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
