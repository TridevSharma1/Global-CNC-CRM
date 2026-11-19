import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "src", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. Company Information
export const companyInfo = {
  clientName: "Shailesh Bhor",
  companyName: "Global CNC Pvt. Ltd.",
  shortName: "Global CNC",
  tagline: "Precision, engineered for industrial excellence",
  businessType: [
    "Special Purpose Machines (SPMs)",
    "CNC Machines",
    "VMC Machines",
    "CNC Machine Parts",
    "Industrial Automation Machines",
    "Machine Components Manufacturing",
  ],
  address: {
    building: "Gera's Imperium Gateway, C442",
    street: "Old Mumbai Road",
    landmark: "Near Bhosari Metro Station, Bhosari",
    city: "Pune",
    subdistrict: "Pimpri-Chinchwad",
    state: "Maharashtra",
    pincode: "411034",
    full: "Gera's Imperium Gateway, C442, Old Mumbai Road, Near Bhosari Metro Station, Bhosari, Pune, Pimpri-Chinchwad, Maharashtra 411034",
  },
  phone: "+91 80876 96166",
  email: "deventerprises1016@gmail.com",
  gstNumber: "27AABCG8921F1ZX",
  cinNumber: "U29299PN2014PTC152341",
  establishedYear: 2014,
  plantArea: "45,000 sq. ft. State-of-the-Art Machining & Assembly Hub",
  workforce: "150+ Engineers, CNC Programmers & Quality Specialists",
  installedMachines: "950+ Machines running across India and international markets",
  certifications: [
    "ISO 9001:2015",
    "CE Compliant",
    "ZED Gold Certified",
    "Defense Supplier Verified",
  ],
};

// Helper random generator with fixed seed
let seed = 42;
function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
function pick(arr) {
  return arr[Math.floor(random() * arr.length)];
}
function randInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

// 2. 100 Products
const productCategories = [
  "Special Purpose Machines",
  "CNC Machines",
  "VMC Machines",
  "Machine Parts",
  "Automation Solutions",
  "Accessories",
];

const brands = [
  "Global CNC Apex",
  "Global CNC ProLine",
  "Global CNC MasterTurn",
  "Global CNC RoboCell",
  "Global Precision",
];

const productTemplates = [
  {
    name: "GCV-850 Heavy Duty Vertical Machining Centre",
    category: "VMC Machines",
    basePrice: 4200000,
    desc: "High-rigidity 3-axis VMC with BT-40/50 spindle, rapid 36m/min traverse and direct drive spindle.",
  },
  {
    name: "GCV-1060 High Speed VMC",
    category: "VMC Machines",
    basePrice: 5100000,
    desc: "Precision vertical machining centre for mould, die and automotive precision components.",
  },
  {
    name: "GCV-1270 Large Bed Machining Centre",
    category: "VMC Machines",
    basePrice: 6800000,
    desc: "Heavy box-way vertical machining centre engineered for tough aerospace alloys and heavy blocks.",
  },
  {
    name: "GCV-500 Compact High Speed VMC",
    category: "VMC Machines",
    basePrice: 3200000,
    desc: "Fast tapping and drilling center for small precision parts with 24-pocket automatic tool changer.",
  },
  {
    name: "GCL-200 CNC Turning Centre",
    category: "CNC Machines",
    basePrice: 2450000,
    desc: "Precision CNC slant-bed lathe with 8-station hydraulic turret and 5000 RPM spindle.",
  },
  {
    name: "GCL-300 Heavy Duty CNC Lathe",
    category: "CNC Machines",
    basePrice: 3400000,
    desc: "Rugged CNC lathe for automotive shafts, flanges, and gear blanks.",
  },
  {
    name: "GCL-450 Large Bore Turning Centre",
    category: "CNC Machines",
    basePrice: 4800000,
    desc: "Large bore CNC turning solution for heavy oil & gas and heavy engineering cylindrical turning.",
  },
  {
    name: "GCL-Twin Dual Spindle CNC Lathe",
    category: "CNC Machines",
    basePrice: 5800000,
    desc: "Opposed twin spindle CNC turning centre with driven tooling for complete part machining.",
  },
  {
    name: "GSP-200 Twin Spindle Brake Drum SPM",
    category: "Special Purpose Machines",
    basePrice: 7200000,
    desc: "Custom SPM for simultaneous dual-station boring, chamfering and facing of brake drums.",
  },
  {
    name: "GSP-400 Cylinder Block Multi-Spindle SPM",
    category: "Special Purpose Machines",
    basePrice: 9500000,
    desc: "High-output multi-station SPM with 16 spindles for automotive cylinder block drilling and reaming.",
  },
  {
    name: "GSP-350 Steering Knuckle Milling SPM",
    category: "Special Purpose Machines",
    basePrice: 6400000,
    desc: "Specialized 4-station rotary indexing SPM engineered for suspension knuckle machining.",
  },
  {
    name: "GSP-550 Differential Case SPM",
    category: "Special Purpose Machines",
    basePrice: 8900000,
    desc: "Dedicated SPM for precision spherical turning and oil hole drilling in EV differentials.",
  },
  {
    name: "GFA-6 Axis Robotic Machine Tending Cell",
    category: "Automation Solutions",
    basePrice: 3800000,
    desc: "Turnkey robotic loading/unloading system with optical vision inspection and auto-rejection.",
  },
  {
    name: "GFA-Gantry High Speed Loader",
    category: "Automation Solutions",
    basePrice: 2900000,
    desc: "Dual-arm overhead CNC gantry loader reducing cycle idle time to under 4 seconds.",
  },
  {
    name: "GFA-Auto Pallet Shuttle System",
    category: "Automation Solutions",
    basePrice: 3200000,
    desc: "Flexible modular pallet storage and interchange cell for continuous 24/7 machining.",
  },
  {
    name: "GFA-Rotary Indexing Transfer Line",
    category: "Automation Solutions",
    basePrice: 8400000,
    desc: "Hydraulic high-precision 8-station rotary indexing table with pneumatic part clamping.",
  },
  {
    name: "High Precision Spindle Assembly BT-40",
    category: "Machine Parts",
    basePrice: 185000,
    desc: "Dynamically balanced cartridge spindle with NSK angular contact bearings up to 12,000 RPM.",
  },
  {
    name: "Hardened Slant Bed Turret 12-Station",
    category: "Machine Parts",
    basePrice: 340000,
    desc: "Fast indexing hydraulic turret with curvic coupling locking accuracy within 0.003mm.",
  },
  {
    name: "Heavy Duty Tailstock Hydraulic Unit",
    category: "Machine Parts",
    basePrice: 120000,
    desc: "Programmable hydraulic quill tailstock with integrated MT-4 taper live center.",
  },
  {
    name: "C3 Grade Ball Screw & Linear Guide Set",
    category: "Machine Parts",
    basePrice: 95000,
    desc: "Precision ground ball screws with double-nut preloading and hardened roller guideways.",
  },
  {
    name: "High Pressure Through-Spindle Coolant Unit",
    category: "Accessories",
    basePrice: 165000,
    desc: "70-bar high pressure CTS filtration system with duplex bag filters and cyclonic separation.",
  },
  {
    name: "Automatic Chip Conveyor Hinged Belt",
    category: "Accessories",
    basePrice: 110000,
    desc: "Heavy-duty steel hinged belt chip conveyor with auto-reverse and integrated coolant basin.",
  },
  {
    name: "Rotary 4th Axis CNC Table 250mm",
    category: "Accessories",
    basePrice: 420000,
    desc: "Direct-drive pneumatic clamp 4th axis rotary table with optical encoder 0.001 deg feedback.",
  },
  {
    name: "Wireless Tool Setter & Workpiece Probe",
    category: "Accessories",
    basePrice: 210000,
    desc: "Optical transmission workpiece touch probe and automatic laser broken tool detector.",
  },
];

