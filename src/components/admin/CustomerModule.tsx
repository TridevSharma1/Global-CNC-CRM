import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { customersData } from "../../data/customers";

export const CustomerModule: React.FC = () => {
  const [customers, setCustomers] = useState(customersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCust, setSelectedCust] = useState<(typeof customersData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formCust, setFormCust] = useState({
    name: "",
    contactPerson: "",
    designation: "Head of Procurement",
    email: "",
    phone: "",
    city: "Pune",
    state: "Maharashtra",
    address: "",
    gstNumber: "27AABC1234A1Z1",
    industry: "Automotive",
    outstanding: 0,
    creditLimit: 5000000,
    notes: "",
  });

  const industries = [
    "All",
    "Automotive",
    "Defense & Aerospace",
    "Heavy Engineering",
    "Medical Devices",
    "Agricultural Equipment",
    "Precision Components",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gstNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInd = industryFilter === "All" || item.industry === industryFilter;
      return matchesSearch && matchesInd;
    });
  }, [customers, searchQuery, industryFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const displayedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, currentPage, pageSize]);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...customers.map((c) => c.id), 0) + 1;
    const created = {
      id: nextId,
      code: `CUS-${String(nextId).padStart(4, "0")}`,
      name: formCust.name,
      contactPerson: formCust.contactPerson,
      designation: formCust.designation,
      email:
        formCust.email ||
        `contact@${formCust.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 10)}.com`,
      phone: formCust.phone || "+91 9822000000",
      city: formCust.city,
      state: formCust.state,
      address: formCust.address || `Plot No. 12, MIDC Industrial Area, ${formCust.city}`,
      gstNumber: formCust.gstNumber,
      pan: formCust.gstNumber.slice(2, 12),
      industry: formCust.industry,
      outstanding: Number(formCust.outstanding) || 0,
      creditLimit: Number(formCust.creditLimit) || 5000000,
      salesHistoryCount: 1,
      status: "Active",
      rating: "4.8",
      notes: formCust.notes || "New client account registered.",
    };

    setCustomers([created, ...customers]);
    setCreateModalOpen(false);
    showToast(`Customer account for ${created.name} registered.`);
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Remove customer account ${name}?`)) {
      setCustomers(customers.filter((c) => c.id !== id));
      showToast(`Customer ${name} removed.`);
      if (selectedCust?.id === id) setSelectedCust(null);
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
            Customer Account Directory (50 Accounts)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage client profiles, GSTIN details, credit limits, outstanding balances, and machine
            purchase histories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Customer Accounts to Excel...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Accounts</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Add New Customer</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Accounts</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {customers.length} Companies
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Outstanding</span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(customers.reduce((acc, curr) => acc + curr.outstanding, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Automotive Accounts
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {customers.filter((c) => c.industry === "Automotive").length} Tier-1 OEMs
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Average Client Rating
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            4.8 / 5.0
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
            placeholder="Search company, contact person, or GST..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={industryFilter}
          onChange={(e) => {
            setIndustryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
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
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Contact Person</th>
                <th className="px-4 py-3">City & State</th>
                <th className="px-4 py-3 text-right">Outstanding (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedCust(cust)}
                      className="hover:underline text-left"
                    >
                      {cust.code}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[200px] truncate">
                    <button
                      onClick={() => setSelectedCust(cust)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {cust.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{cust.industry}</td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                    <div>{cust.contactPerson}</div>
                    <div className="text-[10px] text-slate-400">{cust.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {cust.city}, {cust.state}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(cust.outstanding)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={cust.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedCust(cust)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Profile"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(cust.id, cust.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Delete Account"
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
          totalRecords={filteredCustomers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Customer Profile Modal */}
      {selectedCust && (
        <Modal
          isOpen={Boolean(selectedCust)}
          onClose={() => setSelectedCust(null)}
          title={selectedCust.name}
          subtitle={`Account Code: ${selectedCust.code} · ${selectedCust.industry}`}
          maxWidth="2xl"
          footer={
            <>
              <button
                onClick={() => showToast(`Generating Ledger Statement for ${selectedCust.name}`)}
                className="px-4 py-2 bg-[#3A6EA5] hover:bg-blue-600 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
              >
                <Icon name="print" size={14} />
                <span>Account Ledger</span>
              </button>
              <button
                onClick={() => setSelectedCust(null)}
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
                  {selectedCust.contactPerson}
                </p>
                <span className="text-[10px] text-slate-500">{selectedCust.designation}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">GSTIN</span>
                <p className="font-mono font-bold text-[#F57C00]">{selectedCust.gstNumber}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">PAN</span>
                <p className="font-mono font-bold text-slate-700 dark:text-slate-200">
                  {selectedCust.pan}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Current Outstanding
                </span>
                <p className="font-black text-[#F57C00] text-sm">
                  {formatPrice(selectedCust.outstanding)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Credit Limit</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {formatPrice(selectedCust.creditLimit)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Sales History Count
                </span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedCust.salesHistoryCount} Orders
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Registered Facility Address
              </span>
              <p className="p-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedCust.address}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Direct Phone</span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5">
                  {selectedCust.phone}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Procurement Email
                </span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5 break-all">
                  {selectedCust.email}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Account Notes & Commercial History
              </span>
              <p className="p-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-600 dark:text-slate-300">
                {selectedCust.notes}
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
          title="Add New Customer Account"
          subtitle="Register client organization, GSTIN, and credit terms"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateCustomer} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Company Name *
                <input
                  type="text"
                  required
                  value={formCust.name}
                  onChange={(e) => setFormCust({ ...formCust, name: e.target.value })}
                  placeholder="e.g. Cummins India CVBU"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Industry Vertical *
                <select
                  value={formCust.industry}
                  onChange={(e) => setFormCust({ ...formCust, industry: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  {industries
                    .filter((i) => i !== "All")
                    .map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Contact Person Name *
                <input
                  type="text"
                  required
                  value={formCust.contactPerson}
                  onChange={(e) => setFormCust({ ...formCust, contactPerson: e.target.value })}
                  placeholder="e.g. Sunil Deshpande"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Phone Number *
                <input
                  type="tel"
                  required
                  value={formCust.phone}
                  onChange={(e) => setFormCust({ ...formCust, phone: e.target.value })}
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
                  value={formCust.gstNumber}
                  onChange={(e) => setFormCust({ ...formCust, gstNumber: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                City / Plant Location *
                <input
                  type="text"
                  required
                  value={formCust.city}
                  onChange={(e) => setFormCust({ ...formCust, city: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Plant / Billing Address
              <textarea
                rows={2}
                value={formCust.address}
                onChange={(e) => setFormCust({ ...formCust, address: e.target.value })}
                placeholder="Plot No., Phase, MIDC Area, City, Pin..."
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
                Register Customer
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
