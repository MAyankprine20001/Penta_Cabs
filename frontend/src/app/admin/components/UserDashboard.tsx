"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalCharge: number;
  bookingDate: string;
  joinDate: string;
  paymentMethod: "full" | "50%" | "cod";
  bookingStatus?: "pending" | "accepted" | "declined" | "driver_sent";
}

interface DriverDetails {
  name: string;
  whatsappNumber: string;
  vehicleNumber: string;
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    totalBookings: 15,
    totalCharge: 25000,
    bookingDate: "2024-01-15",
    joinDate: "2023-06-10",
    paymentMethod: "full",
    bookingStatus: "pending",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 87654 32109",
    totalBookings: 8,
    totalCharge: 12000,
    bookingDate: "2024-01-10",
    joinDate: "2023-08-20",
    paymentMethod: "50%",
    bookingStatus: "accepted",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+91 76543 21098",
    totalBookings: 3,
    totalCharge: 5000,
    bookingDate: "2023-12-05",
    joinDate: "2023-09-15",
    paymentMethod: "cod",
    bookingStatus: "driver_sent",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+91 65432 10987",
    totalBookings: 0,
    totalCharge: 2330,
    bookingDate: "-",
    joinDate: "2024-01-20",
    paymentMethod: "full",
    bookingStatus: "declined",
  },
];

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [driverDetails, setDriverDetails] = useState<DriverDetails>({
    name: "",
    whatsappNumber: "",
    vehicleNumber: "",
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesPayment = paymentFilter === "all" || user.paymentMethod === paymentFilter;
    return matchesSearch && matchesPayment;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getPaymentBadge = (paymentMethod: string) => {
    const paymentConfig = {
      full: { color: "bg-green-500", text: "Full" },
      "50%": { color: "bg-blue-500", text: "50%" },
      cod: { color: "bg-orange-500", text: "COD" },
    };
    
    const config = paymentConfig[paymentMethod as keyof typeof paymentConfig];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const handleAcceptBooking = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, bookingStatus: "accepted" }
          : user
      )
    );
  };

  const handleDeclineBooking = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, bookingStatus: "declined" }
          : user
      )
    );
  };

  const handleSendDriverDetails = (userId: string) => {
    setSelectedUserId(userId);
    setIsDriverModalOpen(true);
  };

  const handleSubmitDriverDetails = () => {
    if (driverDetails.name && driverDetails.whatsappNumber && driverDetails.vehicleNumber) {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUserId 
            ? { ...user, bookingStatus: "driver_sent" }
            : user
        )
      );
      setIsDriverModalOpen(false);
      setDriverDetails({ name: "", whatsappNumber: "", vehicleNumber: "" });
      setSelectedUserId(null);
    }
  };

  const handleCloseModal = () => {
    setIsDriverModalOpen(false);
    setDriverDetails({ name: "", whatsappNumber: "", vehicleNumber: "" });
    setSelectedUserId(null);
  };

  const renderActionButtons = (user: User) => {
    const status = user.bookingStatus || "pending";

    switch (status) {
      case "pending":
        return (
          <div className="flex space-x-2">
            <button 
              onClick={() => handleAcceptBooking(user.id)}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              Accept
            </button>
            <button 
              onClick={() => handleDeclineBooking(user.id)}
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
              onClick={() => handleSendDriverDetails(user.id)}
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
            User Management
          </h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Manage user accounts and view booking statistics
          </p>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold text-white">{users.length}</div>
            <div className="text-xs sm:text-sm text-gray-400">Total Users</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
        >
          <option value="all">All Payment</option>
          <option value="full">Full Payment</option>
          <option value="50%">50% Payment</option>
          <option value="cod">COD</option>
        </select>
      </div>

      {/* Table */}
      <div 
        className="rounded-2xl border border-gray-700 overflow-hidden"
        style={{
          backgroundColor: theme.colors.background.card,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center space-x-1 sm:space-x-2 text-white font-semibold hover:text-yellow-500 transition-colors text-xs sm:text-sm"
                  >
                    <span>Name</span>
                    {sortBy === "name" && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </button>
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">Contact</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                  <button
                    onClick={() => handleSort("totalCharge")}
                    className="flex items-center space-x-1 sm:space-x-2 text-white font-semibold hover:text-yellow-500 transition-colors text-xs sm:text-sm"
                  >
                    <span>Total Charge</span>
                    {sortBy === "totalCharge" && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </button>
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">Payment Method</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">Booking Date</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-semibold text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr 
                  key={user.id}
                  className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                  }`}
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div>
                      <div className="font-semibold text-white text-xs sm:text-sm">{user.name}</div>
                      <div className="text-xs text-gray-400">ID: {user.id}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div>
                      <div className="text-white text-xs sm:text-sm truncate">{user.email}</div>
                      <div className="text-xs text-gray-400 truncate">{user.phone}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-white font-semibold text-xs sm:text-sm">
                    ₹{user.totalCharge.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    {getPaymentBadge(user.paymentMethod)}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 text-xs sm:text-sm">
                    {user.bookingDate === "-" ? "-" : new Date(user.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    {renderActionButtons(user)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedUsers.length === 0 && (
          <div className="p-6 sm:p-8 text-center">
            <div className="text-gray-400 text-base sm:text-lg">No users found</div>
            <div className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</div>
          </div>
        )}
      </div>

      {/* Driver Details Modal */}
      {isDriverModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div 
            className="bg-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto"
            style={{
              border: `1px solid ${theme.colors.border.primary}`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
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
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    setDriverDetails(prev => ({ ...prev, name: value }));
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
                    const value = e.target.value.replace(/[^0-9+\-\s]/g, '');
                    setDriverDetails(prev => ({ ...prev, whatsappNumber: value }));
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
                    const value = e.target.value.replace(/[^A-Z0-9\s\-]/g, '').toUpperCase();
                    setDriverDetails(prev => ({ ...prev, vehicleNumber: value }));
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