const products = [];
for (let i = 1; i <= 100; i++) {
  const tmpl = productTemplates[(i - 1) % productTemplates.length];
  const cat = tmpl.category;
  const brand = brands[(i - 1) % brands.length];
  const sku = `GC-${cat.slice(0, 3).toUpperCase()}-${String(i).padStart(4, "0")}`;
  const price = tmpl.basePrice + randInt(0, 15) * 25000;
  const stock = cat === "Machine Parts" || cat === "Accessories" ? randInt(5, 45) : randInt(1, 8);
  const minStock = cat === "Machine Parts" ? 6 : 2;

  products.push({
    id: i,
    sku,
    name:
      i <= productTemplates.length
        ? tmpl.name
        : `${tmpl.name} (Gen-${Math.floor(i / productTemplates.length) + 1})`,
    category: cat,
    brand,
    machineType:
      cat === "VMC Machines"
        ? "Vertical Machining"
        : cat === "CNC Machines"
          ? "Slant-Bed CNC"
          : cat === "Special Purpose Machines"
            ? "Custom SPM"
            : cat === "Automation Solutions"
              ? "Robotic Cell"
              : "Sub-Assembly & Spares",
    price,
    stock,
    minStock,
    status: stock === 0 ? "Out of Stock" : stock <= minStock ? "Low Stock" : "In Stock",
    image: "/global-cnc-factory.png",
    description: tmpl.desc,
    features: [
      "High grade Meehanite cast iron frame, stress relieved for lifetime stability",
      "Class C3 precision preloaded ball screws on all linear axes",
      "Direct-coupled digital servo motors for zero backlash",
      "Advanced central lubrication system with pressure monitoring",
      "Full CE compliant enclosure with interlocked safety glass",
    ],
    applications: [
      "Automotive engine, transmission & brake component machining",
      "Aerospace structural brackets and actuator housings",
      "Defense armament components and precision ordnance",
      "Industrial pump bodies, valves and hydraulic blocks",
    ],
    specifications: {
      spindleSpeed: cat.includes("VMC")
        ? "10,000 / 12,000 RPM"
        : cat.includes("CNC")
          ? "4,500 / 6,000 RPM"
          : "Synchronous Multi-Head",
      travelXYZ: cat.includes("VMC")
        ? `${800 + (i % 5) * 100} x ${500 + (i % 3) * 50} x ${550 + (i % 4) * 50} mm`
        : "X: 240mm, Z: 580mm",
      rapidFeed: "36 / 36 / 30 m/min",
      spindleMotorPower: `${11 + (i % 6) * 3.7} kW / Fanuc Alpha i Series`,
      toolCapacity: cat.includes("VMC") ? "24 Tools Arm-Type ATC" : "12 Station Hydraulic Turret",
      accuracyPositioning: "±0.005 mm",
      repeatability: "±0.003 mm",
      controller: "Siemens 828D / FANUC 0i-MF Plus",
    },
  });
}

// 3. 50 Customers
const customerCompanies = [
  "Tata Motors Ltd. (CVBU)",
  "Bharat Forge Ltd.",
  "Bajaj Auto Ltd.",
  "Mahindra & Mahindra Ltd.",
  "Kirloskar Oil Engines Ltd.",
  "Godrej & Boyce Aerospace",
  "Larsen & Toubro Heavy Engg.",
  "Cummins India Ltd.",
  "Thermax Ltd.",
  "Pinnacle Industries",
  "Kalyani Maxion Wheels",
  "Motherson Sumi Systems",
  "Endurance Technologies",
  "Varroc Engineering",
  "Force Motors Ltd.",
  "Bosch Chassis Systems India",
  "Lucas TVS Ltd.",
  "ZF Commercial Vehicle Control",
  "Brembo Brake India",
  "Pricol Limited",
  "Wheels India Ltd.",
  "Rane Madras Ltd.",
  "Gabriel India Ltd.",
  "Subros Limited",
  "Spark Minda Corp.",
  "Talbros Automotive",
  "Suprajit Engineering",
  "Sona BLW Precision",
  "SKF India Bearings",
  "Timken India Ltd.",
  "Schaeffler India Ltd.",
  "Craftsman Automation",
  "Sundram Fasteners",
  "Jayahind Industries",
  "Ring Aqua Systems",
  "Flash Electronics India",
  "Sanok India Precision",
  "Advik Hi-Tech",
  "Minda Corporation Ltd.",
  "Cooper Corporation",
  "Premier Seals India",
  "Dhoot Transmission",
  "Paranjape Autocast",
  "KSPG Automotive India",
  "Menon Pistons Ltd.",
  "Kalyani Steels Ltd.",
  "Precision Camshafts Ltd.",
  "Nirlep Machining Pune",
  "Gestamp Automotive Pune",
  "Brose India Automotive",
];

const maharashtraCities = [
  "Pune",
  "Pimpri-Chinchwad",
  "Chakan",
  "Bhosari",
  "Talegaon",
  "Aurangabad",
  "Nashik",
  "Kolhapur",
  "Nagpur",
  "Mumbai",
  "Chennai",
  "Bengaluru",
  "Ahmedabad",
  "Sanand",
  "Manesar",
];

