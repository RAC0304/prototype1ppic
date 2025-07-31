"use client";

import React, { useState } from "react";

export default function MaterialsPage() {
  const [filters, setFilters] = useState({
    search: "",
    specification: "",
    type: "",
  });

  const [materials, setMaterials] = useState([
    {
      id: "MAT-001",
      description: "SPHC 1.6 x 84 x 1219",
      type: "Lembaran",
      uom: "KG",
      vendor: "PT Steel Indonesia",
      status: "Aktif",
    },
    {
      id: "MAT-002",
      description: "SPCC 1.0 x 1219 x 2438",
      type: "Coil",
      uom: "KG",
      vendor: "PT Coil Asia",
      status: "Nonaktif",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Bahan Baku
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini menyediakan katalog digital yang terpusat dan akurat untuk
          setiap jenis bahan baku yang dibeli.
        </p>

        {/* Panel Filter & Pencarian */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Filter & Pencarian
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cari Material:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Kode atau Deskripsi Material"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spesifikasi:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="SPHC, SPCC, dll."
                value={filters.specification}
                onChange={(e) =>
                  setFilters({ ...filters, specification: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Material:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">Semua</option>
                <option value="Lembaran">Lembaran</option>
                <option value="Coil">Coil</option>
                <option value="Komponen Beli">Komponen Beli</option>
                <option value="Lainnya">Lainnya</option>
              </select>
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

        {/* Tabel Daftar Material */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow">
                Tambah Material Baru
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Kode Material
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Deskripsi Material
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tipe
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Unit Satuan (UOM)
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Vendor Utama
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
                {materials.map((material) => (
                  <tr
                    key={material.id}
                    className="hover:bg-blue-100 transition"
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {material.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {material.description}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {material.type}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {material.uom}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {material.vendor}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span
                        className={
                          material.status === "Aktif"
                            ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold"
                            : "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold"
                        }
                      >
                        {material.status}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow mr-2 flex items-center gap-1">
                        <span>👁️</span> Lihat
                      </button>
                      <button className="bg-yellow-400 hover:bg-yellow-500 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow mr-2 flex items-center gap-1">
                        <span>✏️</span> Edit
                      </button>
                      <button className="bg-gray-400 hover:bg-gray-500 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow flex items-center gap-1">
                        <span>🔄</span> Nonaktifkan/Aktifkan
                      </button>
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
