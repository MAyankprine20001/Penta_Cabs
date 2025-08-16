// src/components/UI/ThemedSelect.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { theme } from "@/styles/theme";
import { BsChevronDown, BsSearch, BsX } from "react-icons/bs";

interface ThemedSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | { value: string; label: string }[];
  placeholder: string;
  error?: string;
  className?: string;
}

export const ThemedSelect: React.FC<ThemedSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Helper function to get option value and label
  const getOptionValue = (
    option: string | { value: string; label: string }
  ) => {
    return typeof option === "string" ? option : option.value;
  };

  const getOptionLabel = (
    option: string | { value: string; label: string }
  ) => {
    return typeof option === "string" ? option : option.label;
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle option selection
  const handleOptionSelect = (selectedValue: string) => {
    const syntheticEvent = {
      target: { value: selectedValue },
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange(syntheticEvent);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isOpen) {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionSelect(getOptionValue(filteredOptions[0]));
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Custom Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 sm:p-3.5 rounded-lg transition-all duration-300 outline-none text-sm sm:text-base min-h-[44px] sm:min-h-[48px] flex items-center justify-between"
        style={{
          backgroundColor: theme.colors.background.card,
          color: value ? theme.colors.text.primary : theme.colors.text.muted,
          border: `2px solid ${
            error ? theme.colors.status.error : theme.colors.border.muted
          }`,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
        }}
      >
        <span className="truncate">{value || placeholder}</span>
        <BsChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: theme.colors.text.secondary }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg shadow-lg border max-h-60 overflow-hidden"
          style={{
            backgroundColor: theme.colors.background.card,
            borderColor: theme.colors.border.muted,
          }}
        >
          {/* Search Input */}
          <div
            className="p-2 border-b"
            style={{ borderColor: theme.colors.border.muted }}
          >
            <div className="relative">
              <BsSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: theme.colors.text.muted }}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm rounded-md outline-none"
                style={{
                  backgroundColor: theme.colors.background.secondary,
                  color: theme.colors.text.primary,
                  border: `1px solid ${theme.colors.border.muted}`,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <BsX
                    className="w-4 h-4"
                    style={{ color: theme.colors.text.muted }}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={getOptionValue(option)}
                  type="button"
                  onClick={() => handleOptionSelect(getOptionValue(option))}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-opacity-10 transition-colors duration-150"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                    backgroundColor:
                      getOptionValue(option) === value
                        ? `${theme.colors.accent.gold}20`
                        : "transparent",
                  }}
                >
                  {getOptionLabel(option)}
                </button>
              ))
            ) : (
              <div
                className="px-3 py-4 text-center text-sm"
                style={{ color: theme.colors.text.muted }}
              >
                No cities found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p
          className="text-xs sm:text-sm mt-1 px-1"
          style={{ color: theme.colors.status.error }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
