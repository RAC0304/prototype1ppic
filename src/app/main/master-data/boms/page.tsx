"use client";

import React, { useState } from "react";

export default function BOMPage() {
  const [selectedParentItem, setSelectedParentItem] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);
  const [parentItems] = useState([
    { id: "32190-0900", name: "BRACKET ENGINE", status: "complete" },
    { id: "32190-0901", name: "WASHER PLAIN 6MM", status: "incomplete" },
  ]);

  const [bomComponents, setBOMComponents] = useState([
    {
      type: "Material",
      code: "M-SPCC-1-1219-2438",
      description: "SPCC 1.0 x 1219 x 2438",
      quantity: 0.0016,
      uom: "KG",
    },
    {
      type: "Jasa",
      code: "J-PLATING-MFZN2B",
      description: "Jasa Plating MFZn2-B",
      quantity: 1,
      uom: "Pcs",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "Material",
    code: "",
    description: "",
    quantity: 1,
    uom: "KG",
  });

  const handleAddNew = () => {
    setFormData({
      type: "Material",
      code: "",
      description: "",
      quantity: 1,
      uom: "KG",
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBOMComponents([...bomComponents, { ...formData }]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 p-6 mx-auto">
      <div>
        <div className="mb-2">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Manajemen Bill of Materials (Struktur Produk)
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini menyediakan antarmuka visual untuk mendefinisikan,
          melihat, dan mengelola komposisi setiap produk jadi.
        </p>

        {/* Panel Kiri & Kanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel Kiri: Daftar Produk Jadi */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-700">
                Daftar Produk Jadi
              </h2>
            </div>
            <input
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Cari Produk"
            />
            <ul>
              {parentItems.map((item) => (
                <li
                  key={item.id}
                  className={`cursor-pointer border border-gray-200 px-4 py-2 mb-2 rounded-lg flex items-center justify-between hover:bg-blue-100 transition ${
                    selectedParentItem?.id === item.id
                      ? "bg-blue-50 border-blue-400"
                      : ""
                  }`}
                  onClick={() => setSelectedParentItem(item)}
                >
                  <span className="font-semibold text-700">{item.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({item.id})
                  </span>
                  <span
                    className={`ml-2 text-lg ${
                      item.status === "complete"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status === "complete" ? "✅" : "⚠️"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel Kanan: Detail BOM */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            {selectedParentItem ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500">🔬</span>
                  <h2 className="text-lg font-semibold text-gray-700">
                    Detail BOM untuk {selectedParentItem.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Nomor Part:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {selectedParentItem.id}
                  </span>
                </p>

                <div className="flex gap-3 mb-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
                    onClick={handleAddNew}
                  >
                    Tambah Komponen
                  </button>
                  <button className="bg-gray-400 hover:bg-gray-500 transition text-white px-4 py-2 rounded-lg font-semibold shadow">
                    Salin BOM dari...
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Tipe Komponen
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Kode Komponen
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Deskripsi Komponen
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Kuantitas per Induk
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          UOM
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bomComponents.map((component, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-100 transition"
                        >
                          <td className="border border-gray-200 px-4 py-2">
                            {component.type}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {component.code}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {component.description}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {component.quantity}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {component.uom}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            <button className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow mt-4">
                  Simpan Perubahan
                </button>
              </>
            ) : (
              <p className="text-gray-600">
                Pilih produk dari panel kiri untuk melihat atau mengedit BOM.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Tambah Komponen */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-xl border border-gray-200 relative">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Tambah Komponen BOM
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Tipe Komponen *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="Material">Material</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Komponen Beli">Komponen Beli</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Kode Komponen *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Deskripsi Komponen *
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
                    Kuantitas *
                  </label>
                  <input
                    type="number"
                    min={0.0001}
                    step={0.0001}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    UOM *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.uom}
                    onChange={(e) =>
                      setFormData({ ...formData, uom: e.target.value })
                    }
                  />
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
  );
}
