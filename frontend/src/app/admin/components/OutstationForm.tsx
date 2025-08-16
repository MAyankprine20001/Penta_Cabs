"use client";

import React, { useState } from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
import api from "@/config/axios";

interface Car {
  type: string;
  available: boolean;
  price: number;
}

interface OutstationFormData {
  city1: string;
  city2: string;
  dateTime: string;
  distance: string;
  tripType: string;
  oneWayCars: Car[];
  twoWayCars: Car[];
}

export default function OutstationForm() {
  const [form, setForm] = useState<OutstationFormData>({
    city1: "",
    city2: "",
    dateTime: "",
    distance: "",
    tripType: "one-way",
    oneWayCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
    twoWayCars: [
      { type: "sedan", available: false, price: 0 },
      { type: "suv", available: false, price: 0 },
      { type: "innova", available: false, price: 0 },
      { type: "crysta", available: false, price: 0 },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const handleCarChange = (
    tripType: "oneWayCars" | "twoWayCars",
    index: number,
    field: keyof Car,
    value: boolean | number
  ) => {
    const updatedCars = [...form[tripType]];
    if (field === "available") {
      updatedCars[index][field] = !updatedCars[index][field];
    } else if (field === "price") {
      updatedCars[index][field] = value as number;
    }
    setForm({ ...form, [tripType]: updatedCars });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Prepare the One Way and Two Way entries
      const oneWayEntry = {
        city1: form.city1,
        city2: form.city2,
        dateTime: new Date().toISOString(),
        distance: form.distance,
        tripType: "one-way",
        cars: form.oneWayCars,
      };

      const twoWayEntry = {
        city1: form.city1,
        city2: form.city2,
        dateTime: new Date().toISOString(),
        distance: form.distance,
        tripType: "two-way",
        cars: form.twoWayCars,
      };

      // Submit both One Way and Two Way entries
      await api.post("/add-outstation", oneWayEntry);
      await api.post("/add-outstation", twoWayEntry);

      setMessage("Outstation bookings saved successfully!");

      // Reset form
      setForm({
        city1: "",
        city2: "",
        dateTime: "",
        distance: "",
        tripType: "one-way",
        oneWayCars: [
          { type: "sedan", available: false, price: 0 },
          { type: "suv", available: false, price: 0 },
          { type: "innova", available: false, price: 0 },
          { type: "crysta", available: false, price: 0 },
        ],
        twoWayCars: [
          { type: "sedan", available: false, price: 0 },
          { type: "suv", available: false, price: 0 },
          { type: "innova", available: false, price: 0 },
          { type: "crysta", available: false, price: 0 },
        ],
      });
    } catch (error: any) {
      setMessage("Error saving booking");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendEmail = async () => {
    if (!customerEmail) {
      setMessage("Please enter an email ID.");
      return;
    }

    try {
      await api.post("/send-route-email", {
        email: customerEmail,
        route: `${form.city1} ➡️ ${form.city2}`,
        cars: form.oneWayCars.concat(form.twoWayCars),
      });
      setMessage("Email sent successfully!");
    } catch (error: any) {
      setMessage("Error sending email");
      console.error("Error sending email:", error);
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
          🚗 Outstation / Intercity Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                From City (city1)
              </label>
              <ThemedInput
                type="text"
                placeholder="From City (city1)"
                value={form.city1}
                onChange={(e) => setForm({ ...form, city1: e.target.value })}
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
                To City (city2)
              </label>
              <ThemedInput
                type="text"
                placeholder="To City (city2)"
                value={form.city2}
                onChange={(e) => setForm({ ...form, city2: e.target.value })}
              />
            </div>
          </div>

          {/* Date Time and Distance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Date Time
              </label>
              <ThemedInput
                type="datetime-local"
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
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
                Distance (in km)
              </label>
              <ThemedInput
                type="number"
                placeholder="Distance (in km)"
                value={form.distance}
                onChange={(e) => setForm({ ...form, distance: e.target.value })}
              />
            </div>
          </div>

          {/* Available Cars for One-Way Trip */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold"
              style={{
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Available Cars for One-Way Trip
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.oneWayCars.map((car, index) => (
                <div
                  key={car.type}
                  className="p-4 border rounded-lg"
                  style={{
                    borderColor: theme.colors.border.primary,
                    backgroundColor: theme.colors.background.secondary,
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={car.available}
                      onChange={() =>
                        handleCarChange("oneWayCars", index, "available", null)
                      }
                      className="w-4 h-4"
                      style={{
                        accentColor: theme.colors.accent.gold,
                      }}
                    />
                    <label
                      className="font-medium"
                      style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.sans.join(", "),
                      }}
                    >
                      {car.type.toUpperCase()}
                    </label>
                  </div>
                  <ThemedInput
                    type="number"
                    placeholder="Price"
                    value={car.price.toString()}
                    onChange={(e) =>
                      handleCarChange(
                        "oneWayCars",
                        index,
                        "price",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Available Cars for Two-Way Trip */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold"
              style={{
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Available Cars for Two-Way Trip
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.twoWayCars.map((car, index) => (
                <div
                  key={car.type}
                  className="p-4 border rounded-lg"
                  style={{
                    borderColor: theme.colors.border.primary,
                    backgroundColor: theme.colors.background.secondary,
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={car.available}
                      onChange={() =>
                        handleCarChange("twoWayCars", index, "available", null)
                      }
                      className="w-4 h-4"
                      style={{
                        accentColor: theme.colors.accent.gold,
                      }}
                    />
                    <label
                      className="font-medium"
                      style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.sans.join(", "),
                      }}
                    >
                      {car.type.toUpperCase()}
                    </label>
                  </div>
                  <ThemedInput
                    type="number"
                    placeholder="Price"
                    value={car.price.toString()}
                    onChange={(e) =>
                      handleCarChange(
                        "twoWayCars",
                        index,
                        "price",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              ))}
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
              {isSubmitting ? "Saving..." : "Save Booking"}
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

        <hr
          className="my-6"
          style={{ borderColor: theme.colors.border.primary }}
        />
      </div>
    </div>
  );
}
