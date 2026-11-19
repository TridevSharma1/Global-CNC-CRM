import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Icon } from "../common/Icons";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = "",
}) => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "Pune",
    machineType: defaultSubject || "Special Purpose Machine (SPM)",
    requirements: "",
    expectedTimeline: "Within 2 Months",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Machine Proposal / RFQ"
      subtitle="Direct line to Global CNC Technical Proposals Team · Bhosari, Pune"
      maxWidth="2xl"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Icon name="check" size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Quotation Request Registered!
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thank you. Your request for{" "}
            <strong className="text-[#F57C00]">{form.machineType}</strong> has been logged. Our
            commercial engineering team will reach out with technical proposal drawings.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Contact Name *
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ramesh Patil"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Company Name *
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Precision Forge Ltd."
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Work Email *
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@company.com"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Phone Number *
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98..."
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Machine Category
              <input
                type="text"
                value={form.machineType}
                onChange={(e) => setForm({ ...form, machineType: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Target Delivery Schedule
              <select
                value={form.expectedTimeline}
                onChange={(e) => setForm({ ...form, expectedTimeline: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              >
                <option value="Urgent (Within 4 Weeks)">Urgent (Within 4 Weeks)</option>
                <option value="Within 2 Months">Within 2 Months</option>
                <option value="Next Quarter (3-4 Months)">Next Quarter (3-4 Months)</option>
                <option value="Planning / Annual Budget">Planning / Annual Budget</option>
              </select>
            </label>
          </div>

          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Project Description & Technical Specifications
            <textarea
              rows={3}
              required
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              placeholder="Describe machine travels, part materials, required tolerance levels, or existing machine bottlenecks..."
              className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
            />
          </label>

          {/* Drawing Upload Placeholder */}
          <div className="p-3 bg-slate-50 dark:bg-[#071526] border border-dashed border-slate-300 dark:border-slate-700 rounded-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Icon name="layers" size={18} className="text-[#3A6EA5]" />
              <span>Have CAD / Part drawings? (PDF, DXF, STEP)</span>
            </div>
            <button
              type="button"
              onClick={() =>
                alert(
                  "Drawing upload is a demo placeholder. You can email drawings to deventerprises1016@gmail.com.",
                )
              }
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-xs"
            >
              Attach File
            </button>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
            >
              Submit RFQ Proposal
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
