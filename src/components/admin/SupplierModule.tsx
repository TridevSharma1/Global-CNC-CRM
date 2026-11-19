import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { suppliersData } from "../../data/suppliers";

export const SupplierModule: React.FC = () => {
  const [suppliers, setSuppliers] = useState(suppliersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSup, setSelectedSup] = useState<(typeof suppliersData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formSup, setFormSup] = useState({
    name: "",
    category: "CNC Controllers & Drives",
    contactPerson: "",
    phone: "",
    email: "",
    city: "Pune",
    gstNumber: "27AAEC1234B1Z1",
    paymentTerms: "Net 30 Days",
    address: "",
  });

  const categories = [
    "All",
    "CNC Controllers & Drives",
    "Linear Motion & Bearings",
    "Hydraulics & Pneumatics",
    "Cutting Tools & Holders",
    "Raw Steels & Castings",
    "Electricals & Enclosures",
    "Lubricants & Coolants",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gstNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [suppliers, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredSuppliers.length / pageSize);
  const displayedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSuppliers.slice(start, start + pageSize);
  }, [filteredSuppliers, currentPage, pageSize]);

  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...suppliers.map((s) => s.id), 0) + 1;
    const created = {
      id: nextId,
      code: `SUP-${String(nextId).padStart(4, "0")}`,
      name: formSup.name,
      category: formSup.category,
      contactPerson: formSup.contactPerson,
      designation: "Key Account Manager",
      email:
        formSup.email ||
        `sales@${formSup.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 10)}.com`,
      phone: formSup.phone || "+91 9822000000",
      city: formSup.city,
      state: "Maharashtra",
      address: formSup.address || `Industrial Estate, Sector 10, ${formSup.city}`,
      gstNumber: formSup.gstNumber,
      outstanding: 0,
      paymentTerms: formSup.paymentTerms,
      rating: "4.8",
      documents: ["GST Certificate", "MSME Registration", "Vendor Audit Form"],
      status: "Active",
    };

    setSuppliers([created, ...suppliers]);
    setCreateModalOpen(false);
    showToast(`Supplier ${created.name} registered.`);
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Remove supplier ${name}?`)) {
      setSuppliers(suppliers.filter((s) => s.id !== id));
      showToast(`Supplier ${name} removed.`);
      if (selectedSup?.id === id) setSelectedSup(null);
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
            Supplier & Sourcing Directory (40 Suppliers)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage authorized component manufacturers, steel foundries, drive vendors, and payment
            terms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Supplier Directory to Excel...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Suppliers</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Registered Suppliers
          </span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {suppliers.length} Vendors
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Payable Outstanding
          </span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(suppliers.reduce((acc, curr) => acc + curr.outstanding, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            ISO / OEM Certified
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            100% Verified
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Key Technology Partners
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            Siemens · Fanuc · THK
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search supplier, contact, or GSTIN..."
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
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Sourcing Category</th>
                <th className="px-4 py-3">Contact Person</th>
                <th className="px-4 py-3">Payment Terms</th>
                <th className="px-4 py-3 text-right">Payable (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedSuppliers.map((sup) => (
                <tr
                  key={sup.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedSup(sup)}
                      className="hover:underline text-left"
                    >
                      {sup.code}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[200px] truncate">
                    <button
                      onClick={() => setSelectedSup(sup)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {sup.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{sup.category}</td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                    <div>{sup.contactPerson}</div>
                    <div className="text-[10px] text-slate-400">{sup.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {sup.paymentTerms}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(sup.outstanding)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={sup.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedSup(sup)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Profile"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(sup.id, sup.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Delete Supplier"
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
          totalRecords={filteredSuppliers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Supplier Profile Modal */}
      {selectedSup && (
        <Modal
          isOpen={Boolean(selectedSup)}
          onClose={() => setSelectedSup(null)}
          title={selectedSup.name}
          subtitle={`Supplier Code: ${selectedSup.code} · ${selectedSup.category}`}
          maxWidth="2xl"
          footer={
            <>
              <button
                onClick={() => setSelectedSup(null)}
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
                  Contact Person
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedSup.contactPerson}
                </p>
                <span className="text-[10px] text-slate-500">{selectedSup.designation}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">GSTIN</span>
                <p className="font-mono font-bold text-[#F57C00]">{selectedSup.gstNumber}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Rating</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedSup.rating} / 5.0
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Payable Outstanding
                </span>
                <p className="font-black text-[#F57C00] text-sm">
                  {formatPrice(selectedSup.outstanding)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Payment Terms
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedSup.paymentTerms}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">City</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedSup.city}, {selectedSup.state}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Works / Supply Address
              </span>
              <p className="p-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedSup.address}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Statutory Compliance & Documents
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedSup.documents.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-xs text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                  >
                    <Icon name="shield" size={12} className="text-[#3A6EA5]" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Register Component Supplier"
          subtitle="Add tooling, casting, drive, or hydraulic component vendor"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateSupplier} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Supplier / Company Name *
                <input
                  type="text"
                  required
                  value={formSup.name}
                  onChange={(e) => setFormSup({ ...formSup, name: e.target.value })}
                  placeholder="e.g. Apex Fluid Systems"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Sourcing Category *
                <select
                  value={formSup.category}
                  onChange={(e) => setFormSup({ ...formSup, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Contact Person *
                <input
                  type="text"
                  required
                  value={formSup.contactPerson}
                  onChange={(e) => setFormSup({ ...formSup, contactPerson: e.target.value })}
                  placeholder="e.g. Vikram Joshi"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Phone Number *
                <input
                  type="tel"
                  required
                  value={formSup.phone}
                  onChange={(e) => setFormSup({ ...formSup, phone: e.target.value })}
                  placeholder="+91 98..."
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                GSTIN Number *
                <input
                  type="text"
                  required
                  value={formSup.gstNumber}
                  onChange={(e) => setFormSup({ ...formSup, gstNumber: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Payment Terms
                <select
                  value={formSup.paymentTerms}
                  onChange={(e) => setFormSup({ ...formSup, paymentTerms: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="Net 30 Days">Net 30 Days</option>
                  <option value="Net 45 Days">Net 45 Days</option>
                  <option value="Net 60 Days">Net 60 Days</option>
                  <option value="Advance on Dispatch">Advance on Dispatch</option>
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
                Save Supplier
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
