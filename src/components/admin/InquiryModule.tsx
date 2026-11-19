import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { inquiriesData } from "../../data/inquiries";

export const InquiryModule: React.FC = () => {
  const [inquiries, setInquiries] = useState(inquiriesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedInq, setSelectedInq] = useState<(typeof inquiriesData)[0] | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const inquiryTypes = [
    "All",
    "Quotation Request",
    "Machine Inquiry",
    "Product Inquiry",
    "Callback Request",
    "Custom SPM Consultation",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.inquiryCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [inquiries, searchQuery, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredInquiries.length / pageSize);
  const displayedInquiries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInquiries.slice(start, start + pageSize);
  }, [filteredInquiries, currentPage, pageSize]);

  const handleUpdateStatus = (id: number, nextStatus: string) => {
    setInquiries(inquiries.map((i) => (i.id === id ? { ...i, status: nextStatus } : i)));
    showToast(`Inquiry status updated to ${nextStatus}.`);
    if (selectedInq?.id === id) {
      setSelectedInq({ ...selectedInq, status: nextStatus });
    }
  };

  const handleDelete = (id: number, code: string) => {
    if (window.confirm(`Delete inquiry ${code}?`)) {
      setInquiries(inquiries.filter((i) => i.id !== id));
      showToast(`Inquiry ${code} removed.`);
      if (selectedInq?.id === id) setSelectedInq(null);
    }
  };

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
            Website Inquiries & Machine RFQs (30 Submissions)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Incoming machine requests, quotation inquiries, and callback requests from Global CNC
            web portal.
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting Website Inquiries to CSV...")}
          className="px-3.5 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
        >
          <Icon name="download" size={14} />
          <span>Export Inquiries</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Inquiries</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {inquiries.length} Inquiries
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">New & Unread</span>
          <div className="text-xl font-black text-[#F57C00] mt-1">
            {inquiries.filter((i) => i.status === "New").length} RFQs
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Quotation Sent</span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {inquiries.filter((i) => i.status === "Quotation Sent").length} Sent
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Response SLA</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            1.8 Hours Avg
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search inquiry, company, or subject..."
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
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Quotation Sent">Quotation Sent</option>
            <option value="Resolved / Closed">Resolved / Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Inquiry Code</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Client & Company</th>
                <th className="px-4 py-3">Subject / Machine Need</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedInquiries.map((inq) => (
                <tr
                  key={inq.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedInq(inq)}
                      className="hover:underline text-left"
                    >
                      {inq.inquiryCode}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-xs text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      {inq.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[180px] truncate">
                    <button
                      onClick={() => setSelectedInq(inq)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {inq.company}
                    </button>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {inq.name} ({inq.city})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[220px] truncate">
                    {inq.subject}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{inq.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inq.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedInq(inq)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View & Reply"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id, inq.inquiryCode)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Delete Inquiry"
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
          totalRecords={filteredInquiries.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View & Respond Modal */}
      {selectedInq && (
        <Modal
          isOpen={Boolean(selectedInq)}
          onClose={() => setSelectedInq(null)}
          title={`Inquiry: ${selectedInq.subject}`}
          subtitle={`From: ${selectedInq.name} · ${selectedInq.company} (${selectedInq.city})`}
          maxWidth="2xl"
          footer={
            <>
              {selectedInq.status !== "Quotation Sent" && (
                <button
                  onClick={() => handleUpdateStatus(selectedInq.id, "Quotation Sent")}
                  className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="cart" size={14} />
                  <span>Send Machine Quotation</span>
                </button>
              )}
              {selectedInq.status !== "Resolved / Closed" && (
                <button
                  onClick={() => handleUpdateStatus(selectedInq.id, "Resolved / Closed")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="check" size={14} />
                  <span>Mark Resolved</span>
                </button>
              )}
              <button
                onClick={() => setSelectedInq(null)}
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
                <span className="text-slate-400 text-[10px] uppercase font-bold">Inquiry Type</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedInq.type}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Contact Person
                </span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedInq.name}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Date Received
                </span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedInq.date}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Phone</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedInq.phone}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Email</span>
                <p className="font-bold text-slate-800 dark:text-white truncate">
                  {selectedInq.email}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Handling Engineer
                </span>
                <p className="font-bold text-[#F57C00]">{selectedInq.assignedTo}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Full Inquiry Message
              </span>
              <p className="p-3 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedInq.message}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
