// src/components/navbar/Dropdown.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types";

interface DropdownProps {
  item: NavItem;
  isOpen: boolean;
  onClose: (href?: string) => void;
  isMobile?: boolean;
  isClickedOpen?: boolean;
}

// Helper function to render icon
const renderIcon = (
  icon: React.ComponentType<{ className?: string }> | string | undefined,
  className?: string
) => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return <span className={className}>{icon}</span>;
  }

  const IconComponent = icon;
  return <IconComponent className={className} />;
};

const Dropdown: React.FC<DropdownProps> = ({
  item,
  isOpen,
  onClose,
  isMobile = false,
  isClickedOpen = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus management for accessibility (desktop only)
  useEffect(() => {
    if (isOpen && !isMobile && isClickedOpen) {
      const firstItem = dropdownRef.current?.querySelector("a, button");
      if (firstItem) {
        setTimeout(() => (firstItem as HTMLElement).focus(), 100);
      }
    }
  }, [isOpen, isMobile, isClickedOpen]);

  // Handle keyboard navigation (desktop only)
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("⌨️ Escape pressed in dropdown");
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMobile, onClose]);

  const handleItemClick = (dropdownItem: any, e: React.MouseEvent) => {
    console.log(
      "🔗 Dropdown item clicked:",
      dropdownItem.label,
      "isMobile:",
      isMobile
    );

    // CRITICAL FIX: Always stop propagation on mobile to prevent interference
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      console.log("🛑 Stopped propagation for mobile interaction");
    }

    // Handle external links
    if (dropdownItem.external) {
      if (!isMobile) e.preventDefault(); // Only prevent default on desktop for external links
      console.log("🔗 Opening external link:", dropdownItem.href);
      window.open(dropdownItem.href, "_blank", "noopener,noreferrer");

      if (!dropdownItem.keepOpen) {
        console.log("🔒 Closing dropdown after external link");
        onClose();
      }
      return;
    }

    // Handle keepOpen behavior
    if (dropdownItem.keepOpen) {
      if (!isMobile) e.preventDefault();
      console.log("🔒 Item marked as keepOpen, not closing dropdown");
      return;
    }

    // For internal navigation
    if (!isMobile) e.preventDefault(); // Prevent default link behavior on desktop
    console.log("🧭 Navigating with router to:", dropdownItem.href);

    // Close dropdown immediately for better UX and pass href for navigation
    onClose(dropdownItem.href);

    // Navigate using Next.js router
    router.push(dropdownItem.href);
  };

  // Don't render if conditions aren't met
  if (!item.hasDropdown || !item.dropdownItems || !isOpen) return null;

  // Mobile Dropdown Rendering - ENHANCED with COMPREHENSIVE event handling
  if (isMobile) {
    return (
      <div
        className="ml-2 space-y-1 border-l-2 border-yellow-500/40 pl-4 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-r-xl py-4"
        onClick={(e) => e.stopPropagation()} // Prevent container clicks from bubbling
      >
        <div className="mb-3">
          <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider px-2 mb-2">
            {item.label} Options
          </h4>
        </div>

        {item.dropdownItems.map((dropdownItem, index) => (
          <div
            key={dropdownItem.label}
            className="animate-slide-down"
            style={{
              animationDelay: `${index * 75}ms`,
              animationFillMode: "both",
            }}
          >
            {dropdownItem.external ? (
              <button
                onClick={(e) => {
                  console.log(
                    "📱 Mobile external button clicked:",
                    dropdownItem.label
                  );
                  handleItemClick(dropdownItem, e);
                }}
                className="group w-full flex items-center space-x-3 text-gray-300 hover:text-yellow-400 py-3 px-3 rounded-xl hover:bg-yellow-500/10 transition-all duration-300 transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-left"
                type="button"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  {renderIcon(
                    dropdownItem.icon,
                    "text-lg transition-transform duration-300 group-hover:scale-110"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm group-hover:text-yellow-300 transition-colors">
                      {dropdownItem.label}
                    </span>
                    {dropdownItem.badge && (
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded-full font-bold animate-pulse">
                        {dropdownItem.badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">↗</span>
                  </div>
                  {dropdownItem.description && (
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {dropdownItem.description}
                    </p>
                  )}
                </div>
              </button>
            ) : (
              <Link
                href={dropdownItem.href}
                onClick={(e) => {
                  console.log("📱 Mobile link clicked:", dropdownItem.label);
                  handleItemClick(dropdownItem, e);
                }}
                className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 py-3 px-3 rounded-xl hover:bg-yellow-500/10 transition-all duration-300 transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  {renderIcon(
                    dropdownItem.icon,
                    "text-lg transition-transform duration-300 group-hover:scale-110"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm group-hover:text-yellow-300 transition-colors">
                      {dropdownItem.label}
                    </span>
                    {dropdownItem.badge && (
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded-full font-bold animate-pulse">
                        {dropdownItem.badge}
                      </span>
                    )}
                  </div>
                  {dropdownItem.description && (
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {dropdownItem.description}
                    </p>
                  )}
                </div>
                <svg
                  className="w-4 h-4 opacity-40 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        ))}

        {/* Mobile dropdown footer with improved event handling */}
        <div className="pt-3 mt-4 border-t border-yellow-500/20">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("📱 Mobile close button clicked");
              onClose();
            }}
            className="w-full text-xs text-gray-500 hover:text-yellow-400 py-2 px-3 rounded-lg hover:bg-yellow-500/5 transition-all duration-200 flex items-center justify-center space-x-1"
            type="button"
          >
            <span>Close menu</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Desktop Dropdown Rendering - Enhanced (unchanged but optimized)
  return (
    <div
      ref={dropdownRef}
      data-dropdown-menu="true"
      className={`absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-yellow-500/30 overflow-hidden z-[9999] transition-all duration-300 transform origin-top ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }`}
      style={{
        position: "absolute",
        zIndex: 9999,
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-400/5 pointer-events-none" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-1 h-1 bg-yellow-500/30 rounded-full animate-float" />
        <div
          className="absolute top-8 right-6 w-1 h-1 bg-yellow-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-6 left-8 w-1 h-1 bg-yellow-600/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-yellow-500/20 relative bg-gradient-to-r from-gray-800/40 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {renderIcon(item.icon, "text-lg")}
            <div>
              <p className="text-sm font-bold text-yellow-500 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-xs text-gray-300">
                Choose your preferred service
              </p>
            </div>
          </div>
          {/* Close button for click-opened dropdowns */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("🖥️ Desktop close button clicked");
              onClose();
            }}
            className="w-6 h-6 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            aria-label="Close menu"
            type="button"
          >
            <svg
              className="w-3 h-3 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div
        className="py-2 max-h-64 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#eab308 #1f2937",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #1f2937;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #eab308, #f59e0b);
            border-radius: 4px;
            border: 1px solid #374151;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #f59e0b, #eab308);
          }
        `}</style>

        {item.dropdownItems.map((dropdownItem, index) => (
          <div key={dropdownItem.label} className="relative">
            {dropdownItem.external ? (
              <button
                onClick={(e) => {
                  console.log(
                    "🖥️ Desktop external button clicked:",
                    dropdownItem.label
                  );
                  handleItemClick(dropdownItem, e);
                }}
                className="group w-full flex items-center justify-between px-6 py-4 text-gray-200 hover:text-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-transparent transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:ring-inset text-left"
                style={{ animationDelay: `${index * 100}ms` }}
                type="button"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-center space-x-4 relative z-10 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 group-hover:bg-yellow-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {renderIcon(
                      dropdownItem.icon,
                      "text-lg transition-transform duration-300 group-hover:scale-110"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm group-hover:text-yellow-400 transition-colors">
                        {dropdownItem.label}
                      </span>
                      {dropdownItem.badge && (
                        <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded-full font-bold group-hover:animate-pulse">
                          {dropdownItem.badge}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">↗</span>
                    </div>
                    {dropdownItem.description && (
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {dropdownItem.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative z-10 ml-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/0 group-hover:bg-yellow-500/10 flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-4 h-4 opacity-40 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]" />
              </button>
            ) : (
              <Link
                href={dropdownItem.href}
                onClick={(e) => {
                  console.log("🖥️ Desktop link clicked:", dropdownItem.label);
                  handleItemClick(dropdownItem, e);
                }}
                className="group flex items-center justify-between px-6 py-4 text-gray-200 hover:text-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-transparent transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:ring-inset"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-center space-x-4 relative z-10 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 group-hover:bg-yellow-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {renderIcon(
                      dropdownItem.icon,
                      "text-lg transition-transform duration-300 group-hover:scale-110"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm group-hover:text-yellow-400 transition-colors">
                        {dropdownItem.label}
                      </span>
                      {dropdownItem.badge && (
                        <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded-full font-bold group-hover:animate-pulse">
                          {dropdownItem.badge}
                        </span>
                      )}
                    </div>
                    {dropdownItem.description && (
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {dropdownItem.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative z-10 ml-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/0 group-hover:bg-yellow-500/10 flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-4 h-4 opacity-40 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
