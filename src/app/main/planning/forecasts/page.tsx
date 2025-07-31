"use client";
import React, { useState } from "react";

// Fixed type errors by explicitly defining types for parameters and forecast data

interface ForecastItem {
  partNumber: string;
  partName: string;
  forecast: Record<string, number>;
}

export default function ForecastsPage() {
  const [selectedVersion, setSelectedVersion] = useState<string>(
    "Forecast Q4 2025 - Skenario Konservatif"
  );
  const [forecastData, setForecastData] = useState<ForecastItem[]>([
    {
      partNumber: "PART-001",
      partName: "Bracket Engine",
      forecast: {
        "Juli 2025": 100,
        "Agustus 2025": 120,
        "September 2025": 150,
      },
    },
    {
      partNumber: "PART-002",
      partName: "Washer Plain 6mm",
      forecast: {
        "Juli 2025": 200,
        "Agustus 2025": 180,
        "September 2025": 220,
      },
    },
  ]);

  const handleInputChange = (
    partNumber: string,
    month: string,
    value: number
  ) => {
    setForecastData((prevData) =>
      prevData.map((item) =>
        item.partNumber === partNumber
          ? {
              ...item,
              forecast: {
                ...item.forecast,
                [month]: value,
              },
            }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Forecast Permintaan
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini memungkinkan Anda untuk memasukkan data perkiraan
          penjualan untuk produk jadi di masa depan.
        </p>

        {/* Panel Kontrol & Aksi */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">⚙️</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Kontrol Forecast
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Versi Forecast:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
              >
                <option value="Forecast Q4 2025 - Skenario Konservatif">
                  Forecast Q4 2025 - Skenario Konservatif
                </option>
                <option value="Forecast 2026 - Skenario Optimis">
                  Forecast 2026 - Skenario Optimis
                </option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-lg font-semibold shadow w-full">
                Buat Versi Baru
              </button>
            </div>
            <div className="flex items-end">
              <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-lg font-semibold shadow w-full">
                Ekspor ke CSV/Excel
              </button>
            </div>
          </div>
        </div>

        {/* Tabel Utama Peramalan */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">🗂️</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Tabel Peramalan Penjualan
            </h2>
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
                    Juli 2025
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Agustus 2025
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    September 2025
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Total Forecast
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((item) => (
                  <tr
                    key={item.partNumber}
                    className="hover:bg-blue-100 transition"
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {item.partNumber}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.partName}
                    </td>
                    {Object.keys(item.forecast).map((month) => (
                      <td
                        className="border border-gray-200 px-4 py-2"
                        key={month}
                      >
                        <input
                          type="number"
                          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value={item.forecast[month]}
                          onChange={(e) =>
                            handleInputChange(
                              item.partNumber,
                              month,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </td>
                    ))}
                    <td className="border border-gray-200 px-4 py-2 font-bold text-blue-700">
                      {Object.values(item.forecast).reduce(
                        (sum, value) => sum + value,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg font-semibold shadow">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
