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

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    type: "Lembaran",
    uom: "KG",
    vendor: "",
    status: "Aktif",
  });

  const handleAddNew = () => {
    setFormData({
      id: "",
      description: "",
      type: "Lembaran",
      uom: "KG",
      vendor: "",
      status: "Aktif",
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMaterials([...materials, { ...formData }]);
    setShowModal(false);
  };

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
              <button
                className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
                onClick={handleAddNew}
              >
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

        {/* Modal Tambah Material Baru */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2 sm:px-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-xl border border-gray-200 relative">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tambah Material Baru
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Kode Material *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      value={formData.id}
                      onChange={(e) =>
                        setFormData({ ...formData, id: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Deskripsi Material *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Tipe Material *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="Lembaran">Lembaran</option>
                      <option value="Coil">Coil</option>
                      <option value="Komponen Beli">Komponen Beli</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Unit Satuan (UOM)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      value={formData.uom}
                      onChange={(e) =>
                        setFormData({ ...formData, uom: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Vendor Utama
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      value={formData.vendor}
                      onChange={(e) =>
                        setFormData({ ...formData, vendor: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white font-bold rounded-lg shadow hover:bg-gray-900 transition border border-gray-900"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:bg-gray-300 transition border border-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
