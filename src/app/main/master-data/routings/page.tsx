"use client";

import React, { useState } from "react";

export default function RoutingsPage() {
  const [selectedPart, setSelectedPart] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);
  const [parts, setParts] = useState([
    { id: "PART-001", name: "Bracket Engine", status: "complete" },
    { id: "PART-002", name: "Washer Plain 6mm", status: "incomplete" },
  ]);

  const [routingSteps, setRoutingSteps] = useState([
    {
      order: 10,
      processName: "BLANKING",
      workStation: "Stamping",
      specificMachine: "200 Ton",
      capacityPerHour: 1000,
    },
    {
      order: 20,
      processName: "Bending 1",
      workStation: "Stamping",
      specificMachine: "200 Ton",
      capacityPerHour: 425,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Rute Produksi
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini mendefinisikan urutan standar operasi untuk memproduksi
          setiap produk.
        </p>

        {/* Panel Kiri & Kanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel Kiri: Daftar Produk & Komponen */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Daftar Produk & Komponen
              </h2>
            </div>
            <input
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Cari Produk atau Komponen"
            />
            <ul>
              {parts.map((part) => (
                <li
                  key={part.id}
                  className={`cursor-pointer border border-gray-200 px-4 py-2 mb-2 rounded-lg flex items-center justify-between hover:bg-blue-100 transition ${
                    selectedPart?.id === part.id
                      ? "bg-blue-50 border-blue-400"
                      : ""
                  }`}
                  onClick={() => setSelectedPart(part)}
                >
                  <span className="font-semibold text-gray-700">
                    {part.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({part.id})
                  </span>
                  <span
                    className={`ml-2 text-lg ${
                      part.status === "complete"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {part.status === "complete" ? "✅" : "⚠️"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel Kanan: Detail Rute Produksi */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            {selectedPart ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500">🔧</span>
                  <h2 className="text-lg font-semibold text-gray-700">
                    Detail Rute Produksi untuk {selectedPart.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Nomor Part:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {selectedPart.id}
                  </span>
                </p>

                <div className="flex gap-3 mb-4">
                  <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow">
                    Tambah Langkah Proses
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          No. Urut
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Nama Proses
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Stasiun Kerja
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Mesin Spesifik
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Kapasitas per Jam
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {routingSteps.map((step, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-100 transition"
                        >
                          <td className="border border-gray-200 px-4 py-2">
                            {step.order}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {step.processName}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {step.workStation}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {step.specificMachine}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {step.capacityPerHour}
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
                  Simpan Rute
                </button>
              </>
            ) : (
              <p className="text-gray-600">
                Pilih produk dari panel kiri untuk melihat atau mengedit rute
                produksi.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
