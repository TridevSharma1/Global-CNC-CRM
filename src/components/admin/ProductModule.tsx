import React, { useState, useMemo } from "react";
import { Icon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { Pagination } from "../common/Pagination";
import { Modal } from "../common/Modal";
import { productsData } from "../../data/products";

export const ProductModule: React.FC = () => {
  const [products, setProducts] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedProd, setSelectedProd] = useState<(typeof productsData)[0] | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const [formProd, setFormProd] = useState({
    id: 0,
    name: "",
    category: "Special Purpose Machines",
    brand: "Global CNC Apex",
    machineType: "Custom SPM",
    price: 4500000,
    stock: 2,
    minStock: 1,
    description: "",
  });

  const categories = [
    "All",
    "Special Purpose Machines",
    "CNC Machines",
    "VMC Machines",
    "Machine Parts",
    "Automation Solutions",
    "Accessories",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const handleOpenCreate = () => {
    setFormProd({
      id: 0,
      name: "",
      category: "Special Purpose Machines",
      brand: "Global CNC Apex",
      machineType: "Custom SPM",
      price: 4500000,
      stock: 2,
      minStock: 1,
      description: "High rigidity industrial manufacturing system engineered in Pune.",
    });
    setModalMode("create");
  };

  const handleOpenEdit = (p: (typeof productsData)[0]) => {
    setFormProd({
      id: p.id,
      name: p.name,
      category: p.category,
      brand: p.brand,
      machineType: p.machineType,
      price: p.price,
      stock: p.stock,
      minStock: p.minStock,
      description: p.description,
    });
    setModalMode("edit");
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "create") {
      const nextId = Math.max(...products.map((p) => p.id), 0) + 1;
      const sku = `GC-${formProd.category.slice(0, 3).toUpperCase()}-${String(nextId).padStart(4, "0")}`;
      const stock = Number(formProd.stock) || 1;
      const minStock = Number(formProd.minStock) || 1;

      const created = {
        id: nextId,
        sku,
        name: formProd.name,
        category: formProd.category,
        brand: formProd.brand,
        machineType: formProd.machineType,
        price: Number(formProd.price) || 100000,
        stock,
        minStock,
        status: stock === 0 ? "Out of Stock" : stock <= minStock ? "Low Stock" : "In Stock",
        image: "/global-cnc-factory.png",
        description: formProd.description,
        features: [
          "Heavy cast Meehanite machine bed",
          "Class C3 precision ball screws",
          "Siemens 828D / FANUC CNC control",
        ],
        applications: ["Automotive and defense precision component manufacturing"],
        specifications: {
          spindleSpeed: "10,000 RPM",
          travelXYZ: "850 x 500 x 550 mm",
          rapidFeed: "36 m/min",
          spindleMotorPower: "15 kW",
          toolCapacity: "24 Tools",
          accuracyPositioning: "±0.005 mm",
          repeatability: "±0.003 mm",
          controller: "Siemens 828D",
        },
      };

      setProducts([created, ...products]);
      showToast(`Product ${created.name} added to catalog.`);
    } else {
      setProducts(
        products.map((p) =>
          p.id === formProd.id
            ? {
                ...p,
                name: formProd.name,
                category: formProd.category,
                brand: formProd.brand,
                machineType: formProd.machineType,
                price: Number(formProd.price),
                stock: Number(formProd.stock),
                minStock: Number(formProd.minStock),
                description: formProd.description,
                status:
                  Number(formProd.stock) === 0
                    ? "Out of Stock"
                    : Number(formProd.stock) <= Number(formProd.minStock)
                      ? "Low Stock"
                      : "In Stock",
              }
            : p,
        ),
      );
      showToast(`Product updated successfully.`);
    }
    setModalMode(null);
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Delete product ${name}?`)) {
      setProducts(products.filter((p) => p.id !== id));
      showToast(`Product ${name} removed.`);
      if (selectedProd?.id === id) setSelectedProd(null);
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
            Product & Machine Catalog (100 SKUs)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full management of Special Purpose Machines (SPMs), VMCs, turning centers,
            sub-assemblies, and spares.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Exporting Product Catalog to CSV...")}
            className="px-3 py-2 bg-white dark:bg-[#0B1F3A] border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-sm flex items-center gap-1.5"
          >
            <Icon name="download" size={14} />
            <span>Export Catalog</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total SKUs</span>
          <div className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
            {products.length} Products
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">In Stock (Stores)</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {products.filter((p) => p.status === "In Stock").length} SKUs
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Low Stock Alert</span>
          <div className="text-xl font-black text-[#F57C00] mt-1">
            {products.filter((p) => p.status === "Low Stock").length} SKUs
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 p-4 rounded-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Machine Platforms</span>
          <div className="text-xl font-black text-[#3A6EA5] dark:text-[#60A5FA] mt-1">
            SPM · VMC · CNC
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
            placeholder="Search by SKU, product name, or brand..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white outline-none focus:border-[#3A6EA5]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-8 px-2.5 text-xs bg-slate-50 dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-slate-700 dark:text-slate-300 outline-none max-w-xs"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-4 py-3">SKU Code</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Brand & Series</th>
                <th className="px-4 py-3 text-right">Base Price (₹)</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedProducts.map((prod) => (
                <tr
                  key={prod.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[#3A6EA5] dark:text-[#60A5FA]">
                    <button
                      onClick={() => setSelectedProd(prod)}
                      className="hover:underline text-left"
                    >
                      {prod.sku}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white max-w-[220px] truncate">
                    <button
                      onClick={() => setSelectedProd(prod)}
                      className="hover:text-[#F57C00] text-left"
                    >
                      {prod.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{prod.category}</td>
                  <td className="px-4 py-3 text-slate-500">{prod.brand}</td>
                  <td className="px-4 py-3 font-mono font-bold text-right text-slate-800 dark:text-white">
                    {formatPrice(prod.price)}
                  </td>
                  <td className="px-4 py-3 text-center font-bold">
                    <span
                      className={
                        prod.stock <= prod.minStock
                          ? "text-[#F57C00] font-black"
                          : "text-slate-700 dark:text-slate-300"
                      }
                    >
                      {prod.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={prod.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedProd(prod)}
                        className="p-1.5 text-slate-500 hover:text-[#3A6EA5] rounded-xs"
                        title="View Specs"
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 text-slate-500 hover:text-[#F57C00] rounded-xs"
                        title="Edit Product"
                      >
                        <Icon name="edit" size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-xs"
                        title="Delete Product"
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
          totalRecords={filteredProducts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* View Product Specs Modal */}
      {selectedProd && (
        <Modal
          isOpen={Boolean(selectedProd)}
          onClose={() => setSelectedProd(null)}
          title={selectedProd.name}
          subtitle={`SKU: ${selectedProd.sku} · Category: ${selectedProd.category}`}
          maxWidth="2xl"
          footer={
            <button
              onClick={() => setSelectedProd(null)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-sm hover:bg-slate-100"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Base Price</span>
                <p className="text-base font-black text-[#F57C00]">
                  {formatPrice(selectedProd.price)}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Stock Count</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedProd.stock} Units
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Safety Min Stock
                </span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {selectedProd.minStock} Units
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Brand</span>
                <p className="font-semibold text-slate-800 dark:text-white">{selectedProd.brand}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">
                  Machine Platform
                </span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {selectedProd.machineType}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Controller</span>
                <p className="font-bold text-[#F57C00]">{selectedProd.specifications.controller}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Description</span>
              <p className="p-2.5 bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 rounded-xs mt-1 text-slate-700 dark:text-slate-200">
                {selectedProd.description}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">
                Technical Specifications
              </span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {Object.entries(selectedProd.specifications).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-2 bg-slate-50 dark:bg-[#071526] border border-slate-200 dark:border-slate-800 rounded-xs"
                  >
                    <span className="text-[10px] text-slate-400 uppercase">
                      {k.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <p className="font-bold text-slate-800 dark:text-white truncate">{String(v)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create / Edit Modal */}
      {modalMode && (
        <Modal
          isOpen={Boolean(modalMode)}
          onClose={() => setModalMode(null)}
          title={modalMode === "create" ? "Add New Product SKU" : "Edit Machine Product"}
          subtitle="Configure machine parameters, pricing, and safety stock levels"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Product Name *
              <input
                type="text"
                required
                value={formProd.name}
                onChange={(e) => setFormProd({ ...formProd, name: e.target.value })}
                placeholder="e.g. GCV-850 Heavy Duty VMC"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Category *
                <select
                  value={formProd.category}
                  onChange={(e) => setFormProd({ ...formProd, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Base Price (₹) *
                <input
                  type="number"
                  min="1000"
                  required
                  value={formProd.price}
                  onChange={(e) => setFormProd({ ...formProd, price: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Current Stock
                <input
                  type="number"
                  min="0"
                  required
                  value={formProd.stock}
                  onChange={(e) => setFormProd({ ...formProd, stock: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Safety Min Stock
                <input
                  type="number"
                  min="1"
                  required
                  value={formProd.minStock}
                  onChange={(e) => setFormProd({ ...formProd, minStock: Number(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Brand
                <input
                  type="text"
                  value={formProd.brand}
                  onChange={(e) => setFormProd({ ...formProd, brand: e.target.value })}
                  className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
                />
              </label>
            </div>

            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Description
              <textarea
                rows={2}
                value={formProd.description}
                onChange={(e) => setFormProd({ ...formProd, description: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-[#071526] border border-slate-300 dark:border-slate-700 rounded-sm text-xs outline-none focus:border-[#3A6EA5]"
              />
            </label>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-sm hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                {modalMode === "create" ? "Add to Catalog" : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
