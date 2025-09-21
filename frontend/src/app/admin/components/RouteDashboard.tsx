"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { theme } from "@/styles/theme";

interface Route {
  id: string;
  routeName: string;
  from: string;
  to: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  status: "active" | "inactive";
  tags: string[];
  lastBooking: string;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRoutes: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface RouteDashboardProps {
  onAddRoute?: () => void;
  onEditRoute?: (route: Route) => void;
}

const RouteDashboard = forwardRef<
  { fetchRoutes: () => void },
  RouteDashboardProps
>(({ onAddRoute, onEditRoute }, ref) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalRoutes: 0,
    hasNext: false,
    hasPrev: false,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [message, setMessage] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchRoutes();
  }, [
    pagination.currentPage,
    pagination.limit,
    debouncedSearchTerm,
    statusFilter,
  ]);

  const fetchRoutes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.limit.toString(),
      });

      if (debouncedSearchTerm.trim()) {
        params.append("search", debouncedSearchTerm.trim());
      }
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/routes?${params.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        setRoutes(data.data || []);
        const backendPagination = data.pagination;
        setPagination({
          currentPage: backendPagination?.currentPage || 1,
          totalPages: backendPagination?.totalPages || 1,
          totalRoutes: backendPagination?.total || 0,
          hasNext: backendPagination?.hasNextPage || false,
          hasPrev: backendPagination?.hasPrevPage || false,
          limit: backendPagination?.limit || 10,
          total: backendPagination?.total || 0,
          hasNextPage: backendPagination?.hasNextPage || false,
          hasPrevPage: backendPagination?.hasPrevPage || false,
        });
      } else {
        console.error("Failed to fetch routes:", data.message);
        setRoutes([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalRoutes: 0,
          hasNext: false,
          hasPrev: false,
          limit: 10,
          total: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      setRoutes([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalRoutes: 0,
        hasNext: false,
        hasPrev: false,
        limit: 10,
        total: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setLoading(false);
    }
  }, [
    pagination.currentPage,
    pagination.limit,
    debouncedSearchTerm,
    statusFilter,
  ]);

  // Expose fetchRoutes method to parent component
  useImperativeHandle(ref, () => ({
    fetchRoutes: () => {
      fetchRoutes();
    },
  }));

  // Reset to first page when search or filter changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full">
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
            Inactive
          </span>
        );
      default:
        return null;
    }
  };

  const handleEdit = (route: Route) => {
    if (onEditRoute) {
      onEditRoute(route);
    }
  };

  const handleDelete = (route: Route) => {
    setSelectedRoute(route);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedRoute) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/routes/${
          selectedRoute.id
        }`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.success) {
        setMessage("Route deleted successfully");
        fetchRoutes(); // Refresh the list
        setShowDeleteModal(false);
        setSelectedRoute(null);
      } else {
        setMessage("Failed to delete route: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting route:", error);
      setMessage("Error deleting route");
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleAddRoute = () => {
    if (onAddRoute) {
      onAddRoute();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-300">Route Management</h2>
          <p className="text-gray-400">
            Manage routes and view booking statistics
          </p>
        </div>
        <button
          onClick={handleAddRoute}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <span>+</span>
          Add New Route
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search routes by name, from, or to..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            {pagination.totalRoutes} Total Routes
          </span>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <span>
              Active: {routes.filter((r) => r.status === "active").length}
            </span>
            <span>
              Inactive: {routes.filter((r) => r.status === "inactive").length}
            </span>
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p className="mt-2 text-gray-400">Loading routes...</p>
          </div>
        ) : routes.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No routes found.</p>
            <button
              onClick={handleAddRoute}
              className="mt-2 text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Create your first route
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {routes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {route.routeName}
                        </div>
                        <div className="text-sm text-gray-400">
                          {route.from} → {route.to}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {route.id}
                        </div>
                        {route.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {route.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {route.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{route.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(route.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(route.lastBooking).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(route)}
                          className="text-blue-400 hover:text-blue-300 bg-blue-900 hover:bg-blue-800 px-3 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(route)}
                          className="text-red-400 hover:text-red-300 bg-red-900 hover:bg-red-800 px-3 py-1 rounded text-xs"
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
        )}
      </div>

      {/* Pagination */}
      {pagination.totalRoutes > 0 && (
        <div className="flex items-center justify-between bg-gray-800 px-6 py-4 border border-gray-600 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Show</span>
              <select
                value={pagination.limit}
                onChange={(e) => {
                  const newLimit = parseInt(e.target.value);
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: 1,
                    limit: newLimit,
                  }));
                }}
                className="px-2 py-1 text-sm border border-gray-500 rounded bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 transition-colors"
              title="Previous page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 transition-colors"
              title="Next page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRoute && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the route "
              {selectedRoute.routeName}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRoute(null);
                }}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="fixed top-4 right-4 bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
          <button
            onClick={() => setMessage("")}
            className="ml-2 text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
});

RouteDashboard.displayName = "RouteDashboard";

export default RouteDashboard;
