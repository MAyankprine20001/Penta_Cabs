// src/app/cab-detail/page.tsx
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { BookingFormData } from "@/types/booking";
import {
  sendAirportEmail,
  sendLocalEmail,
  sendIntercityEmail,
  prepareEmailData,
} from "@/services/emailService";

// Theme configuration (matching HeroSection and cab-lists)
const theme = {
  colors: {
    primary: {
      black: "#000000",
      darkGray: "#1a1a1a",
    },
    accent: {
      gold: "#FFD700",
      lightGold: "#FFF700",
    },
    secondary: {
      amber: "#FFA500",
      warmYellow: "#FFB84D",
      lightAmber: "#FFCC80",
      teal: "#20B2AA",
      darkTeal: "#008B8B",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E5E5E5",
      muted: "#B0B0B0",
    },
    background: {
      primary: "#000000",
      dark: "#0a0a0a",
      gradient:
        "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
      lightTeal: "#E0F7FA",
    },
    border: {
      gold: "#FFD700",
      goldLight: "#FFF700",
      light: "rgba(255, 255, 255, 0.1)",
    },
    shadow: {
      gold: "rgba(255, 215, 0, 0.4)",
      primary: "rgba(0, 0, 0, 0.8)",
      elevated: "rgba(0, 0, 0, 0.6)",
    },
  },
  gradients: {
    heroGradient:
      "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)",
    gold: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    cardGradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    teal: "linear-gradient(135deg, #20B2AA 0%, #008B8B 100%)",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    fontWeight: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

// Extended interface for combined booking and cab data
interface CombinedBookingData extends BookingFormData {
  selectedCabId?: string;
  selectedCabName?: string;
  selectedCabType?: string;
  selectedCabPrice?: string;
  selectedCabBasePrice?: string;
  selectedCabPricePerKm?: string;
  selectedCabCapacity?: string;
  selectedCabLuggage?: string;
  selectedCabFeatures?: string;
  selectedCabFuelType?: string;
  selectedCabImage?: string;
  estimatedDistance?: string;
  address?: string;
}

// Component that uses useSearchParams
const BookingDetailsContent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bookingData, setBookingData] = useState<CombinedBookingData | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pickup: "",
    drop: "",
    remark: "",
    whatsapp: false,
    gstDetails: false,
    gst: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    // Parse URL parameters to get booking data
    const data: Record<string, string> = {};

    // Extract all URL parameters
    searchParams.forEach((value, key) => {
      data[key] = value;
    });

    setBookingData(data as unknown as CombinedBookingData);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      console.log("Form submitted:", formData);
      console.log("Booking data:", bookingData);

      if (!bookingData) {
        throw new Error("Booking data not available");
      }

      // Prepare email data based on service type
      const emailData = prepareEmailData(
        bookingData,
        formData,
        bookingData.serviceType as "AIRPORT" | "LOCAL" | "OUTSTATION"
      );

      console.log("Prepared email data:", emailData);

      // Send email based on service type
      let emailResponse;
      switch (bookingData.serviceType) {
        case "AIRPORT":
          emailResponse = await sendAirportEmail(emailData);
          break;
        case "LOCAL":
          emailResponse = await sendLocalEmail(emailData);
          break;
        case "OUTSTATION":
          emailResponse = await sendIntercityEmail(emailData);
          break;
        default:
          throw new Error(
            `Unsupported service type: ${bookingData.serviceType}`
          );
      }

      console.log("Email sent successfully:", emailResponse);

      // Show success message
      setSubmitStatus({
        type: "success",
        message:
          "Booking request sent successfully! You will receive a confirmation email shortly.",
      });

      // Combine booking data with form data and send to cab-booking page
      const combinedData = {
        ...bookingData,
        ...formData,
      };

      // Convert to URL search params
      const searchParams = new URLSearchParams();
      Object.entries(combinedData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          searchParams.append(key, value.toString());
        }
      });

      // Navigate to cab-booking page with all data after a short delay
      setTimeout(() => {
        window.location.href = `/cab-booking?${searchParams.toString()}`;
      }, 2000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send booking request. Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to format trip details based on booking data
  const formatTripDetails = () => {
    if (!bookingData) return "Loading trip details...";

    const {
      serviceType,
      tripType,
      from,
      to,
      airport,
      dropAddress,
      city,
      date,
      time,
      pickupTime,
    } = bookingData;

    let tripText = "";

    if (serviceType === "AIRPORT") {
      if (bookingData.pickupDropType === "PICKUP") {
        tripText = `From ${airport} To ${dropAddress}`;
      } else {
        tripText = `From ${dropAddress} To ${airport}`;
      }
    } else if (serviceType === "OUTSTATION") {
      tripText = `From ${from} To ${to}`;
    } else if (serviceType === "LOCAL") {
      tripText = `Local trip in ${city}`;
    }

    const displayTime = time || pickupTime || "Not specified";
    const tripTypeText = tripType === "ROUNDWAY" ? "ROUND TRIP" : "ONEWAY TRIP";

    return `${tripTypeText} | ${tripText} | On ${date} at ${displayTime}`;
  };

  // Helper function to get pickup display text
  const getPickupDisplay = () => {
    if (!bookingData) return "Loading...";

    const { date, time, pickupTime } = bookingData;
    const displayTime = time || pickupTime || "Not specified";
    return `${date} at ${displayTime}`;
  };

  // Helper function to get route display text
  const getRouteDisplay = () => {
    if (!bookingData) return "Loading...";

    const { serviceType, from, to, airport, address } = bookingData;

    if (serviceType === "AIRPORT") {
      if (bookingData.pickupDropType === "PICKUP") {
        return `${airport} >> ${address || "Your location"}`;
      } else {
        return `${address || "Your location"} >> ${airport}`;
      }
    } else if (serviceType === "OUTSTATION") {
      return `${from} >> ${to}`;
    } else if (serviceType === "LOCAL") {
      return `Local trip in ${bookingData.city}`;
    }

    return "Route not specified";
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: theme.gradients.heroGradient,
        fontFamily: theme.typography.fontFamily.sans.join(", "),
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 70%, #000000 100%)`,
          }}
        />

        {/* Animated background particles */}
        <div
          className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full blur-2xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
            opacity: 0.1,
            animationDuration: "3s",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-32 h-32 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.amber,
            opacity: 0.08,
            animationDelay: "1.5s",
            animationDuration: "4s",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div
          className={`text-center mb-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h1
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{
              color: theme.colors.accent.gold,
              textShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            Complete Your Booking
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Booking Details */}
          <div
            className={`${
              isVisible ? "animate-fade-in-up animate-delay-300" : "opacity-0"
            }`}
          >
            {/* Booking Details Card */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: theme.gradients.cardGradient,
                border: `2px solid ${theme.colors.accent.gold}`,
                boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}, 0 0 0 1px ${theme.colors.accent.gold}30`,
              }}
            >
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{
                  color: theme.colors.accent.gold,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                {bookingData?.tripType === "ROUNDWAY" ? "Round Trip" : "Oneway"}{" "}
                Booking Details
              </h2>

              <div className="space-y-4">
                {[
                  {
                    label: "Route :",
                    value: getRouteDisplay(),
                  },
                  { label: "Pickup :", value: getPickupDisplay() },
                  {
                    label: "Car Type :",
                    value: bookingData?.selectedCabName
                      ? `${bookingData.selectedCabName} or Similar`
                      : "Not selected",
                  },
                  {
                    label: "Distance :",
                    value: bookingData?.estimatedDistance
                      ? `${bookingData.estimatedDistance} Km`
                      : "Calculating...",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span
                      className="font-medium"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: theme.colors.text.primary }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}

                <div
                  className="border-t pt-4 mt-6"
                  style={{ borderColor: theme.colors.border.light }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className="text-lg font-bold"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      Estimated Amount :
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color: theme.colors.accent.gold,
                        textShadow: `0 2px 10px ${theme.colors.shadow.gold}`,
                      }}
                    >
                      ₹ {bookingData?.selectedCabPrice || "Calculating..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Cab Details */}
            {bookingData?.selectedCabImage && (
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: theme.gradients.cardGradient,
                  border: `1px solid ${theme.colors.border.light}`,
                }}
              >
                <h3
                  className="text-lg font-bold mb-4 text-center"
                  style={{
                    color: theme.colors.accent.gold,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  Selected Vehicle
                </h3>

                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-16 rounded-lg overflow-hidden"
                    style={{
                      background: theme.gradients.gold,
                      padding: "2px",
                    }}
                  >
                    <img
                      src={bookingData.selectedCabImage}
                      alt={bookingData.selectedCabName || "Selected Cab"}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h4
                      className="font-semibold text-lg mb-2"
                      style={{
                        color: theme.colors.text.primary,
                        fontWeight: theme.typography.fontWeight.semibold,
                      }}
                    >
                      {bookingData.selectedCabName}
                    </h4>

                    <div className="flex items-center gap-4 text-sm">
                      <span style={{ color: theme.colors.text.secondary }}>
                        👤 {bookingData.selectedCabCapacity} Seats
                      </span>
                      <span style={{ color: theme.colors.text.secondary }}>
                        🧳 {bookingData.selectedCabLuggage} Bags
                      </span>
                      <span style={{ color: theme.colors.text.secondary }}>
                        ❄️ AC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Traveller Information */}
          <div
            className={`${
              isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"
            }`}
          >
            <div
              className="rounded-2xl p-6"
              style={{
                background: theme.gradients.cardGradient,
                border: `2px solid ${theme.colors.accent.gold}`,
                boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}, 0 0 0 1px ${theme.colors.accent.gold}30`,
              }}
            >
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{
                  color: theme.colors.accent.gold,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Traveller Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Name <span style={{ color: "#FF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      background: theme.colors.primary.black,
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />
                </div>

                {/* Mobile Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Mobile <span style={{ color: "#FF4444" }}>*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-14 px-1 py-3 rounded-lg text-white focus:outline-none focus:ring-2 text-sm flex-shrink-0"
                      style={{
                        background: theme.colors.primary.black,
                        border: `1px solid ${theme.colors.border.light}`,
                      }}
                    >
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="flex-1 min-w-0 px-3 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        background: theme.colors.primary.black,
                        border: `1px solid ${theme.colors.border.light}`,
                      }}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Email <span style={{ color: "#FF4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      background: theme.colors.primary.black,
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />
                </div>

                {/* Pickup Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Pickup
                  </label>
                  <input
                    type="text"
                    name="pickup"
                    placeholder="Pickup Address"
                    value={formData.pickup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      background: theme.colors.primary.black,
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />
                </div>

                {/* Drop Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Drop
                  </label>
                  <input
                    type="text"
                    name="drop"
                    placeholder="Drop Address"
                    value={formData.drop}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      background: theme.colors.primary.black,
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />
                </div>

                {/* Remark Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Remark
                  </label>
                  <textarea
                    name="remark"
                    placeholder="Remark for the Driver"
                    value={formData.remark}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                    style={{
                      background: theme.colors.primary.black,
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="whatsapp"
                      name="whatsapp"
                      checked={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: theme.colors.accent.gold }}
                    />
                    <label
                      htmlFor="whatsapp"
                      className="text-sm"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      Send Details On WhatsApp and Email
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="gstDetails"
                      name="gstDetails"
                      checked={formData.gstDetails}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: theme.colors.accent.gold }}
                    />
                    <label
                      htmlFor="gstDetails"
                      className="text-sm"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      GST Details
                    </label>
                  </div>

                  {/* GST Input Field - Show only when GST checkbox is checked */}
                  {formData.gstDetails && (
                    <div className="mt-3">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        GST Number
                      </label>
                      <input
                        type="text"
                        name="gst"
                        placeholder="Enter GST Number"
                        value={formData.gst}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300"
                        style={{
                          background: theme.colors.primary.black,
                          border: `1px solid ${theme.colors.border.light}`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg mb-4 text-center font-medium ${
                      submitStatus.type === "success"
                        ? "bg-green-900 text-green-100 border border-green-500"
                        : "bg-red-900 text-red-100 border border-red-500"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 rounded-xl text-lg transition-all duration-500 transform relative overflow-hidden group ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                  style={{
                    background: theme.gradients.gold,
                    color: theme.colors.primary.black,
                    fontWeight: theme.typography.fontWeight.bold,
                    boxShadow: `0 20px 60px ${theme.colors.shadow.gold}`,
                    border: `2px solid ${theme.colors.accent.lightGold}`,
                  }}
                >
                  {/* Button glow effect */}
                  <div
                    className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: theme.gradients.gold,
                      transform: "scale(1.2)",
                    }}
                  />
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        SENDING...
                      </div>
                    ) : (
                      "PROCEED"
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Trip Details Summary */}
        {bookingData && (
          <div
            className={`mt-8 rounded-xl p-6 ${
              isVisible ? "animate-fade-in-up animate-delay-900" : "opacity-0"
            }`}
            style={{
              background: theme.colors.primary.darkGray,
              border: `1px solid ${theme.colors.border.light}`,
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <span
                className="px-4 py-2 rounded-full font-medium"
                style={{
                  backgroundColor: theme.colors.primary.black,
                  color: theme.colors.text.secondary,
                  border: `1px solid ${theme.colors.border.light}`,
                }}
              >
                {bookingData.tripType === "ROUNDWAY"
                  ? "ROUND TRIP"
                  : "ONEWAY TRIP"}
              </span>

              <span
                className="text-center flex-1"
                style={{ color: theme.colors.text.secondary }}
              >
                {formatTripDetails()} | {bookingData.estimatedDistance || "0"}{" "}
                Km
              </span>

              <button
                className="px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300"
                style={{
                  background: theme.gradients.gold,
                  color: theme.colors.primary.black,
                  fontWeight: theme.typography.fontWeight.medium,
                }}
                onClick={() => {
                  // Navigate back to booking form with current data
                  window.history.back();
                }}
              >
                Modify
              </button>
            </div>
          </div>
        )}

        {/* Safety Guidelines Section */}
        <div
          className={`mt-12 rounded-2xl overflow-hidden ${
            isVisible ? "animate-fade-in-up animate-delay-1200" : "opacity-0"
          }`}
          style={{
            background: theme.colors.background.lightTeal,
            border: `2px solid ${theme.colors.accent.gold}`,
          }}
        >
          <div
            className="py-4 px-6"
            style={{
              background: theme.gradients.gold,
              color: theme.colors.primary.black,
            }}
          >
            <h3
              className="text-xl font-bold"
              style={{ fontWeight: theme.typography.fontWeight.bold }}
            >
              Safety Guidelines
            </h3>
          </div>

          <div className="p-6 space-y-4" style={{ color: "#333" }}>
            {[
              "If you have Booking Confirmation, rest assured you will get cab. We ensure cab arrives on time at your pick-up destination.",
              "Makemyride provide you best taxi services with Experienced and professional Drivers everytime. Working from last 10+ Years. Our company has more than 1500+ Trusted Customers and 750+ Comfortable rides.",
              "Your safety is our top priority. All our vehicles undergo regular maintenance and adhere to strict safety standards.",
              "We believe in transparency, and our pricing reflects that. You'll always know what you're paying for, with no hidden charges or surprises.",
              "To know more about Terms and Conditions you can read your cancellation policy and refund policy. We are available for you 24/7, with the best service in the travel marketplace.",
              "Our Email Address info@makemyride.com",
              "Our Contact Number 7600839900",
            ].map((guideline, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0"
                  style={{
                    background: theme.gradients.gold,
                    color: theme.colors.primary.black,
                  }}
                >
                  ✓
                </div>
                <p className="text-sm leading-relaxed">{guideline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Debug Info (Remove in production) */}
        {process.env.NODE_ENV === "development" && bookingData && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white mb-2">Debug - Received Booking Data:</h3>
            <pre className="text-green-400 text-xs overflow-auto">
              {JSON.stringify(bookingData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background: theme.gradients.gold,
        }}
      />

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-delay-300 {
          animation-delay: 300ms;
        }

        .animate-delay-600 {
          animation-delay: 600ms;
        }

        .animate-delay-900 {
          animation-delay: 900ms;
        }

        .animate-delay-1200 {
          animation-delay: 1200ms;
        }

        input::placeholder,
        textarea::placeholder {
          color: #888;
        }

        input:focus,
        textarea:focus,
        select:focus {
          ring: 2px solid ${theme.colors.accent.gold};
        }
      `}</style>
    </div>
  );
};

// Loading component for Suspense fallback
const LoadingFallback: React.FC = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: theme.gradients.heroGradient }}
  >
    <div className="text-center">
      <div
        className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
        style={{ borderColor: theme.colors.accent.gold }}
      ></div>
      <p style={{ color: theme.colors.text.primary }}>
        Loading booking details...
      </p>
    </div>
  </div>
);

// Main component with Suspense wrapper
const BookingDetailsPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingDetailsContent />
    </Suspense>
  );
};

export default BookingDetailsPage;
