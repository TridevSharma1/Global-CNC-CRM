declare module "@/data/crmData" {
  export type CrmRecord = {
    id: number;
    name: string;
    category: string;
    status: string;
    amount: number;
    date: string;
    owner: string;
    reference: string;
    [key: string]: unknown;
  };
  export const datasets: {
    sales: CrmRecord[];
    purchases: CrmRecord[];
    expenses: CrmRecord[];
    customers: CrmRecord[];
    suppliers: CrmRecord[];
    products: CrmRecord[];
    employees: CrmRecord[];
    leads: CrmRecord[];
    projects: CrmRecord[];
    machines: CrmRecord[];
    inquiries: CrmRecord[];
    inventory: CrmRecord[];
    services: CrmRecord[];
    vendors: CrmRecord[];
    accounting: CrmRecord[];
    reports: CrmRecord[];
    settings: CrmRecord[];
  };
  export const activitiesData: Array<{
    initials: string;
    text: string;
    time: string;
    tone: string;
  }>;
}