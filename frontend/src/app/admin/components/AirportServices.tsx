"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
import api from "@/config/axios";

interface Car {
  type: string;
  available: boolean;
  price: number;
}

interface AirportService {
  _id: string;
  airportCity: string;
  airportName: string;
  airportCode: string;
  serviceType: string;
  otherLocation: string;
  dateTime: string;
  distance: number;
  cars: Car[];
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalServices: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AirportServicesRef {
  fetchServices: () => void;
}

interface AirportServicesProps {
  onAddService?: () => void;
}

const AirportServices = forwardRef<AirportServicesRef, AirportServicesProps>(
  (props, ref) => {
    const [services, setServices] = useState<AirportService[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
      currentPage: 1,
      totalPages: 1,
      totalServices: 0,
      hasNext: false,
      hasPrev: false,
    });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedService, setSelectedService] =
      useState<AirportService | null>(null);
    const [editForm, setEditForm] = useState<Partial<AirportService>>({});
    const [message, setMessage] = useState("");

    // Debounce search term
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 500);

      return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
      fetchServices();
    }, [pagination.currentPage, debouncedSearchTerm]);

    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: pagination.currentPage.toString(),
          limit: "10",
        });

        if (debouncedSearchTerm.trim()) {
          params.append("search", debouncedSearchTerm.trim());
        }

        const response = await api.get(
          `/api/airport-services?${params.toString()}`
        );
        setServices(response.data.services);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching services:", error);
        setMessage("Error fetching services");
      } finally {
        setLoading(false);
      }
    };

    // Expose fetchServices method to parent component
    useImperativeHandle(ref, () => ({
      fetchServices,
    }));

    const handleEdit = (service: AirportService) => {
      setSelectedService(service);
      setEditForm({
        airportCity: service.airportCity,
        airportName: service.airportName,
        airportCode: service.airportCode,
        serviceType: service.serviceType,
        otherLocation: service.otherLocation,
        distance: service.distance,
        cars: service.cars,
      });
      setShowEditModal(true);
    };

    const handleDelete = (service: AirportService) => {
      setSelectedService(service);
      setShowDeleteModal(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedService) return;

      try {
        await api.put(`/api/airport-services/${selectedService._id}`, editForm);
        setMessage("Service updated successfully!");
        setShowEditModal(false);
        // Refresh the list after successful edit
        fetchServices();
      } catch (error) {
        console.error("Error updating service:", error);
        setMessage("Error updating service");
      }
    };

    const handleDeleteConfirm = async () => {
      if (!selectedService) return;

      try {
        await api.delete(`/api/airport-services/${selectedService._id}`);
        setMessage("Service deleted successfully!");
        setShowEditModal(false);
        setShowDeleteModal(false);
        // Refresh the list after successful delete
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
        setMessage("Error deleting service");
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      // Reset to first page when searching
      if (pagination.currentPage !== 1) {
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
      }
    };

    const handlePageChange = useCallback((newPage: number) => {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }, []);

    const generatePageNumbers = useCallback(() => {
      const pages = [];
      const totalPages = pagination.totalPages;
      const currentPage = pagination.currentPage;

      // Always show first page
      pages.push(1);

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    }, [pagination.totalPages, pagination.currentPage]);

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString();
    };

    const getServiceTypeBadge = (serviceType: string) => {
      const isPickup = serviceType === "pick";
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            isPickup ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {isPickup ? "Pickup" : "Drop"}
        </span>
      );
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
              Airport Services Management
            </h2>
            <p className="text-gray-400 mt-1">
              Manage airport transfer services with pickup and drop pricing
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {pagination.totalServices}
              </div>
              <div className="text-sm text-gray-400">Total Services</div>
            </div>
          </div>
        </div>

        {/* Add New Service Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              // Call the parent component's onAddService function to open the form
              if (props.onAddService) {
                props.onAddService();
              }
            }}
            className="px-8 py-3 text-lg rounded-lg font-semibold transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: theme.colors.accent.gold,
              color: theme.colors.primary.black,
            }}
          >
            ➕ Add New Airport Service
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search services by airport city, location, or service type..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setPagination((prev) => ({ ...prev, currentPage: 1 }));
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
          {debouncedSearchTerm !== searchTerm && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
            </div>
          )}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
              <div className="text-gray-400">Loading services...</div>
            </div>
          </div>
        )}

        {/* Services Table */}
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
                      Airport
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Service Type
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Location
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
                  {services.map((service, index) => (
                    <tr
                      key={service._id}
                      className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-white">
                            {service.airportCity}
                          </div>
                          <div className="text-sm text-gray-400">
                            {service.airportName} ({service.airportCode})
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {service._id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getServiceTypeBadge(service.serviceType)}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {service.otherLocation}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {service.distance} km
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {service.cars && service.cars.length > 0 ? (
                            service.cars.map((car, idx) => (
                              <div key={idx} className="text-sm">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    car.available
                                      ? "bg-green-600 text-white"
                                      : "bg-gray-600 text-gray-300"
                                  }`}
                                >
                                  {car.type || "Unknown"}: ₹{car.price}
                                </span>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">
                              No cars configured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(service.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service)}
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

            {services.length === 0 && !loading && (
              <div className="p-8 text-center">
                <div className="text-gray-400 text-lg">No services found</div>
                <div className="text-gray-500 text-sm mt-2">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Add new services to get started"}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              {loading ? (
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                "Previous"
              )}
            </button>

            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" ? handlePageChange(page) : null
                }
                disabled={page === "..." || loading}
                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                  page === "..."
                    ? "bg-transparent cursor-default"
                    : page === pagination.currentPage
                    ? "bg-yellow-500 text-black font-semibold"
                    : "bg-gray-700 hover:bg-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              {loading ? (
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                "Next"
              )}
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {!loading && (
          <div className="text-center text-gray-400 text-sm">
            Showing {services.length} of {pagination.totalServices} services
            {pagination.totalPages > 1 && (
              <span>
                {" "}
                • Page {pagination.currentPage} of {pagination.totalPages}
              </span>
            )}
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
        {showEditModal && selectedService && (
          <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
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
                  Edit Service: {selectedService.airportCity} -{" "}
                  {selectedService.serviceType}
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
                      Airport City
                    </label>
                    <ThemedInput
                      type="text"
                      value={editForm.airportCity || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          airportCity: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Airport Name
                    </label>
                    <ThemedInput
                      type="text"
                      value={editForm.airportName || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          airportName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Airport Code
                    </label>
                    <ThemedInput
                      type="text"
                      value={editForm.airportCode || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          airportCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Service Type
                    </label>
                    <select
                      value={editForm.serviceType || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          serviceType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="pick">Pickup</option>
                      <option value="drop">Drop</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Other Location
                    </label>
                    <ThemedInput
                      type="text"
                      value={editForm.otherLocation || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          otherLocation: e.target.value,
                        })
                      }
                    />
                  </div>
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
                </div>

                {/* Cars Configuration */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    Car Configuration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editForm.cars && editForm.cars.length > 0 ? (
                      editForm.cars.map((car, index) => (
                        <div
                          key={car.type || index}
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
                              {car.type ? car.type.toUpperCase() : "Unknown"}
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
                      ))
                    ) : (
                      <div className="col-span-2 text-center text-gray-500 py-4">
                        No cars configured for this service
                      </div>
                    )}
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
                    Update Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedService && (
          <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50">
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
                  Are you sure you want to delete the airport service for{" "}
                  <strong>{selectedService.airportCity}</strong> with{" "}
                  <strong>{selectedService.serviceType}</strong> service to{" "}
                  <strong>{selectedService.otherLocation}</strong>? This action
                  cannot be undone.
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
  }
);

AirportServices.displayName = "AirportServices";

export default AirportServices;
