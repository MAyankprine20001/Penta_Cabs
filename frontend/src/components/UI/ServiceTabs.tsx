"use client";

import React from "react";
import { theme } from "@/styles/theme";
import { ServiceType } from "@/types/booking";

interface ServiceTabsProps {
  activeService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
}

export const ServiceTabs: React.FC<ServiceTabsProps> = ({
  activeService,
  onServiceChange,
}) => (
  <div
    className="flex flex-col sm:flex-row rounded-lg p-1 mb-6 gap-1 sm:gap-0"
    style={{
      backgroundColor: theme.colors.background.secondary,
    }}
  >
    {(["OUTSTATION", "LOCAL", "AIRPORT"] as ServiceType[]).map((service) => (
      <button
        key={service}
        onClick={() => onServiceChange(service)}
        className="flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-300"
        style={{
          backgroundColor:
            activeService === service
              ? theme.colors.accent.gold
              : "transparent",
          color:
            activeService === service
              ? theme.colors.primary.black
              : theme.colors.text.secondary,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
          fontWeight: theme.typography.fontWeight.semibold,
          boxShadow:
            activeService === service
              ? `0 4px 12px ${theme.colors.shadow.gold}`
              : "none",
        }}
        onMouseEnter={(e) => {
          if (activeService !== service) {
            e.currentTarget.style.color = theme.colors.text.primary;
          }
        }}
        onMouseLeave={(e) => {
          if (activeService !== service) {
            e.currentTarget.style.color = theme.colors.text.secondary;
          }
        }}
      >
        {service}
        {service === "AIRPORT" && <span className="ml-1">✈️</span>}
      </button>
    ))}
  </div>
);