const firstNames = [
  "Rajesh",
  "Sanjay",
  "Vikram",
  "Amit",
  "Anand",
  "Pradeep",
  "Sunil",
  "Nitin",
  "Ramesh",
  "Mahesh",
  "Ganesh",
  "Sachin",
  "Pravin",
  "Milind",
  "Ashok",
  "Kishore",
  "Sudhir",
  "Vivek",
  "Deepak",
  "Arun",
];
const lastNames = [
  "Patil",
  "Kulkarni",
  "Joshi",
  "Deshmukh",
  "Shinde",
  "Pawar",
  "More",
  "Chavan",
  "Bhosale",
  "Jadhav",
  "Kadam",
  "Gaikwad",
  "Sawant",
  "Suryavanshi",
  "Mohite",
  "Salunkhe",
  "Thorat",
  "Bhor",
  "Gholap",
  "Wagh",
];

const customers = [];
for (let i = 1; i <= 50; i++) {
  const company = customerCompanies[i - 1];
  const city = pick(maharashtraCities);
  const contact = `${pick(firstNames)} ${pick(lastNames)}`;
  const cleanEmail = `purchase.${contact.toLowerCase().replace(" ", ".")}@${company
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 14)}.co.in`;
  const phone = `+91 ${pick(["98", "99", "97", "94", "88"])}${randInt(10000000, 99999999)}`;
  const outstanding = randInt(0, 25) * 85000;
  const creditLimit = randInt(5, 40) * 500000;

  customers.push({
    id: i,
    code: `CUS-${String(i).padStart(4, "0")}`,
    name: company,
    contactPerson: contact,
    designation: pick([
      "Head of Procurement",
      "DGM - Capital Purchase",
      "Plant Head",
      "Tooling Manager",
      "VP - Manufacturing Engineering",
      "Chief Sourcing Officer",
    ]),
    email: cleanEmail,
    phone,
    city,
    state: ["Chennai", "Bengaluru", "Ahmedabad", "Sanand", "Manesar"].includes(city)
      ? city === "Chennai"
        ? "Tamil Nadu"
        : city === "Bengaluru"
          ? "Karnataka"
          : city === "Manesar"
            ? "Haryana"
            : "Gujarat"
      : "Maharashtra",
    address: `Plot No. ${randInt(10, 320)}, Phase ${randInt(1, 4)}, MIDC Industrial Area, ${city}`,
    gstNumber: `27AABC${randInt(1000, 9999)}A1Z${randInt(1, 9)}`,
    pan: `AABC${randInt(1000, 9999)}A`,
    industry: pick([
      "Automotive",
      "Defense & Aerospace",
      "Heavy Engineering",
      "Medical Devices",
      "Agricultural Equipment",
      "Precision Components",
    ]),
    outstanding,
    creditLimit,
    salesHistoryCount: randInt(2, 14),
    status: pick(["Active", "Active", "Active", "Preferred", "On Review"]),
    rating: (3.8 + random() * 1.2).toFixed(1),
    notes:
      "Long-standing relationship. High-precision tooling client with regular SPM & CNC orders.",
  });
}

// 4. 40 Suppliers
const supplierList = [
  "Siemens India Drives & Motion",
  "FANUC India CNC Systems",
  "THK India Linear Systems",
  "NSK Bearings India Pvt Ltd",
  "FAG / Schaeffler Bearings",
  "Rexroth Bosch Hydraulics",
  "Yuken India Hydraulics Ltd",
  "SMC Pneumatics India",
  "Festo Controls Pvt Ltd",
  "Sandvik Coromant Cutting Tools",
  "Kennametal India Ltd",
  "TaeguTec India Tools",
  "Iscar Precision Tooling",
  "Renishaw Metrology India",
  "Mitutoyo South Asia Metrology",
  "Lapp Cables India",
  "Schneider Electric Automation",
  "L&T Switchgear Pune",
  "Mukand Special Steels Ltd",
  "Kalyani Steels Alloy Bars",
  "JSW Steel Structural Billets",
  "Bharat Heavy Castings Bhosari",
  "Modern Foundry Chakan",
  "Vijay Castings Sangli",
  "Apex Fluid Systems Pune",
  "Dynaspede Drives Hosur",
  "Delta Electronics Automation",
  "Hiwin Linear Technologies",
  "Yaskawa India Robotics",
  "ABB India Industrial Automation",
  "Haimer Tool Holders India",
  "Rohi Chucks & Fixtures",
  "Widia Tooling Products",
  "Sumitomo Electric Hardmetal",
  "Mitsubishi Electric CNC",
  "Kirloskar Pneumatic Compressors",
  "Elgi Compressors Pune",
  "Castrol Industrial Lubricants",
  "Fuchs Lubricants India",
  "Motul Industrial Fluids",
];

const suppliers = [];
for (let i = 1; i <= 40; i++) {
  const name = supplierList[i - 1];
  const city = pick([
    "Pune",
    "Bhosari",
    "Chakan",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Gurgaon",
    "Coimbatore",
  ]);
  const contact = `${pick(firstNames)} ${pick(lastNames)}`;
  const cleanEmail = `sales.${contact.toLowerCase().replace(" ", ".")}@${name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 12)}.com`;
  const category = pick([
    "CNC Controllers & Drives",
    "Linear Motion & Bearings",
    "Hydraulics & Pneumatics",
    "Cutting Tools & Holders",
    "Raw Steels & Castings",
    "Electricals & Enclosures",
    "Lubricants & Coolants",
  ]);
  const outstanding = randInt(0, 15) * 60000;

  suppliers.push({
    id: i,
    code: `SUP-${String(i).padStart(4, "0")}`,
    name,
    category,
    contactPerson: contact,
    designation: pick([
      "Key Account Manager",
      "Technical Sales Lead",
      "Regional Manager",
      "General Manager Sales",
    ]),
    email: cleanEmail,
    phone: `+91 ${pick(["98", "99", "91", "93", "84"])}${randInt(10000000, 99999999)}`,
    city,
    state:
      city === "Bengaluru"
        ? "Karnataka"
        : city === "Chennai" || city === "Coimbatore"
          ? "Tamil Nadu"
          : city === "Gurgaon"
            ? "Haryana"
            : "Maharashtra",
    address: `Gala No. ${randInt(4, 90)}, Industrial Estate, Sector ${randInt(2, 18)}, ${city}`,
    gstNumber: `27AAEC${randInt(1000, 9999)}B1Z${randInt(1, 9)}`,
    outstanding,
    paymentTerms: pick([
      "Net 30 Days",
      "Net 45 Days",
      "Net 60 Days",
      "25% Advance, Balance on Dispatch",
    ]),
    rating: (4.0 + random() * 1.0).toFixed(1),
    documents: ["GST Certificate", "MSME Certificate", "Vendor Audit Pass", "ISO 9001 Copy"],
    status: pick(["Active", "Active", "Active", "Preferred", "Verified"]),
  });
}

