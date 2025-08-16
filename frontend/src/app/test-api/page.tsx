"use client";

import React from "react";
import UserLocalRide from "@/components/UserLocalRide";
import UserAirport from "@/components/UserAirport";
import { theme } from "@/styles/theme";

export default function TestAPIPage() {
  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundColor: theme.colors.primary.black,
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.sans.join(", "),
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          API Integration Test
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.goldLight,
              boxShadow: `0 8px 32px ${theme.colors.shadow.elevated}`,
            }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Local Ride API
            </h2>
            <UserLocalRide />
          </div>

          <div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.goldLight,
              boxShadow: `0 8px 32px ${theme.colors.shadow.elevated}`,
            }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Airport API
            </h2>
            <UserAirport />
          </div>
        </div>
      </div>
    </div>
  );
}
