import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { MultiFilterBar, FilterOption } from "../common/MultiFilterBar";
import { matchesMachineFilter, matchesMonthFilter } from "../../utils/filterUtils";
import { salesData } from "../../data/sales";
import { customersData } from "../../data/customers";
import { productsData } from "../../data/products";

export const SalesModule: React.FC = () => {
  const [sales, setSales] = useState(salesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [machineFilter, setMachineFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSale, setSelectedSale] = useState<(typeof salesData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const statusOptions: FilterOption[] = [
    { value: "All", label: "All Order Statuses" },
    { value: "Completed", label: "Completed" },
    { value: "In progress", label: "In progress" },
    { value: "Dispatched", label: "Dispatched" },
    { value: "Pending Approval", label: "Pending Approval" },
    { value: "Approved", label: "Approved" },
  ];

  const typeOptions: FilterOption[] = [
    { value: "All", label: "All Doc Types" },
    { value: "Sales Order", label: "Sales Order" },
    { value: "Tax Invoice", label: "Tax Invoice" },
    { value: "Quotation", label: "Quotation" },
    { value: "Proforma Invoice", label: "Proforma Invoice" },
  ];

  const [newOrder, setNewOrder] = useState({
    customerId: customersData[0]?.id || 1,
    productId: productsData[0]?.id || 1,
    quantity: 1,
    salesPerson: "Ananya Shah",
    type: "Sales Order",
    status: "Approved",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setMachineFilter("All");
    setMonthFilter("All");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  const filteredSales = useMemo(() => {
    return sales.filter((item) => {
      const matchesSearch =
        item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.salesPerson.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesMachine = matchesMachineFilter(
        machineFilter,
        item.category,
        item.productName,
        item.notes,
      );
      const matchesMonth = matchesMonthFilter(item.date, monthFilter);

      return matchesSearch && matchesType && matchesStatus && matchesMachine && matchesMonth;
    });
  }, [sales, searchQuery, typeFilter, statusFilter, machineFilter, monthFilter]);

  const totalFilteredAmount = useMemo(
    () => filteredSales.reduce((acc, curr) => acc + curr.totalAmount, 0),
    [filteredSales],
  );

  const totalPages = Math.ceil(filteredSales.length / pageSize) || 1;
  const displayedSales = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSales.slice(start, start + pageSize);
  }, [filteredSales, currentPage, pageSize]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customersData.find((c) => c.id === Number(newOrder.customerId));
    const prod = productsData.find((p) => p.id === Number(newOrder.productId));
    const nextId = Math.max(...sales.map((s) => s.id), 0) + 1;
    const qty = Number(newOrder.quantity) || 1;
    const unitPrice = prod ? prod.price : 2500000;
    const baseAmt = unitPrice * qty;
    const gst = Math.round(baseAmt * 0.18);

    const created = {
      id: nextId,
      reference: `SO-2026-${String(nextId).padStart(4, "0")}`,
      invoiceNo: `INV-GC-${String(202600 + nextId)}`,
      customerId: cust ? cust.id : 1,
      customerName: cust ? cust.name : "Tata Motors Ltd.",
      productName: prod ? prod.name : "Custom SPM System",
      category: prod ? prod.category : "Special Purpose Machines",
      quantity: qty,
      unitPrice,
      amount: baseAmt,
      gstAmount: gst,
      totalAmount: baseAmt + gst,
      date: new Date().toISOString().slice(0, 10),
      deliveryDate: new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10),
      salesPerson: newOrder.salesPerson,
      status: newOrder.status,
      paymentStatus: "Advance Received (30%)",
      type: newOrder.type,
      notes: "Engineered machine contract generated in Global CNC CRM.",
    };

    setSales([created, ...sales]);
    setCreateModalOpen(false);
    showToast(`Order ${created.reference} generated successfully.`);
  };

  const handleApprove = (id: number) => {
    setSales(sales.map((s) => (s.id === id ? { ...s, status: "Approved" } : s)));
    showToast("Sales contract approved for shop floor execution.");
    if (selectedSale?.id === id) setSelectedSale({ ...selectedSale, status: "Approved" });
  };

  const handleDelete = (id: number, ref: string) => {
    if (window.confirm(`Delete / void sales record ${ref}?`)) {
      setSales(sales.filter((s) => s.id !== id));
      showToast(`Sales record ${ref} voided.`);
      if (selectedSale?.id === id) setSelectedSale(null);
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
            Sales, Quotations & Tax Invoices
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full commercial lifecycle tracking from formal machine quotations to tax invoicing and
            dispatch runoff.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Sales Ledger to Excel/PDF...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Invoices</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Create Sales Order</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Total Sales Records
          </span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {sales.length} Orders
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Gross Booking Value
          </span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(sales.reduce((acc, curr) => acc + curr.totalAmount, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Completed Dispatches
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {sales.filter((s) => s.status === "Completed").length} Dispatched
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Runoff</span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {
              sales.filter((s) => s.status.includes("progress") || s.status.includes("Pending"))
                .length
            }{" "}
            Units
          </div>
        </div>
      </div>

      {/* Multi-Filter Bar (Machine-Wise, Month, Status, Type, Search) */}
      <MultiFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        searchPlaceholder="Search order ref, customer, invoice or machine..."
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
        secondaryFilter={typeFilter}
        onSecondaryChange={(t) => {
          setTypeFilter(t);
          setCurrentPage(1);
        }}
        secondaryLabel="Doc Type"
        secondaryOptions={typeOptions}
        totalItems={sales.length}
        filteredCount={filteredSales.length}
        totalFilteredAmount={totalFilteredAmount}
        onResetAll={handleResetFilters}
      />

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Order / Invoice</th>
                <th className="px-4 py-3">Customer Account</th>
                <th className="px-4 py-3">Machine / Solution</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3 text-right">Total (Incl. GST)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedSale(sale)}
                      className="hover:underline text-left block"
                    >
                      {sale.reference}
                    </button>
                    <span className="text-[10px] text-slate-400 font-normal">{sale.invoiceNo}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[180px] truncate">
                    {sale.customerName}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                    {sale.productName}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{sale.date}</td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(sale.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={sale.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedSale(sale)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Order Details"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      {sale.status.includes("Pending") && (
                        <button
                          onClick={() => handleApprove(sale.id)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-xs"
                          title="Approve Order"
                        >
                          <Icon name="check" size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(sale.id, sale.reference)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Void / Delete"
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
          totalRecords={filteredSales.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Sales Details Modal */}
      {selectedSale && (
        <Modal
          isOpen={Boolean(selectedSale)}
          onClose={() => setSelectedSale(null)}
          title={`Sales Order: ${selectedSale.reference}`}
          subtitle={`Invoice: ${selectedSale.invoiceNo} · Customer: ${selectedSale.customerName}`}
          maxWidth="2xl"
          footer={
            <>
              {selectedSale.status.includes("Pending") && (
                <button
                  onClick={() => handleApprove(selectedSale.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="check" size={14} />
                  <span>Approve Order</span>
                </button>
              )}
              <button
                onClick={() =>
                  showToast(`Generating printable GST Tax Invoice for ${selectedSale.reference}`)
                }
                className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
              >
                <Icon name="print" size={14} />
                <span>Print GST Invoice</span>
              </button>
              <button
                onClick={() => setSelectedSale(null)}
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
                  Document Type
                </span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedSale.type}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Quantity</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedSale.quantity} Unit(s)
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Sales Lead</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedSale.salesPerson}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Base Excl. Tax
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {formatPrice(selectedSale.amount)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">GST (18%)</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {formatPrice(selectedSale.gstAmount)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Grand Total</span>
                <p className="font-black text-[#F57C00]">{formatPrice(selectedSale.totalAmount)}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Machine Platform & Application
              </span>
              <p className="p-3 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 font-semibold text-slate-800 dark:text-white">
                {selectedSale.productName} ({selectedSale.category})
              </p>
            </div>

            <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
              <span>
                Payment Terms:{" "}
                <strong className="text-slate-700 dark:text-slate-200">
                  {selectedSale.paymentStatus}
                </strong>
              </span>
              <span>
                Target Dispatch:{" "}
                <strong className="text-slate-700 dark:text-slate-200">
                  {selectedSale.deliveryDate}
                </strong>
              </span>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Sales Order Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create Customer Sales Order"
          subtitle="Generate machine booking order or formal tax invoice"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateOrder} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Customer Account *
              <select
                value={newOrder.customerId}
                onChange={(e) => setNewOrder({ ...newOrder, customerId: Number(e.target.value) })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              >
                {customersData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Machine Model / Solution *
              <select
                value={newOrder.productId}
                onChange={(e) => setNewOrder({ ...newOrder, productId: Number(e.target.value) })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              >
                {productsData.slice(0, 30).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatPrice(p.price)}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Quantity
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={newOrder.quantity}
                  onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Sales Engineer
                <select
                  value={newOrder.salesPerson}
                  onChange={(e) => setNewOrder({ ...newOrder, salesPerson: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="Ananya Shah">Ananya Shah</option>
                  <option value="Aarav Kulkarni">Aarav Kulkarni</option>
                  <option value="Priya Deshmukh">Priya Deshmukh</option>
                  <option value="Dev Malhotra">Dev Malhotra</option>
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Type
                <select
                  value={newOrder.type}
                  onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="Sales Order">Sales Order</option>
                  <option value="Tax Invoice">Tax Invoice</option>
                  <option value="Quotation">Quotation</option>
                </select>
              </label>
            </div>

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
                Create Sales Order
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
