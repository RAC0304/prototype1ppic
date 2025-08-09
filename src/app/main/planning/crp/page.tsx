"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CRPPage() {
  const [filters, setFilters] = useState({
    period: "Minggu Ini",
    workStation: "Semua Stasiun",
  });

  const [chartData] = useState({
    labels: ["Press 400 Ton", "Weld Robot", "Packing Manual"],
    datasets: [
      {
        label: "Persentase Loading (%)",
        data: [75, 110, 60],
        backgroundColor: ["green", "red", "green"],
      },
    ],
  });

  const [tableData] = useState([
    {
      workStation: "Stamping",
      machine: "Press 400 Ton",
      availableHours: 469.5,
      usedHours: 289.8,
      loadingPercentage: 75,
      remainingHours: 179.7,
    },
    {
      workStation: "Welding",
      machine: "Weld Robot",
      availableHours: 300,
      usedHours: 330,
      loadingPercentage: 110,
      remainingHours: -30,
    },
    {
      workStation: "Packing",
      machine: "Packing Manual",
      availableHours: 200,
      usedHours: 120,
      loadingPercentage: 60,
      remainingHours: 80,
    },
  ]);

  return (
    <div className="space-y-6 p-6 mx-auto">
      <div>
        <div className="mb-2">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Analisis Beban Kapasitas Produksi (CRP)
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Halaman ini memberikan analisis visual dan kuantitatif atas kapasitas
          produksi.
        </p>

        {/* Panel Filter Utama */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">🔎</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Filter Analisis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Periode Waktu:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.period}
                onChange={(e) =>
                  setFilters({ ...filters, period: e.target.value })
                }
              >
                <option value="Minggu Ini">Minggu Ini</option>
                <option value="Minggu Depan">Minggu Depan</option>
                <option value="Bulan Ini">Bulan Ini</option>
                <option value="Bulan Depan">Bulan Depan</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stasiun Kerja:
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={filters.workStation}
                onChange={(e) =>
                  setFilters({ ...filters, workStation: e.target.value })
                }
              >
                <option value="Semua Stasiun">Semua Stasiun</option>
                <option value="Stamping">Stamping</option>
                <option value="Welding">Welding</option>
                <option value="Packing">Packing</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg font-semibold shadow">
              Jalankan Analisis
            </button>
          </div>
        </div>

        {/* Visualisasi Beban Kerja */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">📊</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Persentase Utilisasi Kapasitas Mesin
            </h2>
          </div>
          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  beginAtZero: true,
                  max: 120,
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const index = context.dataIndex;
                      const machineData = tableData[index];
                      return `Jam Terpakai: ${machineData.usedHours} / Jam Tersedia: ${machineData.availableHours}`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* Tabel Rincian Beban Kerja */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">🗂️</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Rincian Beban Kerja
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Stasiun Kerja
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Mesin
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Jam Tersedia
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Jam Terpakai
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Loading (%)
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Sisa Jam
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-100 transition">
                    <td className="border border-gray-200 px-4 py-2">
                      {row.workStation}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {row.machine}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {row.availableHours}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {row.usedHours}
                    </td>
                    <td
                      className={`border border-gray-200 px-4 py-2 font-bold text-center ${
                        row.loadingPercentage < 80
                          ? "bg-green-100 text-green-700"
                          : row.loadingPercentage <= 100
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.loadingPercentage}%
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {row.remainingHours}
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
