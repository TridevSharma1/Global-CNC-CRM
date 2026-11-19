import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { servicesData } from "../../data/services";
import { machinesData } from "../../data/machines";

export const ServiceModule: React.FC = () => {
  const [services, setServices] = useState(servicesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState<(typeof servicesData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newTicket, setNewTicket] = useState({
    machineSerial: machinesData[0]?.serialNo || "GC-2024-1042",
    serviceType: "AMC Preventive",
    priority: "High",
    engineerAssigned: "Vikram Pawar",
    description: "Scheduled 52-point preventive maintenance and laser calibration",
  });

  const serviceTypes = [
    "All",
    "AMC Preventive",
    "Breakdown Repair",
    "Installation & Setup",
    "Metrology & Calibration",
    "Customer Training",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchesSearch =
        item.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.machineSerial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.engineerAssigned.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || item.serviceType === typeFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [services, searchQuery, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredServices.length / pageSize);
  const displayedServices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredServices.slice(start, start + pageSize);
  }, [filteredServices, currentPage, pageSize]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const mch = machinesData.find((m) => m.serialNo === newTicket.machineSerial);
    const nextId = Math.max(...services.map((s) => s.id), 0) + 1;
    const created = {
      id: nextId,
      ticketNo: `SRV-2026-${String(nextId).padStart(4, "0")}`,
      machineSerial: newTicket.machineSerial,
      machineModel: mch ? mch.modelName : "GCV-850 VMC",
      customerName: mch ? mch.clientName : "Tata Motors Ltd.",
      serviceType: newTicket.serviceType,
      priority: newTicket.priority,
      engineerAssigned: newTicket.engineerAssigned,
      visitDate: new Date().toISOString().slice(0, 10),
      resolutionDate: "Pending Completion",
      status: "Scheduled",
      cost: 15000,
      description: newTicket.description,
      customerFeedback: "Engineer dispatched from Pune facility.",
    };

    setServices([created, ...services]);
    setCreateModalOpen(false);
    showToast(`Service Ticket ${created.ticketNo} dispatched.`);
  };

  const handleCompleteTicket = (id: number) => {
    setServices(
      services.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "Completed",
              resolutionDate: new Date().toISOString().slice(0, 10),
            }
          : s,
      ),
    );
    showToast("Service ticket marked as Completed.");
    if (selectedTicket?.id === id) {
      setSelectedTicket({
        ...selectedTicket,
        status: "Completed",
        resolutionDate: new Date().toISOString().slice(0, 10),
      });
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
            Service Tickets & AMC Maintenance (35 Tickets)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Coordinate field engineer dispatches, laser alignments, spindle repairs, and scheduled
            AMC audits.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
        >
          <Icon name="plus" size={14} />
          <span>Create Service Ticket</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Tickets</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {services.length} Requests
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Completed / Resolved
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {services.filter((s) => s.status === "Completed").length} Verified
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            High Priority Tickets
          </span>
          <div className="text-xl font-black text-rose-500 mt-1">
            {services.filter((s) => s.priority === "High").length} Urgent
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Average Resolution Time
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            3.4 Hours
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
            placeholder="Search ticket no, serial, customer..."
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
            {serviceTypes.map((t) => (
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
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Pending Visit">Pending Visit</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Ticket ID</th>
                <th className="px-4 py-3">Machine Serial</th>
                <th className="px-4 py-3">Customer Site</th>
                <th className="px-4 py-3">Service Scope</th>
                <th className="px-4 py-3">Assigned Engineer</th>
                <th className="px-4 py-3">Visit Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedServices.map((srv) => (
                <tr
                  key={srv.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedTicket(srv)}
                      className="hover:underline text-left"
                    >
                      {srv.ticketNo}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-800 dark:text-white">
                    {srv.machineSerial}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[160px] truncate">
                    {srv.customerName}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                    {srv.description}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200 font-semibold">
                    {srv.engineerAssigned}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{srv.visitDate}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={srv.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedTicket(srv)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Details"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      {srv.status !== "Completed" && (
                        <button
                          onClick={() => handleCompleteTicket(srv.id)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-xs"
                          title="Mark Completed"
                        >
                          <Icon name="check" size={14} />
                        </button>
                      )}
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
          totalRecords={filteredServices.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Ticket Details Modal */}
      {selectedTicket && (
        <Modal
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          title={`Ticket: ${selectedTicket.ticketNo}`}
          subtitle={`Machine: ${selectedTicket.machineModel} (${selectedTicket.machineSerial}) · ${selectedTicket.customerName}`}
          maxWidth="2xl"
          footer={
            <>
              {selectedTicket.status !== "Completed" && (
                <button
                  onClick={() => handleCompleteTicket(selectedTicket.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
                >
                  <Icon name="check" size={14} />
                  <span>Mark Ticket Completed</span>
                </button>
              )}
              <button
                onClick={() => setSelectedTicket(null)}
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
                <span className="text-slate-400 text-[10px] uppercase font-bold">Service Type</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedTicket.serviceType}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Priority</span>
                <p className="font-bold text-rose-500">{selectedTicket.priority}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Assigned Engineer
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedTicket.engineerAssigned}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Visit Date</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedTicket.visitDate}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Resolution Date
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedTicket.resolutionDate}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Service Billing Cost
                </span>
                <p className="font-black text-[#F57C00]">{formatPrice(selectedTicket.cost)}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Reported Breakdown / Maintenance Scope
              </span>
              <p className="p-3 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedTicket.description}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Customer Plant Verification Feedback
              </span>
              <p className="p-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-600 dark:text-slate-300">
                {selectedTicket.customerFeedback}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Ticket Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create Field Service Ticket"
          subtitle="Dispatch service engineer or log breakdown maintenance request"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Field Machine Serial *
              <select
                value={newTicket.machineSerial}
                onChange={(e) => setNewTicket({ ...newTicket, machineSerial: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              >
                {machinesData.map((m) => (
                  <option key={m.id} value={m.serialNo}>
                    {m.serialNo} - {m.modelName} ({m.clientName})
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Service Type *
                <select
                  value={newTicket.serviceType}
                  onChange={(e) => setNewTicket({ ...newTicket, serviceType: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="AMC Preventive">AMC Preventive</option>
                  <option value="Breakdown Repair">Breakdown Repair</option>
                  <option value="Installation & Setup">Installation & Setup</option>
                  <option value="Metrology & Calibration">Metrology & Calibration</option>
                  <option value="Customer Training">Customer Training</option>
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Assigned Service Specialist *
                <select
                  value={newTicket.engineerAssigned}
                  onChange={(e) => setNewTicket({ ...newTicket, engineerAssigned: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  <option value="Vikram Pawar">Vikram Pawar (Sr. Field Engineer)</option>
                  <option value="Arjun More">Arjun More (VMC Specialist)</option>
                  <option value="Siddharth Rao">Siddharth Rao (Electrical Lead)</option>
                  <option value="Kunal Joshi">Kunal Joshi (Assembly Supt.)</option>
                </select>
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Breakdown / Service Task Description *
              <textarea
                rows={3}
                required
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
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
                Dispatch Ticket
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
