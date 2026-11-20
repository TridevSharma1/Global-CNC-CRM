import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalCncApp } from "../components/GlobalCncApp";
import { companyInfo } from "../data/companyInfo";
import { productsData } from "../data/products";
import { customersData } from "../data/customers";
import { suppliersData } from "../data/suppliers";
import { salesData } from "../data/sales";
import { purchasesData } from "../data/purchases";
import { expensesData } from "../data/expenses";
import { employeesData } from "../data/employees";
import { leadsData } from "../data/leads";
import { projectsData } from "../data/projects";
import { machinesData } from "../data/machines";
import { inquiriesData } from "../data/inquiries";
import { inventoryData } from "../data/inventory";
import { servicesData } from "../data/services";
import { vendorsData } from "../data/vendors";
import { accountingData } from "../data/accounting";
import { matchesMachineFilter, matchesMonthFilter } from "../utils/filterUtils";

describe("Global CNC Pvt. Ltd. Mock Data Validation", () => {
  it("validates company profile details", () => {
    expect(companyInfo.clientName).toBe("Shailesh Bhor");
    expect(companyInfo.companyName).toBe("Global CNC Pvt. Ltd.");
    expect(companyInfo.phone).toBe("+91 80876 96166");
    expect(companyInfo.email).toBe("deventerprises1016@gmail.com");
    expect(companyInfo.address.city).toBe("Pune");
    expect(companyInfo.address.pincode).toBe("411034");
    expect(companyInfo.address.full).toContain("Gera's Imperium Gateway");
    expect(companyInfo.address.full).toContain("Bhosari");
  });

  it("validates exact mock dataset counts required by specifications", () => {
    expect(productsData.length).toBe(100);
    expect(customersData.length).toBe(50);
    expect(suppliersData.length).toBe(40);
    expect(salesData.length).toBe(100);
    expect(purchasesData.length).toBe(80);
    expect(expensesData.length).toBe(50);
    expect(employeesData.length).toBe(20);
    expect(leadsData.length).toBe(30);
    expect(projectsData.length).toBe(25);
    expect(machinesData.length).toBe(30);
    expect(inquiriesData.length).toBe(30);
    expect(inventoryData.length).toBe(60);
    expect(servicesData.length).toBe(35);
    expect(vendorsData.length).toBe(40);
    expect(accountingData.length).toBe(45);
  });
});

describe("Global CNC Filter Utilities", () => {
  it("filters correctly by machine line and month", () => {
    expect(matchesMachineFilter("VMC Machines", "VMC Machines", "GCV-850 Heavy Duty VMC")).toBe(
      true,
    );
    expect(matchesMachineFilter("VMC Machines", "CNC Machines", "GCL-450 Lathe")).toBe(false);
    expect(matchesMachineFilter("All", "Any", "Any")).toBe(true);
    expect(matchesMonthFilter("2026-11-06", "2026-11")).toBe(true);
    expect(matchesMonthFilter("2026-08-16", "2026-11")).toBe(false);
  });
});

describe("Global CNC CRM Public Landing Page", () => {
  it("renders the public corporate landing page with key branding and contact info", () => {
    render(<GlobalCncApp />);
    expect(screen.getAllByText(/Global CNC Pvt\. Ltd\./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Shailesh Bhor/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bhosari, Pune/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\+91 80876 96166/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/deventerprises1016@gmail\.com/i).length).toBeGreaterThan(0);
  });

  it("renders public navigation items and switches sections", () => {
    render(<GlobalCncApp />);
    const productsNav = screen.getAllByRole("button", { name: /products/i })[0];
    fireEvent.click(productsNav);
    expect(screen.getAllByText(/Products/i).length).toBeGreaterThan(0);
  });
});

describe("Global CNC CRM Admin Panel & Multi-Filter System", () => {
  it("opens login modal, authenticates as Admin and allows multi-filtering by machine and month", () => {
    render(<GlobalCncApp />);
    const crmBtn = screen.getAllByRole("button", { name: /crm login/i })[0];
    fireEvent.click(crmBtn);

    // Modal title should appear
    expect(screen.getByText(/Staff & Management Login/i)).toBeInTheDocument();

    // Fill in admin credentials
    const emailInputs = screen.getAllByLabelText(/Work Email/i);
    const emailInput = emailInputs[emailInputs.length - 1];
    const passInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: "admin@globalcnc.in" } });
    fireEvent.change(passInput, { target: { value: "globalcnc" } });

    const submitBtn = screen.getByRole("button", { name: /Sign In to/i });
    fireEvent.click(submitBtn);

    // After login, admin dashboard should be visible
    expect(screen.getByText(/Manufacturing & Commercial Pulse/i)).toBeInTheDocument();

    // Navigate to Sale module
    const saleNavs = screen.getAllByRole("button", { name: /Sale/i });
    fireEvent.click(saleNavs[0]);

    // Check Multi-Filter bar presence
    expect(
      screen.getByPlaceholderText(/Search order ref, customer, invoice or machine/i),
    ).toBeInTheDocument();
  });
});
