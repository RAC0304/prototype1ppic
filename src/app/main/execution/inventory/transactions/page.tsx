"use client";
import React, { useState } from "react";

export default function InventoryTransactionsPage() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    transactionType: "",
    itemSearch: "",
    documentSearch: "",
  });

  const [transactions] = useState([
    {
      id: "TX001",
      timestamp: "2025-07-10 14:30",
      itemCode: "MAT001",
      itemName: "Material A",
      transactionType: "Penerimaan Barang",
      quantity: 100,
      stockChange: "+",
      stockAfter: 500,
      referenceDocument: "PO-00123",
      user: "John Doe",
      location: "Gudang Bahan Baku",
    },
    {
      id: "TX002",
      timestamp: "2025-07-10 15:00",
      itemCode: "MAT002",
      itemName: "Material B",
      transactionType: "Pengeluaran Material",
      quantity: 50,
      stockChange: "-",
      stockAfter: 150,
      referenceDocument: "WO-00456",
      user: "Jane Smith",
      location: "Area Produksi",
    },
  ]);

  return (
    <div className="space-y-6 p-6 mx-auto">
      <div className="">
        <div className="mb-2">
          <h1 className="text-2xl font-extrabold text-800">
            Riwayat Transaksi Inventaris
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini menyediakan jejak audit yang lengkap untuk setiap
          pergerakan item di dalam gudang dan area produksi.
        </p>

        {/* Panel Filter Lanjutan */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🔎</span>
              <h2 className="text-lg font-semibold text-gray-700">
                Filter Transaksi
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Transaksi:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.transactionType}
                onChange={(e) =>
                  setFilters({ ...filters, transactionType: e.target.value })
                }
              >
                <option value="">Semua</option>
                <option value="Penerimaan Barang">Penerimaan Barang</option>
                <option value="Pengeluaran Material">
                  Pengeluaran Material
                </option>
                <option value="Hasil Produksi">Hasil Produksi</option>
                <option value="Pengiriman Barang">Pengiriman Barang</option>
                <option value="Penyesuaian Stok">Penyesuaian Stok</option>
                <option value="Kirim ke Subkontraktor">
                  Kirim ke Subkontraktor
                </option>
                <option value="Terima dari Subkontraktor">
                  Terima dari Subkontraktor
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Kode atau Nama Item"
                value={filters.itemSearch}
                onChange={(e) =>
                  setFilters({ ...filters, itemSearch: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dokumen Referensi:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nomor Dokumen"
                value={filters.documentSearch}
                onChange={(e) =>
                  setFilters({ ...filters, documentSearch: e.target.value })
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

        {/* Tabel Riwayat Transaksi */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🗂️</span>
              <h2 className="text-lg font-semibold text-gray-700">
                Tabel Riwayat Transaksi
              </h2>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-xl font-bold shadow flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
              Download Data Riwayat Transaksi
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    ID Transaksi
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tanggal & Waktu
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Kode Item
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nama Item
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tipe Transaksi
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Kuantitas
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Perubahan Stok
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Stok Setelah Transaksi
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Dokumen Referensi
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Pengguna
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Lokasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-blue-100 transition"
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.timestamp}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.itemCode}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.itemName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.transactionType}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.quantity}
                    </td>
                    <td
                      className={`border border-gray-200 px-4 py-2 font-bold text-center ${
                        transaction.stockChange === "+"
                          ? "text-green-600"
                          : transaction.stockChange === "-"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {transaction.stockChange}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.stockAfter}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <a
                        href="#"
                        className="text-blue-600 underline font-semibold"
                      >
                        {transaction.referenceDocument}
                      </a>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.user}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {transaction.location}
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
