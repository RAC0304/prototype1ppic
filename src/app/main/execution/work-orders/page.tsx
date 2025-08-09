"use client";

import React, { useState, useEffect } from "react";

interface WorkOrder {
  id: string;
  work_order_number: string;
  part_id: string;
  part_number?: string;
  part_name?: string;
  quantity_ordered: number;
  quantity_produced: number;
  uom?: string;
  start_date: string;
  due_date: string;
  actual_start_date?: string;
  actual_completion_date?: string;
  status: "Planned" | "Released" | "In Progress" | "Completed" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Critical";
  sales_order_number?: string;
  notes?: string;
  created_date: string;
}

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingWorkOrder, setEditingWorkOrder] = useState<WorkOrder | null>(
    null
  );
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [formData, setFormData] = useState({
    work_order_number: "",
    part_id: "",
    quantity_ordered: 0,
    start_date: "",
    due_date: "",
    status: "Planned" as WorkOrder["status"],
    priority: "Medium" as WorkOrder["priority"],
    sales_order_number: "",
    notes: "",
  });

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      setLoading(true);

      // Mock work order data for demonstration
      const mockWorkOrders: WorkOrder[] = [
        {
          id: "1",
          work_order_number: "WO-2024-001",
          part_id: "1",
          part_number: "FG-001",
          part_name: "Product A",
          quantity_ordered: 100,
          quantity_produced: 75,
          uom: "PCS",
          start_date: "2024-01-15",
          due_date: "2024-01-25",
          actual_start_date: "2024-01-15",
          status: "In Progress",
          priority: "High",
          sales_order_number: "SO-2024-001",
          notes: "Rush order for customer ABC",
          created_date: "2024-01-10",
        },
        {
          id: "2",
          work_order_number: "WO-2024-002",
          part_id: "2",
          part_number: "FG-002",
          part_name: "Product B",
          quantity_ordered: 50,
          quantity_produced: 50,
          uom: "PCS",
          start_date: "2024-01-10",
          due_date: "2024-01-20",
          actual_start_date: "2024-01-10",
          actual_completion_date: "2024-01-18",
          status: "Completed",
          priority: "Medium",
          sales_order_number: "SO-2024-002",
          created_date: "2024-01-05",
        },
        {
          id: "3",
          work_order_number: "WO-2024-003",
          part_id: "3",
          part_number: "FG-003",
          part_name: "Product C",
          quantity_ordered: 75,
          quantity_produced: 0,
          uom: "PCS",
          start_date: "2024-01-30",
          due_date: "2024-02-10",
          status: "Planned",
          priority: "Low",
          sales_order_number: "SO-2024-003",
          created_date: "2024-01-20",
        },
      ];

      setWorkOrders(mockWorkOrders);
    } catch (err) {
      setError("Failed to load work orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingWorkOrder(null);
    setFormData({
      work_order_number: `WO-${new Date().getFullYear()}-${String(
        workOrders.length + 1
      ).padStart(3, "0")}`,
      part_id: "",
      quantity_ordered: 0,
      start_date: new Date().toISOString().split("T")[0],
      due_date: "",
      status: "Planned",
      priority: "Medium",
      sales_order_number: "",
      notes: "",
    });
    setShowModal(true);
  };

  const handleEdit = (workOrder: WorkOrder) => {
    setEditingWorkOrder(workOrder);
    setFormData({
      work_order_number: workOrder.work_order_number,
      part_id: workOrder.part_id,
      quantity_ordered: workOrder.quantity_ordered,
      start_date: workOrder.start_date,
      due_date: workOrder.due_date,
      status: workOrder.status as WorkOrder["status"],
      priority: workOrder.priority as WorkOrder["priority"],
      sales_order_number: workOrder.sales_order_number || "",
      notes: workOrder.notes || "",
    });
    setShowModal(true);
  };

  const handleViewDetails = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowDetailModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real implementation, this would call the work order API
      console.log("Saving work order:", formData);
      if (editingWorkOrder) {
        // Edit existing work order
        setWorkOrders((prev) =>
          prev.map((wo) =>
            wo.id === editingWorkOrder.id ? { ...wo, ...formData } : wo
          )
        );
      } else {
        // Add new work order
        setWorkOrders((prev) => [
          ...prev,
          {
            ...formData,
            id: (prev.length + 1).toString(),
            quantity_produced: 0,
            part_number:
              formData.part_id === "1"
                ? "FG-001"
                : formData.part_id === "2"
                ? "FG-002"
                : formData.part_id === "3"
                ? "FG-003"
                : undefined,
            part_name:
              formData.part_id === "1"
                ? "Product A"
                : formData.part_id === "2"
                ? "Product B"
                : formData.part_id === "3"
                ? "Product C"
                : undefined,
            uom: "PCS",
            created_date: new Date().toISOString().split("T")[0],
          },
        ]);
      }
      setShowModal(false);
      setEditingWorkOrder(null);
      // fetchWorkOrders(); // Refresh data
    } catch {
      setError("Failed to save work order");
    }
  };

  const handleStatusUpdate = async (
    workOrderId: string,
    newStatus: WorkOrder["status"]
  ) => {
    try {
      // In a real implementation, this would call the API to update status
      const updatedWorkOrders = workOrders.map((wo) =>
        wo.id === workOrderId ? { ...wo, status: newStatus } : wo
      );
      setWorkOrders(updatedWorkOrders);
    } catch {
      setError("Failed to update work order status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planned":
        return "bg-gray-100 text-gray-800";
      case "Released":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgress = (workOrder: WorkOrder) => {
    if (workOrder.quantity_ordered === 0) return 0;
    return Math.round(
      (workOrder.quantity_produced / workOrder.quantity_ordered) * 100
    );
  };

  const filteredWorkOrders = workOrders.filter((wo) => {
    const statusMatch = filterStatus === "all" || wo.status === filterStatus;
    const priorityMatch =
      filterPriority === "all" || wo.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading work orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 mx-auto">
      <div className="">
        <div className="mb-2">
          <h1 className="text-2xl font-extrabold text-gray-800">Work Orders</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Kelola dan monitor perintah kerja produksi
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">🔎</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Filter & Actions
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status Filter
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Planned">Planned</option>
                  <option value="Released">Released</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority Filter
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 flex items-center gap-2"
            >
              <span>➕</span> Create Work Order
            </button>
          </div>
        </div>

        {/* Work Orders Table */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">🗂️</span>
            <h2 className="text-lg font-semibold text-gray-700">
              Daftar Work Order
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Work Order
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Progress
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Dates
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Priority
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkOrders.map((workOrder) => (
                  <tr
                    key={workOrder.id}
                    className="hover:bg-blue-100 transition"
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      <div className="font-medium text-gray-800">
                        {workOrder.work_order_number}
                      </div>
                      {workOrder.sales_order_number && (
                        <div className="text-gray-500 text-xs">
                          SO: {workOrder.sales_order_number}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div className="font-medium text-gray-800">
                        {workOrder.part_number}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {workOrder.part_name}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div>
                        {workOrder.quantity_produced} /{" "}
                        {workOrder.quantity_ordered} {workOrder.uom}
                      </div>
                      <div className="text-gray-500 text-xs">
                        ({getProgress(workOrder)}% complete)
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${getProgress(workOrder)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div>
                        Start:{" "}
                        {new Date(workOrder.start_date).toLocaleDateString(
                          "id-ID"
                        )}
                      </div>
                      <div>
                        Due:{" "}
                        {new Date(workOrder.due_date).toLocaleDateString(
                          "id-ID"
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                          workOrder.priority
                        )}`}
                      >
                        {workOrder.priority}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <select
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-none ${getStatusColor(
                          workOrder.status
                        )}`}
                        value={workOrder.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            workOrder.id,
                            e.target.value as WorkOrder["status"]
                          )
                        }
                      >
                        <option value="Planned">Planned</option>
                        <option value="Released">Released</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(workOrder)}
                          className="text-blue-600 hover:text-blue-900 font-semibold flex items-center gap-1"
                        >
                          <span>👁️</span> Details
                        </button>
                        <button
                          onClick={() => handleEdit(workOrder)}
                          className="text-green-600 hover:text-green-900 font-semibold flex items-center gap-1"
                        >
                          <span>✏️</span> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredWorkOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No work orders found for the selected filters
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto border border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {editingWorkOrder ? <span>✏️</span> : <span>➕</span>}{" "}
                {editingWorkOrder ? "Edit Work Order" : "Create New Work Order"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Work Order Number *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.work_order_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          work_order_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sales Order Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.sales_order_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sales_order_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product *
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.part_id}
                      onChange={(e) =>
                        setFormData({ ...formData, part_id: e.target.value })
                      }
                    >
                      <option value="">Select Product</option>
                      <option value="1">FG-001 - Product A</option>
                      <option value="2">FG-002 - Product B</option>
                      <option value="3">FG-003 - Product C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity Ordered *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.quantity_ordered}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity_ordered: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.due_date}
                      onChange={(e) =>
                        setFormData({ ...formData, due_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as WorkOrder["priority"],
                        })
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as WorkOrder["status"],
                        })
                      }
                    >
                      <option value="Planned">Planned</option>
                      <option value="Released">Released</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
                  >
                    {editingWorkOrder ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 bg-gray-400 text-white rounded-lg font-semibold shadow hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedWorkOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto border border-gray-200 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>👁️</span> Work Order Details -{" "}
                  {selectedWorkOrder.work_order_number}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Work Order Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Number:</span>{" "}
                        {selectedWorkOrder.work_order_number}
                      </div>
                      <div>
                        <span className="font-medium">Sales Order:</span>{" "}
                        {selectedWorkOrder.sales_order_number || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(
                          selectedWorkOrder.created_date
                        ).toLocaleDateString("id-ID")}
                      </div>
                      <div>
                        <span className="font-medium">Priority:</span>{" "}
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getPriorityColor(
                            selectedWorkOrder.priority
                          )}`}
                        >
                          {selectedWorkOrder.priority}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            selectedWorkOrder.status
                          )}`}
                        >
                          {selectedWorkOrder.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Product Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Part Number:</span>{" "}
                        {selectedWorkOrder.part_number}
                      </div>
                      <div>
                        <span className="font-medium">Part Name:</span>{" "}
                        {selectedWorkOrder.part_name}
                      </div>
                      <div>
                        <span className="font-medium">Quantity Ordered:</span>{" "}
                        {selectedWorkOrder.quantity_ordered}{" "}
                        {selectedWorkOrder.uom}
                      </div>
                      <div>
                        <span className="font-medium">Quantity Produced:</span>{" "}
                        {selectedWorkOrder.quantity_produced}{" "}
                        {selectedWorkOrder.uom}
                      </div>
                      <div>
                        <span className="font-medium">Progress:</span>{" "}
                        {getProgress(selectedWorkOrder)}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Schedule Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Planned Start:</span>{" "}
                        {new Date(
                          selectedWorkOrder.start_date
                        ).toLocaleDateString("id-ID")}
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span>{" "}
                        {new Date(
                          selectedWorkOrder.due_date
                        ).toLocaleDateString("id-ID")}
                      </div>
                      <div>
                        <span className="font-medium">Actual Start:</span>{" "}
                        {selectedWorkOrder.actual_start_date
                          ? new Date(
                              selectedWorkOrder.actual_start_date
                            ).toLocaleDateString("id-ID")
                          : "Not started"}
                      </div>
                      <div>
                        <span className="font-medium">Actual Completion:</span>{" "}
                        {selectedWorkOrder.actual_completion_date
                          ? new Date(
                              selectedWorkOrder.actual_completion_date
                            ).toLocaleDateString("id-ID")
                          : "Not completed"}
                      </div>
                    </div>
                  </div>
                  {selectedWorkOrder.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">
                        {selectedWorkOrder.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
