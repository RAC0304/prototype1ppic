import { IconName } from "@fortawesome/fontawesome-svg-core";

export const getIconForPath = (path: string): IconName => {
  const iconMap: Record<string, IconName> = {
    // Dashboard
    "/main/dashboard": "home",

    // Master Data
    "/main/master-data/customers": "users",
    "/main/master-data/vendors": "building",
    "/main/master-data/parts": "wrench",
    "/main/master-data/materials": "box",
    "/main/master-data/boms": "list",
    "/main/master-data/routings": "route",

    // Planning
    "/main/planning/sales-orders": "file-invoice",
    "/main/planning/forecasts": "chart-line",
    "/main/planning/mrp": "cog",
    "/main/planning/crp": "industry",

    // Execution
    "/main/execution/work-orders": "hammer",
    "/main/execution/purchase-orders": "shopping-cart",
    "/main/execution/inventory/transactions": "chart-bar",
    "/main/execution/inventory/stock-take": "boxes",
  };

  return iconMap[path] || "home";
};

export const getSectionIcon = (section: string): IconName => {
  const sectionMap: Record<string, IconName> = {
    "data-master": "clipboard-list",
    planning: "calendar-alt",
    execution: "rocket",
  };

  return sectionMap[section] || "home";
};
