/**
 * Utility matching functions for Machine-wise and Month-wise multi-filtering across
 * Sales, Sales Report, Purchase, Purchase Report, Expense, and Expense Report.
 */

export const matchesMachineFilter = (
  machineFilter: string,
  category: string = "",
  productOrDescription: string = "",
  notes: string = "",
): boolean => {
  if (!machineFilter || machineFilter === "All") return true;

  const combined = `${category} ${productOrDescription} ${notes}`.toLowerCase();
  const filterKey = machineFilter.toLowerCase();

  if (filterKey.includes("vmc")) {
    return (
      combined.includes("vmc") ||
      combined.includes("vertical machining") ||
      combined.includes("spindle") ||
      combined.includes("milling")
    );
  }

  if (filterKey.includes("cnc")) {
    return (
      combined.includes("cnc") ||
      combined.includes("turning") ||
      combined.includes("lathe") ||
      combined.includes("chuck") ||
      combined.includes("tailstock")
    );
  }

  if (filterKey.includes("special purpose") || filterKey.includes("spm")) {
    return (
      combined.includes("spm") ||
      combined.includes("special purpose") ||
      combined.includes("multi-spindle") ||
      combined.includes("cylinder block") ||
      combined.includes("fixture")
    );
  }

  if (filterKey.includes("automation")) {
    return (
      combined.includes("automation") ||
      combined.includes("robotic") ||
      combined.includes("robot") ||
      combined.includes("plc") ||
      combined.includes("servo") ||
      combined.includes("scara") ||
      combined.includes("conveyor")
    );
  }

  if (filterKey.includes("part") || filterKey.includes("tooling")) {
    return (
      combined.includes("part") ||
      combined.includes("tool") ||
      combined.includes("bearing") ||
      combined.includes("guide") ||
      combined.includes("ball screw") ||
      combined.includes("casting") ||
      combined.includes("lubricant") ||
      combined.includes("consumable")
    );
  }

  return combined.includes(filterKey);
};

export const matchesMonthFilter = (dateStr: string = "", monthFilter: string): boolean => {
  if (!monthFilter || monthFilter === "All") return true;
  // dateStr is typically YYYY-MM-DD
  return dateStr.startsWith(monthFilter);
};
