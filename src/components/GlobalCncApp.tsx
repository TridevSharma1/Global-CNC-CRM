import React, { useState, useEffect } from "react";
import { PublicNavbar } from "./landing/PublicNavbar";
import { PublicFooter } from "./landing/PublicFooter";
import { HeroSection } from "./landing/HeroSection";
import { AboutSection } from "./landing/AboutSection";
import { MachinesSection } from "./landing/MachinesSection";
import { ProductsCatalog } from "./landing/ProductsCatalog";
import { ServicesSection } from "./landing/ServicesSection";
import { IndustriesSection } from "./landing/IndustriesSection";
import { ProjectsSection } from "./landing/ProjectsSection";
import { GallerySection } from "./landing/GallerySection";
import { CertificatesSection } from "./landing/CertificatesSection";
import { TestimonialsSection } from "./landing/TestimonialsSection";
import { CareersSection } from "./landing/CareersSection";
import { ContactSection } from "./landing/ContactSection";
import { InquiryModal } from "./landing/InquiryModal";
import { LegalModal } from "./landing/LegalModal";

// Admin Panel Modules
import { AdminSidebar, AdminTab } from "./admin/AdminSidebar";
import { AdminTopNav } from "./admin/AdminTopNav";
import { DashboardModule } from "./admin/DashboardModule";
import { PurchaseModule } from "./admin/PurchaseModule";
import { ExpenseModule } from "./admin/ExpenseModule";
import { SalesModule } from "./admin/SalesModule";
import { CustomerModule } from "./admin/CustomerModule";
import { SupplierModule } from "./admin/SupplierModule";
import { ProductModule } from "./admin/ProductModule";
import { InventoryModule } from "./admin/InventoryModule";
import { EmployeeModule } from "./admin/EmployeeModule";
import { LeadModule } from "./admin/LeadModule";
import { InquiryModule } from "./admin/InquiryModule";
import { ProjectModule } from "./admin/ProjectModule";
import { MachineModule } from "./admin/MachineModule";
import { ServiceModule } from "./admin/ServiceModule";
import { VendorModule } from "./admin/VendorModule";
import { AccountingModule } from "./admin/AccountingModule";
import { ReportsModule } from "./admin/ReportsModule";
import { SettingsModule } from "./admin/SettingsModule";
import { LoginModal } from "./admin/LoginModal";

