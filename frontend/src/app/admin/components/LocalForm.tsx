"use client";

import React, { useState } from "react";
import axios from "axios";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
import api from "@/config/axios";

interface Car {
  type: string;
  available: boolean;
  price: number;
}

interface FormData {
  city: string;
  dateTime: string;
  packages: {
    "4hr/40km": Car[];
    "8hr/80km": Car[];
    "12hr/120km": Car[];
    "Full Day": Car[];
  };
}

export default function LocalForm() {
  const defaultCars: Car[] = [
    { type: "sedan", available: false, price: 0 },
    { type: "suv", available: false, price: 0 },
    { type: "innova", available: false, price: 0 },
    { type: "crysta", available: false, price: 0 },
  ];

  const [form, setForm] = useState<FormData>({
    city: "",
    dateTime: new Date().toISOString(),
    packages: {
      "4hr/40km": [...defaultCars],
      "8hr/80km": [...defaultCars],
      "12hr/120km": [...defaultCars],
      "Full Day": [...defaultCars],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleCarChange = (
    packageName: string,
    index: number,
    field: keyof Car,
    value: string | boolean
  ) => {
    // Deep copy the cars array for the current package
    const updatedCars = [...form.packages[packageName]];

    // Update the car's field (available or price)
    updatedCars[index] = {
      ...updatedCars[index],
      [field]:
        field === "available" ? !updatedCars[index][field] : Number(value),
    };

    // Now update the form state with the modified cars for the specific package
    setForm({
      ...form,
      packages: {
        ...form.packages,
        [packageName]: updatedCars, // Update only the relevant package
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const entries = Object.keys(form.packages).map((pkg) => ({
      city: form.city,
      package: pkg,
      dateTime: form.dateTime,
      cars: form.packages[pkg],
    }));

    try {
      await api.post("/add-local-bulk", { entries });
      setMessage("All local packages saved successfully!");

      // Reset form
      setForm({
        city: "",
        dateTime: new Date().toISOString(),
        packages: {
          "4hr/40km": [...defaultCars],
          "8hr/80km": [...defaultCars],
          "12hr/120km": [...defaultCars],
          "Full Day": [...defaultCars],
        },
      });
    } catch (error) {
      setMessage("Error saving packages. Please try again.");
      console.error(error);
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
          🏙️ Local Ride Pricing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* City Input */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              City
            </label>
            <ThemedInput
              placeholder="Enter city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          {/* Packages Section */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Package Pricing
            </h3>

            {Object.keys(form.packages).map((pkg) => (
              <div
                key={pkg}
                className="p-4 border rounded-lg"
                style={{
                  borderColor: theme.colors.border.primary,
                  backgroundColor: theme.colors.background.secondary,
                }}
              >
                <h4
                  className="text-lg font-medium mb-4"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                >
                  Package: {pkg}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {form.packages[pkg].map((car, index) => (
                    <div
                      key={car.type}
                      className="p-3 border rounded-lg"
                      style={{
                        borderColor: theme.colors.border.primary,
                        backgroundColor: theme.colors.background.card,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={car.available}
                            onChange={() =>
                              handleCarChange(pkg, index, "available", true)
                            }
                            className="rounded"
                            style={{
                              accentColor: theme.colors.accent.gold,
                            }}
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

                      <div className="space-y-2">
                        <label
                          className="block text-xs font-medium"
                          style={{
                            color: theme.colors.text.secondary,
                            fontFamily:
                              theme.typography.fontFamily.sans.join(", "),
                          }}
                        >
                          Price (₹)
                        </label>
                        <ThemedInput
                          type="number"
                          placeholder="Enter price"
                          value={car.price}
                          onChange={(e) =>
                            handleCarChange(pkg, index, "price", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              {isSubmitting ? "Saving..." : "Save All Packages"}
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
