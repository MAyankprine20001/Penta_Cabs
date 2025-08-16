"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedButton } from "@/components/UI/ThemedButton";
import api from "@/config/axios";

interface Car {
  type: string;
  available: boolean;
  price: number;
}

interface OutstationRoute {
  _id: string;
  city1: string;
  city2: string;
  dateTime: string;
  distance: number;
  tripType: string;
  cars: Car[];
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRoutes: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function OutstationRouteManager() {
  const [routes, setRoutes] = useState<OutstationRoute[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingRoute, setDeletingRoute] = useState<OutstationRoute | null>(
    null
  );

  // Edit state
  const [editingRoute, setEditingRoute] = useState<OutstationRoute | null>(
    null
  );

  // Form states
  const [addForm, setAddForm] = useState({
    city1: "",
    city2: "",
    dateTime: "",
    distance: "",
    tripType: "one-way",
    oneWayCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
    twoWayCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
  });

  const [editForm, setEditForm] = useState({
    city1: "",
    city2: "",
    dateTime: "",
    distance: "",
    tripType: "one-way",
    oneWayCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
    twoWayCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
  });

  useEffect(() => {
    fetchRoutes();
  }, [currentPage]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/outstation-routes?page=${currentPage}&limit=${itemsPerPage}`
      );
      setRoutes(response.data.routes);
      setPagination(response.data.pagination);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setMessage("Error fetching routes: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
    setAddForm({
      city1: "",
      city2: "",
      dateTime: "",
      distance: "",
      tripType: "one-way",
      oneWayCars: [
        { type: "sedan", available: false, price: 0 },
        { type: "suv", available: false, price: 0 },
        { type: "innova", available: false, price: 0 },
        { type: "crysta", available: false, price: 0 },
      ],
      twoWayCars: [
        { type: "sedan", available: false, price: 0 },
        { type: "suv", available: false, price: 0 },
        { type: "innova", available: false, price: 0 },
        { type: "crysta", available: false, price: 0 },
      ],
    });
  };

  const handleAddSubmit = async () => {
    try {
      // Only create the selected trip type route
      const selectedTripType = addForm.tripType;
      const selectedCars =
        selectedTripType === "one-way"
          ? addForm.oneWayCars
          : addForm.twoWayCars;

      const routeEntry = {
        city1: addForm.city1,
        city2: addForm.city2,
        dateTime: addForm.dateTime || new Date().toISOString(),
        distance: parseInt(addForm.distance),
        tripType: selectedTripType,
        cars: selectedCars,
      };

      // Submit only the selected trip type
      await api.post("/add-outstation", routeEntry);

      setMessage(`Outstation ${selectedTripType} route added successfully!`);
      setShowAddModal(false);
      fetchRoutes();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setMessage("Error adding route: " + errorMessage);
    }
  };

  const handleEdit = (route: OutstationRoute) => {
    setEditingRoute(route);

    // Initialize edit form with the route's current data
    // For one-way routes, populate oneWayCars; for two-way, populate twoWayCars
    const oneWayCars =
      route.tripType === "one-way"
        ? [...route.cars]
        : [
            { type: "sedan", available: false, price: 0 },
            { type: "suv", available: false, price: 0 },
            { type: "innova", available: false, price: 0 },
            { type: "crysta", available: false, price: 0 },
          ];

    const twoWayCars =
      route.tripType === "two-way"
        ? [...route.cars]
        : [
            { type: "sedan", available: false, price: 0 },
            { type: "suv", available: false, price: 0 },
            { type: "innova", available: false, price: 0 },
            { type: "crysta", available: false, price: 0 },
          ];

    setEditForm({
      city1: route.city1,
      city2: route.city2,
      dateTime: route.dateTime
        ? new Date(route.dateTime).toISOString().slice(0, 16)
        : "",
      distance: route.distance.toString(),
      tripType: route.tripType,
      oneWayCars,
      twoWayCars,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editingRoute) return;

    try {
      // Get the cars based on selected trip type
      const selectedTripType = editForm.tripType;
      const selectedCars =
        selectedTripType === "one-way"
          ? editForm.oneWayCars
          : editForm.twoWayCars;

      const updatedData = {
        city1: editForm.city1,
        city2: editForm.city2,
        dateTime: editForm.dateTime || new Date().toISOString(),
        distance: parseInt(editForm.distance),
        tripType: selectedTripType,
        cars: selectedCars,
      };

      await api.put(`/api/outstation-routes/${editingRoute._id}`, updatedData);
      setMessage("Route updated successfully!");
      setShowEditModal(false);
      setEditingRoute(null);
      fetchRoutes();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setMessage("Error updating route: " + errorMessage);
    }
  };

  const handleDelete = (route: OutstationRoute) => {
    setDeletingRoute(route);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingRoute) return;

    try {
      await api.delete(`/api/outstation-routes/${deletingRoute._id}`);
      setMessage("Route deleted successfully!");
      setShowDeleteModal(false);
      setDeletingRoute(null);
      fetchRoutes();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setMessage("Error deleting route: " + errorMessage);
    }
  };

  const handleCarChange = (
    formType: "add" | "edit",
    tripType: "oneWayCars" | "twoWayCars",
    index: number,
    field: keyof Car,
    value: boolean | number
  ) => {
    if (formType === "add") {
      const updatedCars = [...addForm[tripType]];
      if (field === "available") {
        updatedCars[index][field] = !updatedCars[index][field];
      } else if (field === "price") {
        updatedCars[index][field] = value as number;
      }
      setAddForm({ ...addForm, [tripType]: updatedCars });
    } else {
      const updatedCars = [...editForm[tripType]];
      if (field === "available") {
        updatedCars[index][field] = !updatedCars[index][field];
      } else if (field === "price") {
        updatedCars[index][field] = value as number;
      }
      setEditForm({ ...editForm, [tripType]: updatedCars });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `₹${price}`;
  };

  if (loading && routes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg" style={{ color: theme.colors.text.primary }}>
          Loading routes...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold"
          style={{
            color: theme.colors.accent.gold,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
          }}
        >
          🚗 Outstation Routes Management
        </h2>
        <ThemedButton onClick={handleAdd}>Add New Route</ThemedButton>
      </div>

      {/* Message */}
      {message && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            backgroundColor: message.includes("Error")
              ? theme.colors.status.error
              : theme.colors.status.success,
            color: theme.colors.text.primary,
          }}
        >
          {message}
        </div>
      )}

      {/* Routes List */}
      <div
        className="rounded-lg shadow overflow-hidden"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.primary}`,
        }}
      >
        <div className="overflow-x-auto">
          <table
            className="min-w-full divide-y"
            style={{ borderColor: theme.colors.border.primary }}
          >
            <thead
              style={{ backgroundColor: theme.colors.background.secondary }}
            >
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Route
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Distance
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Trip Type
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Cars & Prices
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Created
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ borderColor: theme.colors.border.primary }}
            >
              {routes.map((route) => (
                <tr
                  key={route._id}
                  className="hover:bg-opacity-50"
                  style={{ backgroundColor: theme.colors.background.card }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="text-sm font-medium"
                      style={{ color: theme.colors.text.primary }}
                    >
                      {route.city1} → {route.city2}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {route.distance} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        route.tripType === "one-way"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {route.tripType}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    <div className="space-y-1">
                      {route.cars.map((car, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              car.available ? "bg-green-400" : "bg-gray-300"
                            }`}
                          ></span>
                          <span className="capitalize">{car.type}:</span>
                          <span className="font-medium">
                            {formatPrice(car.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {formatDate(route.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(route)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(route)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div
            className="text-sm"
            style={{ color: theme.colors.text.secondary }}
          >
            Showing page {pagination.currentPage} of {pagination.totalPages}(
            {pagination.totalRoutes} total routes)
          </div>
          <div className="flex space-x-2">
            <ThemedButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </ThemedButton>
            <ThemedButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </ThemedButton>
          </div>
        </div>
      )}

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#00000090]  flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: theme.colors.background.card }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: theme.colors.accent.gold }}
            >
              Add New Outstation Route
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    From City
                  </label>
                  <ThemedInput
                    value={addForm.city1}
                    onChange={(e) =>
                      setAddForm({ ...addForm, city1: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    To City
                  </label>
                  <ThemedInput
                    value={addForm.city2}
                    onChange={(e) =>
                      setAddForm({ ...addForm, city2: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Distance (km)
                </label>
                <ThemedInput
                  type="number"
                  value={addForm.distance}
                  onChange={(e) =>
                    setAddForm({ ...addForm, distance: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Date & Time
                </label>
                <ThemedInput
                  type="datetime-local"
                  value={addForm.dateTime}
                  onChange={(e) =>
                    setAddForm({ ...addForm, dateTime: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Trip Type
                </label>
                <select
                  value={addForm.tripType}
                  onChange={(e) =>
                    setAddForm({ ...addForm, tripType: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: theme.colors.background.secondary,
                    borderColor: theme.colors.border.primary,
                    color: theme.colors.text.primary,
                  }}
                >
                  <option value="one-way">One Way</option>
                  <option value="two-way">Two Way</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {addForm.tripType === "one-way" ? "One-Way" : "Two-Way"} Trip
                  Cars & Pricing
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(addForm.tripType === "one-way"
                    ? addForm.oneWayCars
                    : addForm.twoWayCars
                  ).map((car, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg"
                      style={{ borderColor: theme.colors.border.primary }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={car.available}
                          onChange={() =>
                            handleCarChange(
                              "add",
                              addForm.tripType === "one-way"
                                ? "oneWayCars"
                                : "twoWayCars",
                              index,
                              "available",
                              null
                            )
                          }
                          className="w-4 h-4"
                          style={{ accentColor: theme.colors.accent.gold }}
                        />
                        <span
                          className="font-medium capitalize"
                          style={{ color: theme.colors.text.primary }}
                        >
                          {car.type}
                        </span>
                      </div>
                      <ThemedInput
                        type="number"
                        placeholder="Price"
                        value={car.price.toString()}
                        onChange={(e) =>
                          handleCarChange(
                            "add",
                            addForm.tripType === "one-way"
                              ? "oneWayCars"
                              : "twoWayCars",
                            index,
                            "price",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <ThemedButton onClick={() => setShowAddModal(false)}>
                Cancel
              </ThemedButton>
              <ThemedButton onClick={handleAddSubmit}>Add Route</ThemedButton>
            </div>
          </div>
        </div>
      )}

      {/* Edit Route Modal */}
      {showEditModal && editingRoute && (
        <div className="fixed inset-0 bg-[#00000090]   flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: theme.colors.background.card }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: theme.colors.accent.gold }}
            >
              Edit Route
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    From City
                  </label>
                  <ThemedInput
                    value={editForm.city1}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city1: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    To City
                  </label>
                  <ThemedInput
                    value={editForm.city2}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city2: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Distance (km)
                  </label>
                  <ThemedInput
                    type="number"
                    value={editForm.distance}
                    onChange={(e) =>
                      setEditForm({ ...editForm, distance: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Trip Type
                  </label>
                  <select
                    value={editForm.tripType}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tripType: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: theme.colors.background.secondary,
                      borderColor: theme.colors.border.primary,
                      color: theme.colors.text.primary,
                    }}
                  >
                    <option value="one-way">One Way</option>
                    <option value="two-way">Two Way</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Date & Time
                </label>
                <ThemedInput
                  type="datetime-local"
                  value={editForm.dateTime}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dateTime: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {editForm.tripType === "one-way" ? "One-Way" : "Two-Way"} Trip
                  Cars & Pricing
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(editForm.tripType === "one-way"
                    ? editForm.oneWayCars
                    : editForm.twoWayCars
                  ).map((car, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg"
                      style={{ borderColor: theme.colors.border.primary }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={car.available}
                          onChange={() =>
                            handleCarChange(
                              "edit",
                              editForm.tripType === "one-way"
                                ? "oneWayCars"
                                : "twoWayCars",
                              index,
                              "available",
                              null
                            )
                          }
                          className="w-4 h-4"
                          style={{ accentColor: theme.colors.accent.gold }}
                        />
                        <span
                          className="font-medium capitalize"
                          style={{ color: theme.colors.text.primary }}
                        >
                          {car.type}
                        </span>
                      </div>
                      <ThemedInput
                        type="number"
                        placeholder="Price"
                        value={car.price.toString()}
                        onChange={(e) =>
                          handleCarChange(
                            "edit",
                            editForm.tripType === "one-way"
                              ? "oneWayCars"
                              : "twoWayCars",
                            index,
                            "price",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <ThemedButton
                onClick={() => {
                  setShowEditModal(false);
                  setEditingRoute(null);
                }}
              >
                Cancel
              </ThemedButton>
              <ThemedButton onClick={handleUpdate}>Update Route</ThemedButton>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingRoute && (
        <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 max-w-md w-full mx-4"
            style={{ backgroundColor: theme.colors.background.card }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: theme.colors.accent.gold }}
            >
              Confirm Delete
            </h3>
            <p className="mb-6" style={{ color: theme.colors.text.secondary }}>
              Are you sure you want to delete the route from{" "}
              <strong style={{ color: theme.colors.text.primary }}>
                {deletingRoute.city1}
              </strong>{" "}
              to{" "}
              <strong style={{ color: theme.colors.text.primary }}>
                {deletingRoute.city2}
              </strong>
              ?
            </p>
            <p
              className="mb-6 text-sm"
              style={{ color: theme.colors.status.warning }}
            >
              This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <ThemedButton
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingRoute(null);
                }}
              >
                Cancel
              </ThemedButton>
              <ThemedButton onClick={confirmDelete}>Delete Route</ThemedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
