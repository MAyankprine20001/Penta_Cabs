// src/components/forms/AirportForm.tsx
"use client";

import React from "react";
import { theme } from "@/styles/theme";
import { ThemedSelect } from "@/components/UI/ThemedSelect";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedDatePicker } from "@/components/UI/ThemedDatePicker";
import { ThemedTimePicker } from "@/components/UI/ThemedTimePicker";
import { TabGroup } from "@/components/UI/TabGroup";
import { BookingFormData, PickupDropType } from "@/types/booking";
import { AIRPORTS } from "@/constants/booking";

interface AirportFormProps {
  bookingData: BookingFormData;
  errors: Record<string, string>;
  activePickupDrop: PickupDropType;
  onInputChange: (field: keyof BookingFormData, value: string) => void;
  onPickupDropChange: (type: PickupDropType) => void;
}

export const AirportForm: React.FC<AirportFormProps> = ({
  bookingData,
  errors,
  activePickupDrop,
  onInputChange,
  onPickupDropChange,
}) => {
  console.log("AirportForm rendered with bookingData:", activePickupDrop);

  return (
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
          RELIABLE AIRPORT PICKUPS & DROPS
        </h3>
        <div className="px-2 sm:px-4">
          <TabGroup
            options={["PICKUP", "DROP"]}
            activeOption={activePickupDrop}
            onOptionChange={onPickupDropChange}
          />
        </div>
      </div>

      {/* Airport Selection */}
      <div className="space-y-2">
        <label
          className="block text-sm sm:text-base font-medium px-1"
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          AIRPORT
        </label>
        <ThemedSelect
          value={bookingData.airport}
          onChange={(e) => onInputChange("airport", e.target.value)}
          options={AIRPORTS}
          placeholder="Select Airport or City"
          error={errors.airport}
        />
      </div>

      {/* Address Section */}
      <div className="space-y-2">
        <label
          className="block text-sm sm:text-base font-medium px-1"
          style={{
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {activePickupDrop === "PICKUP" ? "PICKUP ADDRESS" : "DROP ADDRESS"}
        </label>
        <ThemedInput
          placeholder={
            activePickupDrop === "PICKUP"
              ? "Enter pickup address"
              : "Enter drop address"
          }
          value={bookingData.address}
          onChange={(e) => onInputChange("address", e.target.value)}
          error={errors.address}
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
            {activePickupDrop === "PICKUP" ? "PICKUP TIME" : "DROP TIME"}
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
      {bookingData.airport && (
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
            <span className="font-semibold">{bookingData.airport}</span>
            <span style={{ color: theme.colors.accent.gold }}>•</span>
            <span className="font-semibold capitalize">{activePickupDrop}</span>
          </div>
          <div
            className="text-xs sm:text-sm mt-1"
            style={{ color: theme.colors.text.muted }}
          >
            Airport Service
          </div>
        </div>
      )}
    </div>
  );
};
