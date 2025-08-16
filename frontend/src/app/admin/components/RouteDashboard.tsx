"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";

interface Route {
  id: string;
  routeName: string;
  from: string;
  to: string;
  type: "outstation (one way)" | "outstation (two way)" | "local" | "airport";
  distance: string;
  duration: string;
  lastBooking: string;
  createdAt: string;
}

// Mock data for demonstration
const mockRoutes: Route[] = [
  {
    id: "1",
    routeName: "Ahmedabad to Mumbai",
    from: "Ahmedabad",
    to: "Mumbai",
    type: "outstation (one way)",
    distance: "500 km",
    duration: "8 hours",
    lastBooking: "2024-01-18",
    createdAt: "2023-12-01",
  },
  {
    id: "2",
    routeName: "Mumbai Airport Transfer",
    from: "Mumbai Airport",
    to: "Mumbai City",
    type: "airport",
    distance: "25 km",
    duration: "1 hour",
    lastBooking: "2024-01-19",
    createdAt: "2023-11-15",
  },
  {
    id: "3",
    routeName: "Local City Tour",
    from: "City Center",
    to: "Various Locations",
    type: "local",
    distance: "50 km",
    duration: "4 hours",
    lastBooking: "2024-01-17",
    createdAt: "2023-10-20",
  },
  {
    id: "4",
    routeName: "Delhi to Jaipur",
    from: "Delhi",
    to: "Jaipur",
    type: "outstation (two way)",
    distance: "280 km",
    duration: "5 hours",
    lastBooking: "2024-01-10",
    createdAt: "2023-12-15",
  },
  {
    id: "5",
    routeName: "Mumbai to Pune",
    from: "Mumbai",
    to: "Pune",
    type: "outstation (one way)",
    distance: "150 km",
    duration: "3 hours",
    lastBooking: "2024-01-20",
    createdAt: "2023-12-20",
  },
];

export default function RouteDashboard() {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof Route>("routeName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || route.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
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

  const handleSort = (column: keyof Route) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      "outstation (one way)": { color: "bg-blue-500", text: "Outstation (One Way)" },
      "outstation (two way)": { color: "bg-green-500", text: "Outstation (Two Way)" },
      local: { color: "bg-purple-500", text: "Local" },
      airport: { color: "bg-indigo-500", text: "Airport" },
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${config.color}`}>
        {config.text}
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
            Route Management
          </h2>
          <p className="text-gray-400 mt-1">
            Manage routes and view booking statistics
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{routes.length}</div>
            <div className="text-sm text-gray-400">Total Routes</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search routes by name, from, or to..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="outstation (one way)">Outstation (One Way)</option>
          <option value="outstation (two way)">Outstation (Two Way)</option>
          <option value="local">Local</option>
          <option value="airport">Airport</option>
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
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("routeName")}
                    className="flex items-center space-x-2 text-white font-semibold hover:text-yellow-500 transition-colors"
                  >
                    <span>Route</span>
                    {sortBy === "routeName" && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Details</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Booking date</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRoutes.map((route, index) => (
                <tr 
                  key={route.id}
                  className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-white">{route.routeName}</div>
                      <div className="text-sm text-gray-400">ID: {route.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getTypeBadge(route.type)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white">{route.from} → {route.to}</div>
                      <div className="text-sm text-gray-400">
                        {route.distance} • {route.duration}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {route.lastBooking === "-" ? "-" : new Date(route.lastBooking).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedRoutes.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-lg">No routes found</div>
            <div className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
} 