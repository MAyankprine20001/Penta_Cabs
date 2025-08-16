"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function AdminLayout({
  children,
  activeTab,
  onTabChange,
  onLogout,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      if (width < 768) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else if (width >= 768 && width < 1024) {
        setSidebarOpen(true);
        setSidebarCollapsed(true);
      } else {
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('aside');
        const target = event.target as Node;
        if (sidebar && !sidebar.contains(target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobile, sidebarOpen]);

  const handleSidebarToggle = (isCollapsed: boolean) => {
    setSidebarCollapsed(isCollapsed);
  };

  const getMainContentMargin = () => {
    if (isMobile) {
      return sidebarOpen ? 'ml-0' : 'ml-0';
    } else if (isTablet) {
      return 'ml-20'; // Always collapsed on tablet
    } else {
      return sidebarCollapsed ? 'ml-20' : 'ml-72';
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${isMobile && !sidebarOpen ? 'hidden' : ''}`}>
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            onTabChange(tab);
            if (isMobile) setSidebarOpen(false);
          }}
          onLogout={onLogout}
          onSidebarToggle={handleSidebarToggle}
          isMobile={isMobile}
          isTablet={isTablet}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${getMainContentMargin()}`}
      >
        {/* Top Header */}
        <header 
          className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-6"
          style={{
            backgroundColor: theme.colors.background.card,
            borderBottom: `1px solid ${theme.colors.border.primary}`,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 sm:p-3 rounded-xl hover:bg-gray-700 transition-all duration-300 lg:hidden focus:outline-none focus:ring-2 focus:ring-yellow-500 transform hover:scale-105"
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
                aria-expanded={sidebarOpen}
                style={{
                  backgroundColor: theme.colors.accent.gold,
                  color: theme.colors.primary.black,
                }}
              >
                <span className="text-base sm:text-lg font-bold">☰</span>
              </button>
              <div className="min-w-0 flex-1">
                <h1 
                  className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold truncate"
                  style={{
                    color: theme.colors.accent.gold,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1 sm:mt-2 font-medium truncate">
                  {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()} Management
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* User Info */}
              <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-xs sm:text-sm">A</span>
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-white truncate">Admin User</div>
                  <div className="text-gray-400 font-medium truncate">Administrator</div>
                </div>
              </div>
              
              {/* Mobile user indicator */}
              <div className="sm:hidden">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-xs">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 