"use client";

import React, { useState } from "react";

export default function PartsPage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    customer: "",
  });

  type Part = {
    id: string;
    name: string;
    type: string;
    customer: string;
    uom: string;
    status: string;
  };

  const [parts, setParts] = useState<Part[]>(
    [
      {
        id: "PART-001",
        name: "Bracket Engine",
        type: "Finished Good",
        customer: "PT Astra Honda Motor",
        uom: "Pcs",
        status: "Aktif",
      },
      {
        id: "PART-002",
        name: "Washer Plain 6mm",
        type: "WIP",
        customer: "",
        uom: "Pcs",
        status: "Discontinue",
      },
    ]
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "Finished Good",
    customer: "",
    uom: "Pcs",
    status: "Aktif",
  });

  const handleAddNew = () => {
    setFormData({
      id: "",
      name: "",
      type: "Finished Good",
      customer: "",
      uom: "Pcs",
      status: "Aktif",
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParts([...parts, { ...formData }]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Produk & Komponen
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini menyediakan katalog digital terpusat untuk setiap item
          yang diproduksi oleh pabrik.
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
                Cari Part:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nomor atau Nama Part"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Part:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">Semua</option>
                <option value="Finished Good">Barang Jadi</option>
                <option value="WIP">Barang Setengah Jadi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pelanggan:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nama Pelanggan"
                value={filters.customer}
                onChange={(e) =>
                  setFilters({ ...filters, customer: e.target.value })
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

        {/* Tabel Daftar Parts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
                onClick={handleAddNew}
              >
                Tambah Part Baru
              </button>
              {/* Modal Form Tambah Part */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2 sm:px-0">
                  <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-xl border border-gray-200 relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Part Baru</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">Nomor Part *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            value={formData.id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">Nama Part *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">Tipe Part *</label>
                          <select
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          >
                            <option value="Finished Good">Barang Jadi</option>
                            <option value="WIP">Barang Setengah Jadi</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">Pelanggan</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            value={formData.customer}
                            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">Unit Satuan (UOM)</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            value={formData.uom}
                            onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          >
                            <option value="Aktif">Aktif</option>
                            <option value="Discontinue">Discontinue</option>
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
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nomor Part
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nama Part
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tipe Part
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Pelanggan
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Unit Satuan (UOM)
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
                {parts.map((part) => (
                  <tr key={part.id} className="hover:bg-blue-100 transition">
                    <td className="border border-gray-200 px-4 py-2">
                      {part.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {part.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {part.type}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {part.customer || "-"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {part.uom}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span
                        className={
                          part.status === "Aktif"
                            ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold"
                            : part.status === "Discontinue"
                            ? "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold"
                            : "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold"
                        }
                      >
                        {part.status}
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
