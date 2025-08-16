"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";
import {
  getBookingRequests,
  updateBookingStatus,
  addDriverDetails,
  sendDeclineEmail,
} from "@/services/emailService";

interface BookingRequest {
  _id: string;
  serviceType: "AIRPORT" | "LOCAL" | "OUTSTATION";
  traveller: {
    name: string;
    email: string;
    mobile: string;
    pickup?: string;
    drop?: string;
    pickupAddress?: string;
    dropAddress?: string;
    remark?: string;
    gst?: string;
    whatsapp: boolean;
    gstDetails: boolean;
  };
  route: string;
  cab: {
    type: string;
    price: number;
    _id: string;
  };
  date?: string;
  time?: string;
  estimatedDistance?: string;
  paymentMethod: string;
  status: "pending" | "accepted" | "declined" | "driver_sent";
  driverDetails?: {
    name: string;
    whatsappNumber: string;
    vehicleNumber: string;
  };
  adminNotes?: string;
  createdAt: string;
}

interface DriverDetails {
  name: string;
  whatsappNumber: string;
  vehicleNumber: string;
}

export default function UserDashboard() {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [driverDetails, setDriverDetails] = useState<DriverDetails>({
    name: "",
    whatsappNumber: "",
    vehicleNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch booking requests on component mount
  useEffect(() => {
    fetchBookingRequests();
  }, [currentPage]);

  const fetchBookingRequests = async () => {
    try {
      setIsLoading(true);
      const response = await getBookingRequests(currentPage, 10);
      setBookingRequests(response.bookingRequests);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRequests = bookingRequests.filter((request) => {
    const matchesSearch =
      request.traveller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.traveller.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.traveller.mobile.includes(searchTerm) ||
      request.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    // Handle nested properties
    if (sortBy === "traveller.name") {
      aValue = a.traveller.name;
      bValue = b.traveller.name;
    } else if (sortBy === "cab.price") {
      aValue = a.cab.price;
      bValue = b.cab.price;
    } else {
      aValue = a[sortBy as keyof BookingRequest] as string | number | Date;
      bValue = b[sortBy as keyof BookingRequest] as string | number | Date;
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, "accepted");
      await fetchBookingRequests(); // Refresh the list
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleDeclineBooking = async (bookingId: string) => {
    try {
      const request = bookingRequests.find((r) => r._id === bookingId);
      if (request) {
        await updateBookingStatus(bookingId, "declined");
        // Send decline email
        await sendDeclineEmail(
          request.traveller.email,
          request.route,
          "Service temporarily unavailable"
        );
        await fetchBookingRequests(); // Refresh the list
      }
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  const handleSendDriverDetails = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsDriverModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDriverModalOpen(false);
    setSelectedBookingId(null);
    setDriverDetails({
      name: "",
      whatsappNumber: "",
      vehicleNumber: "",
    });
  };

  const handleSubmitDriverDetails = async () => {
    if (!selectedBookingId) return;

    try {
      await addDriverDetails(selectedBookingId, driverDetails);
      await fetchBookingRequests(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error("Error adding driver details:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-600", text: "Pending" },
      accepted: { color: "bg-blue-600", text: "Accepted" },
      declined: { color: "bg-red-600", text: "Declined" },
      driver_sent: { color: "bg-green-600", text: "Driver Sent" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const getPaymentBadge = (paymentMethod: string) => {
    if (paymentMethod === "0") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-green-600">
          Cash on Delivery
        </span>
      );
    }
    return (
      <span className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-blue-600">
        Advance Payment
      </span>
    );
  };

  const renderActionButtons = (request: BookingRequest) => {
    switch (request.status) {
      case "pending":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleAcceptBooking(request._id)}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => handleDeclineBooking(request._id)}
              className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Decline
            </button>
          </div>
        );

      case "accepted":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleSendDriverDetails(request._id)}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Send Driver Details
            </button>
          </div>
        );

      case "driver_sent":
        return (
          <div className="text-green-500 text-sm font-semibold">
            Driver details already sent
          </div>
        );

      case "declined":
        return (
          <div className="text-red-500 text-sm font-semibold">
            Booking declined
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{
              color: theme.colors.accent.gold,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            Booking Management
          </h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Manage booking requests and assign drivers
          </p>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {bookingRequests.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Total Bookings
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search bookings by name, email, phone, or route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
          <option value="driver_sent">Driver Sent</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading bookings...</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div
          className="rounded-2xl border border-gray-700 overflow-hidden"
          style={{
            backgroundColor: theme.colors.background.card,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                    <button
                      onClick={() => handleSort("traveller.name")}
                      className="flex items-center space-x-1 sm:space-x-2 text-white font-semibold hover:text-yellow-500 transition-colors text-xs sm:text-sm"
                    >
                      <span>Customer</span>
                      {sortBy === "traveller.name" && (
                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">
                    Service
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">
                    Route
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                    <button
                      onClick={() => handleSort("cab.price")}
                      className="flex items-center space-x-1 sm:space-x-2 text-white font-semibold hover:text-yellow-500 transition-colors text-xs sm:text-sm"
                    >
                      <span>Price</span>
                      {sortBy === "cab.price" && (
                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">
                    Payment
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedRequests.map((request, index) => (
                  <tr
                    key={request._id}
                    className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                    }`}
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div>
                        <div className="font-semibold text-white text-xs sm:text-sm">
                          {request.traveller.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {request.traveller.email || "N/A"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {request.traveller.mobile || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-white text-xs sm:text-sm">
                        {request.serviceType || "N/A"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {request.cab.type || "N/A"}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-white text-xs sm:text-sm">
                        {request.route || "N/A"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {request.date || "N/A"} {request.time || "N/A"}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-white font-semibold text-xs sm:text-sm">
                      ₹{(request.cab.price || 0).toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      {getPaymentBadge(request.paymentMethod || "0")}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      {getStatusBadge(request.status || "pending")}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      {renderActionButtons(request)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedRequests.length === 0 && (
            <div className="p-6 sm:p-8 text-center">
              <div className="text-gray-400 text-base sm:text-lg">
                No bookings found
              </div>
              <div className="text-gray-500 text-sm mt-2">
                Try adjusting your search or filters
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}

      {/* Driver Details Modal */}
      {isDriverModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="bg-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto"
            style={{
              border: `1px solid ${theme.colors.border.primary}`,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3
                className="text-lg sm:text-xl font-bold"
                style={{
                  color: theme.colors.accent.gold,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Driver Details
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Driver Name
                </label>
                <input
                  type="text"
                  value={driverDetails.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    setDriverDetails((prev) => ({ ...prev, name: value }));
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter driver name (letters only)"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={driverDetails.whatsappNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[0-9+\-\s]/g, "");
                    setDriverDetails((prev) => ({
                      ...prev,
                      whatsappNumber: value,
                    }));
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter WhatsApp number (e.g., +91 98765 43210)"
                  maxLength={15}
                  pattern="[0-9+\-\s]+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={driverDetails.vehicleNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^A-Z0-9\s\-]/g, "")
                      .toUpperCase();
                    setDriverDetails((prev) => ({
                      ...prev,
                      vehicleNumber: value,
                    }));
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter vehicle number (e.g., GJ-01-AB-1234)"
                  maxLength={15}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-4 sm:mt-6">
              <button
                onClick={handleSubmitDriverDetails}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                Send
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