export function GlobalCncApp() {
  const [viewMode, setViewMode] = useState<"public" | "admin">("public");
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>("dashboard");
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [userRole, setUserRole] = useState<"Admin" | "Employee">("Admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modals
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState("General RFQ");
  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | null>(null);

  const [adminSearchQuery, setAdminSearchQuery] = useState("");

  // Sync dark class on document element
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleNavigatePage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenInquiry = (subject?: string) => {
    setInquirySubject(subject || "General Machine Inquiry");
    setInquiryModalOpen(true);
  };

  const handleOpenLogin = (role: "Admin" | "Employee" = "Admin") => {
    setUserRole(role);
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = (role: "Admin" | "Employee") => {
    setUserRole(role);
    setIsLoggedIn(true);
    setLoginModalOpen(false);
    setViewMode("admin");
    setActiveAdminTab("dashboard");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setViewMode("public");
    setCurrentPage("Home");
  };

  // ----------------------------------------------------
  // ADMIN WORKSPACE RENDER
  // ----------------------------------------------------
  if (viewMode === "admin" && isLoggedIn) {
    return (
      <div
        className={`min-h-screen bg-slate-50 dark:bg-[#071526] text-slate-800 dark:text-slate-100 flex ${dark ? "dark" : ""}`}
      >
        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeAdminTab}
          onSelectTab={(tab) => {
            setActiveAdminTab(tab);
            setAdminSearchQuery("");
          }}
          isOpen={adminSidebarOpen}
          onClose={() => setAdminSidebarOpen(false)}
          userRole={userRole}
          onSignOut={handleSignOut}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navigation */}
          <AdminTopNav
            activeTab={activeAdminTab}
            onOpenSidebar={() => setAdminSidebarOpen(true)}
            dark={dark}
            onToggleDark={() => setDark(!dark)}
            userRole={userRole}
            onSwitchRole={(r) => setUserRole(r)}
            onSignOut={handleSignOut}
            searchQuery={adminSearchQuery}
            onSearchChange={setAdminSearchQuery}
            onNavigateToTab={setActiveAdminTab}
          />

          {/* Module Canvas */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {activeAdminTab === "dashboard" && (
              <DashboardModule
                onNavigateTab={(tab) => {
                  setActiveAdminTab(tab);
                  setAdminSearchQuery("");
                }}
                onQuickAction={(action) => {
                  if (action === "print-summary") window.print();
                }}
              />
            )}
            {activeAdminTab === "sales" && <SalesModule />}
            {activeAdminTab === "purchase" && <PurchaseModule />}
            {activeAdminTab === "expense" && <ExpenseModule />}
            {activeAdminTab === "customers" && <CustomerModule />}
            {activeAdminTab === "suppliers" && <SupplierModule />}
            {activeAdminTab === "products" && <ProductModule />}
            {activeAdminTab === "inventory" && <InventoryModule />}
            {activeAdminTab === "employees" && <EmployeeModule />}
            {activeAdminTab === "leads" && <LeadModule />}
            {activeAdminTab === "inquiries" && <InquiryModule />}
            {activeAdminTab === "projects" && <ProjectModule />}
            {activeAdminTab === "machines" && <MachineModule />}
            {activeAdminTab === "services" && <ServiceModule />}
            {activeAdminTab === "vendors" && <VendorModule />}
            {activeAdminTab === "accounting" && <AccountingModule />}
            {activeAdminTab === "reports" && <ReportsModule />}
            {activeAdminTab === "settings" && <SettingsModule />}
          </main>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PUBLIC WEBSITE RENDER
  // ----------------------------------------------------
  return (
    <div
      className={`min-h-screen bg-[#F8FAFC] dark:bg-[#071526] text-slate-800 dark:text-slate-100 flex flex-col ${dark ? "dark" : ""}`}
    >
      {/* Sticky Navbar */}
      <PublicNavbar
        currentPage={currentPage}
        onNavigate={handleNavigatePage}
        onOpenInquiry={handleOpenInquiry}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main Public Pages Router */}
      <main className="flex-1">
        {currentPage === "Home" && (
          <>
            <HeroSection
              onNavigate={handleNavigatePage}
              onOpenInquiry={() => handleOpenInquiry("Hero Machine RFQ")}
            />
            <AboutSection onNavigate={handleNavigatePage} />
            <MachinesSection
              onOpenInquiry={handleOpenInquiry}
              onViewAllProducts={() => handleNavigatePage("Products")}
            />
            <ServicesSection onOpenInquiry={handleOpenInquiry} />
            <IndustriesSection onOpenInquiry={handleOpenInquiry} />
            <ProjectsSection onOpenInquiry={handleOpenInquiry} />
            <GallerySection />
            <TestimonialsSection />
            <CertificatesSection />
            <ContactSection />
          </>
        )}

        {currentPage === "About Us" && (
          <>
            <AboutSection onNavigate={handleNavigatePage} />
            <CertificatesSection />
            <TestimonialsSection />
          </>
        )}

        {currentPage === "Our Machines" && (
          <MachinesSection
            onOpenInquiry={handleOpenInquiry}
            onViewAllProducts={() => handleNavigatePage("Products")}
          />
        )}

        {currentPage === "Products" && <ProductsCatalog onOpenInquiry={handleOpenInquiry} />}

        {currentPage === "Services" && <ServicesSection onOpenInquiry={handleOpenInquiry} />}

        {currentPage === "Industries" && <IndustriesSection onOpenInquiry={handleOpenInquiry} />}

        {currentPage === "Projects" && <ProjectsSection onOpenInquiry={handleOpenInquiry} />}

        {currentPage === "Gallery" && <GallerySection />}

        {currentPage === "Certificates" && <CertificatesSection />}

        {currentPage === "Testimonials" && <TestimonialsSection />}

        {currentPage === "Careers" && <CareersSection />}

        {currentPage === "Contact" && <ContactSection />}
      </main>

      {/* Footer */}
      <PublicFooter
        onNavigate={handleNavigatePage}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenLogin={() => handleOpenLogin("Admin")}
      />

      {/* Global Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={userRole}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultSubject={inquirySubject}
      />

      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
    </div>
  );
}

export default GlobalCncApp;
