import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { accountingData } from "../../data/accounting";

export const AccountingModule: React.FC = () => {
  const [transactions, setTransactions] = useState(accountingData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newTxn, setNewTxn] = useState({
    type: "Income / Receipt",
    category: "Sales Receipt",
    account: "HDFC Bank Corporate - 0422",
    amount: 250000,
    description: "Machine milestone advance received via RTGS",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.account.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || item.type.includes(typeFilter);
      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const displayedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  const handleCreateTxn = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...transactions.map((t) => t.id), 0) + 1;
    const isInc = newTxn.type.includes("Income");
    const lastBal = transactions[0]?.balanceAfter || 15000000;
    const amt = Number(newTxn.amount) || 10000;
    const nextBal = isInc ? lastBal + amt : lastBal - amt;

    const created = {
      id: nextId,
      reference: `TXN-2026-${String(nextId).padStart(4, "0")}`,
      type: newTxn.type,
      category: newTxn.category,
      account: newTxn.account,
      amount: amt,
      date: new Date().toISOString().slice(0, 10),
      balanceAfter: nextBal,
      description: newTxn.description,
      status: "Cleared",
    };

    setTransactions([created, ...transactions]);
    setCreateModalOpen(false);
    showToast(`Transaction ${created.reference} recorded.`);
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
            Financial Accounting & Banking Ledger
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time cash flow monitoring, bank balances, customer receipts, and supplier
            disbursement entries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Bank Reconciliation Statement...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Bank Reconciliation</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Operating Cash Balance
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 truncate">
            {formatPrice(transactions[0]?.balanceAfter || 14250000)}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Total Ledger Entries
          </span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {transactions.length} Vouchers
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Primary Bank Account
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1 truncate">
            HDFC Bank (0422)
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Statutory Audit Status
          </span>
          <div className="text-xl font-black text-[#F57C00] mt-1">Cleared & Audited</div>
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
            placeholder="Search transaction ref or description..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="All">All Cash Flows</option>
          <option value="Income">Income / Receipts (+)</option>
          <option value="Expense">Expense / Payments (-)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Txn Ref</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Debit / Credit</th>
                <th className="px-4 py-3 text-right">Balance After</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedTransactions.map((txn) => {
                const isIncome = txn.type.includes("Income");
                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                      {txn.reference}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[240px] truncate">
                      {txn.description}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{txn.account}</td>
                    <td className="px-4 py-3 text-slate-500">{txn.date}</td>
                    <td
                      className={`px-4 py-3 font-mono font-black text-right ${
                        isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                      }`}
                    >
                      {isIncome ? `+ ${formatPrice(txn.amount)}` : `- ${formatPrice(txn.amount)}`}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                      {formatPrice(txn.balanceAfter)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={txn.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredTransactions.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Record Txn Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Record Financial Transaction"
          subtitle="Log banking receipt, RTGS advance, or vendor payout voucher"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateTxn} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Transaction Type *
                <select
                  value={newTxn.type}
                  onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="Income / Receipt">Income / Customer Receipt (+)</option>
                  <option value="Expense / Payment">Expense / Vendor Payment (-)</option>
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Amount (₹) *
                <input
                  type="number"
                  min="100"
                  required
                  value={newTxn.amount}
                  onChange={(e) => setNewTxn({ ...newTxn, amount: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Bank Account
                <select
                  value={newTxn.account}
                  onChange={(e) => setNewTxn({ ...newTxn, account: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="HDFC Bank Corporate - 0422">HDFC Bank Corporate - 0422</option>
                  <option value="State Bank of India MIDC - 8819">
                    State Bank of India MIDC - 8819
                  </option>
                  <option value="ICICI Current Account - 1102">ICICI Current Account - 1102</option>
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Category
                <input
                  type="text"
                  value={newTxn.category}
                  onChange={(e) => setNewTxn({ ...newTxn, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Description & Bank Reference Number
              <textarea
                rows={2}
                required
                value={newTxn.description}
                onChange={(e) => setNewTxn({ ...newTxn, description: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Save Transaction
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
