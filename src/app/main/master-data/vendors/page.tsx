'use client'

import React, { useState, useEffect } from 'react';
import { Vendor } from '@/lib/supabase';

export default function VendorsPage() {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
  });
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    vendor_code: '',
    name: '',
    category: 'Supplier' as 'Supplier' | 'Subcontractor',
    address: '',
    contact_person: '',
    email: '',
    phone: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  useEffect(() => {
    fetchVendors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.category) params.append('category', filters.category);
      
      const response = await fetch(`/api/vendors?${params}`);
      if (!response.ok) throw new Error('Failed to fetch vendors');
      
      const data = await response.json();
      setVendors(data);
    } catch (err) {
      setError('Failed to load vendors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = () => {
    fetchVendors();
  };

  const handleFilterReset = () => {
    setFilters({ search: '', status: '', category: '' });
    setTimeout(fetchVendors, 100);
  };

  const handleAddNew = () => {
    setEditingVendor(null);
    setFormData({
      vendor_code: '',
      name: '',
      category: 'Supplier',
      address: '',
      contact_person: '',
      email: '',
      phone: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      vendor_code: vendor.vendor_code,
      name: vendor.name,
      category: vendor.category,
      address: vendor.address || '',
      contact_person: vendor.contact_person || '',
      email: vendor.email || '',
      phone: vendor.phone || '',
      status: vendor.status
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingVendor 
        ? `/api/vendors/${editingVendor.id}`
        : '/api/vendors';
      
      const method = editingVendor ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save vendor');
      }

      setShowModal(false);
      fetchVendors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save vendor');
    }
  };

  const handleToggleStatus = async (vendor: Vendor) => {
    try {
      const newStatus = vendor.status === 'Active' ? 'Inactive' : 'Active';
      const response = await fetch(`/api/vendors/${vendor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      fetchVendors();
    } catch {
      setError('Failed to update vendor status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading vendors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Vendor</h1>
        <p className="text-gray-600">Repositori data terpusat untuk semua pemasok dan subkontraktor</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filter Panel */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Filter & Pencarian</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Vendor
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama atau Kode Vendor"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">Semua Kategori</option>
              <option value="Supplier">Supplier</option>
              <option value="Subcontractor">Subkontraktor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Semua Status</option>
              <option value="Active">Aktif</option>
              <option value="Inactive">Nonaktif</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleFilterApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Terapkan Filter
          </button>
          <button
            onClick={handleFilterReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Tambah Vendor Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kode Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vendor.vendor_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      vendor.category === 'Supplier' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {vendor.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{vendor.contact_person}</div>
                      <div className="text-gray-500">{vendor.phone}</div>
                      <div className="text-gray-500">{vendor.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vendor.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {vendor.status === 'Active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(vendor)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(vendor)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {vendor.status === 'Active' ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {vendors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada data vendor ditemukan
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md sm:max-w-xl border border-gray-200 relative max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingVendor ? 'Edit Vendor' : 'Tambah Vendor Baru'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Kode Vendor *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.vendor_code}
                    onChange={(e) => setFormData({ ...formData, vendor_code: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">Kode unik vendor, wajib diisi.</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Nama Vendor *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">Nama lengkap vendor.</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Kategori *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Supplier' | 'Subcontractor' })}
                  >
                    <option value="Supplier">Supplier</option>
                    <option value="Subcontractor">Subkontraktor</option>
                  </select>
                  <span className="text-xs text-gray-400">Pilih kategori vendor.</span>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Alamat</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">Alamat lengkap vendor.</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Kontak Person</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">Nama kontak utama vendor.</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">Email aktif vendor.</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Telepon</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">Nomor telepon vendor.</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                  >
                    <option value="Active">Aktif</option>
                    <option value="Inactive">Nonaktif</option>
                  </select>
                  <span className="text-xs text-gray-400">Status aktif/nonaktif vendor.</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white font-bold rounded-lg shadow hover:bg-gray-900 transition border border-gray-900"
                >
                  {editingVendor ? 'Update' : 'Simpan'}
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