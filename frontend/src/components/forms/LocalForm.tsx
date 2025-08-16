// src/components/forms/LocalForm.tsx
"use client";

import React from "react";
import { theme } from "@/styles/theme";
import { ThemedSelect } from "@/components/UI/ThemedSelect";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedDatePicker } from "@/components/UI/ThemedDatePicker";
import { ThemedTimePicker } from "@/components/UI/ThemedTimePicker";
import { BookingFormData } from "@/types/booking";
import { CITIES, PACKAGES } from "@/constants/booking";

interface LocalFormProps {
  bookingData: BookingFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof BookingFormData, value: string) => void;
}

export const LocalForm: React.FC<LocalFormProps> = ({
  bookingData,
  errors,
  onInputChange,
}) => (
  <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 max-w-md mx-auto sm:max-w-none">
    {/* Header Section */}
    <div className="text-center space-y-3 sm:space-y-4">
      <h3
        className="font-bold text-lg sm:text-xl lg:text-2xl px-2 leading-tight"
        style={{
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
          fontWeight: theme.typography.fontWeight.bold,
        }}
      >
        HOURLY RENTALS WITHIN THE CITY
      </h3>
    </div>

    {/* City Selection */}
    <div className="space-y-2">
      <label
        className="block text-sm sm:text-base font-medium px-1"
        style={{
          color: theme.colors.text.secondary,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        CITY
      </label>
      <ThemedSelect
        value={bookingData.city}
        onChange={(e) => onInputChange("city", e.target.value)}
        options={CITIES}
        placeholder="Select City"
        error={errors.city}
      />
    </div>

    {/* Package Selection */}
    <div className="space-y-2">
      <label
        className="block text-sm sm:text-base font-medium px-1"
        style={{
          color: theme.colors.text.secondary,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        PACKAGE
      </label>
      <ThemedSelect
        value={bookingData.package}
        onChange={(e) => onInputChange("package", e.target.value)}
        options={PACKAGES}
        placeholder="Select Package"
        error={errors.package}
      />
    </div>

    {/* Date and Time Section - Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div className="space-y-2">
        <label
          className="block text-sm sm:text-base font-medium px-1"
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          DATE
        </label>
        <ThemedDatePicker
          value={bookingData.date}
          onChange={(e) => onInputChange("date", e.target.value)}
          error={errors.date}
        />
      </div>
      <div className="space-y-2">
        <label
          className="block text-sm sm:text-base font-medium px-1"
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          PICKUP TIME
        </label>
        <ThemedTimePicker
          value={bookingData.pickupTime}
          onChange={(e) => onInputChange("pickupTime", e.target.value)}
          error={errors.pickupTime}
        />
      </div>
    </div>

    {/* Customer Details Section - Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div className="space-y-2">
        <label
          className="block text-sm sm:text-base font-medium px-1"
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          NAME
        </label>
        <ThemedInput
          placeholder="Enter your full name"
          value={bookingData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          error={errors.name}
        />
      </div>
      <div className="space-y-2">
        <label
          className="block text-sm sm:text-base font-medium px-1"
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          PHONE NUMBER
        </label>
        <ThemedInput
          placeholder="Enter your phone number"
          value={bookingData.phoneNumber}
          onChange={(e) => onInputChange("phoneNumber", e.target.value)}
          error={errors.phoneNumber}
        />
      </div>
    </div>

    {/* Trip Summary */}
    {bookingData.city && bookingData.package && (
      <div
        className="p-3 sm:p-4 rounded-lg text-center border"
        style={{
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.goldLight,
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
        }}
      >
        <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
          <span className="font-semibold">{bookingData.city}</span>
          <span style={{ color: theme.colors.accent.gold }}>•</span>
          <span className="font-semibold">{bookingData.package}</span>
        </div>
        <div
          className="text-xs sm:text-sm mt-1"
          style={{ color: theme.colors.text.muted }}
        >
          Local Package
        </div>
      </div>
    )}
  </div>
);
