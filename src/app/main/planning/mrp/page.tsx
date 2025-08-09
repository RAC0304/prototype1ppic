"use client";

import React, { useState } from "react";

interface MRPItem {
  part_id: string;
  part_number: string;
  part_name: string;
  required_quantity: number;
  available_quantity: number;
  shortage_quantity: number;
  due_date: string;
  source: "Sales Order" | "Forecast";
  reference_id: string;
}

interface MRPRequirement {
  material_id: string;
  material_code: string;
  description: string;
  total_required: number;
  available_stock: number;
  planned_orders: number;
  shortage: number;
  suggested_po_quantity: number;
  supplier_lead_time: number;
  order_date: string;
}

interface MRPResults {
  grossRequirements: MRPItem[];
  materialRequirements: MRPRequirement[];
  planningHorizon: number;
  generatedAt: string;
  summary: {
    totalParts: number;
    totalMaterials: number;
    materialsWithShortage: number;
    totalPOValue: number;
  };
}

export default function MRPPage() {
  const [mrpResults, setMrpResults] = useState<MRPResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [planningHorizon, setPlanningHorizon] = useState(90);
  const [activeTab, setActiveTab] = useState<
    "requirements" | "materials" | "summary"
  >("summary");

  const runMRP = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/mrp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planningHorizonDays: planningHorizon }),
      });

      if (!response.ok) {
        throw new Error("Failed to run MRP calculation");
      }

      const data = await response.json();
      setMrpResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run MRP");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  return (
    <div className="space-y-6 p-6 mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Material Requirements Planning (MRP)
        </h1>
        <p className="text-gray-600">
          Kalkulasi kebutuhan material berdasarkan sales order dan peramalan
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Planning Controls */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Parameter Perencanaan</h2>
        <div className="flex items-end space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horizon Perencanaan (Hari)
            </label>
            <input
              type="number"
              min="30"
              max="365"
              value={planningHorizon}
              onChange={(e) => setPlanningHorizon(parseInt(e.target.value))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={runMRP}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Menghitung..." : "Jalankan MRP"}
          </button>
        </div>
      </div>

      {mrpResults && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">
                Total Produk
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {mrpResults.summary.totalParts}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">
                Total Material
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {mrpResults.summary.totalMaterials}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">
                Material Kurang
              </div>
              <div className="text-2xl font-bold text-red-600">
                {mrpResults.summary.materialsWithShortage}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">
                Estimasi Nilai PO
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(mrpResults.summary.totalPOValue)}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "summary"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Ringkasan
                </button>
                <button
                  onClick={() => setActiveTab("requirements")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "requirements"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Kebutuhan Produk ({mrpResults.grossRequirements.length})
                </button>
                <button
                  onClick={() => setActiveTab("materials")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "materials"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Kebutuhan Material ({mrpResults.materialRequirements.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Summary Tab */}
              {activeTab === "summary" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Informasi Perhitungan
                    </h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Tanggal Perhitungan
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {formatDate(mrpResults.generatedAt)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Horizon Perencanaan
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {mrpResults.planningHorizon} hari
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Material dengan Kekurangan
                    </h3>
                    {mrpResults.materialRequirements.filter(
                      (m) => m.shortage > 0
                    ).length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kode Material
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Deskripsi
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kekurangan
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Saran PO
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mrpResults.materialRequirements
                              .filter((m) => m.shortage > 0)
                              .map((material, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {material.material_code}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-900">
                                    {material.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                    {formatNumber(material.shortage)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                    {formatNumber(
                                      material.suggested_po_quantity
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Tidak ada material yang kekurangan stock
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Requirements Tab */}
              {activeTab === "requirements" && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Part Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama Produk
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kebutuhan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tersedia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kekurangan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tanggal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sumber
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mrpResults.grossRequirements.map(
                        (requirement, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {requirement.part_number}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {requirement.part_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatNumber(requirement.required_quantity)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatNumber(requirement.available_quantity)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                              {formatNumber(requirement.shortage_quantity)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(requirement.due_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  requirement.source === "Sales Order"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {requirement.source}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Materials Tab */}
              {activeTab === "materials" && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kode Material
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deskripsi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Kebutuhan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock Tersedia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kekurangan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Saran PO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tanggal Order
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mrpResults.materialRequirements.map(
                        (material, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 ${
                              material.shortage > 0 ? "bg-red-50" : ""
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {material.material_code}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {material.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatNumber(material.total_required)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatNumber(material.available_stock)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                              {formatNumber(material.shortage)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                              {material.suggested_po_quantity > 0
                                ? formatNumber(material.suggested_po_quantity)
                                : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {material.order_date
                                ? formatDate(material.order_date)
                                : "-"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {!mrpResults && !loading && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-gray-500 mb-4">
            Belum ada hasil perhitungan MRP
          </div>
          <p className="text-sm text-gray-400">
            Klik &quot;Jalankan MRP&quot; untuk memulai perhitungan kebutuhan
            material
          </p>
        </div>
      )}
    </div>
  );
}
