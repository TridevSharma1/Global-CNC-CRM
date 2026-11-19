import { companyInfo } from "./companyInfo";
import { productsData } from "./products";
import { customersData } from "./customers";
import { suppliersData } from "./suppliers";
import { salesData } from "./sales";
import { purchasesData } from "./purchases";
import { expensesData } from "./expenses";
import { employeesData } from "./employees";
import { leadsData } from "./leads";
import { projectsData } from "./projects";
import { machinesData } from "./machines";
import { inquiriesData } from "./inquiries";
import { inventoryData } from "./inventory";
import { servicesData } from "./services";
import { vendorsData } from "./vendors";
import { accountingData } from "./accounting";
import { testimonialsData } from "./testimonials";
import { certificatesData } from "./certificates";

export {
  companyInfo,
  productsData,
  customersData,
  suppliersData,
  salesData,
  purchasesData,
  expensesData,
  employeesData,
  leadsData,
  projectsData,
  machinesData,
  inquiriesData,
  inventoryData,
  servicesData,
  vendorsData,
  accountingData,
  testimonialsData,
  certificatesData,
};

export interface CrmRecord {
  id: number;
  name: string;
  category: string;
  status: string;
  amount?: number;
  date?: string;
  owner?: string;
  reference?: string;
  [key: string]: unknown;
}

export const activitiesData = [
  {
    initials: "AP",
    text: "New SPM quotation requested by Tata Motors CVBU Pune",
    time: "10 min ago",
    tone: "orange",
  },
  {
    initials: "PO",
    text: "Purchase order PO-2026-0042 approved by Shailesh Bhor",
    time: "25 min ago",
    tone: "blue",
  },
  {
    initials: "SR",
    text: "Service preventive maintenance visit completed for GCV-850",
    time: "1 hr ago",
    tone: "green",
  },
  {
    initials: "IN",
    text: "Inventory alert: THK Linear Guide below re-order safety level",
    time: "2 hrs ago",
    tone: "red",
  },
  {
    initials: "PR",
    text: "Tata Brake Carrier Twin-Spindle SPM reached 95% final testing",
    time: "3 hrs ago",
    tone: "blue",
  },
  {
    initials: "SL",
    text: "Sales order SO-2026-0091 invoiced: ₹54,20,000 to Bharat Forge",
    time: "4 hrs ago",
    tone: "green",
  },
];