// 5. 100 Sales Orders
const sales = [];
for (let i = 1; i <= 100; i++) {
  const cust = customers[(i - 1) % customers.length];
  const prod = products[(i * 3) % products.length];
  const qty = randInt(1, 4);
  const baseAmt = prod.price * qty;
  const gst = Math.round(baseAmt * 0.18);
  const total = baseAmt + gst;
  const daysAgo = randInt(1, 180);
  const orderDate = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10);
  const status = pick([
    "Completed",
    "Completed",
    "In progress",
    "In progress",
    "Approved",
    "Pending Approval",
    "Dispatched",
  ]);
  const type = pick(["Sales Order", "Tax Invoice", "Quotation", "Proforma Invoice"]);

  sales.push({
    id: i,
    reference: `SO-2026-${String(i).padStart(4, "0")}`,
    invoiceNo: `INV-GC-${String(202600 + i)}`,
    customerId: cust.id,
    customerName: cust.name,
    productName: prod.name,
    category: prod.category,
    quantity: qty,
    unitPrice: prod.price,
    amount: baseAmt,
    gstAmount: gst,
    totalAmount: total,
    date: orderDate,
    deliveryDate: new Date(Date.now() - (daysAgo - randInt(15, 45)) * 86400000)
      .toISOString()
      .slice(0, 10),
    salesPerson: pick([
      "Aarav Kulkarni",
      "Priya Deshmukh",
      "Kunal Joshi",
      "Rohan Patil",
      "Ananya Shah",
    ]),
    status,
    paymentStatus:
      status === "Completed"
        ? "Fully Paid"
        : pick(["Partial Paid (50%)", "Advance Received", "Pending Payment"]),
    type,
    notes: `Engineered supply order for ${cust.industry} manufacturing application.`,
  });
}

// 6. 80 Purchases
const purchases = [];
for (let i = 1; i <= 80; i++) {
  const sup = suppliers[(i - 1) % suppliers.length];
  const amount = randInt(45, 950) * 10000;
  const gst = Math.round(amount * 0.18);
  const total = amount + gst;
  const daysAgo = randInt(2, 160);
  const pDate = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10);
  const status = pick(["Received", "Received", "Approved", "Pending Approval", "In Transit"]);

  purchases.push({
    id: i,
    reference: `PO-2026-${String(i).padStart(4, "0")}`,
    supplierId: sup.id,
    supplierName: sup.name,
    category: sup.category,
    itemDescription: `Batch of ${sup.category} components for assembly line #${randInt(1, 4)}`,
    amount,
    gstAmount: gst,
    totalAmount: total,
    date: pDate,
    expectedDelivery: new Date(Date.now() - (daysAgo - 12) * 86400000).toISOString().slice(0, 10),
    approvedBy: "Shailesh Bhor (Director)",
    status,
    paymentStatus: status === "Received" ? "Paid" : pick(["Partial Paid", "Pending On Bill"]),
    warehouse: pick([
      "Bhosari Central Warehouse A1",
      "Bhosari Component Store B3",
      "Pune Machine Depot",
    ]),
  });
}

// 7. 50 Expenses
const expenseCategories = [
  "Factory Utilities & Power",
  "Tooling & Consumables",
  "Freight, Shipping & Logistics",
  "Machine Commissioning & Travel",
  "Workshop Maintenance & Upkeep",
  "R&D and Machine Prototyping",
  "Employee Training & Safety PPE",
  "Office Administration & Compliance",
];

const expenses = [];
for (let i = 1; i <= 50; i++) {
  const cat = pick(expenseCategories);
  const amount = randInt(12, 380) * 1000;
  const daysAgo = randInt(1, 120);
  const expDate = new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10);

  expenses.push({
    id: i,
    reference: `EXP-2026-${String(i).padStart(4, "0")}`,
    title: `${cat} - Voucher #${randInt(100, 999)}`,
    category: cat,
    amount,
    date: expDate,
    recordedBy: pick([
      "Neha Bhosale (Accounts)",
      "Saurabh Kulkarni (Finance)",
      "Kunal Joshi (Operations)",
    ]),
    approvedBy: "Shailesh Bhor",
    status: pick(["Approved", "Approved", "Approved", "Pending Approval", "Review"]),
    isRecurring: [true, false, false][i % 3],
    paymentMethod: pick(["NEFT Bank Transfer", "Corporate Credit Card", "Cheque", "UPI Corporate"]),
    notes: "Audited expenditure backed by GST invoice and work receipt voucher.",
  });
}

// 8. 20 Employees
const employeeList = [
  {
    name: "Shailesh Bhor",
    dept: "Executive Management",
    desig: "Managing Director & CEO",
    salary: 350000,
    perf: 98,
  },
  {
    name: "Aarav Kulkarni",
    dept: "Engineering",
    desig: "Head of Mechanical SPM Design",
    salary: 145000,
    perf: 94,
  },
  {
    name: "Priya Deshmukh",
    dept: "Production",
    desig: "Senior CNC Operations Manager",
    salary: 135000,
    perf: 92,
  },
  {
    name: "Rohan Patil",
    dept: "Production",
    desig: "Lead CNC Programmer & Tool Path Expert",
    salary: 95000,
    perf: 89,
  },
  {
    name: "Ananya Shah",
    dept: "Sales",
    desig: "Senior Manager - Strategic Machine Sales",
    salary: 120000,
    perf: 95,
  },
  {
    name: "Kunal Joshi",
    dept: "Production",
    desig: "Shop Floor Assembly Superintendent",
    salary: 88000,
    perf: 90,
  },
  {
    name: "Meera Nair",
    dept: "Quality",
    desig: "Lead Quality & Metrology Inspector (CMM)",
    salary: 82000,
    perf: 93,
  },
  {
    name: "Siddharth Rao",
    dept: "Engineering",
    desig: "Senior Electrical & PLC Automation Lead",
    salary: 110000,
    perf: 91,
  },
  {
    name: "Isha Mehta",
    dept: "Engineering",
    desig: "Robotics & Vision Integration Engineer",
    salary: 92000,
    perf: 88,
  },
  {
    name: "Vikram Pawar",
    dept: "Service",
    desig: "Senior Field Commissioning Engineer",
    salary: 78000,
    perf: 87,
  },
  {
    name: "Neha Bhosale",
    dept: "Finance",
    desig: "Accounts & Commercial Finance Manager",
    salary: 95000,
    perf: 96,
  },
  {
    name: "Arjun More",
    dept: "Service",
    desig: "Field Service Specialist - VMC & Turning",
    salary: 72000,
    perf: 86,
  },
  {
    name: "Kavita Jadhav",
    dept: "Quality",
    desig: "Senior QA / QC Standards Engineer",
    salary: 68000,
    perf: 90,
  },
  {
    name: "Dev Malhotra",
    dept: "Sales",
    desig: "Technical Proposals & Machine Quotations Lead",
    salary: 85000,
    perf: 89,
  },
  {
    name: "Sneha Iyer",
    dept: "Production",
    desig: "Tool Room Supervisor",
    salary: 75000,
    perf: 88,
  },
  {
    name: "Aditya Gokhale",
    dept: "Engineering",
    desig: "Hydraulics & Pneumatic Circuit Designer",
    salary: 84000,
    perf: 91,
  },
  {
    name: "Nisha Kapoor",
    dept: "Service",
    desig: "Customer Support & AMC Coordinator",
    salary: 65000,
    perf: 92,
  },
  {
    name: "Omkar Shinde",
    dept: "Production",
    desig: "Heavy Milling Machine Master Operator",
    salary: 58000,
    perf: 87,
  },
  {
    name: "Riya Sane",
    dept: "Finance",
    desig: "GST & Statutory Compliance Officer",
    salary: 62000,
    perf: 94,
  },
  {
    name: "Tanvi Kulkarni",
    dept: "HR & Admin",
    desig: "HR Manager & Factory Welfare Officer",
    salary: 78000,
    perf: 93,
  },
];

