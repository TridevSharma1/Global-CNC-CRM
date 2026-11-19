import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { inventoryData } from "../../data/inventory";

export const InventoryModule: React.FC = () => {
  const [items, setItems] = useState(inventoryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState<(typeof inventoryData)[0] | null>(null);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [adjustmentQty, setAdjustmentQty] = useState(0);
  const [targetWarehouse, setTargetWarehouse] = useState("Bhosari Component Store B3");
  const [toastMessage, setToastMessage] = useState("");

  const warehouses = [
    "All",
    "Bhosari Central Warehouse A1",
    "Bhosari Component Store B3",
    "Pune Machine Depot",
  ];

  const categories = ["All", "Raw Material", "Finished Goods", "Machine Parts"];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesWh = warehouseFilter === "All" || item.warehouse === warehouseFilter;
      const matchesCat = categoryFilter === "All" || item.category === categoryFilter;
      const matchesStat =
        statusFilter === "All" ||
        (statusFilter === "Low Stock"
          ? item.currentStock <= item.minStock
          : item.status === statusFilter);
      return matchesSearch && matchesWh && matchesCat && matchesStat;
    });
  }, [items, searchQuery, warehouseFilter, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const displayedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    const newStock = Math.max(0, selectedItem.currentStock + Number(adjustmentQty));
    const newStatus =
      newStock === 0
        ? "Out of Stock"
        : newStock <= selectedItem.minStock
          ? "Low Stock"
          : "In Stock";

    setItems(
      items.map((i) =>
        i.id === selectedItem.id
          ? {
              ...i,
              currentStock: newStock,
              totalValuation: newStock * i.unitCost,
              status: newStatus,
            }
          : i,
      ),
    );
    setAdjustModalOpen(false);
    showToast(`Stock updated for ${selectedItem.name}: ${newStock} ${selectedItem.unit}`);
  };

  const handleTransferStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setItems(
      items.map((i) => (i.id === selectedItem.id ? { ...i, warehouse: targetWarehouse } : i)),
    );
    setTransferModalOpen(false);
    showToast(`Transferred ${selectedItem.name} to ${targetWarehouse}.`);
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
            Inventory & Warehouse Stock Control (60 Items)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor raw steels, precision ball screws, spindle bearings, sub-assemblies, and
            multi-depot stock transfers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Warehouse Stock Sheet...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Inventory</span>
          </button>
          <button
            onClick={() => {
              setStatusFilter(statusFilter === "Low Stock" ? "All" : "Low Stock");
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 border ${
              statusFilter === "Low Stock"
                ? "bg-[#F57C00] text-white border-[#F57C00]"
                : "bg-white dark:bg-[#0B1F3A] text-[#F57C00] border-[#F57C00]"
            }`}
          >
            <Icon name="bell" size={14} />
            <span>
              Low Stock Alert ({items.filter((i) => i.currentStock <= i.minStock).length})
            </span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Total Inventory Valuation
          </span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(items.reduce((acc, curr) => acc + curr.totalValuation, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Raw Steels & Billets
          </span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {items.filter((i) => i.category === "Raw Material").length} SKUs
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Sub-assemblies & Parts
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {items.filter((i) => i.category === "Machine Parts").length} Spares
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Warehouse Depots</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            3 Locations in Pune
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search item code, name, or supplier..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={warehouseFilter}
            onChange={(e) => {
              setWarehouseFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            {warehouses.map((wh) => (
              <option key={wh} value={wh}>
                {wh}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Item Code</th>
                <th className="px-4 py-3">Material / Component</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Warehouse Depot</th>
                <th className="px-4 py-3 text-center">In Stock</th>
                <th className="px-4 py-3 text-right">Unit Cost</th>
                <th className="px-4 py-3 text-right">Total Value (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    {item.itemCode}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[200px] truncate">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.category}</td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[150px]">
                    {item.warehouse}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-black ${
                        item.currentStock <= item.minStock
                          ? "text-[#F57C00]"
                          : "text-slate-800 dark:text-white"
                      }`}
                    >
                      {item.currentStock} {item.unit}
                    </span>
                    <span className="block text-[9px] text-slate-400">Min: {item.minStock}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-right text-slate-600 dark:text-slate-300">
                    {formatPrice(item.unitCost)}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(item.totalValuation)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setAdjustmentQty(0);
                          setAdjustModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#F57C00] rounded-xs"
                        title="Stock Adjustment"
                      >
                        <Icon name="refresh" size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setTransferModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="Transfer Between Warehouses"
                      >
                        <Icon name="vendor" size={14} />
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
          totalRecords={filteredItems.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Adjust Stock Modal */}
      {adjustModalOpen && selectedItem && (
        <Modal
          isOpen={adjustModalOpen}
          onClose={() => setAdjustModalOpen(false)}
          title={`Adjust Stock: ${selectedItem.name}`}
          subtitle={`Current stock: ${selectedItem.currentStock} ${selectedItem.unit} at ${selectedItem.warehouse}`}
          maxWidth="md"
        >
          <form onSubmit={handleAdjustStock} className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Enter quantity adjustment (+ to add received goods, - to deduct for assembly line
              consumption):
            </p>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Quantity Adjustment ({selectedItem.unit})
              <input
                type="number"
                required
                value={adjustmentQty}
                onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-sm outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="p-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs text-xs flex justify-between font-bold">
              <span>Resulting Stock:</span>
              <span className="text-[#F57C00]">
                {Math.max(0, selectedItem.currentStock + Number(adjustmentQty))} {selectedItem.unit}
              </span>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setAdjustModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Apply Adjustment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Transfer Modal */}
      {transferModalOpen && selectedItem && (
        <Modal
          isOpen={transferModalOpen}
          onClose={() => setTransferModalOpen(false)}
          title={`Transfer Stock: ${selectedItem.name}`}
          subtitle={`From current location: ${selectedItem.warehouse}`}
          maxWidth="md"
        >
          <form onSubmit={handleTransferStock} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Destination Depot *
              <select
                value={targetWarehouse}
                onChange={(e) => setTargetWarehouse(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              >
                {warehouses
                  .filter((w) => w !== "All")
                  .map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
              </select>
            </label>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setTransferModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#3A6EA5] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Confirm Transfer
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
