// src/components/Navbar.tsx
"use client";

import React from "react";
import { navigationItems } from "@/config/navigation";
import { useScrollProgress, useNavbarState } from "@/hooks/useNavbar";
import Logo from "./navbar/Logo";
import NavigationMenu from "./navbar/NavigationMenu";
import PhoneButton from "./navbar/PhoneButton";
import MobileMenuButton from "./navbar/MobileMenuButton";

const Navbar: React.FC = () => {
  const { scrollProgress, isScrolled } = useScrollProgress();
  const {
    activeDropdown,
    isMobileMenuOpen,
    clickedDropdown,
    isMobile,
    handleDropdownToggle,
    handleDropdownClose,
    handleMobileMenuToggle,
    handleMobileMenuClose,
  } = useNavbarState();

  // Handle mobile overlay clicks with better logic
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself (not any child elements)
    if (e.target === e.currentTarget) {
      console.log("📱 Mobile overlay clicked");

      // If a dropdown is open, close it first
      if (activeDropdown) {
        console.log("📱 Closing active dropdown from overlay");
        handleDropdownClose();
      } else {
        console.log("📱 Closing mobile menu from overlay");
        handleMobileMenuClose();
      }
    }
  };

  // Handle mobile menu button click
  const handleMobileToggle = () => {
    console.log("📱 Mobile menu button clicked");
    handleMobileMenuToggle();
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl shadow-2xl border-b border-yellow-500/20 transition-all duration-700 ease-out"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 opacity-100" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-22">
            {/* Logo */}
            <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
              <div className="text-white">
                <Logo />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavigationMenu
                items={navigationItems}
                activeDropdown={activeDropdown}
                onDropdownToggle={handleDropdownToggle}
                onDropdownClose={handleDropdownClose}
                clickedDropdown={clickedDropdown}
                isMobile={false}
              />
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Phone Button */}
              <div className="hidden lg:block">
                <PhoneButton className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25" />
              </div>

              {/* Mobile Menu Button */}
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={handleMobileToggle}
                className="lg:hidden mobile-menu-button p-2 rounded-lg hover:bg-yellow-500/10 transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent opacity-100" />
      </nav>

      {/* Mobile Menu Overlay - Only show when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={handleOverlayClick}
          aria-hidden="true"
          role="button"
          tabIndex={-1}
        />
      )}

      {/* Mobile Menu Content */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 bottom-0 z-50 bg-black/98 backdrop-blur-2xl border-b border-yellow-500/20 transition-all duration-300 transform ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: "0.3s",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />

        <div className="relative min-h-full flex flex-col overflow-y-auto">
          {/* Mobile Navigation Menu */}
          <div className="flex-1">
            <NavigationMenu
              items={navigationItems}
              activeDropdown={activeDropdown}
              onDropdownToggle={handleDropdownToggle}
              onDropdownClose={handleDropdownClose}
              isMobile={true}
              onMobileMenuClose={handleMobileMenuClose}
              clickedDropdown={clickedDropdown}
            />
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/30 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transition-all duration-300 shadow-lg shadow-yellow-500/50"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: `0 0 20px rgba(234, 179, 8, 0.6)`,
          }}
        />
      </div>

      {/* Navbar Spacer */}
      <div className="h-18 lg:h-22" aria-hidden="true" />
    </>
  );
};

export default Navbar;
