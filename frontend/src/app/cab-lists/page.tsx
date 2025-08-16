// src/app/cab-lists/page.tsx
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Vehicle, VehicleType } from "@/types/index";
import type { BookingFormData } from "@/types/booking";
import { useRouter } from "next/navigation";

// Theme configuration (matching HeroSection)
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

const cabList: Vehicle[] = [
  {
    id: "1",
    name: "Innova",
    type: "innova",
    capacity: 4,
    features: ["AC"],
    pricePerKm: 12,
    basePrice: 7679,
    images: ["/innova.png"],
    available: true,
    fuelType: "petrol",
    airConditioned: true,
    luggage: 2,
  },
  {
    id: "2",
    name: "SEDAN",
    type: "sedan",
    capacity: 4,
    features: ["AC"],
    pricePerKm: 15,
    basePrice: 8442,
    images: ["/sendan.png"],
    available: true,
    fuelType: "petrol",
    airConditioned: true,
    luggage: 3,
  },
  {
    id: "3",
    name: "SUV",
    type: "suv",
    capacity: 6,
    features: ["AC"],
    pricePerKm: 18,
    basePrice: 10130,
    images: ["/suv.png"],
    available: true,
    fuelType: "diesel",
    airConditioned: true,
    luggage: 4,
  },
  {
    id: "4",
    name: "INNOVA CRYSTAL",
    type: "innovacrystal",
    capacity: 4,
    features: ["AC"],
    pricePerKm: 25,
    basePrice: 19757,
    images: ["/innovacrystal.png"],
    available: true,
    fuelType: "petrol",
    airConditioned: true,
    luggage: 3,
  },
];

