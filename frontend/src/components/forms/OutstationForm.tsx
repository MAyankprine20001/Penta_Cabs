// src/components/forms/OutstationForm.tsx (Enhanced)
"use client";

import React, { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import { ThemedSelect } from "@/components/UI/ThemedSelect";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedDatePicker } from "@/components/UI/ThemedDatePicker";
import { ThemedTimePicker } from "@/components/UI/ThemedTimePicker";
import { TabGroup } from "@/components/UI/TabGroup";
import { BookingFormData, TripType } from "@/types/booking";
import { CITIES } from "@/constants/booking";
import { outstationService } from "@/services/outstationService";
import { BsCarFront, BsArrowRepeat } from "react-icons/bs";

interface OutstationFormProps {
  bookingData: BookingFormData;
  errors: Record<string, string>;
  activeTripType: TripType;
  onInputChange: (field: keyof BookingFormData, value: string) => void;
  onTripTypeChange: (type: TripType) => void;
}

export const OutstationForm: React.FC<OutstationFormProps> = ({
  bookingData,
  errors,
  activeTripType,
  onInputChange,
  onTripTypeChange,
}) => {
  const [cityMap, setCityMap] = useState<Record<string, string[]>>({});
  const [fromCities, setFromCities] = useState<string[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);

  // Fetch available cities from API
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      setCitiesError(null);
      try {
        const response = await outstationService.getAvailableCities();
        console.log("response", response);
        if (response.fromCities && response.fromCities.length > 0) {
          setFromCities(response.fromCities);
          setCityMap(response.cityMap);
        } else {
          // If API returns empty data, use default cities
          setCitiesError("No cities available from API. Using default list.");
          setFromCities(CITIES);
          // Create a simple city map for default cities
          const defaultCityMap: Record<string, string[]> = {};
          CITIES.forEach((city) => {
            defaultCityMap[city] = CITIES.filter((c) => c !== city);
          });
          setCityMap(defaultCityMap);
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
        setCitiesError("Failed to load cities. Using default list.");
        // Fallback to default cities if API fails
        setFromCities(CITIES);
        const defaultCityMap: Record<string, string[]> = {};
        CITIES.forEach((city) => {
          defaultCityMap[city] = CITIES.filter((c) => c !== city);
        });
        setCityMap(defaultCityMap);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  // Get available destination cities based on selected departure city
  const getToCities = () => {
    if (!bookingData.from) return [];
    return cityMap[bookingData.from] || [];
  };

  // Helper function to get minimum return date (should be same day or later than departure)
  const getMinReturnDate = (): string => {
    if (!bookingData.date) return "";

    // Convert DD-MM-YY to YYYY-MM-DD for comparison
    const [day, month, year] = bookingData.date.split("-");
    const fullYear = year.length === 2 ? `20${year}` : year;
    return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

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
          INDIA&apos;S PREMIER INTERCITY CABS
        </h3>
        <div className="px-2 sm:px-4">
          <TabGroup
            options={["ONEWAY", "ROUNDWAY"]}
            activeOption={activeTripType}
            onOptionChange={onTripTypeChange}
          />
        </div>
      </div>

      {/* Cities Selection with Swap Button */}
      <div className="space-y-4">
        {citiesError && (
          <div
            className="p-2 rounded text-center text-xs sm:text-sm"
            style={{
              backgroundColor: theme.colors.background.secondary,
              color: theme.colors.text.muted,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            {citiesError}
          </div>
        )}
        <div className="space-y-2">
          <label
            className="block text-sm sm:text-base font-medium px-1"
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            FROM
          </label>
          <ThemedSelect
            value={bookingData.from}
            onChange={(e) => {
              onInputChange("from", e.target.value);
              // Clear destination when departure city changes
              if (bookingData.to && !getToCities().includes(bookingData.to)) {
                onInputChange("to", "");
              }
            }}
            options={fromCities}
            placeholder={
              isLoadingCities ? "Loading cities..." : "Select Departure City"
            }
            error={errors.from}
          />
        </div>

        {/* Swap Button - Enhanced for mobile */}
        {/* <div className="flex justify-center -my-2 relative z-10">
          <CitySwapButton
            onSwap={handleCitySwap}
            className="transform scale-90 sm:scale-100"
          />
        </div> */}

        <div className="space-y-2">
          <label
            className="block text-sm sm:text-base font-medium px-1"
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            TO
          </label>
          <ThemedSelect
            value={bookingData.to}
            onChange={(e) => onInputChange("to", e.target.value)}
            options={getToCities()}
            placeholder={
              !bookingData.from
                ? "Select departure city first"
                : isLoadingCities
                ? "Loading cities..."
                : "Select Destination City"
            }
            error={errors.to}
          />
        </div>
      </div>

      {/* Departure Date and Time */}
      <div className="space-y-4">
        <div
          className="p-3 sm:p-4 rounded-lg border"
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.border.goldLight,
          }}
        >
          <h4
            className="font-semibold mb-3 text-center text-sm sm:text-base flex items-center justify-center gap-2"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            <BsCarFront className="w-4 h-4" />
            DEPARTURE DETAILS
          </h4>

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
                DEPARTURE DATE
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
        </div>

        {/* Return Date (Only for Round Trip) */}
        {activeTripType === "ROUNDWAY" && (
          <div
            className="p-3 sm:p-4 rounded-lg border animate-fadeIn"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.goldLight,
            }}
          >
            <h4
              className="font-semibold mb-3 text-center text-sm sm:text-base flex items-center justify-center gap-2"
              style={{
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              <BsArrowRepeat className="w-4 h-4" />
              RETURN DETAILS
            </h4>

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
                  RETURN DATE
                </label>
                <ThemedDatePicker
                  value={bookingData.returnDate || ""}
                  onChange={(e) => onInputChange("returnDate", e.target.value)}
                  error={errors.returnDate}
                  min={getMinReturnDate()}
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
                  RETURN TIME
                </label>
                <ThemedTimePicker
                  value={bookingData.time}
                  onChange={(e) => onInputChange("time", e.target.value)}
                  error={errors.time}
                />
              </div>
            </div>

            {/* Return Trip Info */}
            <div
              className="mt-3 p-2 rounded text-center text-xs sm:text-sm"
              style={{
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.muted,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Return journey: {bookingData.to || "Destination"} →{" "}
              {bookingData.from || "Origin"}
            </div>
          </div>
        )}
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
      {bookingData.from && bookingData.to && (
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
            <span className="font-semibold">{bookingData.from}</span>
            <span style={{ color: theme.colors.accent.gold }}>
              {activeTripType === "ROUNDWAY" ? "⇄" : "→"}
            </span>
            <span className="font-semibold">{bookingData.to}</span>
          </div>
          <div
            className="text-xs sm:text-sm mt-1"
            style={{ color: theme.colors.text.muted }}
          >
            {activeTripType === "ROUNDWAY" ? "Round Trip" : "One Way Trip"}
          </div>
        </div>
      )}
    </div>
  );
};
