import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { purchasesData } from "../../data/purchases";
import { suppliersData } from "../../data/suppliers";

export const PurchaseModule: React.FC = () => {
  const [purchases, setPurchases] = useState(purchasesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedPO, setSelectedPO] = useState<(typeof purchasesData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newPO, setNewPO] = useState({
    supplierId: suppliersData[0]?.id || 1,
    supplierName: suppliersData[0]?.name || "",
    category: suppliersData[0]?.category || "CNC Controllers & Drives",
    itemDescription: "Batch of precision components for Pune line assembly",
    amount: 150000,
    warehouse: "Bhosari Central Warehouse A1",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const matchesSearch =
        item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [purchases, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredPurchases.length / pageSize);
  const displayedPurchases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPurchases.slice(start, start + pageSize);
  }, [filteredPurchases, currentPage, pageSize]);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliersData.find((s) => s.id === Number(newPO.supplierId));
    const nextId = Math.max(...purchases.map((p) => p.id), 0) + 1;
    const baseAmt = Number(newPO.amount) || 50000;
    const gst = Math.round(baseAmt * 0.18);

    const created = {
      id: nextId,
      reference: `PO-2026-${String(nextId).padStart(4, "0")}`,
      supplierId: sup ? sup.id : 1,
      supplierName: sup ? sup.name : newPO.supplierName,
      category: sup ? sup.category : newPO.category,
      itemDescription: newPO.itemDescription,
      amount: baseAmt,
      gstAmount: gst,
      totalAmount: baseAmt + gst,
      date: new Date().toISOString().slice(0, 10),
      expectedDelivery: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
      approvedBy: "Shailesh Bhor (Director)",
      status: "Approved",
      paymentStatus: "Pending On Bill",
      warehouse: newPO.warehouse,
    };

    setPurchases([created, ...purchases]);
    setCreateModalOpen(false);
    showToast(`Purchase Order ${created.reference} created and approved.`);
  };

  const handleApprove = (id: number) => {
    setPurchases(
      purchases.map((p) =>
        p.id === id ? { ...p, status: "Approved", approvedBy: "Shailesh Bhor (Director)" } : p,
      ),
    );
    showToast("Purchase order marked as Approved.");
    if (selectedPO?.id === id) {
      setSelectedPO({ ...selectedPO, status: "Approved", approvedBy: "Shailesh Bhor (Director)" });
    }
  };

  const handleDelete = (id: number, ref: string) => {
    if (window.confirm(`Are you sure you want to cancel / remove ${ref}?`)) {
      setPurchases(purchases.filter((p) => p.id !== id));
      showToast(`Purchase order ${ref} removed.`);
      if (selectedPO?.id === id) setSelectedPO(null);
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0B1F3A] text-white px-4 py-3 rounded-sm shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <Icon name="check" size={16} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B1F3A] dark:text-white uppercase tracking-tight">
            Purchase Management & Procurement
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage vendor purchase requisitions, approval lifecycles, and warehouse stores
            receiving.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Purchase Ledger to CSV/Excel placeholder...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export POs</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total POs</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {purchases.length} Records
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Received In Stores</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {purchases.filter((p) => p.status === "Received").length} Orders
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Approval</span>
          <div className="text-xl font-black text-[#F57C00] mt-1">
            {purchases.filter((p) => p.status.includes("Pending")).length} Requisitions
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total PO Value</span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1 truncate">
            {formatPrice(purchases.reduce((acc, curr) => acc + curr.totalAmount, 0))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search PO ref, supplier, or items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="All">All PO Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Received">Received</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="In Transit">In Transit</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">PO Number</th>
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Category & Scope</th>
                <th className="px-4 py-3">PO Date</th>
                <th className="px-4 py-3 text-right">Amount (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedPurchases.map((po) => (
                <tr
                  key={po.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button onClick={() => setSelectedPO(po)} className="hover:underline text-left">
                      {po.reference}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[180px] truncate">
                    {po.supplierName}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[220px] truncate">
                    {po.itemDescription}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{po.date}</td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(po.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={po.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedPO(po)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View PO Details"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      {po.status.includes("Pending") && (
                        <button
                          onClick={() => handleApprove(po.id)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-xs"
                          title="Approve PO Requisition"
                        >
                          <Icon name="check" size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(po.id, po.reference)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Cancel PO"
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
          totalRecords={filteredPurchases.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View PO Details Modal */}
      {selectedPO && (
        <Modal
          isOpen={Boolean(selectedPO)}
          onClose={() => setSelectedPO(null)}
          title={`Purchase Order: ${selectedPO.reference}`}
          subtitle={`Supplier: ${selectedPO.supplierName} · Date: ${selectedPO.date}`}
          maxWidth="2xl"
          footer={
            <>
              {selectedPO.status.includes("Pending") && (
                <button
                  onClick={() => handleApprove(selectedPO.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="check" size={14} />
                  <span>Approve PO</span>
                </button>
              )}
              <button
                onClick={() => showToast(`Printing Tax Invoice copy for ${selectedPO.reference}`)}
                className="px-4 py-2 bg-[#3A6EA5] hover:bg-blue-600 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
              >
                <Icon name="print" size={14} />
                <span>Print PO Invoice</span>
              </button>
              <button
                onClick={() => setSelectedPO(null)}
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
                <span className="text-slate-400 text-[10px] uppercase font-bold">Category</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedPO.category}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Warehouse</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedPO.warehouse}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Delivery Due</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedPO.expectedDelivery}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Base Amount</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {formatPrice(selectedPO.amount)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">GST (18%)</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {formatPrice(selectedPO.gstAmount)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Total Invoiced
                </span>
                <p className="font-black text-[#F57C00]">{formatPrice(selectedPO.totalAmount)}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Item Description & Specifications
              </span>
              <p className="p-3 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedPO.itemDescription}
              </p>
            </div>

            <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
              <span>
                Signatory:{" "}
                <strong className="text-slate-700 dark:text-slate-200">
                  {selectedPO.approvedBy}
                </strong>
              </span>
              <span>
                Payment Terms:{" "}
                <strong className="text-slate-700 dark:text-slate-200">
                  {selectedPO.paymentStatus}
                </strong>
              </span>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Purchase Order Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create New Purchase Order"
          subtitle="Generate statutory PO for material sourcing and vendor parts"
          maxWidth="lg"
        >
          <form onSubmit={handleCreatePO} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Supplier *
              <select
                value={newPO.supplierId}
                onChange={(e) => {
                  const s = suppliersData.find((sup) => sup.id === Number(e.target.value));
                  setNewPO({
                    ...newPO,
                    supplierId: Number(e.target.value),
                    supplierName: s?.name || "",
                    category: s?.category || "",
                  });
                }}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              >
                {suppliersData.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                PO Amount (₹ Base Excl. GST) *
                <input
                  type="number"
                  min="1000"
                  required
                  value={newPO.amount}
                  onChange={(e) => setNewPO({ ...newPO, amount: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Destination Warehouse
                <select
                  value={newPO.warehouse}
                  onChange={(e) => setNewPO({ ...newPO, warehouse: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="Bhosari Central Warehouse A1">Bhosari Central Warehouse A1</option>
                  <option value="Bhosari Component Store B3">Bhosari Component Store B3</option>
                  <option value="Pune Machine Depot">Pune Machine Depot</option>
                </select>
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Item Details & Sourcing Description *
              <textarea
                rows={3}
                required
                value={newPO.itemDescription}
                onChange={(e) => setNewPO({ ...newPO, itemDescription: e.target.value })}
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
                Issue Purchase Order
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
