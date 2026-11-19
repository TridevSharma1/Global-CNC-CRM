import React from "react";
import { Modal } from "../common/Modal";

interface LegalModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <Modal
      isOpen={Boolean(type)}
      onClose={onClose}
      title={
        type === "privacy"
          ? "Privacy & Data Protection Policy"
          : "Commercial Terms & Manufacturing Conditions"
      }
      subtitle="Global CNC Pvt. Ltd. · Legal & Statutory Compliance"
      maxWidth="3xl"
    >
      {type === "privacy" ? (
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>1. General Information:</strong> Global CNC Pvt. Ltd. ("Global CNC") respects
            the intellectual property and confidentiality of its industrial clients, suppliers, and
            manufacturing partners. This Privacy Statement describes how we handle technical part
            drawings, business inquiries, contact records, and RFQ submissions.
          </p>
          <p>
            <strong>2. Technical & CAD Drawings:</strong> All CAD files, component prints, STEP
            models, and metallurgical specifications submitted through our website or direct emails
            are treated as proprietary commercial secrets. Global CNC signs formal Non-Disclosure
            Agreements (NDAs) prior to detailed tooling runoff or fixture fabrication.
          </p>
          <p>
            <strong>3. Client Data & CRM:</strong> Contact information, phone numbers, email
            addresses, and GSTIN details collected through forms or direct communication are stored
            in our secure internal CRM database solely for machine quotation, warranty servicing,
            AMC scheduling, and statutory tax invoicing. We never monetize or sell client records to
            third-party data brokers.
          </p>
          <p>
            <strong>4. Inquiries & Contact:</strong> For inquiries regarding statutory data privacy,
            please contact:{" "}
            <a href="mailto:deventerprises1016@gmail.com" className="text-[#F57C00] font-bold">
              deventerprises1016@gmail.com
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>1. Machine Quotations & Orders:</strong> All machine tool proposals, SPM
            quotations, and tooling estimates issued by Global CNC Pvt. Ltd. are valid for 30
            calendar days from the date of quotation unless otherwise specified in writing.
          </p>
          <p>
            <strong>2. Warranty & Performance Guarantees:</strong> New CNC and VMC machine tools
            manufactured by Global CNC are backed by a standard 12-month comprehensive warranty from
            the date of final site commissioning. Warranty covers manufacturing defects, spindle
            cartridge bearings, ball screw assemblies, and CNC controller hardware under normal
            operating conditions.
          </p>
          <p>
            <strong>3. Commissioning & Pre-Dispatch Inspection (PDI):</strong> Customers or their
            authorized technical representatives are invited to attend Pre-Dispatch Inspection (PDI)
            at our Bhosari, Pune facility. Final runoff is signed off based on agreed trial part
            cycle times and coordinate measuring machine (CMM) dimensional verification.
          </p>
          <p>
            <strong>4. Jurisdiction & Statutory Law:</strong> All purchase orders, sales contracts,
            and service disputes are subject to the exclusive jurisdiction of the competent courts
            in Pune / Pimpri-Chinchwad, Maharashtra, India.
          </p>
        </div>
      )}
    </Modal>
  );
};
