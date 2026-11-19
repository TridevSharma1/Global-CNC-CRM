import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { employeesData } from "../../data/employees";

export const EmployeeModule: React.FC = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedEmp, setSelectedEmp] = useState<(typeof employeesData)[0] | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formEmp, setFormEmp] = useState({
    name: "",
    department: "Engineering",
    designation: "Design Engineer",
    email: "",
    phone: "",
    salary: 85000,
  });

  const departments = [
    "All",
    "Executive Management",
    "Engineering",
    "Production",
    "Service",
    "Sales",
    "Finance",
    "Quality",
    "HR & Admin",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === "All" || item.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchQuery, deptFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const displayedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...employees.map((e) => e.id), 0) + 1;
    const created = {
      id: nextId,
      empCode: `EMP-GC-${String(nextId + 100)}`,
      name: formEmp.name,
      department: formEmp.department,
      designation: formEmp.designation,
      email:
        formEmp.email || `${formEmp.name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@globalcnc.in`,
      phone: formEmp.phone || "+91 9822000000",
      salary: Number(formEmp.salary) || 65000,
      joinDate: new Date().toISOString().slice(0, 10),
      attendancePercent: 96,
      leavesTaken: 0,
      performanceScore: 92,
      status: "Active",
      shift: "General Day Shift (8:30 AM - 5:30 PM)",
      documents: ["Aadhaar Card", "PAN Card", "Engineering Degree", "Employment Agreement"],
    };

    setEmployees([...employees, created]);
    setCreateModalOpen(false);
    showToast(`Employee ${created.name} (${created.empCode}) inducted.`);
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Remove employee record for ${name}?`)) {
      setEmployees(employees.filter((e) => e.id !== id));
      showToast(`Employee ${name} record removed.`);
      if (selectedEmp?.id === id) setSelectedEmp(null);
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
            Employee Directory & Workforce Management (20 Specialists)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Engineering designers, CNC programmers, field service engineers, and quality assurance
            personnel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Monthly Attendance & Payroll Report...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Payroll</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Induct Employee</span>
          </button>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Workforce</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {employees.length} Engineers
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Payroll</span>
          <div className="text-xl font-black text-[#F57C00] mt-1 truncate">
            {formatPrice(employees.reduce((acc, curr) => acc + curr.salary, 0))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Attendance</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            94.8%
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Performance Rating</span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            91.5 / 100
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
            placeholder="Search employee name, code, designation..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={deptFilter}
          onChange={(e) => {
            setDeptFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none max-w-xs"
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
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
                <th className="px-4 py-3">Employee Name</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3 text-center">Attendance</th>
                <th className="px-4 py-3 text-right">Monthly Salary (₹)</th>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedEmp(emp)}
                      className="hover:underline text-left"
                    >
                      {emp.empCode}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white">
                    <button
                      onClick={() => setSelectedEmp(emp)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {emp.name}
                    </button>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {emp.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{emp.department}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                    {emp.designation}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {emp.attendancePercent}%
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(emp.salary)}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-[#F57C00]">
                    {emp.performanceScore}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedEmp(emp)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Profile"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id, emp.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Remove Employee"
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
          totalRecords={filteredEmployees.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Employee Modal */}
      {selectedEmp && (
        <Modal
          isOpen={Boolean(selectedEmp)}
          onClose={() => setSelectedEmp(null)}
          title={selectedEmp.name}
          subtitle={`Staff ID: ${selectedEmp.empCode} · ${selectedEmp.designation}`}
          maxWidth="2xl"
          footer={
            <button
              onClick={() => setSelectedEmp(null)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-sm hover:bg-slate-100"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Department</span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedEmp.department}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Shift Schedule
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">{selectedEmp.shift}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Date of Joining
                </span>
                <p className="font-bold text-slate-800 dark:text-white">{selectedEmp.joinDate}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Monthly Compensation
                </span>
                <p className="font-black text-[#F57C00]">{formatPrice(selectedEmp.salary)}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Leaves Consumed
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedEmp.leavesTaken} Days
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Annual Performance KPI
                </span>
                <p className="font-black text-emerald-600 dark:text-emerald-400">
                  {selectedEmp.performanceScore} / 100
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Corporate Contact
                </span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5">
                  {selectedEmp.phone}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Internal Email
                </span>
                <p className="font-bold text-slate-800 dark:text-white mt-0.5 break-all">
                  {selectedEmp.email}
                </p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                HR Statutory Credentials
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedEmp.documents.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-xs text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                  >
                    <Icon name="check" size={12} className="text-emerald-500" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Induct Employee Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Induct New Staff Member"
          subtitle="Register employee profile, department allocation, and statutory salary"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateEmployee} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Full Name *
              <input
                type="text"
                required
                value={formEmp.name}
                onChange={(e) => setFormEmp({ ...formEmp, name: e.target.value })}
                placeholder="e.g. Omkar Bhosale"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Department *
                <select
                  value={formEmp.department}
                  onChange={(e) => setFormEmp({ ...formEmp, department: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  {departments
                    .filter((d) => d !== "All")
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Designation *
                <input
                  type="text"
                  required
                  value={formEmp.designation}
                  onChange={(e) => setFormEmp({ ...formEmp, designation: e.target.value })}
                  placeholder="e.g. CNC Programmer"
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Phone Number
                <input
                  type="tel"
                  value={formEmp.phone}
                  onChange={(e) => setFormEmp({ ...formEmp, phone: e.target.value })}
                  placeholder="+91 98..."
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Monthly Salary (₹) *
                <input
                  type="number"
                  min="15000"
                  required
                  value={formEmp.salary}
                  onChange={(e) => setFormEmp({ ...formEmp, salary: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
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
                Save Employee
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
