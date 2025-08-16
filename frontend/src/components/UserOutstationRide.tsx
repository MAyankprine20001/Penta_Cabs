"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@/styles/theme";
import { ThemedSelect } from "@/components/UI/ThemedSelect";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedDatePicker } from "@/components/UI/ThemedDatePicker";
import { ThemedTimePicker } from "@/components/UI/ThemedTimePicker";
import { ThemedButton } from "@/components/UI/ThemedButton";
import { TabGroup } from "@/components/UI/TabGroup";
import { BsCarFront, BsArrowRepeat } from "react-icons/bs";
import { outstationService } from "@/services/outstationService";

const UserOutstationRide = () => {
  const [formData, setFormData] = useState({
    city1: "",
    city2: "",
    tripType: "one-way",
    date: "2025-06-03",
    time: "23:00",
    returnDate: "",
    returnTime: "23:00",
    name: "",
    phoneNumber: "",
  });

  const [cityMap, setCityMap] = useState({});
  const [fromCities, setFromCities] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [traveller, setTraveller] = useState({
    name: "",
    mobile: "",
    email: "",
    pickup: "",
    drop: "",
    remark: "",
    gst: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await outstationService.getAvailableCities();
        setCityMap(response.cityMap);
        setFromCities(response.fromCities);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (field: string, value: string) => {
    if (field === "city1") {
      setFormData((prev) => ({ ...prev, city1: value, city2: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleTripTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      tripType: type === "ONEWAY" ? "one-way" : "two-way",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Make API call to get cab data
      const response = await outstationService.searchIntercityCabs({
        city1: formData.city1,
        city2: formData.city2,
        tripType: formData.tripType,
      });

      if (response.cars.length === 0) {
        setError("No cabs available for this route.");
        return;
      }

      // Prepare booking data for navigation
      const bookingData = {
        serviceType: "OUTSTATION",
        tripType: formData.tripType === "one-way" ? "ONEWAY" : "ROUNDWAY",
        from: formData.city1,
        to: formData.city2,
        date: formData.date,
        pickupTime: formData.time,
        returnDate: formData.returnDate || "",
        time: formData.returnTime || "",
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        // Add API response data
        apiCabs: JSON.stringify(response.cars),
        apiResponse: JSON.stringify(response),
      };

      // Convert booking data to URL search params
      const searchParams = new URLSearchParams();
      Object.entries(bookingData).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });

      // Navigate to cab-lists page
      window.location.href = `/cab-lists?${searchParams.toString()}`;
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCabSelect = (cab: any) => {
    setSelectedCab(cab);
    setMessage("");
  };

  const handleTravellerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTraveller((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    try {
      const payload = {
        email: traveller.email,
        route: `${formData.city1} ➡️ ${formData.city2}`,
        cab: selectedCab,
        traveller,
      };

      await fetch("http://localhost:5000/send-intercity-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setMessage("✅ Booking confirmed! Details sent via email.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send booking email.");
    }
  };

  const toCities = cityMap[formData.city1] || [];

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
            activeOption={
              formData.tripType === "one-way" ? "ONEWAY" : "ROUNDWAY"
            }
            onOptionChange={handleTripTypeChange}
          />
        </div>
      </div>

      {!selectedCab && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cities Selection */}
          <div className="space-y-4">
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
                value={formData.city1}
                onChange={(e) => handleChange("city1", e.target.value)}
                options={fromCities.map((city: string) => ({
                  value: city,
                  label: city,
                }))}
                placeholder="Select Departure City"
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
                TO
              </label>
              <ThemedSelect
                value={formData.city2}
                onChange={(e) => handleChange("city2", e.target.value)}
                options={toCities.map((city: string) => ({
                  value: city,
                  label: city,
                }))}
                placeholder={
                  !formData.city1
                    ? "Select departure city first"
                    : "Select Destination City"
                }
              />
            </div>
          </div>

          {/* Departure Details */}
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
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
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
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Return Details (Only for Round Trip) */}
            {formData.tripType === "two-way" && (
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
                      value={formData.returnDate || ""}
                      onChange={(e) =>
                        handleChange("returnDate", e.target.value)
                      }
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
                      value={formData.returnTime || "23:00"}
                      onChange={(e) =>
                        handleChange("returnTime", e.target.value)
                      }
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
                  Return journey: {formData.city2 || "Destination"} →{" "}
                  {formData.city1 || "Origin"}
                </div>
              </div>
            )}
          </div>

          {/* Customer Details Section */}
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
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
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
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          <ThemedButton
            onClick={() => handleSubmit({} as React.FormEvent)}
            disabled={loading}
            loading={loading}
            className="w-full"
          >
            Search Cabs
          </ThemedButton>
        </form>
      )}

      {/* Show Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UserOutstationRide;
