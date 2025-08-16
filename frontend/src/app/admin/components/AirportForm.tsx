"use client";

import React, { useState } from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
import api from "@/config/axios";

interface CarData {
  type: string;
  available: boolean;
  price: number;
}

interface AirportFormData {
  airportCity: string;
  airportName: string;
  airportCode: string;
  serviceType: "drop" | "pick";
  otherLocation: string;
  distance: string;
  dropCars: CarData[];
  pickCars: CarData[];
}

export default function AirportForm() {
  const [form, setForm] = useState<AirportFormData>({
    airportCity: "",
    airportName: "",
    airportCode: "",
    serviceType: "drop",
    otherLocation: "",
    distance: "",
    dropCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
    pickCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Car Change (both for 'drop' and 'pick')
  const handleCarChange = (
    serviceType: "dropCars" | "pickCars",
    index: number,
    field: keyof CarData,
    value: boolean | number
  ) => {
    const updatedCars = [...form[serviceType]];
    updatedCars[index] = { ...updatedCars[index], [field]: value };
    setForm({ ...form, [serviceType]: updatedCars });
  };

  // Submit Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Prepare two separate entries for drop and pick services
      const dropEntry = {
        airportCity: form.airportCity,
        airportName: form.airportName,
        airportCode: form.airportCode,
        serviceType: "drop",
        otherLocation: form.otherLocation,
        dateTime: new Date().toISOString(),
        distance: form.distance,
        cars: form.dropCars.map((car) => ({
          vehicleType: car.type,
          price: car.price,
          available: car.available,
        })),
      };

      const pickEntry = {
        airportCity: form.airportCity,
        airportName: form.airportName,
        airportCode: form.airportCode,
        serviceType: "pick",
        otherLocation: form.otherLocation,
        dateTime: new Date().toISOString(),
        distance: form.distance,
        cars: form.pickCars.map((car) => ({
          vehicleType: car.type,
          price: car.price,
          available: car.available,
        })),
      };

      // Make two separate POST requests using the same pattern as OutstationForm
      await api.post("/add-service", dropEntry);
      await api.post("/add-service", pickEntry);

      setMessage("Both drop and pick services saved successfully!");

      // Reset form
      setForm({
        airportCity: "",
        airportName: "",
        airportCode: "",
        serviceType: "drop",
        otherLocation: "",
        distance: "",
        dropCars: [
          { type: "sedan", available: false, price: 0 },
          { type: "suv", available: false, price: 0 },
          { type: "innova", available: false, price: 0 },
          { type: "crysta", available: false, price: 0 },
        ],
        pickCars: [
          { type: "sedan", available: false, price: 0 },
          { type: "suv", available: false, price: 0 },
          { type: "innova", available: false, price: 0 },
          { type: "crysta", available: false, price: 0 },
        ],
      });
    } catch (error: unknown) {
      setMessage("Error saving services. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto"
      style={{
        backgroundColor: theme.colors.background.card,
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: theme.borderRadius.lg,
      }}
    >
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            color: theme.colors.accent.gold,
            fontFamily: theme.typography.fontFamily.sans.join(", "),
          }}
        >
          Add Airport Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Airport Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Airport City
              </label>
              <ThemedInput
                placeholder="Enter airport city"
                value={form.airportCity}
                onChange={(e) =>
                  setForm({ ...form, airportCity: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Airport Name
              </label>
              <ThemedInput
                placeholder="Enter airport name"
                value={form.airportName}
                onChange={(e) =>
                  setForm({ ...form, airportName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Airport Code
              </label>
              <ThemedInput
                placeholder="Enter airport code"
                value={form.airportCode}
                onChange={(e) =>
                  setForm({ ...form, airportCode: e.target.value })
                }
              />
            </div>
          </div>

          {/* Other Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Other Location
              </label>
              <ThemedInput
                placeholder="Enter other location"
                value={form.otherLocation}
                onChange={(e) =>
                  setForm({ ...form, otherLocation: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Distance (km)
              </label>
              <ThemedInput
                type="number"
                placeholder="Enter distance"
                value={form.distance}
                onChange={(e) => setForm({ ...form, distance: e.target.value })}
              />
            </div>
          </div>

          {/* Car Pricing Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Drop Cars */}
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Available Cars (Drop)
              </h3>

              <div className="space-y-3">
                {form.dropCars.map((car, index) => (
                  <div
                    key={car.type}
                    className="p-4 border rounded-lg"
                    style={{
                      borderColor: theme.colors.border.primary,
                      backgroundColor: theme.colors.background.secondary,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={car.available}
                          onChange={() =>
                            handleCarChange(
                              "dropCars",
                              index,
                              "available",
                              !car.available
                            )
                          }
                          className="rounded"
                        />
                        <span
                          className="font-medium"
                          style={{
                            color: theme.colors.text.primary,
                            fontFamily:
                              theme.typography.fontFamily.sans.join(", "),
                          }}
                        >
                          {car.type.toUpperCase()}
                        </span>
                      </label>
                    </div>

                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={car.price.toString()}
                      onChange={(e) =>
                        handleCarChange(
                          "dropCars",
                          index,
                          "price",
                          parseInt(e.target.value) || 0
                        )
                      }
                      disabled={!car.available}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      style={{
                        backgroundColor: theme.colors.background.primary,
                        borderColor: theme.colors.border.primary,
                        color: theme.colors.text.primary,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pick Cars */}
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Available Cars (Pick)
              </h3>

              <div className="space-y-3">
                {form.pickCars.map((car, index) => (
                  <div
                    key={car.type}
                    className="p-4 border rounded-lg"
                    style={{
                      borderColor: theme.colors.border.primary,
                      backgroundColor: theme.colors.background.secondary,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={car.available}
                          onChange={() =>
                            handleCarChange(
                              "pickCars",
                              index,
                              "available",
                              !car.available
                            )
                          }
                          className="rounded"
                        />
                        <span
                          className="font-medium"
                          style={{
                            color: theme.colors.text.primary,
                            fontFamily:
                              theme.typography.fontFamily.sans.join(", "),
                          }}
                        >
                          {car.type.toUpperCase()}
                        </span>
                      </label>
                    </div>

                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={car.price.toString()}
                      onChange={(e) =>
                        handleCarChange(
                          "pickCars",
                          index,
                          "price",
                          parseInt(e.target.value) || 0
                        )
                      }
                      disabled={!car.available}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      style={{
                        backgroundColor: theme.colors.background.primary,
                        borderColor: theme.colors.border.primary,
                        color: theme.colors.text.primary,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50"
              style={{
                backgroundColor: theme.colors.accent.gold,
                color: theme.colors.primary.black,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.opacity = "0.8";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.opacity = "1";
                }
              }}
            >
              {isSubmitting ? "Saving..." : "Save Airport Service"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className="p-4 rounded-lg text-sm"
              style={{
                backgroundColor: message.includes("Error")
                  ? theme.colors.status.error
                  : theme.colors.status.success,
                color: theme.colors.text.primary,
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