const employees = employeeList.map((emp, index) => ({
  id: index + 1,
  empCode: `EMP-GC-${String(index + 101)}`,
  name: emp.name,
  department: emp.dept,
  designation: emp.desig,
  email: `${emp.name.toLowerCase().replace(" ", ".")}@globalcnc.in`,
  phone: `+91 98${randInt(11000000, 99999999)}`,
  salary: emp.salary,
  joinDate: new Date(Date.now() - randInt(200, 2200) * 86400000).toISOString().slice(0, 10),
  attendancePercent: randInt(91, 99),
  leavesTaken: randInt(2, 9),
  performanceScore: emp.perf,
  status: "Active",
  shift: "General Day Shift (8:30 AM - 5:30 PM)",
  documents: [
    "Aadhaar Card",
    "PAN Card",
    "Degree Certificate",
    "Employment Agreement",
    "PF & ESI Card",
  ],
}));

// 9. 30 Leads
const leadCompanies = [
  "Varroc Polymers Pune",
  "Lumax Industries Chakan",
  "Endurance Technologies Aurangabad",
  "Jay Bharat Maruti Gurugram",
  "Mahindra CIE Automotive",
  "Tata Autocomp Systems",
  "Sharda Motor Industries",
  "Pricol Limited Coimbatore",
  "Brose India Automotive Hinjewadi",
  "Gedia India Automotive",
  "KSPG Automotive Pune",
  "Faurecia Emission Controls",
  "Benteler Automotive Pune",
  "Toyo Springs Ltd",
  "Rico Auto Industries",
  "Munjal Showa Ltd",
  "Gabriel India Parwanoo",
  "Suprajit Engineering Bengaluru",
  "Sansera Engineering Bengaluru",
  "Harita Seating Systems",
  "Badve Engineering Aurangabad",
  "Rockman Industries Ltd",
  "Subros Limited Noida",
  "Jay Ushin Ltd",
  "Spicer India Satara",
  "Sterling Tools Faridabad",
  "Amtek Auto Pune Unit",
  "Omax Autos Ltd",
  "JBM Group Pune",
  "Cooper Foundry Satara",
];

const leads = [];
for (let i = 1; i <= 30; i++) {
  const company = leadCompanies[i - 1];
  const contact = `${pick(firstNames)} ${pick(lastNames)}`;
  const budget = randInt(25, 160) * 100000;
  const daysAgo = randInt(1, 45);

  leads.push({
    id: i,
    leadCode: `LD-2026-${String(i).padStart(4, "0")}`,
    companyName: company,
    contactPerson: contact,
    designation: pick([
      "Head of Machining",
      "Plant Engineering Lead",
      "Capital Equipment Sourcing",
      "DGM Operations",
    ]),
    email: `procurement@${company
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 12)}.com`,
    phone: `+91 98${randInt(20000000, 89999999)}`,
    source: pick([
      "Website Inquiry",
      "Trade Show (IMTEX Pune)",
      "Customer Referral",
      "Direct Sales Call",
      "LinkedIn RFQ",
    ]),
    machineInterest: pick([
      "Custom 4-Station SPM for Brake Calipers",
      "High-Speed VMC 1060 with 4th Axis",
      "Twin-Spindle CNC Lathe with Gantry",
      "Automated Robotic Deburring & Inspection Cell",
      "Line Retrofit & High-Torque Spindle Upgrade",
    ]),
    estimatedBudget: budget,
    status: pick([
      "New Lead",
      "Technical Discussion",
      "Quotation Submitted",
      "In Negotiation",
      "Won / Converted",
      "Review",
    ]),
    probability: pick([20, 45, 60, 75, 85, 90]),
    nextFollowUp: new Date(Date.now() + randInt(1, 14) * 86400000).toISOString().slice(0, 10),
    assignedTo: pick(["Ananya Shah", "Dev Malhotra", "Aarav Kulkarni"]),
    createdDate: new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10),
  });
}

// 10. 25 Projects
const projectTitles = [
  "Turnkey Twin-Spindle SPM for Tata Motors Brake Carrier Line",
  "High-Speed VMC Cell for Bharat Forge Aerospace Turbine Fixtures",
  "Robotic Tending & Vision Inspection Cell for Bajaj Auto Crankshafts",
  "Automated 6-Station Rotary Transfer SPM for Cummins Injector Bodies",
  "Retrofit & Siemens CNC 828D Upgrade for Kirloskar Oil Engines Line 2",
  "Precision Camshaft Boring & Facing SPM for Mahindra Powertrain",
  "Differential Housing Dual-Spindle Turning Cell for Kalyani Maxion",
  "Medical Orthopedic Bone Plate VMC Machining Center for Helix Medical",
  "Heavy Armor Steel Milling SPM for Ordnance Factory Board / Defense",
  "EV Rotor Shaft Automation Gantry Loader for Brose India",
  "Steering Knuckle Multi-Head Drilling SPM for Rane Madras",
  "4th-Axis Impeller Machining Station for Kirloskar Brothers",
  "Aluminium Battery Enclosure Friction-Stir Welder & Trimmer SPM",
  "Cylinder Head Valve Guide Press & Reaming SPM for Force Motors",
  "Hydraulic Brake Master Cylinder Boring Cell for Brembo Brake",
  "Automated Gantry Unloader for 4-Machine CNC Turning Cluster",
  "High-Pressure CNC Deburring & Washing Machine for Endurance",
  "Transmission Gear Blank CNC Turning Line for Sona Comstar",
  "Custom Spindle Testing & Dynamic Balancing Rig for Global In-house",
  "Piston Ring Grooving High-Precision SPM for Menon Pistons",
  "Agricultural Tractor Axle Housing Milling SPM for Mahindra Swaraj",
  "Packaging Roller High-Finish Lathe for Nova Systems",
  "Subsea High-Pressure Valve Body VMC Cell for L&T Heavy Engg",
  "Deep Hole Gun Drilling SPM for Defense Ordnance Barrels",
  "Heavy Duty 5-Axis VMC Prototype for High-Strength Titanium Alloy",
];

