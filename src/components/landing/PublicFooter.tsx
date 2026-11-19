import React from "react";
import { Brand } from "../common/Brand";
import { Icon } from "../common/Icons";
import { companyInfo } from "../../data/companyInfo";

interface PublicFooterProps {
  onNavigate: (page: string) => void;
  onOpenLegal: (type: "privacy" | "terms") => void;
  onOpenLogin: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenLogin,
}) => {
  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-slate-800">
      {/* Upper Footer: Main Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1 & 2: Company Overview */}
        <div className="lg:col-span-2 space-y-4">
          <Brand inverse size="lg" />
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
            Global CNC Pvt. Ltd. is an Indian precision manufacturing powerhouse led by{" "}
            <span className="text-white font-bold">{companyInfo.clientName}</span>. We engineer
            high-rigidity Special Purpose Machines (SPMs), CNC Turning Centres, VMC Machining
            Platforms and Turnkey Robotic Cells in Bhosari, Pune.
          </p>

          <div className="pt-2 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="size-1.5 bg-[#F57C00] rounded-full" />
              <span>
                <strong className="text-white">Facility:</strong> 45,000 sq. ft. Precision Assembly
                & CMM Center
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 bg-[#F57C00] rounded-full" />
              <span>
                <strong className="text-white">Client Portfolio:</strong> 950+ Machine Deployments
                Nationwide
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 bg-[#F57C00] rounded-full" />
              <span>
                <strong className="text-white">GSTIN:</strong> {companyInfo.gstNumber} · CIN:{" "}
                {companyInfo.cinNumber}
              </span>
            </div>
          </div>

          {/* Social Icons Placeholders */}
          <div className="pt-4 flex items-center gap-3">
            {["LinkedIn", "YouTube", "Twitter/X", "WhatsApp", "Indiamart"].map((social) => (
              <span
                key={social}
                className="px-2.5 py-1 bg-white/10 hover:bg-[#F57C00] text-slate-300 hover:text-white rounded-xs text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                title={`Visit Global CNC on ${social}`}
              >
                {social}
              </span>
            ))}
          </div>
        </div>

        {/* Col 3: Machine Categories */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.16em] text-[#F57C00] mb-4">
            Machine Solutions
          </h4>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            {[
              "Special Purpose Machines (SPMs)",
              "Vertical Machining Centres (VMC)",
              "CNC Turning Lathes",
              "Dual Spindle Turning Cells",
              "Robotic Machine Tending",
              "CNC Machine Parts & Spares",
              "Industrial Automation Lines",
            ].map((prod) => (
              <li key={prod}>
                <button
                  onClick={() => onNavigate("Our Machines")}
                  className="hover:text-[#F57C00] transition-colors text-left"
                >
                  {prod}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Services & Industries */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.16em] text-[#F57C00] mb-4">
            Services & Support
          </h4>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            {[
              "Custom Machine Design",
              "Installation & Commissioning",
              "Annual Maintenance Contracts (AMC)",
              "Preventive Health Audits",
              "CNC Controller Retrofitting",
              "Spindle Dynamic Balancing",
              "Shop Floor Operator Training",
            ].map((srv) => (
              <li key={srv}>
                <button
                  onClick={() => onNavigate("Services")}
                  className="hover:text-[#F57C00] transition-colors text-left"
                >
                  {srv}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Corporate Plant & Contact */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.16em] text-[#F57C00] mb-4">
            Works & Office
          </h4>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <Icon name="location" size={16} className="text-[#F57C00] mt-0.5" />
              <p className="leading-relaxed">{companyInfo.address.full}</p>
            </div>

            <div className="flex items-center gap-2.5">
              <Icon name="phone" size={16} className="text-[#F57C00]" />
              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                className="hover:text-white font-bold"
              >
                {companyInfo.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Icon name="mail" size={16} className="text-[#F57C00]" />
              <a href={`mailto:${companyInfo.email}`} className="hover:text-white break-all">
                {companyInfo.email}
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenLogin}
                className="w-full py-2 px-3 bg-white/10 hover:bg-[#F57C00] text-white font-bold text-xs uppercase tracking-wider rounded-xs border border-white/20 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Icon name="grid" size={13} />
                <span>Admin / Employee Portal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="border-t border-slate-800 bg-[#071526] py-5 px-4 sm:px-8 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            © 2026 <strong className="text-white">Global CNC Pvt. Ltd.</strong> Client:{" "}
            <strong className="text-[#F57C00]">Shailesh Bhor</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onOpenLegal("privacy")}
              className="hover:text-white underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal("terms")}
              className="hover:text-white underline underline-offset-2"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate("Certificates")}
              className="hover:text-white underline underline-offset-2"
            >
              ISO 9001:2015
            </button>
            <span>·</span>
            <span className="text-slate-500">Bhosari, Pune, Maharashtra 411034</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
