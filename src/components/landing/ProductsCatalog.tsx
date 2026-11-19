import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { Modal } from "../common/Modal";
import { Pagination } from "../common/Pagination";
import { productsData } from "../../data/products";

interface ProductsCatalogProps {
  onOpenInquiry: (productName?: string) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [selectedProduct, setSelectedProduct] = useState<(typeof productsData)[0] | null>(null);

  const categories = [
    "All",
    "Special Purpose Machines",
    "CNC Machines",
    "VMC Machines",
    "Machine Parts",
    "Automation Solutions",
    "Accessories",
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-[#071526] text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#3A6EA5] dark:text-[#60A5FA] mb-2">
            <span className="h-px w-6 bg-[#F57C00]" />
            <span>FULL PRODUCT CATALOG (100 ITEMS)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Comprehensive Machine & Component Systems
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            From complete Special Purpose Machines (SPMs) and VMCs to precision linear tooling and
            automation accessories.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Icon name="search" size={16} />
              </span>
              <input
                type="text"
                placeholder="Search products by name, SKU, or specs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-[#3A6EA5]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <Icon name="close" size={14} />
                </button>
              )}
            </div>

            {/* Total Results */}
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Showing <span className="text-[#F57C00]">{filteredProducts.length}</span> of 100
              products
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#0B1F3A] dark:bg-[#3A6EA5] text-white"
                    : "bg-white dark:bg-[#071526] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden flex flex-col hover:border-[#3A6EA5] hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="size-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0B1F3A]/90 text-white text-[9px] font-black uppercase tracking-wider rounded-xs border border-slate-700">
                    {prod.category}
                  </span>
                  <span className="absolute bottom-2 left-2 text-white font-black text-xs">
                    {formatPrice(prod.price)}
                  </span>
                  <span className="absolute bottom-2 right-2 text-[9px] text-slate-300 font-mono">
                    {prod.sku}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1F3A] dark:text-white line-clamp-1 mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {prod.description}
                    </p>

                    <div className="text-[10px] space-y-1 py-2 border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {prod.specifications.spindleSpeed}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {prod.specifications.accuracyPositioning}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 mt-auto flex items-center gap-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors text-center"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onOpenInquiry(prod.name)}
                      className="px-3 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
                      title="Send Instant RFQ"
                    >
                      <Icon name="cart" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm">
            <Icon name="search" size={32} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold text-slate-700 dark:text-white">
              No products found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Try searching for "VMC", "CNC", "SPM", "Spindle", or clear your category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-[#3A6EA5] text-white text-xs font-bold rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={filteredProducts.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <Modal
            isOpen={Boolean(selectedProduct)}
            onClose={() => setSelectedProduct(null)}
            title={selectedProduct.name}
            subtitle={`SKU: ${selectedProduct.sku} · Category: ${selectedProduct.category}`}
            maxWidth="3xl"
            footer={
              <>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = selectedProduct.name;
                    setSelectedProduct(null);
                    onOpenInquiry(name);
                  }}
                  className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
                >
                  Inquire For Quotation
                </button>
              </>
            }
          >
            <div className="space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full sm:w-60 h-44 object-cover rounded-sm border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="text-xl font-black text-[#F57C00]">
                    {formatPrice(selectedProduct.price)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-xs">
                      Brand: {selectedProduct.brand}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-xs">
                      Type: {selectedProduct.machineType}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xs">
                      Stock: {selectedProduct.stock} Units Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B1F3A] dark:text-white mb-2">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-2.5 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs"
                    >
                      <div className="text-[10px] font-bold uppercase text-slate-400">
                        {key.replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B1F3A] dark:text-white mb-2">
                  Engineered Features
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="check" size={14} className="text-[#22C55E] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Applications */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B1F3A] dark:text-white mb-2">
                  Target Applications
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedProduct.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon
                        name="arrow-right"
                        size={13}
                        className="text-[#F57C00] mt-0.5 shrink-0"
                      />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};