// Move the main logic to a child component
const CabListsContent: React.FC = () => {
  const [selectedCab, setSelectedCab] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [apiCabs, setApiCabs] = useState<
    Array<{
      type?: string;
      capacity?: number;
      features?: string[];
      pricePerKm?: number;
      price?: number;
      image?: string;
      available?: boolean;
      fuelType?: string;
      airConditioned?: boolean;
      luggage?: number;
    }>
  >([]);
  const [apiDistance, setApiDistance] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Parse URL parameters to get booking data
    const data: Record<string, string> = {};

    // Extract all URL parameters
    searchParams.forEach((value, key) => {
      data[key] = value;
    });

    setBookingData(data as unknown as BookingFormData);

    // Parse API cabs data if available
    if (data.apiCabs) {
      try {
        const parsedCabs = JSON.parse(data.apiCabs);
        setApiCabs(parsedCabs);
      } catch (error) {
        console.error("Error parsing API cabs data:", error);
      }
    }

    // Parse API response data to extract distance if available
    if (data.apiResponse) {
      try {
        const parsedResponse = JSON.parse(data.apiResponse);
        if (parsedResponse.distance) {
          setApiDistance(parsedResponse.distance);
        }
      } catch (error) {
        console.error("Error parsing API response data:", error);
      }
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Create dynamic cab list based on API data or fallback to default
  const getCabList = (): Vehicle[] => {
    if (apiCabs.length > 0) {
      // Map API cabs to Vehicle format
      return apiCabs.map((apiCab, index) => ({
        id: (index + 1).toString(),
        name: apiCab.type?.toUpperCase() || `CAB ${index + 1}`,
        type: (apiCab.type?.toLowerCase() || "sedan") as VehicleType,
        capacity: apiCab.capacity || 4,
        features: apiCab.features || ["AC"],
        pricePerKm: apiCab.pricePerKm || 12,
        basePrice: apiCab.price || 5000,
        images: apiCab.image ? [apiCab.image] : ["/sendan.png"],
        available: apiCab.available !== false,
        fuelType: (apiCab.fuelType || "petrol") as
          | "petrol"
          | "diesel"
          | "cng"
          | "electric"
          | "hybrid",
        airConditioned: apiCab.airConditioned !== false,
        luggage: apiCab.luggage || 2,
      }));
    }

    // Fallback to default cab list
    return cabList;
  };

  const dynamicCabList = getCabList();

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

  // Calculate distance (mock calculation - you should replace with actual logic)
  const calculateDistance = () => {
    if (!bookingData) return "0";

    // Mock distance calculation based on service type
    if (bookingData.serviceType === "AIRPORT") return "45";
    if (bookingData.serviceType === "OUTSTATION") return "535";
    if (bookingData.serviceType === "LOCAL") return "100";

    return "0";
  };

  // Calculate dynamic pricing based on booking data and API response
  const calculatePrice = (baseCab: Vehicle) => {
    if (!bookingData) return baseCab.basePrice;

    // If we have API cabs data, use the API price directly
    if (apiCabs.length > 0) {
      const apiCab = apiCabs.find(
        (cab) =>
          cab.type?.toLowerCase() === baseCab.type ||
          cab.type?.toUpperCase() === baseCab.name
      );
      if (apiCab && apiCab.price) {
        let calculatedPrice = apiCab.price;

        // Add round trip multiplier for outstation
        if (
          bookingData.serviceType === "OUTSTATION" &&
          bookingData.tripType === "ROUNDWAY"
        ) {
          calculatedPrice *= 1.8;
        }

        return Math.floor(calculatedPrice);
      }
    }

    // Fallback to distance-based calculation
    const distance = parseInt(calculateDistance());
    let calculatedPrice = baseCab.basePrice;

    if (bookingData.serviceType === "OUTSTATION") {
      calculatedPrice = distance * baseCab.pricePerKm;
    }

    // Add round trip multiplier
    if (bookingData.tripType === "ROUNDWAY") {
      calculatedPrice *= 1.8; // Not exactly double due to potential discounts
    }

    return Math.floor(calculatedPrice);
  };

  const handleSelectCab = () => {
    if (!selectedCab || !bookingData) return;

    const selectedCabData = dynamicCabList.find(
      (cab) => cab.id === selectedCab
    );
    if (!selectedCabData) return;

    // Combine booking data with selected cab information
    const combinedData = {
      ...bookingData,
      selectedCabId: selectedCab,
      selectedCabName: selectedCabData.name,
      selectedCabType: selectedCabData.type,
      selectedCabPrice: calculatePrice(selectedCabData),
      selectedCabBasePrice: selectedCabData.basePrice,
      selectedCabPricePerKm: selectedCabData.pricePerKm,
      selectedCabCapacity: selectedCabData.capacity,
      selectedCabLuggage: selectedCabData.luggage,
      selectedCabFeatures: selectedCabData.features.join(","),
      selectedCabFuelType: selectedCabData.fuelType,
      selectedCabImage: selectedCabData.images[0],
      estimatedDistance: apiDistance
        ? apiDistance.toString()
        : calculateDistance(),
    };

    // Convert to URL search params
    const searchParams = new URLSearchParams();
    Object.entries(combinedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    // Navigate to booking details page
    router.push(`/cab-detail?${searchParams.toString()}`);
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
        {/* Header Text */}
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h1
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            style={{
              color: theme.colors.accent.gold,
              textShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            Book Comfortable Rides
          </h1>
          <p
            className="text-xl lg:text-2xl font-medium"
            style={{
              color: theme.colors.text.secondary,
              textShadow: `0 2px 10px ${theme.colors.shadow.primary}`,
            }}
          >
            And Select Your Comfort
          </p>
        </div>

        {/* Cab Selection Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 ${
            isVisible ? "animate-fade-in-up animate-delay-300" : "opacity-0"
          }`}
        >
          {dynamicCabList.map((cab, index) => {
            const dynamicPrice = calculatePrice(cab);

            return (
              <div
                key={cab.id}
                className={`relative rounded-xl p-6 cursor-pointer transition-all duration-500 hover:scale-105 group ${
                  selectedCab === cab.id
                    ? "ring-2 ring-opacity-80"
                    : "hover:ring-1 hover:ring-opacity-50"
                }`}
                style={{
                  background:
                    selectedCab === cab.id
                      ? `linear-gradient(135deg, ${theme.colors.primary.darkGray} 0%, ${theme.colors.primary.black} 100%)`
                      : theme.gradients.cardGradient,
                  border:
                    selectedCab === cab.id
                      ? `2px solid ${theme.colors.accent.gold}`
                      : `1px solid ${theme.colors.border.light}`,
                  boxShadow:
                    selectedCab === cab.id
                      ? `0 20px 60px ${theme.colors.shadow.gold}, 0 0 0 1px ${theme.colors.accent.gold}30`
                      : `0 10px 30px ${theme.colors.shadow.elevated}`,
                  animationDelay: `${index * 100}ms`,
                }}
                onClick={() => setSelectedCab(cab.id)}
              >
                {/* Glow effect for selected card */}
                {selectedCab === cab.id && (
                  <div
                    className="absolute inset-0 blur-xl opacity-30 animate-pulse rounded-xl"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${theme.colors.accent.gold}60 0%, transparent 70%)`,
                      transform: "scale(1.2)",
                      animationDuration: "3s",
                    }}
                  />
                )}

                <div className="relative z-10 text-center">
                  {/* Car Image */}
                  <div
                    className="w-20 h-16 mx-auto mb-4 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 relative"
                    style={{
                      background:
                        selectedCab === cab.id
                          ? theme.gradients.gold
                          : `linear-gradient(135deg, ${theme.colors.border.light} 0%, rgba(255, 255, 255, 0.05) 100%)`,
                      padding: "4px",
                    }}
                  >
                    <img
                      src={cab.images[0]}
                      alt={cab.name}
                      className="w-full h-full object-contain rounded"
                      style={{
                        filter:
                          selectedCab === cab.id
                            ? "brightness(1.1)"
                            : "brightness(0.9)",
                      }}
                    />
                  </div>

                  {/* Cab Name */}
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{
                      color:
                        selectedCab === cab.id
                          ? theme.colors.accent.gold
                          : theme.colors.text.primary,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {cab.name}
                  </h3>

                  {/* Price */}
                  <p
                    className="text-2xl font-bold"
                    style={{
                      color:
                        selectedCab === cab.id
                          ? theme.colors.text.primary
                          : theme.colors.text.secondary,
                      fontWeight: theme.typography.fontWeight.bold,
                    }}
                  >
                    ₹ {dynamicPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cab Details */}
        {selectedCab && (
          <div
            className={`rounded-2xl p-8 mb-8 ${
              isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"
            }`}
            style={{
              background: theme.gradients.cardGradient,
              border: `2px solid ${theme.colors.accent.gold}`,
              boxShadow: `0 25px 80px ${theme.colors.shadow.elevated}, 0 0 0 1px ${theme.colors.accent.gold}30`,
            }}
          >
            {(() => {
              const cab = dynamicCabList.find((c) => c.id === selectedCab);
              if (!cab) return null;

              const dynamicPrice = calculatePrice(cab);

              return (
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Car Image */}
                  <div className="w-full lg:w-1/3">
                    <div
                      className="rounded-xl p-6 h-56 flex items-center justify-center group relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary.darkGray} 0%, ${theme.colors.primary.black} 100%)`,
                        border: `2px solid ${theme.colors.accent.gold}`,
                      }}
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 blur-2xl opacity-30 animate-pulse"
                        style={{
                          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${theme.colors.accent.gold}40 0%, transparent 70%)`,
                        }}
                      />

                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={cab.images[0]}
                          alt={cab.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          style={{
                            filter:
                              "drop-shadow(0 8px 25px rgba(255, 215, 0, 0.3))",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Car Features */}
                  <div className="w-full lg:w-1/3 space-y-6">
                    {[
                      { icon: "✓", text: "Verified Driver" },
                      { icon: "🕐", text: "On Time Cab" },
                      { icon: "📄", text: "GST Invoice" },
                      { icon: "🔒", text: "No Hidden Charges" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{
                            background: theme.gradients.gold,
                            color: theme.colors.primary.black,
                          }}
                        >
                          {feature.icon}
                        </div>
                        <span
                          className="font-medium text-lg"
                          style={{
                            color: theme.colors.text.secondary,
                            fontWeight: theme.typography.fontWeight.medium,
                          }}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Section */}
                  <div className="w-full lg:w-1/3 text-center lg:text-right">
                    {/* Discount Badge */}
                    <div
                      className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
                      style={{
                        background: `linear-gradient(135deg, #FF4444 0%, #CC0000 100%)`,
                        color: theme.colors.text.primary,
                        fontWeight: theme.typography.fontWeight.bold,
                      }}
                    >
                      18% Off
                    </div>

                    {/* Car Model */}
                    <div className="mb-4">
                      <span
                        className="text-sm"
                        style={{ color: theme.colors.text.muted }}
                      >
                        {cab.name} or Similar
                      </span>
                    </div>

                    {/* Capacity Icons */}
                    <div className="flex items-center justify-center lg:justify-end gap-4 mb-4">
                      {[
                        { icon: "👤", value: cab.capacity },
                        { icon: "🧳", value: cab.luggage },
                        { icon: "❄️", value: "AC" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <span>{item.icon}</span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: theme.colors.text.secondary }}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price Display */}
                    <div
                      className="text-4xl lg:text-5xl font-bold mb-2"
                      style={{
                        color: theme.colors.accent.gold,
                        fontWeight: theme.typography.fontWeight.bold,
                        textShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
                      }}
                    >
                      ₹{dynamicPrice}
                    </div>

                    {/* Original Price */}
                    <div
                      className="text-lg line-through mb-4"
                      style={{ color: theme.colors.text.muted }}
                    >
                      ₹{Math.floor(dynamicPrice * 1.18)}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Select Cab Button */}
        {selectedCab && (
          <div
            className={`text-center mb-8 ${
              isVisible ? "animate-fade-in-up animate-delay-900" : "opacity-0"
            }`}
          >
            <button
              className="font-bold py-4 px-12 rounded-xl text-lg transition-all duration-500 hover:scale-105 transform relative overflow-hidden group"
              style={{
                background: theme.gradients.gold,
                color: theme.colors.primary.black,
                fontWeight: theme.typography.fontWeight.bold,
                boxShadow: `0 20px 60px ${theme.colors.shadow.gold}`,
                border: `2px solid ${theme.colors.accent.lightGold}`,
              }}
              onClick={() => {
                handleSelectCab();
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
              <span className="relative z-10">Select Cab</span>
            </button>
          </div>
        )}

        {/* Trip Details - Now using actual booking data */}
        <div
          className={`rounded-xl p-6 ${
            isVisible ? "animate-fade-in-up animate-delay-1200" : "opacity-0"
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
              {bookingData?.tripType === "ROUNDWAY"
                ? "ROUND TRIP"
                : "ONEWAY TRIP"}
            </span>

            <span
              className="text-center flex-1"
              style={{ color: theme.colors.text.secondary }}
            >
              {formatTripDetails()} | {calculateDistance()} Km
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
      `}</style>
    </div>
  );
};

// Loading fallback for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <div
        className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
        style={{ borderColor: theme.colors.accent.gold }}
      ></div>
      <p style={{ color: theme.colors.text.primary }}>
        Loading cab selection...
      </p>
    </div>
  </div>
);

// Main export with Suspense
const CabListsPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CabListsContent />
    </Suspense>
  );
};

export default CabListsPage;
