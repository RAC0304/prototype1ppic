"use client";

import React, { useState } from "react";

export default function BOMPage() {
  const [selectedParentItem, setSelectedParentItem] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);
  const [parentItems, setParentItems] = useState([
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
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
              <h2 className="text-lg font-semibold text-gray-700">
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
                  <span className="font-semibold text-gray-700">
                    {item.name}
                  </span>
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
                  <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow">
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
    </div>
  );
}
