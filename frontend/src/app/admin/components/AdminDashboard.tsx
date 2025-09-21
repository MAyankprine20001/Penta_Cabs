"use client";

import React, { useRef } from "react";
import { theme } from "@/styles/theme";
import OutstationForm from "./OutstationForm";
import OutstationRoutes from "./OutstationRoutes";
import LocalForm from "./LocalForm";
import LocalServices from "./LocalServices";
import AirportForm from "./AirportForm";
import AirportServices from "./AirportServices";
import UserDashboard from "./UserDashboard";
import RouteDashboard from "./RouteDashboard";
import RouteForm from "./RouteForm";
import BlogManagement from "./BlogManagement";
import BlogForm from "./BlogForm";
import SEOManagement from "./SEOManagement";
import SEOForm from "./SEOForm";

interface AdminDashboardProps {
  activeTab: string;
}

export default function AdminDashboard({ activeTab }: AdminDashboardProps) {
  const outstationRoutesRef = useRef<{ fetchRoutes: () => void }>(null);
  const outstationFormRef = useRef<{ openModal: () => void }>(null);
  const localServicesRef = useRef<{ fetchServices: () => void }>(null);
  const localFormRef = useRef<{ openModal: () => void }>(null);
  const airportServicesRef = useRef<{ fetchServices: () => void }>(null);
  const airportFormRef = useRef<{ openModal: () => void }>(null);
  const routeDashboardRef = useRef<{ fetchRoutes: () => void }>(null);
  const routeFormRef = useRef<{ openModal: (route?: any) => void }>(null);
  const blogManagementRef = useRef<{ fetchBlogs: () => void }>(null);
  const blogFormRef = useRef<{ openModal: (blog?: any) => void }>(null);
  const seoManagementRef = useRef<{ fetchSEO: () => void }>(null);
  const seoFormRef = useRef<{ openModal: (seo?: any) => void }>(null);

  const handleRouteAdded = () => {
    // Refresh the routes list when a new route is added
    if (outstationRoutesRef.current) {
      outstationRoutesRef.current.fetchRoutes();
    }
  };

  const handleAddOutstationRoute = () => {
    // Open the OutstationForm modal
    if (outstationFormRef.current) {
      outstationFormRef.current.openModal();
    }
  };

  const handleServiceAdded = () => {
    // Refresh the services list when a new service is added
    if (localServicesRef.current) {
      localServicesRef.current.fetchServices();
    }
  };

  const handleAddService = () => {
    // Open the LocalForm modal
    if (localFormRef.current) {
      localFormRef.current.openModal();
    }
  };

  const handleAirportServiceAdded = () => {
    // Refresh the airport services list when a new service is added
    if (airportServicesRef.current) {
      airportServicesRef.current.fetchServices();
    }
  };

  const handleAddAirportService = () => {
    // Open the AirportForm modal
    if (airportFormRef.current) {
      airportFormRef.current.openModal();
    }
  };

  const handleBlogSaved = () => {
    // Refresh the blog list when a new blog is saved
    if (blogManagementRef.current) {
      blogManagementRef.current.fetchBlogs();
    }
  };

  const handleAddBlog = () => {
    // Open the BlogForm modal for new blog
    if (blogFormRef.current) {
      blogFormRef.current.openModal();
    }
  };

  const handleRouteSaved = () => {
    // Refresh the routes list when a new route is saved
    if (routeDashboardRef.current) {
      routeDashboardRef.current.fetchRoutes();
    }
  };

  const handleAddRoute = () => {
    // Open the RouteForm modal for new route
    if (routeFormRef.current) {
      routeFormRef.current.openModal();
    }
  };

  const handleEditRoute = (route: any) => {
    // Open the RouteForm modal for editing
    if (routeFormRef.current) {
      routeFormRef.current.openModal(route);
    }
  };

  const handleEditBlog = (blog: any) => {
    // Open the BlogForm modal for editing
    if (blogFormRef.current) {
      blogFormRef.current.openModal(blog);
    }
  };

  const handleSEOSaved = () => {
    // Refresh the SEO list when a new SEO entry is saved
    if (seoManagementRef.current) {
      seoManagementRef.current.fetchSEO();
    }
  };

  const handleAddSEO = () => {
    // Open the SEOForm modal for new SEO entry
    if (seoFormRef.current) {
      seoFormRef.current.openModal();
    }
  };

  const handleEditSEO = (seo: any) => {
    // Open the SEOForm modal for editing
    if (seoFormRef.current) {
      seoFormRef.current.openModal(seo);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "USERS":
        return <UserDashboard />;
      case "ROUTES":
        return (
          <div className="space-y-8">
            <RouteDashboard
              ref={routeDashboardRef}
              onAddRoute={handleAddRoute}
              onEditRoute={handleEditRoute}
            />
            <RouteForm ref={routeFormRef} onRouteSaved={handleRouteSaved} />
          </div>
        );
      case "OUTSTATION":
        return (
          <div className="space-y-8">
            <OutstationRoutes
              ref={outstationRoutesRef}
              onAddRoute={handleAddOutstationRoute}
            />
            <OutstationForm
              ref={outstationFormRef}
              onRouteAdded={handleRouteAdded}
            />
          </div>
        );
      case "LOCAL":
        return (
          <div className="space-y-8">
            <LocalServices
              ref={localServicesRef}
              onAddService={handleAddService}
            />
            <LocalForm ref={localFormRef} onServiceAdded={handleServiceAdded} />
          </div>
        );
      case "AIRPORT":
        return (
          <div className="space-y-8">
            <AirportServices
              ref={airportServicesRef}
              onAddService={handleAddAirportService}
            />
            <AirportForm
              ref={airportFormRef}
              onServiceAdded={handleAirportServiceAdded}
            />
          </div>
        );
      case "BLOG":
        return (
          <div className="space-y-8">
            <BlogManagement
              ref={blogManagementRef}
              onAddBlog={handleAddBlog}
              onEditBlog={handleEditBlog}
            />
            <BlogForm ref={blogFormRef} onBlogSaved={handleBlogSaved} />
          </div>
        );
      case "SEO of PAGE":
        return (
          <div className="space-y-8">
            <SEOManagement
              ref={seoManagementRef}
              onAddSEO={handleAddSEO}
              onEditSEO={handleEditSEO}
            />
            <SEOForm ref={seoFormRef} onSEOSaved={handleSEOSaved} />
          </div>
        );
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
      case "BLOG":
        return "Create and manage blog posts, articles, and content for your website.";
      case "SEO of PAGE":
        return "Manage SEO settings, meta tags, and page optimization for better search engine visibility.";
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
      case "BLOG":
        return "📝";
      case "SEO of PAGE":
        return "🔍";
      default:
        return "📊";
    }
  };

  // For dashboard views, return the component directly
  if (activeTab === "USERS" || activeTab === "ROUTES" || activeTab === "SEO of PAGE") {
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
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: theme.colors.accent.gold,
            }}
          >
            <span className="text-2xl">{getTabIcon()}</span>
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
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
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
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
