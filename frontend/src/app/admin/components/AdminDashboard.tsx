"use client";

import React from "react";
import { theme } from "@/styles/theme";
import OutstationForm from "./OutstationForm";
import LocalForm from "./LocalForm";
import AirportForm from "./AirportForm";
import UserDashboard from "./UserDashboard";
import RouteDashboard from "./RouteDashboard";

interface AdminDashboardProps {
  activeTab: string;
}

export default function AdminDashboard({ activeTab }: AdminDashboardProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "USERS":
        return <UserDashboard />;
      case "ROUTES":
        return <RouteDashboard />;
      case "OUTSTATION":
        return <OutstationForm />;
      case "LOCAL":
        return <LocalForm />;
      case "AIRPORT":
        return <AirportForm />;
      default:
        return <UserDashboard />;
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case "USERS":
        return "Manage user accounts, view booking statistics, and monitor user activity.";
      case "ROUTES":
        return "View route performance, manage route configurations, and track revenue.";
      case "OUTSTATION":
        return "Manage inter-city routes, distances, and vehicle pricing for outstation trips.";
      case "LOCAL":
        return "Configure local city services with different packages and vehicle options.";
      case "AIRPORT":
        return "Set up airport transfer services with pickup and drop pricing.";
      default:
        return "";
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case "USERS":
        return "👥";
      case "ROUTES":
        return "🗺️";
      case "OUTSTATION":
        return "🚗";
      case "LOCAL":
        return "🏙️";
      case "AIRPORT":
        return "✈️";
      default:
        return "📊";
    }
  };

  // For dashboard views, return the component directly
  if (activeTab === "USERS" || activeTab === "ROUTES") {
    return renderContent();
  }

  // For form views, return with the enhanced layout
  return (
    <div className="space-y-8">
      {/* Section Description */}
      <div 
        className="p-6 rounded-2xl border border-gray-700"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.primary}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: theme.colors.accent.gold,
            }}
          >
            <span className="text-2xl">
              {getTabIcon()}
            </span>
          </div>
          <div>
            <h3 
              className="text-xl font-bold"
              style={{
                color: theme.colors.accent.gold,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()} Services
            </h3>
            <p 
              className="text-gray-400 font-medium"
              style={{
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              {getTabDescription()}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div 
        className="rounded-2xl border border-gray-700 overflow-hidden"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.primary}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <h4 
            className="text-lg font-semibold"
            style={{
              color: theme.colors.accent.gold,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            Configuration Form
          </h4>
          <p className="text-gray-400 text-sm mt-1">
            Update your {activeTab.toLowerCase()} service settings and pricing
          </p>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 