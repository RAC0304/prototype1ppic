"use client";

import React, { useState } from "react";

interface StockTakeItem {
  code: string;
  name: string;
  location: string;
  systemQuantity: number;
  physicalQuantity: number | null;
  variance: number | null;
  varianceValue: number | null;
  notes: string;
}

interface StockTakeSession {
  id: string;
  description: string;
  createdDate: string;
  status: string;
  createdBy: string;
}

interface SessionDetails {
  id: string;
  description: string;
  createdDate: string;
  status: string;
  items: StockTakeItem[];
}

export default function StockTakePage() {
  const [sessions, setSessions] = useState<StockTakeSession[]>([
    {
      id: "STO-2025-07-01",
      description: "STO Bulanan Gudang Bahan Baku Juli",
      createdDate: "2025-07-01",
      status: "Draft",
      createdBy: "John Doe",
    },
  ]);

  const [sessionDetails, setSessionDetails] = useState<SessionDetails>({
    id: "STO-2025-07-01",
    description: "STO Bulanan Gudang Bahan Baku Juli",
    createdDate: "2025-07-01",
    status: "Draft",
    items: [
      {
        code: "MAT001",
        name: "Material A",
        location: "Gudang 1",
        systemQuantity: 100,
        physicalQuantity: null,
        variance: null,
        varianceValue: null,
        notes: "",
      },
      {
        code: "MAT002",
        name: "Material B",
        location: "Gudang 2",
        systemQuantity: 200,
        physicalQuantity: null,
        variance: null,
        varianceValue: null,
        notes: "",
      },
    ],
  });

  const handlePhysicalQuantityChange = (index: number, value: string) => {
    const updatedItems = [...sessionDetails.items];
    const newPhysicalQuantity = value ? parseInt(value, 10) : null;
    updatedItems[index].physicalQuantity = newPhysicalQuantity;

    // Calculate variance when both quantities are available
    if (newPhysicalQuantity !== null) {
      updatedItems[index].variance =
        newPhysicalQuantity - updatedItems[index].systemQuantity;
      // Mock unit cost for variance value calculation
      const unitCost = 1000; // IDR per unit
      updatedItems[index].varianceValue =
        updatedItems[index].variance! * unitCost;
    } else {
      updatedItems[index].variance = null;
      updatedItems[index].varianceValue = null;
    }

    setSessionDetails({ ...sessionDetails, items: updatedItems });
  };

  const handleNotesChange = (index: number, value: string) => {
    const updatedItems = [...sessionDetails.items];
    updatedItems[index].notes = value;
    setSessionDetails({ ...sessionDetails, items: updatedItems });
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-600 text-3xl">📦</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Perhitungan Stok Fisik (Stock Take)
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini menyediakan alat terstruktur untuk melakukan proses
          perhitungan stok fisik secara periodik.
        </p>

        {/* Tampilan Daftar Sesi Stock Take */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🗂️</span>
              <h2 className="text-lg font-semibold text-gray-700">
                Daftar Sesi Stock Take
              </h2>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow flex items-center gap-1">
              <span>➕</span> Buat Sesi Stock Take Baru
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    ID Sesi
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Deskripsi
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tanggal Dibuat
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Dibuat Oleh
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-blue-100 transition">
                    <td className="border border-gray-200 px-4 py-2 font-semibold">
                      {session.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {session.description}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {new Date(session.createdDate).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          session.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : session.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {session.createdBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Sesi Stock Take */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">📋</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Detail Sesi Stock Take
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-500">
                ID Sesi:
              </span>
              <p className="text-sm text-gray-900 font-semibold">
                {sessionDetails.id}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Deskripsi:
              </span>
              <p className="text-sm text-gray-900 font-semibold">
                {sessionDetails.description}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Tanggal Dibuat:
              </span>
              <p className="text-sm text-gray-900 font-semibold">
                {new Date(sessionDetails.createdDate).toLocaleDateString(
                  "id-ID"
                )}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <p className="text-sm text-gray-900 font-semibold">
                {sessionDetails.status}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Kode Item
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nama Item
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Lokasi Gudang
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Kuantitas Sistem
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Kuantitas Fisik
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Selisih
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nilai Selisih
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Catatan
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessionDetails.items.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-100 transition">
                    <td className="border border-gray-200 px-4 py-2 font-semibold">
                      {item.code}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.location}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.systemQuantity.toLocaleString("id-ID")}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <input
                        type="number"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.physicalQuantity ?? ""}
                        onChange={(e) =>
                          handlePhysicalQuantityChange(index, e.target.value)
                        }
                        placeholder="0"
                      />
                    </td>
                    <td
                      className={`border border-gray-200 px-4 py-2 font-bold text-center ${
                        item.variance === null
                          ? "text-gray-500"
                          : item.variance > 0
                          ? "text-green-600"
                          : item.variance < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {item.variance !== null
                        ? item.variance.toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td
                      className={`border border-gray-200 px-4 py-2 font-bold text-center ${
                        item.varianceValue === null
                          ? "text-gray-500"
                          : item.varianceValue > 0
                          ? "text-green-600"
                          : item.varianceValue < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {formatCurrency(item.varianceValue)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <input
                        type="text"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.notes}
                        onChange={(e) =>
                          handleNotesChange(index, e.target.value)
                        }
                        placeholder="Catatan..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button className="bg-gray-400 hover:bg-gray-500 transition text-white px-5 py-2 rounded-lg font-semibold shadow">
              Simpan Draft
            </button>
            <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-lg font-semibold shadow">
              Finalisasi Stock Take
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
