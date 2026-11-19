import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { machinesData } from "../../data/machines";

export const MachineModule: React.FC = () => {
  const [machines, setMachines] = useState(machinesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMachine, setSelectedMachine] = useState<(typeof machinesData)[0] | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredMachines = useMemo(() => {
    return machines.filter((item) => {
      const matchesSearch =
        item.serialNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.operationalStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [machines, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredMachines.length / pageSize);
  const displayedMachines = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMachines.slice(start, start + pageSize);
  }, [filteredMachines, currentPage, pageSize]);

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
            Deployed Machine Fleet Management (30 Field Machines)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor serial numbers, client installations, warranty countdowns, AMC statuses, and
            operational health scores.
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting Machine Asset Register...")}
          className="px-3.5 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
        >
          <Icon name="download" size={14} />
          <span>Export Machine Register</span>
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Monitored Machines</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {machines.length} Assets
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">100% Operational</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {machines.filter((m) => m.operationalStatus === "Operational").length} Running
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Active AMC Coverage
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {
              machines.filter((m) => m.amcStatus.includes("Active") || m.amcStatus.includes("OEM"))
                .length
            }{" "}
            Machines
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Mean Fleet Health</span>
          <div className="text-xl font-black text-[#F57C00] mt-1">94.6 / 100</div>
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
            placeholder="Search serial no, model, client..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="All">All Operational Statuses</option>
          <option value="Operational">Operational</option>
          <option value="Under Scheduled Maintenance">Under Scheduled Maintenance</option>
          <option value="Idle - Shift Change">Idle - Shift Change</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">Machine Serial</th>
                <th className="px-4 py-3">Model Name</th>
                <th className="px-4 py-3">Customer Site</th>
                <th className="px-4 py-3">Installed</th>
                <th className="px-4 py-3">AMC / Warranty</th>
                <th className="px-4 py-3 text-center">Health</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedMachines.map((mch) => (
                <tr
                  key={mch.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedMachine(mch)}
                      className="hover:underline text-left"
                    >
                      {mch.serialNo}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[180px] truncate">
                    {mch.modelName}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
                    {mch.clientName}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{mch.installationDate}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {mch.amcStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-black ${
                        mch.healthScore >= 95
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-[#F57C00]"
                      }`}
                    >
                      {mch.healthScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={mch.operationalStatus} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedMachine(mch)}
                      className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                      title="Inspect Machine Health"
                    >
                      <Icon name="eye" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredMachines.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Machine Details Modal */}
      {selectedMachine && (
        <Modal
          isOpen={Boolean(selectedMachine)}
          onClose={() => setSelectedMachine(null)}
          title={`Machine Asset: ${selectedMachine.modelName}`}
          subtitle={`Serial: ${selectedMachine.serialNo} · Operating at: ${selectedMachine.clientName}`}
          maxWidth="2xl"
          footer={
            <>
              <button
                onClick={() =>
                  showToast(`AMC Service Ticket generated for ${selectedMachine.serialNo}`)
                }
                className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
              >
                <Icon name="wrench" size={14} />
                <span>Schedule AMC Visit</span>
              </button>
              <button
                onClick={() => setSelectedMachine(null)}
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
                <span className="text-slate-400 text-[10px] uppercase font-bold">Health Score</span>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  {selectedMachine.healthScore} / 100
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Spindle Hours
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedMachine.runningHours.toLocaleString()} Hrs
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  CNC Controller
                </span>
                <p className="font-bold text-[#F57C00]">{selectedMachine.controllerType}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Last Service</span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedMachine.lastServiceDate}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Next Service Due
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedMachine.nextServiceDue}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Spindle Taper
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedMachine.spindleTaper}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Deployment Plant Address
              </span>
              <p className="p-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedMachine.location}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
