"use client";
import React, { useState } from "react";

export default function PurchaseOrdersPage() {
  const [filters, setFilters] = useState({
    vendorName: "",
    poNumber: "",
    materialName: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [purchaseOrders] = useState([
    {
      id: "PO001",
      vendorName: "Vendor A",
      orderDate: "2025-07-01",
      estimatedArrivalDate: "2025-07-15",
      totalValue: 5000000,
      status: "Open",
    },
    {
      id: "PO002",
      vendorName: "Vendor B",
      orderDate: "2025-07-05",
      estimatedArrivalDate: "2025-07-20",
      totalValue: 3000000,
      status: "Draft",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-600 text-3xl">📦</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Pesanan Pembelian (ke Vendor)
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini berfungsi sebagai pusat kendali untuk semua aktivitas
          pengadaan material dan jasa dari pemasok.
        </p>

        {/* Panel Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">🔎</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Filter Pesanan Pembelian
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Vendor:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nama Vendor"
                value={filters.vendorName}
                onChange={(e) =>
                  setFilters({ ...filters, vendorName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor PO:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nomor PO"
                value={filters.poNumber}
                onChange={(e) =>
                  setFilters({ ...filters, poNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Material:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nama Material"
                value={filters.materialName}
                onChange={(e) =>
                  setFilters({ ...filters, materialName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Semua</option>
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
                <option value="Partially Received">Partially Received</option>
                <option value="Closed">Closed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rentang Tanggal:
              </label>
              <input
                type="date"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />
              <input
                type="date"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg font-semibold shadow">
              Terapkan Filter
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 transition text-white px-5 py-2 rounded-lg font-semibold shadow">
              Reset Filter
            </button>
          </div>
        </div>

        {/* Tabel Daftar Pesanan Pembelian */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-green-500">➕</span>
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow">
                Buat Pesanan Pembelian Baru
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nomor PO
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nama Vendor
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tanggal Pesan
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tanggal Estimasi Tiba
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Total Nilai (Rp)
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-blue-100 transition">
                    <td className="border border-gray-200 px-4 py-2">
                      <a
                        href="#"
                        className="text-blue-600 underline font-semibold"
                      >
                        {po.id}
                      </a>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {po.vendorName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {po.orderDate}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {po.estimatedArrivalDate}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      Rp {po.totalValue.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 font-bold text-blue-700">
                      {po.status}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div className="flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow flex items-center gap-1">
                          <span>👁️</span> Lihat
                        </button>
                        {po.status === "Draft" && (
                          <button className="bg-yellow-400 hover:bg-yellow-500 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow flex items-center gap-1">
                            <span>✏️</span> Edit
                          </button>
                        )}
                        <button className="bg-gray-400 hover:bg-gray-500 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow flex items-center gap-1">
                          <span>🖨️</span> Cetak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