const projects = [];
for (let i = 1; i <= 25; i++) {
  const title = projectTitles[i - 1];
  const budget = randInt(45, 240) * 100000;
  const spent = Math.round(budget * (0.3 + random() * 0.65));
  const progress = randInt(15, 98);
  const status =
    progress >= 95
      ? "Completed"
      : progress >= 70
        ? "Final Testing & Pre-Dispatch"
        : progress >= 40
          ? "Assembly & Wiring"
          : progress >= 20
            ? "Machining & Fabrication"
            : "Design & Engineering";

  projects.push({
    id: i,
    projectCode: `PRJ-GC-${String(i).padStart(4, "0")}`,
    name: title,
    clientName: customerCompanies[(i * 2) % customerCompanies.length],
    machineType: title.includes("SPM")
      ? "Special Purpose Machine"
      : title.includes("VMC")
        ? "Vertical Machining Centre"
        : title.includes("Robotic") || title.includes("Gantry")
          ? "Automation Solution"
          : "CNC Turning Centre",
    budget,
    spent,
    progress,
    startDate: new Date(Date.now() - randInt(40, 180) * 86400000).toISOString().slice(0, 10),
    deadline: new Date(Date.now() + randInt(10, 90) * 86400000).toISOString().slice(0, 10),
    status,
    leadEngineer: pick(["Aarav Kulkarni", "Siddharth Rao", "Isha Mehta", "Priya Deshmukh"]),
    assignedTeam: [
      "Mechanical Design",
      "PLC & Controls",
      "Hydraulics Team",
      "Assembly Lead",
      "Quality Metrology",
    ],
    deliverables: [
      "Design sign-off",
      "Casting inspection",
      "Base machining",
      "Spindle alignment",
      "Hydraulics integration",
      "Trial run testing",
    ],
  });
}

// 11. 30 Machines (Deployed Fleet)
const machineModels = [
  "GCV-850 VMC",
  "GCV-1060 VMC",
  "GCL-200 CNC Lathe",
  "GCL-300 Heavy Lathe",
  "GSP-200 Brake Drum SPM",
  "GSP-400 Multi-Spindle SPM",
  "GFA-6 Axis Robot Cell",
  "GFA-Gantry High Speed",
];

const machines = [];
for (let i = 1; i <= 30; i++) {
  const model = pick(machineModels);
  const client = customerCompanies[i % customerCompanies.length];
  const installDaysAgo = randInt(30, 900);
  const installDate = new Date(Date.now() - installDaysAgo * 86400000).toISOString().slice(0, 10);
  const warrantyDaysLeft = 365 - installDaysAgo;
  const amcStatus =
    warrantyDaysLeft > 0
      ? "Under OEM Warranty"
      : ["Active AMC Tier 1", "Active AMC Tier 2", "AMC Renewal Due"][i % 3];

  machines.push({
    id: i,
    serialNo: `GC-${2023 + (i % 4)}-${String(i + 1040)}`,
    modelName: model,
    category: model.includes("VMC")
      ? "VMC Machines"
      : model.includes("SPM")
        ? "Special Purpose Machines"
        : model.includes("CNC")
          ? "CNC Machines"
          : "Automation Solutions",
    clientName: client,
    location: `Plant #${randInt(1, 4)}, MIDC Bhosari / Chakan, Pune`,
    installationDate: installDate,
    warrantyExpiry: new Date(new Date(installDate).getTime() + 365 * 86400000)
      .toISOString()
      .slice(0, 10),
    amcStatus,
    lastServiceDate: new Date(Date.now() - randInt(5, 60) * 86400000).toISOString().slice(0, 10),
    nextServiceDue: new Date(Date.now() + randInt(10, 60) * 86400000).toISOString().slice(0, 10),
    operationalStatus: pick([
      "Operational",
      "Operational",
      "Operational",
      "Under Scheduled Maintenance",
      "Idle - Shift Change",
    ]),
    healthScore: randInt(88, 99),
    runningHours: randInt(1200, 18500),
    controllerType: pick([
      "Siemens SINUMERIK 828D",
      "FANUC Series 0i-MF Plus",
      "Mitsubishi M80",
      "Delta CNC-A",
    ]),
    spindleTaper: model.includes("VMC") ? "BT-40 Big Plus" : "A2-6 Hydraulic Chuck",
  });
}

// 12. 30 Inquiries (Website / RFQs)
const inquiries = [];
const inquiryTypes = [
  "Quotation Request",
  "Machine Inquiry",
  "Product Inquiry",
  "Callback Request",
  "Custom SPM Consultation",
];
for (let i = 1; i <= 30; i++) {
  const type = pick(inquiryTypes);
  const name = `${pick(firstNames)} ${pick(lastNames)}`;
  const company = pick(customerCompanies);
  const daysAgo = randInt(0, 30);

  inquiries.push({
    id: i,
    inquiryCode: `INQ-2026-${String(i).padStart(4, "0")}`,
    type,
    name,
    email: `procurement.${name.toLowerCase().replace(" ", ".")}@${company
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 10)}.co.in`,
    phone: `+91 98${randInt(10000000, 99999999)}`,
    company,
    city: pick([
      "Pune",
      "Aurangabad",
      "Nashik",
      "Chennai",
      "Bengaluru",
      "Coimbatore",
      "Rajkot",
      "Jamshedpur",
    ]),
    subject: `Requirement for ${pick(["VMC 1060 Machine", "Brake Disc Boring SPM", "Automated Gantry Loader", "CNC Lathe 300mm Bed", "4th Axis Retrofit Package", "Custom Cylinder Head Drilling Machine"])}`,
    message: `We need technical specifications, machine layout drawings, and best commercial pricing for delivery to our plant in Pune MIDC within 8-12 weeks.`,
    date: new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10),
    status: pick(["New", "New", "In Review", "Quotation Sent", "Resolved / Closed"]),
    assignedTo: pick(["Ananya Shah", "Dev Malhotra", "Aarav Kulkarni"]),
  });
}

