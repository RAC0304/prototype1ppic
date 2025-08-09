"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "@/lib/supabase";

export default function CustomersPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    customer_code: "",
    name: "",
    address: "",
    contact_person: "",
    email: "",
    phone: "",
    status: "Active" as "Active" | "Inactive",
  });

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);

      const response = await fetch(`/api/customers?${params}`);
      if (!response.ok) throw new Error("Failed to fetch customers");

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError("Failed to load customers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = () => {
    fetchCustomers();
  };

  const handleFilterReset = () => {
    setFilters({ search: "", status: "" });
    setTimeout(fetchCustomers, 100);
  };

  const handleAddNew = () => {
    setEditingCustomer(null);
    setFormData({
      customer_code: "",
      name: "",
      address: "",
      contact_person: "",
      email: "",
      phone: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      customer_code: customer.customer_code,
      name: customer.name,
      address: customer.address || "",
      contact_person: customer.contact_person || "",
      email: customer.email || "",
      phone: customer.phone || "",
      status: customer.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCustomer
        ? `/api/customers/${editingCustomer.id}`
        : "/api/customers";

      const method = editingCustomer ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save customer");
      }

      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save customer");
    }
  };

  const handleToggleStatus = async (customer: Customer) => {
    try {
      const newStatus = customer.status === "Active" ? "Inactive" : "Active";
      const response = await fetch(`/api/customers/${customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      fetchCustomers();
    } catch {
      setError("Failed to update customer status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading customers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 mx-auto">
      <div className="mb-2">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
          Manajemen Pelanggan
        </h1>
        <p className="text-gray-500 text-base">
          Repositori data terpusat untuk semua informasi pelanggan
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-sm">
          {error}
        </div>
      )}

      {/* Filter Panel */}
      <div className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-xl p-4 sm:p-8 border border-gray-100">
        <h2 className="text-lg font-semibold text-black-700">
          Filter & Pencarian
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Pelanggan
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Nama atau Kode Pelanggan"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Semua Status</option>
              <option value="Active">Aktif</option>
              <option value="Inactive">Nonaktif</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button
            onClick={handleFilterApply}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Terapkan Filter
          </button>
          <button
            onClick={handleFilterReset}
            className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-100 overflow-x-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex flex-wrap gap-3 justify-end items-center w-full">
            <button
              onClick={handleAddNew}
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Tambah Pelanggan Baru
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-xl font-bold shadow flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
              Download Data Pelanggan
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Kode Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Nama Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {customer.customer_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{customer.contact_person}</div>
                      <div className="text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-bold rounded-full shadow ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {customer.status === "Active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(customer)}
                      className={`px-3 py-1 rounded transition ${
                        customer.status === "Active"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {customer.status === "Active"
                        ? "Nonaktifkan"
                        : "Aktifkan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-lg">
              Tidak ada data pelanggan ditemukan
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-xl border border-gray-200 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {editingCustomer ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>
            <hr className="mb-4 border-gray-200" />
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Kode Pelanggan *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.customer_code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customer_code: e.target.value,
                      })
                    }
                  />
                  <span className="text-xs text-gray-400">
                    Kode unik pelanggan, wajib diisi.
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Nama Pelanggan *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <span className="text-xs text-gray-400">
                    Nama lengkap pelanggan.
                  </span>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Alamat
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    rows={2}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  <span className="text-xs text-gray-400">
                    Alamat lengkap pelanggan.
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Kontak Person
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.contact_person}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person: e.target.value,
                      })
                    }
                  />
                  <span className="text-xs text-gray-400">
                    Nama kontak utama pelanggan.
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <span className="text-xs text-gray-400">
                    Email aktif pelanggan.
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Telepon
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <span className="text-xs text-gray-400">
                    Nomor telepon pelanggan.
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                  >
                    <option value="Active">Aktif</option>
                    <option value="Inactive">Nonaktif</option>
                  </select>
                  <span className="text-xs text-gray-400">
                    Status aktif/nonaktif pelanggan.
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white font-bold rounded-lg shadow hover:bg-gray-900 transition border border-gray-900"
                >
                  {editingCustomer ? "Update" : "Simpan"}
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
