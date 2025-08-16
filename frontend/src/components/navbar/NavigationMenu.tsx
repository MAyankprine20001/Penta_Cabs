// src/components/navbar/NavigationMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import { NavItem } from "@/types";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";

interface NavigationMenuProps {
  items: NavItem[];
  activeDropdown: string | null;
  onDropdownToggle: (label: string) => void;
  onDropdownClose: () => void;
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
  clickedDropdown?: string | null;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  activeDropdown,
  onDropdownToggle,
  onDropdownClose,
  isMobile = false,
  onMobileMenuClose,
  clickedDropdown,
}) => {
  const router = useRouter();

  // Function to scroll to booking widget
  const scrollToBookingWidget = () => {
    setTimeout(() => {
      const bookingSection = document.getElementById("booking-widget");
      if (bookingSection) {
        bookingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Handle dropdown item clicks with proper mobile handling
  const handleDropdownItemClick = (href?: string) => {
    console.log("🔗 Dropdown item clicked, closing dropdown");
    onDropdownClose();

    if (href) {
      // If it's a booking widget link, scroll to it
      if (href.includes("#booking-widget")) {
        // If not on homepage, navigate first
        if (window.location.pathname !== "/") {
          router.push("/");
          setTimeout(() => {
            scrollToBookingWidget();
          }, 500);
        } else {
          // If already on homepage, just scroll
          scrollToBookingWidget();
        }
      } else {
        // For regular page navigation
        router.push(href);
      }
    }

    if (isMobile && onMobileMenuClose) {
      console.log("📱 Closing mobile menu after dropdown item click");
      // Small delay to ensure navigation completes
      setTimeout(() => {
        onMobileMenuClose();
      }, 150);
    }
  };

  // Handle main nav item clicks with improved mobile handling
  const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
    console.log(
      "🖱️ Nav item clicked:",
      item.label,
      "hasDropdown:",
      item.hasDropdown,
      "isMobile:",
      isMobile
    );

    if (item.hasDropdown) {
      event.preventDefault();
      event.stopPropagation();
      console.log("🎯 Toggling dropdown for:", item.label);
      onDropdownToggle(item.label);
    } else {
      // For non-dropdown items in mobile, close the mobile menu
      if (isMobile && onMobileMenuClose) {
        console.log("📱 Non-dropdown mobile item clicked, closing mobile menu");
        setTimeout(() => {
          onMobileMenuClose();
        }, 100);
      }
    }
  };

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

  const getNavItemClasses = (item: NavItem) => {
    const isActive = activeDropdown === item.label;
    const isSpecialItem = item.label === "Services" || item.label === "Popular";

    if (isMobile) {
      return `
        flex items-center justify-between w-full 
        font-medium py-4 px-5 rounded-xl 
        transition-all duration-300 transform hover:scale-[1.02] 
        border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500/50
        ${
          isSpecialItem
            ? `text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 
             hover:from-cyan-500/30 hover:to-cyan-400/30 hover:text-cyan-200
             border-cyan-400/30 shadow-lg shadow-cyan-500/20
             ${
               isActive
                 ? "from-cyan-500/40 to-cyan-400/40 text-cyan-100 border-cyan-300/50"
                 : ""
             }`
            : `text-yellow-200 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 
             hover:from-yellow-500/30 hover:to-yellow-400/30 hover:text-yellow-100
             border-yellow-400/30 shadow-lg shadow-yellow-500/20
             ${
               isActive
                 ? "from-yellow-500/40 to-yellow-400/40 text-yellow-50 border-yellow-300/50"
                 : ""
             }`
        }
      `
        .replace(/\s+/g, " ")
        .trim();
    }

    return `
      flex items-center space-x-2 px-5 py-3 rounded-xl 
      font-medium transition-all duration-300 relative group cursor-pointer 
      transform hover:scale-105 border border-transparent
      focus:outline-none focus:ring-2 focus:ring-yellow-500/50
      ${
        isSpecialItem
          ? `text-cyan-300 hover:text-cyan-200 
           hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-cyan-400/20
           hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/25
           ${
             isActive
               ? "text-cyan-200 bg-gradient-to-r from-cyan-500/30 to-cyan-400/30 border-cyan-400/40 shadow-lg shadow-cyan-400/30"
               : ""
           }`
          : `text-yellow-200 hover:text-yellow-100 
           hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-yellow-400/20
           hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-500/25
           ${
             isActive
               ? "text-yellow-100 bg-gradient-to-r from-yellow-500/30 to-yellow-400/30 border-yellow-400/40 shadow-lg shadow-yellow-400/30"
               : ""
           }`
      }
    `
      .replace(/\s+/g, " ")
      .trim();
  };

  if (isMobile) {
    return (
      <div className="w-full h-full bg-transparent">
        <div className="px-6 py-8 space-y-4 max-h-screen overflow-y-auto">
          {items.map((item) => (
            <div key={item.label} className="space-y-3">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-3 border border-gray-700/50 shadow-xl">
                {item.hasDropdown ? (
                  <button
                    className={getNavItemClasses(item)}
                    onClick={(e) => {
                      console.log(
                        "📱 Mobile dropdown button clicked:",
                        item.label
                      );
                      e.preventDefault();
                      e.stopPropagation();
                      handleItemClick(item, e);
                    }}
                    type="button"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    <div className="flex items-center space-x-3">
                      {renderIcon(
                        item.icon,
                        "text-xl opacity-90 group-hover:opacity-100 transition-opacity"
                      )}
                      <span className="text-lg font-semibold">
                        {item.label}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={getNavItemClasses(item)}
                    onClick={(e) => {
                      console.log("📱 Mobile nav link clicked:", item.label);
                      handleItemClick(item, e);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {renderIcon(
                        item.icon,
                        "text-xl opacity-90 group-hover:opacity-100 transition-opacity"
                      )}
                      <span className="text-lg font-semibold">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Mobile Dropdown with improved animation */}
              {item.hasDropdown && (
                <div
                  className={`
                    transition-all duration-500 overflow-hidden
                    ${
                      activeDropdown === item.label
                        ? "max-h-[600px] opacity-100 transform translate-y-0"
                        : "max-h-0 opacity-0 transform -translate-y-4"
                    }
                  `}
                  style={{
                    transitionProperty: "max-height, opacity, transform",
                    transitionDuration: "0.5s",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Dropdown
                    item={item}
                    isOpen={activeDropdown === item.label}
                    onClose={handleDropdownItemClick}
                    isMobile={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Navigation - CLICK ONLY
  return (
    <div className="hidden lg:flex items-center space-x-2">
      {items.map((item) => (
        <div key={item.label} className="relative">
          {item.hasDropdown ? (
            <button
              className={getNavItemClasses(item)}
              type="button"
              onClick={(e) => {
                console.log("🖥️ Desktop dropdown button clicked:", item.label);
                handleItemClick(item, e);
              }}
              aria-expanded={activeDropdown === item.label}
              aria-haspopup="true"
              data-dropdown-button={item.label}
            >
              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-400/10 to-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="flex items-center space-x-2 relative z-10">
                {renderIcon(
                  item.icon,
                  "text-sm opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                )}
                <span className="font-semibold">{item.label}</span>
              </div>

              <svg
                className={`w-4 h-4 transition-all duration-300 relative z-10 ${
                  activeDropdown === item.label
                    ? "rotate-180 text-yellow-300"
                    : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <Link
              href={item.href}
              className={getNavItemClasses(item)}
              onClick={() =>
                console.log("🖥️ Desktop nav link clicked:", item.label)
              }
            >
              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-400/10 to-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="flex items-center space-x-2 relative z-10">
                {renderIcon(
                  item.icon,
                  "text-sm opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                )}
                <span className="font-semibold">{item.label}</span>
              </div>
            </Link>
          )}

          {/* Desktop Dropdown */}
          <div data-dropdown-menu={item.label}>
            <Dropdown
              item={item}
              isOpen={activeDropdown === item.label}
              onClose={handleDropdownItemClick}
              isMobile={false}
              isClickedOpen={activeDropdown === item.label}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;