// 13. 60 Inventory Items
const inventoryRaw = [
  { name: "EN8 High Tensile Steel Bar Ø60mm", cat: "Raw Material", unit: "Mtr", cost: 1850 },
  { name: "EN19 Chrome Moly Steel Bar Ø90mm", cat: "Raw Material", unit: "Mtr", cost: 3200 },
  {
    name: "Meehanite 250 Grade Heavy Casting Base",
    cat: "Raw Material",
    unit: "Pcs",
    cost: 185000,
  },
  { name: "Aluminium 6061-T6 Billet 100x100mm", cat: "Raw Material", unit: "Kg", cost: 380 },
  { name: "Case Hardening Steel 20MnCr5 Ø75mm", cat: "Raw Material", unit: "Mtr", cost: 2400 },
  {
    name: "Stainless Steel SS304 Precision Plate 25mm",
    cat: "Raw Material",
    unit: "Kg",
    cost: 420,
  },
  { name: "Precision Ground Ball Screw 40x10 C3", cat: "Machine Parts", unit: "Set", cost: 42000 },
  {
    name: "THK Linear Roller Guide 35mm x 1500mm",
    cat: "Machine Parts",
    unit: "Pair",
    cost: 36000,
  },
  {
    name: "NSK Precision Angular Contact Bearing Set",
    cat: "Machine Parts",
    unit: "Set",
    cost: 28000,
  },
  {
    name: "Siemens 1FK7 Servo Motor 2.2kW with Brake",
    cat: "Machine Parts",
    unit: "Pcs",
    cost: 65000,
  },
  { name: "Hydraulic Power Pack 5.5kW 70 Bar", cat: "Machine Parts", unit: "Unit", cost: 78000 },
  {
    name: "Festo Pneumatic Cylinder Double Acting Ø50",
    cat: "Machine Parts",
    unit: "Pcs",
    cost: 8500,
  },
  { name: "SMC 5-Port Solenoid Valve Manifold", cat: "Machine Parts", unit: "Unit", cost: 14500 },
  { name: "Automatic Central Lubrication Pump 2L", cat: "Machine Parts", unit: "Pcs", cost: 12500 },
  {
    name: "Schneider Electric Industrial Contactors 32A",
    cat: "Machine Parts",
    unit: "Pcs",
    cost: 3400,
  },
  {
    name: "Ready Spindle Cartridge BT-40 10000 RPM",
    cat: "Finished Goods",
    unit: "Pcs",
    cost: 145000,
  },
  {
    name: "12-Station Hydraulic Lathe Turret Assembly",
    cat: "Finished Goods",
    unit: "Pcs",
    cost: 285000,
  },
  {
    name: "Arm-Type Automatic Tool Changer 24 Tools",
    cat: "Finished Goods",
    unit: "Pcs",
    cost: 220000,
  },
  {
    name: "GCV-850 VMC Standard Sub-assembly Frame",
    cat: "Finished Goods",
    unit: "Unit",
    cost: 950000,
  },
  {
    name: "GCL-200 CNC Turning Sub-assembly Bed",
    cat: "Finished Goods",
    unit: "Unit",
    cost: 680000,
  },
];

const inventory = [];
for (let i = 1; i <= 60; i++) {
  const item = inventoryRaw[(i - 1) % inventoryRaw.length];
  const stock = randInt(1, 45);
  const minStock = randInt(5, 12);
  const wh = pick([
    "Bhosari Central Warehouse A1",
    "Bhosari Component Store B3",
    "Pune Machine Depot",
  ]);
  const status = stock === 0 ? "Out of Stock" : stock <= minStock ? "Low Stock" : "In Stock";

  inventory.push({
    id: i,
    itemCode: `INV-${String(i).padStart(4, "0")}`,
    name:
      i <= inventoryRaw.length
        ? item.name
        : `${item.name} · Spec-${Math.floor(i / inventoryRaw.length) + 1}`,
    category: item.cat,
    warehouse: wh,
    currentStock: stock,
    minStock,
    unit: item.unit,
    unitCost: item.cost,
    totalValuation: stock * item.cost,
    status,
    lastReceived: new Date(Date.now() - randInt(2, 40) * 86400000).toISOString().slice(0, 10),
    supplier: pick(supplierList),
  });
}

// 14. 35 Services & Maintenance Tickets
const services = [];
const serviceDescriptions = [
  "Spindle vibration inspection & dynamic field re-balancing",
  "Annual Preventive Maintenance (AMC 52-Point Health Audit)",
  "Hydraulic pressure line maintenance and cylinder seal replacement",
  "Backlash calibration on X/Y axis using Renishaw Laser Interferometer",
  "Turret indexing curvic coupling alignment and clamping check",
  "Installation and turnkey commissioning at customer manufacturing plant",
  "Coolant high-pressure CTS pump servicing and filter overhaul",
  "Siemens 828D CNC drive firmware update & parameter backup",
  "Emergency breakdown repair - tool changer arm gripper jam resolved",
  "Operator & Maintenance Staff Hands-on Training at Shop Floor",
];

for (let i = 1; i <= 35; i++) {
  const desc = pick(serviceDescriptions);
  const machine = machines[(i - 1) % machines.length];
  const daysAgo = randInt(1, 90);
  const status = pick(["Completed", "Completed", "In Progress", "Scheduled", "Pending Visit"]);

  services.push({
    id: i,
    ticketNo: `SRV-2026-${String(i).padStart(4, "0")}`,
    machineSerial: machine.serialNo,
    machineModel: machine.modelName,
    customerName: machine.clientName,
    serviceType: desc.includes("AMC")
      ? "AMC Preventive"
      : desc.includes("Installation")
        ? "Installation & Setup"
        : desc.includes("Training")
          ? "Customer Training"
          : desc.includes("Calibration")
            ? "Metrology & Calibration"
            : "Breakdown Repair",
    priority: pick(["High", "High", "Medium", "Low"]),
    engineerAssigned: pick(["Vikram Pawar", "Arjun More", "Siddharth Rao", "Kunal Joshi"]),
    visitDate: new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10),
    resolutionDate:
      status === "Completed"
        ? new Date(Date.now() - (daysAgo - 2) * 86400000).toISOString().slice(0, 10)
        : "Pending Completion",
    status,
    cost: randInt(8, 75) * 1000,
    description: desc,
    customerFeedback:
      status === "Completed"
        ? "Service was executed professionally, machine running within 2 microns accuracy."
        : "Awaiting final verification run by plant manager.",
  });
}

// 15. 40 Vendors
const vendors = [];
for (let i = 1; i <= 40; i++) {
  const sup = suppliers[i - 1];
  vendors.push({
    id: i,
    vendorCode: `VEN-GC-${String(i).padStart(4, "0")}`,
    name: sup.name,
    category: sup.category,
    contactPerson: sup.contactPerson,
    phone: sup.phone,
    email: sup.email,
    city: sup.city,
    gstNumber: sup.gstNumber,
    paymentTerms: sup.paymentTerms,
    rating: sup.rating,
    totalOrders: randInt(4, 38),
    totalPaid: randInt(12, 140) * 100000,
    outstanding: sup.outstanding,
    status: pick(["Approved", "Approved", "Preferred", "Under Review"]),
  });
}