export const datasets = {
  sales: salesData.map((s) => ({
    ...s,
    name: `${s.customerName} - ${s.productName}`,
    owner: s.salesPerson,
  })),
  purchases: purchasesData.map((p) => ({
    ...p,
    name: `${p.supplierName} - ${p.category}`,
    owner: p.approvedBy,
  })),
  expenses: expensesData.map((e) => ({ ...e, name: e.title, owner: e.recordedBy })),
  customers: customersData.map((c) => ({
    ...c,
    category: c.industry,
    amount: c.outstanding,
    date: "2026-01-15",
    owner: c.contactPerson,
  })),
  suppliers: suppliersData.map((s) => ({
    ...s,
    amount: s.outstanding,
    date: "2026-01-10",
    owner: s.contactPerson,
  })),
  products: productsData.map((p) => ({
    ...p,
    amount: p.price,
    date: "2026-01-01",
    owner: p.brand,
  })),
  employees: employeesData.map((e) => ({
    ...e,
    category: e.department,
    amount: e.salary,
    date: e.joinDate,
    owner: e.name,
  })),
  leads: leadsData.map((l) => ({
    ...l,
    name: `${l.companyName} (${l.machineInterest})`,
    category: l.source,
    amount: l.estimatedBudget,
    date: l.createdDate,
    owner: l.assignedTo,
  })),
  projects: projectsData.map((p) => ({
    ...p,
    category: p.machineType,
    amount: p.budget,
    date: p.startDate,
    owner: p.leadEngineer,
  })),
  machines: machinesData.map((m) => ({
    ...m,
    name: `${m.modelName} [${m.serialNo}]`,
    amount: 4500000,
    date: m.installationDate,
    owner: m.clientName,
  })),
  inquiries: inquiriesData.map((i) => ({ ...i, category: i.type, amount: 0, owner: i.name })),
  inventory: inventoryData.map((inv) => ({
    ...inv,
    amount: inv.totalValuation,
    date: inv.lastReceived,
    owner: inv.warehouse,
  })),
  services: servicesData.map((srv) => ({
    ...srv,
    name: `${srv.machineModel} - ${srv.serviceType}`,
    category: srv.serviceType,
    amount: srv.cost,
    date: srv.visitDate,
    owner: srv.engineerAssigned,
  })),
  vendors: vendorsData.map((v) => ({
    ...v,
    amount: v.outstanding,
    date: "2026-02-01",
    owner: v.contactPerson,
  })),
  accounting: accountingData.map((a) => ({ ...a, name: a.description, owner: a.account })),
  reports: [
    {
      id: 1,
      name: "Sales Performance & Revenue Analysis",
      category: "Sales",
      date: "2026-11-20",
      amount: 18450000,
      status: "Ready",
      owner: "Accounts Team",
      reference: "RPT-001",
    },
    {
      id: 2,
      name: "Purchase & Vendor Spend Breakdown",
      category: "Purchases",
      date: "2026-11-20",
      amount: 9240000,
      status: "Ready",
      owner: "Procurement",
      reference: "RPT-002",
    },
    {
      id: 3,
      name: "Monthly Profit & Operational Margin",
      category: "Finance",
      date: "2026-11-20",
      amount: 4850000,
      status: "Ready",
      owner: "Shailesh Bhor",
      reference: "RPT-003",
    },
    {
      id: 4,
      name: "Inventory Valuation & Warehouse Stock Health",
      category: "Inventory",
      date: "2026-11-20",
      amount: 16800000,
      status: "Ready",
      owner: "Stores Lead",
      reference: "RPT-004",
    },
    {
      id: 5,
      name: "GST Output vs Input Tax Credit Audit",
      category: "Taxation",
      date: "2026-11-20",
      amount: 3321000,
      status: "Ready",
      owner: "Finance Lead",
      reference: "RPT-005",
    },
    {
      id: 6,
      name: "Machine Fleet AMC & Preventive Service SLA",
      category: "Service",
      date: "2026-11-20",
      amount: 1420000,
      status: "Ready",
      owner: "Service Head",
      reference: "RPT-006",
    },
  ],
  settings: [
    {
      id: 1,
      name: "Company Profile & Legal Details",
      category: "Configuration",
      status: "Active",
      date: "2026-11-20",
      owner: "Shailesh Bhor",
      reference: "SET-001",
    },
    {
      id: 2,
      name: "Business Locations & MIDC Bhosari Plant Info",
      category: "Configuration",
      status: "Active",
      date: "2026-11-20",
      owner: "Admin",
      reference: "SET-002",
    },
    {
      id: 3,
      name: "User Roles & Access Permissions (RBAC)",
      category: "Security",
      status: "Active",
      date: "2026-11-20",
      owner: "Admin",
      reference: "SET-003",
    },
    {
      id: 4,
      name: "GSTIN, Tax Brackets & HSN Code Config",
      category: "Finance",
      status: "Active",
      date: "2026-11-20",
      owner: "Accounts",
      reference: "SET-004",
    },
    {
      id: 5,
      name: "Theme, Industrial Branding & Visuals",
      category: "Design",
      status: "Active",
      date: "2026-11-20",
      owner: "Admin",
      reference: "SET-005",
    },
    {
      id: 6,
      name: "System Backup & JSON Data Export",
      category: "Database",
      status: "Ready",
      date: "2026-11-20",
      owner: "System",
      reference: "SET-006",
    },
  ],
};
