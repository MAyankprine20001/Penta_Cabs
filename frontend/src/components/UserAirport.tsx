"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { theme } from "@/styles/theme";
import { ThemedSelect } from "@/components/UI/ThemedSelect";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedDatePicker } from "@/components/UI/ThemedDatePicker";
import { ThemedTimePicker } from "@/components/UI/ThemedTimePicker";
import { ThemedButton } from "@/components/UI/ThemedButton";
import { TabGroup } from "@/components/UI/TabGroup";

const UserAirport = () => {
  const [formData, setFormData] = useState({
    serviceType: "drop",
    airportCity: "",
    otherLocation: "",
    date: "",
    time: "",
    name: "",
    phoneNumber: "",
  });
  const [airportsData, setAirportsData] = useState([]);
  const [cabOptions, setCabOptions] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/available-airports")
      .then((res) => setAirportsData(res.data.airports))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCabOptions([]);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/search-cabs-forairport",
        formData
      );

      if (response.data.cabs.length === 0) {
        setError("No cabs available for this route.");
        return;
      }

      // Prepare booking data for navigation
      const bookingData = {
        serviceType: "AIRPORT",
        tripType: "ONEWAY",
        airport: formData.airportCity,
        address: formData.otherLocation,
        pickupDropType: formData.serviceType === "pickup" ? "PICKUP" : "DROP",
        date: formData.date,
        pickupTime: formData.time,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        // Add API response data
        apiCabs: JSON.stringify(response.data.cabs),
        apiResponse: JSON.stringify(response.data),
      };

      // Convert booking data to URL search params
      const searchParams = new URLSearchParams();
      Object.entries(bookingData).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });

      // Navigate to cab-lists page
      window.location.href = `/cab-lists?${searchParams.toString()}`;
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const getOtherLocations = () => {
    const airport = airportsData.find(
      (a: any) => a.airportCity === formData.airportCity
    );
    if (!airport) return [];
    return formData.serviceType === "drop"
      ? airport.dropLocations
      : airport.pickLocations;
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
      await axios.post("http://localhost:5000/api/send-airport-email", {
        email: traveller.email,
        route: `${
          formData.serviceType === "pickup" ? "Pickup from" : "Drop to"
        } ${formData.airportCity}`,
        cab: selectedCab,
        traveller,
        date: formData.date,
        time: formData.time,
        serviceType: formData.serviceType,
        otherLocation: formData.otherLocation,
      });
      setMessage("✅ Booking confirmed! Confirmation sent.");
    } catch (err) {
      setMessage("❌ Failed to send booking email.");
    }
  };

  const otherLocs = getOtherLocations();

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
            activeOption={formData.serviceType === "pickup" ? "PICKUP" : "DROP"}
            onOptionChange={(option) =>
              handleChange("serviceType", option.toLowerCase())
            }
          />
        </div>
      </div>

      {!selectedCab && (
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Airport City Selection */}
          <div className="space-y-2">
            <label
              className="block text-sm sm:text-base font-medium px-1"
              style={{
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              AIRPORT CITY
            </label>
            <ThemedSelect
              value={formData.airportCity}
              onChange={(e) => handleChange("airportCity", e.target.value)}
              options={airportsData.map((airport: any) => ({
                value: airport.airportCity,
                label: airport.airportCity,
              }))}
              placeholder="Select Airport City"
            />
          </div>

          {/* Other Location Selection */}
          <div className="space-y-2">
            <label
              className="block text-sm sm:text-base font-medium px-1"
              style={{
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              OTHER ADDRESS (YOUR LOCATION)
            </label>
            <ThemedSelect
              value={formData.otherLocation}
              onChange={(e) => handleChange("otherLocation", e.target.value)}
              options={otherLocs.map((loc: string) => ({
                value: loc,
                label: loc,
              }))}
              placeholder="Select Location"
            />
          </div>

          {/* Date and Time Section */}
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
                TIME
              </label>
              <ThemedTimePicker
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
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
                value={formData.name || ""}
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
                value={formData.phoneNumber || ""}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          <ThemedButton
            onClick={() => handleSearch({} as React.FormEvent)}
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

export default UserAirport;