// 16. 45 Accounting & Transactions
const accounting = [];
const accTypes = [
  "Sales Receipt",
  "Supplier Payment",
  "Payroll Disbursement",
  "Advance Received",
  "GST Statutory Payment",
  "Electricity & Utilities",
  "Machining Consumables",
];
let runningBalance = 14250000;

for (let i = 1; i <= 45; i++) {
  const type = pick(accTypes);
  const isIncome = type.includes("Sales") || type.includes("Advance");
  const amount = isIncome ? randInt(15, 95) * 100000 : randInt(8, 55) * 50000;
  runningBalance = isIncome ? runningBalance + amount : runningBalance - amount;
  const daysAgo = 45 - i;

  accounting.push({
    id: i,
    reference: `TXN-2026-${String(i).padStart(4, "0")}`,
    type: isIncome ? "Income / Receipt" : "Expense / Payment",
    category: type,
    account: pick([
      "HDFC Bank Corporate - 0422",
      "State Bank of India MIDC - 8819",
      "ICICI Current Account - 1102",
    ]),
    amount,
    date: new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10),
    balanceAfter: runningBalance,
    description: `${type} transaction processed for Global CNC operations.`,
    status: "Cleared",
  });
}

// 17. Testimonials
export const testimonials = [
  {
    id: 1,
    client: "Sanjay Deshpande",
    designation: "Vice President - Manufacturing Engineering",
    company: "Tata Motors CVBU, Pune",
    content:
      "Global CNC designed and delivered our dual-spindle brake carrier SPM on time. Their rigidity and cycle time reduction exceeded German benchmarks while saving 35% in capital costs.",
    rating: 5,
    project: "Brake Carrier Machining Cell",
  },
  {
    id: 2,
    client: "Rajesh Kalyani",
    designation: "General Manager - Capital Equipment",
    company: "Bharat Forge Ltd., Pune",
    content:
      "The custom VMC platforms from Global CNC have been running 3 shifts a day for 4 years with less than 0.8% unplanned downtime. Their Pune-based service team responds within 2 hours.",
    rating: 5,
    project: "VMC Tooling & Aerospace Cell",
  },
  {
    id: 3,
    client: "Anand Shinde",
    designation: "Plant Head - Chakan Facility",
    company: "Bajaj Auto Ltd., Pune",
    content:
      "We integrated Global CNC robotic machine tending with our turning centers. The automated gantry and optical inspection has made our shop floor world-class.",
    rating: 5,
    project: "Robotic Automation Line",
  },
  {
    id: 4,
    client: "Vikramaditya Rao",
    designation: "DGM - Heavy Precision Machining",
    company: "Larsen & Toubro Heavy Engg",
    content:
      "Finding machine builders in India capable of holding sub-5-micron tolerances on heavy alloy steel is rare. Global CNC Pvt. Ltd. delivers European-grade engineering from Bhosari.",
    rating: 5,
    project: "High Rigidity Heavy Bed SPM",
  },
];

// 18. Certificates
export const certificates = [
  {
    id: 1,
    title: "ISO 9001:2015 Quality Management System",
    issuer: "TUV SUD South Asia",
    validUntil: "2028-09-30",
    number: "ISO-9001-QMS-441029",
    scope:
      "Design, Manufacturing, Assembly & Servicing of CNC Machines, Special Purpose Machines (SPMs) and Automation Systems.",
  },
  {
    id: 2,
    title: "CE Conformity European Safety Standards",
    issuer: "Eurofins Product Testing EU",
    validUntil: "2027-12-31",
    number: "CE-MD-2024-99812",
    scope:
      "Machinery Directive 2006/42/EC and Electromagnetic Compatibility Directive 2014/30/EU Compliance.",
  },
  {
    id: 3,
    title: "ZED Gold Certification (Zero Defect Zero Effect)",
    issuer: "Ministry of MSME & Quality Council of India",
    validUntil: "2029-03-31",
    number: "ZED-GOLD-MH-2023-8711",
    scope:
      "Recognized for world-class manufacturing processes, clean environment and zero-defect machining practices.",
  },
  {
    id: 4,
    title: "Directorate General of Quality Assurance (DGQA) Approval",
    issuer: "Ministry of Defence, Govt. of India",
    validUntil: "2028-05-15",
    number: "DGQA-PUN-DEF-SPM-412",
    scope:
      "Qualified vendor for defense production machinery, ordnance tooling and specialized machining cells.",
  },
];

// Write out all files
const filesToWrite = {
  "companyInfo.ts": `export const companyInfo = ${JSON.stringify(companyInfo, null, 2)};\n`,
  "products.ts": `export const productsData = ${JSON.stringify(products, null, 2)};\n`,
  "customers.ts": `export const customersData = ${JSON.stringify(customers, null, 2)};\n`,
  "suppliers.ts": `export const suppliersData = ${JSON.stringify(suppliers, null, 2)};\n`,
  "sales.ts": `export const salesData = ${JSON.stringify(sales, null, 2)};\n`,
  "purchases.ts": `export const purchasesData = ${JSON.stringify(purchases, null, 2)};\n`,
  "expenses.ts": `export const expensesData = ${JSON.stringify(expenses, null, 2)};\n`,
  "employees.ts": `export const employeesData = ${JSON.stringify(employees, null, 2)};\n`,
  "leads.ts": `export const leadsData = ${JSON.stringify(leads, null, 2)};\n`,
  "projects.ts": `export const projectsData = ${JSON.stringify(projects, null, 2)};\n`,
  "machines.ts": `export const machinesData = ${JSON.stringify(machines, null, 2)};\n`,
  "inquiries.ts": `export const inquiriesData = ${JSON.stringify(inquiries, null, 2)};\n`,
  "inventory.ts": `export const inventoryData = ${JSON.stringify(inventory, null, 2)};\n`,
  "services.ts": `export const servicesData = ${JSON.stringify(services, null, 2)};\n`,
  "vendors.ts": `export const vendorsData = ${JSON.stringify(vendors, null, 2)};\n`,
  "accounting.ts": `export const accountingData = ${JSON.stringify(accounting, null, 2)};\n`,
  "testimonials.ts": `export const testimonialsData = ${JSON.stringify(testimonials, null, 2)};\n`,
  "certificates.ts": `export const certificatesData = ${JSON.stringify(certificates, null, 2)};\n`,
};

for (const [filename, content] of Object.entries(filesToWrite)) {
  fs.writeFileSync(path.join(dataDir, filename), content, "utf8");
  console.log(`Created ${filename}`);
}

console.log("All mock data generated successfully!");
