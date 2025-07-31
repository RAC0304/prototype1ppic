"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardStats {
  totalWorkOrders: number;
  activeWorkOrders: number;
  completedThisMonth: number;
  pendingSalesOrders: number;
  lowStockItems: number;
  totalParts: number;
  totalCustomers: number;
  totalVendors: number;
  productionEfficiency: number;
  onTimeDelivery: number;
}

interface ProductionData {
  labels: string[];
  planned: number[];
  actual: number[];
}

interface InventoryData {
  labels: string[];
  values: number[];
  colors: string[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkOrders: 0,
    activeWorkOrders: 0,
    completedThisMonth: 0,
    pendingSalesOrders: 0,
    lowStockItems: 0,
    totalParts: 0,
    totalCustomers: 0,
    totalVendors: 0,
    productionEfficiency: 0,
    onTimeDelivery: 0,
  });
  const [productionData, setProductionData] = useState<ProductionData>({
    labels: [],
    planned: [],
    actual: [],
  });
  const [inventoryData, setInventoryData] = useState<InventoryData>({
    labels: [],
    values: [],
    colors: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Mock dashboard data - in real implementation, this would come from API
      const mockStats: DashboardStats = {
        totalWorkOrders: 45,
        activeWorkOrders: 12,
        completedThisMonth: 28,
        pendingSalesOrders: 8,
        lowStockItems: 5,
        totalParts: 156,
        totalCustomers: 23,
        totalVendors: 15,
        productionEfficiency: 87.5,
        onTimeDelivery: 92.3,
      };

      const mockProductionData: ProductionData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        planned: [100, 120, 110, 130],
        actual: [95, 115, 108, 125],
      };

      const mockInventoryData: InventoryData = {
        labels: ["Finished Goods", "WIP", "Components", "Raw Materials"],
        values: [35, 25, 30, 10],
        colors: ["#10B981", "#F59E0B", "#3B82F6", "#EF4444"],
      };

      setStats(mockStats);
      setProductionData(mockProductionData);
      setInventoryData(mockInventoryData);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const productionChartData = {
    labels: productionData.labels,
    datasets: [
      {
        label: "Planned Production",
        data: productionData.planned,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
      {
        label: "Actual Production",
        data: productionData.actual,
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
    ],
  };

  const inventoryChartData = {
    labels: inventoryData.labels,
    datasets: [
      {
        data: inventoryData.values,
        backgroundColor: inventoryData.colors,
        borderColor: inventoryData.colors.map((color) => color),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Production Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview produksi, inventory, dan KPI perusahaan
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-xl transition-transform hover:-translate-y-1 hover:shadow-xl border border-blue-100">
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              {/* SVG Icon Work Order */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="4"
                  y="7"
                  width="16"
                  height="13"
                  rx="2"
                  fill="#3B82F6"
                />
                <rect x="7" y="3" width="10" height="4" rx="1" fill="#60A5FA" />
              </svg>
            </div>
            <div className="flex-1">
              <dl>
                <dt className="text-sm font-semibold text-gray-600">
                  Active Work Orders
                </dt>
                <dd className="text-xl font-bold text-gray-900">
                  {stats.activeWorkOrders} / {stats.totalWorkOrders}
                </dd>
              </dl>
              <div className="text-xs text-green-600 mt-2">
                {stats.completedThisMonth} completed{" "}
                <span className="text-gray-400">this month</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-xl transition-transform hover:-translate-y-1 hover:shadow-xl border border-green-100">
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              {/* SVG Icon Sales Order */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#10B981" />
                <path
                  d="M8 12h8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <dl>
                <dt className="text-sm font-semibold text-gray-600">
                  Pending Sales Orders
                </dt>
                <dd className="text-xl font-bold text-gray-900">
                  {stats.pendingSalesOrders}
                </dd>
              </dl>
              <div className="text-xs text-blue-600 mt-2">
                {stats.onTimeDelivery}%{" "}
                <span className="text-gray-400">on-time delivery</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-xl transition-transform hover:-translate-y-1 hover:shadow-xl border border-yellow-100">
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              {/* SVG Icon Inventory */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="4"
                  y="8"
                  width="16"
                  height="10"
                  rx="2"
                  fill="#F59E0B"
                />
                <rect x="7" y="4" width="10" height="4" rx="1" fill="#FBBF24" />
              </svg>
            </div>
            <div className="flex-1">
              <dl>
                <dt className="text-sm font-semibold text-gray-600">
                  Low Stock Items
                </dt>
                <dd className="text-xl font-bold text-gray-900">
                  {stats.lowStockItems}
                </dd>
              </dl>
              <div className="text-xs text-purple-600 mt-2">
                {stats.totalParts} total parts{" "}
                <span className="text-gray-400">in system</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-xl transition-transform hover:-translate-y-1 hover:shadow-xl border border-purple-100">
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              {/* SVG Icon Efficiency */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#A78BFA" />
                <path
                  d="M12 6v6l4 2"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <dl>
                <dt className="text-sm font-semibold text-gray-600">
                  Production Efficiency
                </dt>
                <dd className="text-xl font-bold text-gray-900">
                  {stats.productionEfficiency}%
                </dd>
              </dl>
              <div className="text-xs text-indigo-600 mt-2">
                {stats.totalCustomers} customers{" "}
                <span className="text-gray-400">
                  • {stats.totalVendors} vendors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-50 transition hover:shadow-xl">
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <rect x="3" y="6" width="14" height="10" rx="2" fill="#3B82F6" />
            </svg>
            Production Performance (Weekly)
          </h3>
          <div className="h-64">
            <Bar data={productionChartData} options={chartOptions} />
          </div>
        </div>

        {/* Inventory Distribution */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-green-50 transition hover:shadow-xl">
          <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="#10B981" />
            </svg>
            Inventory Distribution
          </h3>
          <div className="h-64 flex justify-center">
            <Doughnut data={inventoryChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Work Orders */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 transition hover:shadow-xl">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <rect x="3" y="6" width="14" height="10" rx="2" fill="#3B82F6" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">
              Recent Work Orders
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    WO-2024-001
                  </p>
                  <p className="text-xs text-gray-500">Product A - 100 units</p>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 transition">
                  In Progress
                </span>
              </div>
              <div className="flex items-center justify-between group">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    WO-2024-002
                  </p>
                  <p className="text-xs text-gray-500">Product B - 50 units</p>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 group-hover:bg-green-200 transition">
                  Completed
                </span>
              </div>
              <div className="flex items-center justify-between group">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    WO-2024-003
                  </p>
                  <p className="text-xs text-gray-500">Product C - 75 units</p>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition">
                  Planned
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 shadow-lg rounded-xl border border-gray-100 transition hover:shadow-xl">
          <div className="p-6 border-b border-gray-200 flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z" fill="#F59E0B" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">
              Alerts & Notifications
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                </div>
                <div className="ml-2">
                  <p className="text-sm font-semibold text-red-700">
                    Low Stock Alert
                  </p>
                  <p className="text-xs text-gray-500">
                    Component A stock below minimum level
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                </div>
                <div className="ml-2">
                  <p className="text-sm font-semibold text-yellow-700">
                    Work Order Delay
                  </p>
                  <p className="text-xs text-gray-500">
                    WO-2024-001 behind schedule
                  </p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                </div>
                <div className="ml-2">
                  <p className="text-sm font-semibold text-green-700">
                    Production Complete
                  </p>
                  <p className="text-xs text-gray-500">
                    WO-2024-002 completed successfully
                  </p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <rect x="3" y="6" width="14" height="10" rx="2" fill="#3B82F6" />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition flex flex-col items-center group">
            <div className="mb-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="4"
                  y="7"
                  width="16"
                  height="13"
                  rx="2"
                  fill="#3B82F6"
                />
              </svg>
            </div>
            <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
              Create Work Order
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Start new production
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition flex flex-col items-center group">
            <div className="mb-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#10B981" />
              </svg>
            </div>
            <div className="text-sm font-semibold text-gray-900 group-hover:text-green-700">
              Run MRP
            </div>
            <div className="text-xs text-gray-500 mt-1">Material planning</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 transition flex flex-col items-center group">
            <div className="mb-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="4"
                  y="8"
                  width="16"
                  height="10"
                  rx="2"
                  fill="#F59E0B"
                />
              </svg>
            </div>
            <div className="text-sm font-semibold text-gray-900 group-hover:text-yellow-700">
              Check Inventory
            </div>
            <div className="text-xs text-gray-500 mt-1">Stock levels</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition flex flex-col items-center group">
            <div className="mb-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#A78BFA" />
              </svg>
            </div>
            <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">
              Sales Orders
            </div>
            <div className="text-xs text-gray-500 mt-1">
              View pending orders
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
