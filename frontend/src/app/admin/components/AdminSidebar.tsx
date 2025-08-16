"use client";

import React, { useState, useEffect, useRef } from "react";
import { theme } from "@/styles/theme";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onSidebarToggle?: (isCollapsed: boolean) => void;
  isMobile?: boolean;
  isTablet?: boolean;
  onClose?: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "USERS",
    label: "User Dashboard",
    icon: "👥",
    description: "Manage user accounts and view statistics"
  },
  {
    id: "ROUTES",
    label: "Route Dashboard",
    icon: "🗺️",
    description: "Manage routes and view booking data"
  },
  {
    id: "OUTSTATION",
    label: "Outstation Routes",
    icon: "🚗",
    description: "Manage inter-city routes and pricing"
  },
  {
    id: "LOCAL",
    label: "Local Services",
    icon: "🏙️",
    description: "Manage local city services and packages"
  },
  {
    id: "AIRPORT",
    label: "Airport Services",
    icon: "✈️",
    description: "Manage airport transfer services"
  }
];

export default function AdminSidebar({ 
  activeTab, 
  onTabChange, 
  onLogout,
  onSidebarToggle,
  isMobile = false,
  isTablet = false,
  onClose
}: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // Set initial collapsed state based on device type
  useEffect(() => {
    if (isTablet) {
      setIsCollapsed(true);
    } else if (isMobile) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile, isTablet]);

  // Notify parent when sidebar state changes
  useEffect(() => {
    onSidebarToggle?.(isCollapsed);
  }, [isCollapsed, onSidebarToggle]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sidebarRef.current) return;

      const focusableElements = sidebarRef.current.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      const currentIndex = Array.from(focusableElements).findIndex(
        el => el === document.activeElement
      );

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableElements.length;
          (focusableElements[nextIndex] as HTMLElement)?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
          (focusableElements[prevIndex] as HTMLElement)?.focus();
          break;
        case 'Escape':
          if (isMobile && onClose) {
            onClose();
          } else if (!isMobile) {
            setIsCollapsed(false);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, onClose]);

  const getSidebarWidth = () => {
    if (isMobile) {
      return 'w-80'; // Full width on mobile
    } else if (isTablet) {
      return 'w-20'; // Always collapsed on tablet
    } else {
      return isCollapsed ? 'w-20' : 'w-72';
    }
  };

  const getSidebarPosition = () => {
    if (isMobile) {
      return 'fixed left-0 top-0 h-full z-50';
    } else {
      return 'fixed left-0 top-0 h-full z-50';
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`${getSidebarPosition()} ${getSidebarWidth()} transition-all duration-500 ease-in-out transform`}
      style={{
        backgroundColor: theme.colors.background.card,
        borderRight: `1px solid ${theme.colors.border.primary}`,
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
      }}
      role="navigation"
      aria-label="Admin navigation"
    >
      {/* Header */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 relative">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 
              className="text-lg sm:text-xl font-bold truncate"
              style={{
                color: theme.colors.accent.gold,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Penta Cab Admin
            </h2>
          )}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 sm:p-3 rounded-xl hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!isCollapsed}
                style={{
                  backgroundColor: theme.colors.accent.gold,
                  color: theme.colors.primary.black,
                }}
              >
                <span className="text-base sm:text-lg font-bold">
                  {isCollapsed ? "→" : "←"}
                </span>
              </button>
            )}
            {isMobile && onClose && (
              <button
                onClick={onClose}
                className="p-2 sm:p-3 rounded-xl hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105"
                aria-label="Close sidebar"
                title="Close sidebar"
                style={{
                  backgroundColor: theme.colors.accent.gold,
                  color: theme.colors.primary.black,
                }}
              >
                <span className="text-base sm:text-lg font-bold">✕</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-3 sm:py-4 md:py-6" role="navigation">
        <ul className="space-y-2 sm:space-y-3 px-2 sm:px-3" role="list">
          {sidebarItems.map((item) => (
            <li key={item.id} role="listitem">
              <button
                onClick={() => {
                  onTabChange(item.id);
                  if (isMobile && onClose) {
                    onClose();
                  }
                }}
                className={`w-full text-left px-3 sm:px-4 py-3 sm:py-4 transition-all duration-300 rounded-xl mx-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
                }`}
                aria-current={activeTab === item.id ? "page" : undefined}
                title={item.description}
                aria-describedby={`${item.id}-description`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <span className="text-xl sm:text-2xl" aria-hidden="true">{item.icon}</span>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base truncate">{item.label}</div>
                      {activeTab === item.id && (
                        <div 
                          id={`${item.id}-description`}
                          className="text-xs opacity-90 mt-1 font-medium truncate"
                        >
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3 sm:p-4 md:p-6 border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
        <button
          onClick={() => {
            onLogout();
            if (isMobile && onClose) {
              onClose();
            }
          }}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 shadow-lg"
          aria-label="Logout from admin panel"
          title="Logout"
        >
          {!isCollapsed ? (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl" aria-hidden="true">🚪</span>
              <span className="text-sm sm:text-base">Logout</span>
            </div>
          ) : (
            <span className="text-lg sm:text-xl" aria-hidden="true">🚪</span>
          )}
        </button>
      </div>

      {/* Screen reader only instructions */}
      <div className="sr-only">
        <p>Use arrow keys to navigate between menu items. Press Escape to collapse the sidebar.</p>
      </div>
    </aside>
  );
} 