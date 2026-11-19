import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { projectsData } from "../../data/projects";

export const ProjectModule: React.FC = () => {
  const [projects, setProjects] = useState(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedProj, setSelectedProj] = useState<(typeof projectsData)[0] | null>(null);
  const [editProgressModalOpen, setEditProgressModalOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(50);
  const [toastMessage, setToastMessage] = useState("");

  const machineTypes = [
    "All",
    "Special Purpose Machine",
    "Vertical Machining Centre",
    "Automation Solution",
    "CNC Turning Centre",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.leadEngineer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "All" || item.machineType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [projects, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const displayedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  const handleUpdateProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProj) return;
    const progressVal = Number(newProgress);
    const newStatus =
      progressVal >= 100
        ? "Completed"
        : progressVal >= 75
          ? "Final Testing & Pre-Dispatch"
          : progressVal >= 45
            ? "Assembly & Wiring"
            : "Machining & Fabrication";

    setProjects(
      projects.map((p) =>
        p.id === selectedProj.id ? { ...p, progress: progressVal, status: newStatus } : p,
      ),
    );
    setEditProgressModalOpen(false);
    showToast(`Project ${selectedProj.projectCode} progress updated to ${progressVal}%.`);
    setSelectedProj({ ...selectedProj, progress: progressVal, status: newStatus });
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
            Client Turnkey Engineering Projects (25 Projects)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor mechanical SPM fabrication, electrical PLC wiring, laser spindle alignment, and
            client PDI runoffs.
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting Project Milestone Schedule...")}
          className="px-3.5 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
        >
          <Icon name="download" size={14} />
          <span>Export Projects</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Projects</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {projects.length} Contracts
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Total Project Budgets
          </span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(projects.reduce((acc, curr) => acc + curr.budget, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            In Pre-Dispatch Runoff
          </span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            {projects.filter((p) => p.progress >= 70 && p.progress < 100).length} Systems
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Completed Turnkey</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {projects.filter((p) => p.status === "Completed").length} Lines
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
            placeholder="Search project title, client, or engineer..."
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
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none max-w-xs"
        >
          {machineTypes.map((t) => (
            <option key={t} value={t}>
              {t}
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
                <th className="px-4 py-3">Project Title</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Lead Engineer</th>
                <th className="px-4 py-3 text-right">Budget (₹)</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedProjects.map((proj) => (
                <tr
                  key={proj.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedProj(proj)}
                      className="hover:underline text-left"
                    >
                      {proj.projectCode}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[220px] truncate">
                    <button
                      onClick={() => setSelectedProj(proj)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {proj.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[160px] truncate">
                    {proj.clientName}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200 font-semibold">
                    {proj.leadEngineer}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(proj.budget)}
                  </td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                      <span>{proj.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          proj.progress >= 90
                            ? "bg-emerald-500"
                            : proj.progress >= 50
                              ? "bg-[#3A6EA5]"
                              : "bg-[#F57C00]"
                        }`}
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={proj.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedProj(proj)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Project Specs"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProj(proj);
                          setNewProgress(proj.progress);
                          setEditProgressModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#F57C00] rounded-xs"
                        title="Update Progress %"
                      >
                        <Icon name="refresh" size={14} />
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
          totalRecords={filteredProjects.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Project Details Modal */}
      {selectedProj && (
        <Modal
          isOpen={Boolean(selectedProj)}
          onClose={() => setSelectedProj(null)}
          title={selectedProj.name}
          subtitle={`Project Code: ${selectedProj.projectCode} · Client: ${selectedProj.clientName}`}
          maxWidth="2xl"
          footer={
            <>
              <button
                onClick={() => {
                  setNewProgress(selectedProj.progress);
                  setEditProgressModalOpen(true);
                }}
                className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs rounded-sm flex items-center gap-1.5"
              >
                <Icon name="edit" size={14} />
                <span>Update Progress %</span>
              </button>
              <button
                onClick={() => setSelectedProj(null)}
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
                <span className="text-slate-400 text-[10px] uppercase font-bold">Total Budget</span>
                <p className="text-base font-black text-[#F57C00]">
                  {formatPrice(selectedProj.budget)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Capital Spent
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {formatPrice(selectedProj.spent)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Target Deadline
                </span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedProj.deadline}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Platform</span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedProj.machineType}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Lead Engineer
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedProj.leadEngineer}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Overall Progress
                </span>
                <p className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  {selectedProj.progress}%
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Project Deliverables & Milestones
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {selectedProj.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs flex items-center gap-2"
                  >
                    <Icon name="check" size={13} className="text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Assigned Engineering Disciplines
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedProj.assignedTeam.map((team, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-xs text-[11px] font-bold text-slate-700 dark:text-slate-200"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Update Progress Modal */}
      {editProgressModalOpen && selectedProj && (
        <Modal
          isOpen={editProgressModalOpen}
          onClose={() => setEditProgressModalOpen(false)}
          title={`Update Progress: ${selectedProj.projectCode}`}
          subtitle={selectedProj.name}
          maxWidth="md"
        >
          <form onSubmit={handleUpdateProgress} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Project Completion Percentage (0 - 100%)
              <input
                type="number"
                min="0"
                max="100"
                required
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-sm outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditProgressModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Update Progress
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
