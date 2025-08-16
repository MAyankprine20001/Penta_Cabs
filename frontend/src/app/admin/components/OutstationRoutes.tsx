"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
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
  hasNext: boolean;
  hasPrev: boolean;
}

export interface OutstationRoutesRef {
  fetchRoutes: () => void;
}

const OutstationRoutes = forwardRef<OutstationRoutesRef>((props, ref) => {
  const [routes, setRoutes] = useState<OutstationRoute[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalRoutes: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<OutstationRoute | null>(
    null
  );
  const [editForm, setEditForm] = useState<Partial<OutstationRoute>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRoutes();
  }, [pagination.currentPage]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/outstation-routes?page=${pagination.currentPage}&limit=10`
      );
      setRoutes(response.data.routes);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching routes:", error);
      setMessage("Error fetching routes");
    } finally {
      setLoading(false);
    }
  };

  // Expose fetchRoutes method to parent component
  useImperativeHandle(ref, () => ({
    fetchRoutes,
  }));

  const handleEdit = (route: OutstationRoute) => {
    setSelectedRoute(route);
    setEditForm({
      city1: route.city1,
      city2: route.city2,
      distance: route.distance,
      tripType: route.tripType,
      cars: route.cars,
    });
    setShowEditModal(true);
  };

  const handleDelete = (route: OutstationRoute) => {
    setSelectedRoute(route);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute) return;

    try {
      await api.put(`/api/outstation-routes/${selectedRoute._id}`, editForm);
      setMessage("Route updated successfully!");
      setShowEditModal(false);
      // Refresh the list after successful edit
      fetchRoutes();
    } catch (error) {
      console.error("Error updating route:", error);
      setMessage("Error updating route");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoute) return;

    try {
      await api.delete(`/api/outstation-routes/${selectedRoute._id}`);
      setMessage("Route deleted successfully!");
      setShowEditModal(false);
      setShowDeleteModal(false);
      // Refresh the list after successful delete
      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error);
      setMessage("Error deleting route");
    }
  };

  const handleCarChange = (
    index: number,
    field: keyof Car,
    value: boolean | number
  ) => {
    if (!editForm.cars) return;

    const updatedCars = [...editForm.cars];
    if (field === "available") {
      updatedCars[index][field] = !updatedCars[index][field];
    } else if (field === "price") {
      updatedCars[index][field] = value as number;
    }
    setEditForm({ ...editForm, cars: updatedCars });
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.city1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.city2.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTripTypeBadge = (tripType: string) => {
    const isOneWay = tripType === "one-way";
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
          isOneWay ? "bg-blue-500" : "bg-green-500"
        }`}
      >
        {isOneWay ? "One Way" : "Two Way"}
      </span>
    );
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{
              color: theme.colors.accent.gold,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            Outstation Routes Management
          </h2>
          <p className="text-gray-400 mt-1">
            Manage inter-city routes, distances, and vehicle pricing
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {pagination.totalRoutes}
            </div>
            <div className="text-sm text-gray-400">Total Routes</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search routes by city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="text-gray-400">Loading routes...</div>
        </div>
      )}

      {/* Routes Table */}
      {!loading && (
        <div
          className="rounded-2xl border border-gray-700 overflow-hidden"
          style={{
            backgroundColor: theme.colors.background.card,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Route
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Distance
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Cars
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route, index) => (
                  <tr
                    key={route._id}
                    className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-white">
                          {route.city1} → {route.city2}
                        </div>
                        <div className="text-sm text-gray-400">
                          ID: {route._id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getTripTypeBadge(route.tripType)}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {route.distance} km
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {route.cars.map((car, idx) => (
                          <div key={idx} className="text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                car.available
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-600 text-gray-300"
                              }`}
                            >
                              {car.type}: ₹{car.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {formatDate(route.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(route)}
                          className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(route)}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
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

          {filteredRoutes.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-lg">No routes found</div>
              <div className="text-gray-500 text-sm mt-2">
                Try adjusting your search or add new routes
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Message */}
      {message && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            backgroundColor:
              message.includes("Error") || message.includes("failed")
                ? theme.colors.status.error
                : theme.colors.status.success,
            color: theme.colors.text.primary,
          }}
        >
          {message}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-2xl p-6"
            style={{
              backgroundColor: theme.colors.background.card,
              border: `1px solid ${theme.colors.border.primary}`,
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className="text-xl font-bold"
                style={{
                  color: theme.colors.accent.gold,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Edit Route: {selectedRoute.city1} → {selectedRoute.city2}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    From City
                  </label>
                  <ThemedInput
                    type="text"
                    value={editForm.city1 || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city1: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    To City
                  </label>
                  <ThemedInput
                    type="text"
                    value={editForm.city2 || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city2: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Distance (km)
                  </label>
                  <ThemedInput
                    type="number"
                    value={editForm.distance?.toString() || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        distance: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Trip Type
                  </label>
                  <select
                    value={editForm.tripType || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tripType: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="one-way">One Way</option>
                    <option value="two-way">Two Way</option>
                  </select>
                </div>
              </div>

              {/* Cars Configuration */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  Car Configuration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editForm.cars?.map((car, index) => (
                    <div
                      key={car.type}
                      className="p-4 border rounded-lg"
                      style={{
                        borderColor: theme.colors.border.primary,
                        backgroundColor: theme.colors.background.secondary,
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={car.available}
                          onChange={() =>
                            handleCarChange(index, "available", null)
                          }
                          className="w-4 h-4"
                          style={{
                            accentColor: theme.colors.accent.gold,
                          }}
                        />
                        <label className="font-medium text-white">
                          {car.type.toUpperCase()}
                        </label>
                      </div>
                      <ThemedInput
                        type="number"
                        placeholder="Price"
                        value={car.price.toString()}
                        onChange={(e) =>
                          handleCarChange(
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

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: theme.colors.accent.gold,
                    color: theme.colors.primary.black,
                  }}
                >
                  Update Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="max-w-md w-full mx-4 rounded-2xl p-6"
            style={{
              backgroundColor: theme.colors.background.card,
              border: `1px solid ${theme.colors.border.primary}`,
            }}
          >
            <div className="text-center">
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  color: theme.colors.accent.gold,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Confirm Delete
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete the route from{" "}
                <strong>{selectedRoute.city1}</strong> to{" "}
                <strong>{selectedRoute.city2}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

OutstationRoutes.displayName = "OutstationRoutes";

export default OutstationRoutes;
