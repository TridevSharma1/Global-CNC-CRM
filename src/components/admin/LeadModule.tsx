import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { leadsData } from "../../data/leads";

export const LeadModule: React.FC = () => {
  const [leads, setLeads] = useState(leadsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedLead, setSelectedLead] = useState<(typeof leadsData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formLead, setFormLead] = useState({
    companyName: "",
    contactPerson: "",
    designation: "Plant Head",
    email: "",
    phone: "",
    source: "Website Inquiry",
    machineInterest: "Custom 4-Station SPM for Brake Calipers",
    estimatedBudget: 4500000,
    assignedTo: "Ananya Shah",
  });

  const statuses = [
    "All",
    "New Lead",
    "Technical Discussion",
    "Quotation Submitted",
    "In Negotiation",
    "Won / Converted",
    "Review",
  ];

  const sources = [
    "All",
    "Website Inquiry",
    "Trade Show (IMTEX Pune)",
    "Customer Referral",
    "Direct Sales Call",
    "LinkedIn RFQ",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      const matchesSearch =
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.machineInterest.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesSource = sourceFilter === "All" || item.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const displayedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...leads.map((l) => l.id), 0) + 1;
    const created = {
      id: nextId,
      leadCode: `LD-2026-${String(nextId).padStart(4, "0")}`,
      companyName: formLead.companyName,
      contactPerson: formLead.contactPerson,
      designation: formLead.designation,
      email:
        formLead.email ||
        `contact@${formLead.companyName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 10)}.com`,
      phone: formLead.phone || "+91 9822000000",
      source: formLead.source,
      machineInterest: formLead.machineInterest,
      estimatedBudget: Number(formLead.estimatedBudget) || 3500000,
      status: "New Lead",
      probability: 45,
      nextFollowUp: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
      assignedTo: formLead.assignedTo,
      createdDate: new Date().toISOString().slice(0, 10),
    };

    setLeads([created, ...leads]);
    setCreateModalOpen(false);
    showToast(`Lead for ${created.companyName} created.`);
  };

  const handleStatusChange = (id: number, nextStatus: string) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: nextStatus } : l)));
    showToast(`Lead status updated to ${nextStatus}.`);
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: nextStatus });
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Remove lead for ${name}?`)) {
      setLeads(leads.filter((l) => l.id !== id));
      showToast(`Lead for ${name} removed.`);
      if (selectedLead?.id === id) setSelectedLead(null);
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
            Sales Leads & Deal Pipeline (30 Active Leads)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track inquiries from IMTEX, website forms, direct plant inquiries, and quotation
            conversion stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Leads to Excel...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Leads</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Create New Lead</span>
          </button>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Leads</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {leads.length} Pipeline Deals
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Pipeline Deal Value
          </span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(leads.reduce((acc, curr) => acc + curr.estimatedBudget, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            High Probability (&gt;75%)
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {leads.filter((l) => l.probability >= 75).length} Deals
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Quotations Submitted
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {leads.filter((l) => l.status.includes("Quotation")).length} Active
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
            placeholder="Search company, contact, or machine..."
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
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            {sources.map((src) => (
              <option key={src} value={src}>
                {src}
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
                <th className="px-4 py-3">Lead Code</th>
                <th className="px-4 py-3">Target Company</th>
                <th className="px-4 py-3">Machine Interest</th>
                <th className="px-4 py-3">Lead Source</th>
                <th className="px-4 py-3 text-right">Est. Budget (₹)</th>
                <th className="px-4 py-3 text-center">Probability</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="hover:underline text-left"
                    >
                      {lead.leadCode}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[180px] truncate">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {lead.companyName}
                    </button>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {lead.contactPerson}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                    {lead.machineInterest}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{lead.source}</td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(lead.estimatedBudget)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-black ${
                        lead.probability >= 70
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-[#F57C00]"
                      }`}
                    >
                      {lead.probability}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Details"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id, lead.companyName)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Delete Lead"
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
          totalRecords={filteredLeads.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Lead Modal */}
      {selectedLead && (
        <Modal
          isOpen={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          title={`Lead: ${selectedLead.companyName}`}
          subtitle={`Code: ${selectedLead.leadCode} · Source: ${selectedLead.source}`}
          maxWidth="2xl"
          footer={
            <>
              <button
                onClick={() => handleStatusChange(selectedLead.id, "Won / Converted")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
              >
                <Icon name="check" size={14} />
                <span>Mark Won (Convert to Order)</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
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
                  Estimated Budget
                </span>
                <p className="text-base font-black text-[#F57C00]">
                  {formatPrice(selectedLead.estimatedBudget)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Win Probability
                </span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {selectedLead.probability}%
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Next Follow-up
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedLead.nextFollowUp}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Contact Person
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedLead.contactPerson}
                </p>
                <span className="text-[10px] text-slate-500">{selectedLead.designation}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Assigned Sales Eng
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedLead.assignedTo}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Created Date</span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedLead.createdDate}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Machine Platform Requirement
              </span>
              <p className="p-3 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 font-bold text-slate-800 dark:text-white">
                {selectedLead.machineInterest}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Phone</span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5">
                  {selectedLead.phone}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Email</span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5">
                  {selectedLead.email}
                </p>
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
          title="Create New Sales Lead"
          subtitle="Log prospective machine inquiry into CRM pipeline"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateLead} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Company Name *
                <input
                  type="text"
                  required
                  value={formLead.companyName}
                  onChange={(e) => setFormLead({ ...formLead, companyName: e.target.value })}
                  placeholder="e.g. Endurance Technologies"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Contact Person *
                <input
                  type="text"
                  required
                  value={formLead.contactPerson}
                  onChange={(e) => setFormLead({ ...formLead, contactPerson: e.target.value })}
                  placeholder="e.g. Milind Shinde"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Lead Source *
                <select
                  value={formLead.source}
                  onChange={(e) => setFormLead({ ...formLead, source: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  {sources
                    .filter((s) => s !== "All")
                    .map((src) => (
                      <option key={src} value={src}>
                        {src}
                      </option>
                    ))}
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Estimated Budget (₹) *
                <input
                  type="number"
                  min="500000"
                  required
                  value={formLead.estimatedBudget}
                  onChange={(e) =>
                    setFormLead({ ...formLead, estimatedBudget: Number(e.target.value) })
                  }
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Machine Tool / SPM Interest *
              <input
                type="text"
                required
                value={formLead.machineInterest}
                onChange={(e) => setFormLead({ ...formLead, machineInterest: e.target.value })}
                placeholder="e.g. Twin-Spindle GSP-400 Multi-station Boring SPM"
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
                Add Lead
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
