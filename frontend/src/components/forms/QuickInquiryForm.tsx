// src/components/forms/QuickInquiryForm.tsx
"use client";

import React from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";
import { ThemedTextarea } from "@/components/UI/ThemedTextarea";
import { ThemedButton } from "@/components/UI/ThemedButton";
import { QuickInquiryData } from "@/types/booking";

interface QuickInquiryFormProps {
  inquiryData: QuickInquiryData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onInputChange: (field: keyof QuickInquiryData, value: string) => void;
  onSubmit: () => void;
}

export const QuickInquiryForm: React.FC<QuickInquiryFormProps> = ({
  inquiryData,
  errors,
  isSubmitting,
  onInputChange,
  onSubmit,
}) => (
  <div
    className="w-full lg:w-80 rounded-2xl p-6 border"
    style={{
      backgroundColor: theme.colors.background.card,
      borderColor: theme.colors.border.goldLight,
      boxShadow: `0 8px 32px ${theme.colors.shadow.elevated}`,
    }}
  >
    <div className="text-center mb-6">
      <h3
        className="font-bold mb-2"
        style={{
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
          fontWeight: theme.typography.fontWeight.bold,
        }}
      >
        Quick Inquiry for Booking
      </h3>
      <a
        href="tel:7600839900"
        className="font-bold text-lg transition-colors"
        style={{
          color: theme.colors.accent.gold,
          fontFamily: theme.typography.fontFamily.sans.join(", "),
          fontWeight: theme.typography.fontWeight.bold,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = theme.colors.accent.warmGold;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = theme.colors.accent.gold;
        }}
      >
        📞 7600839900
      </a>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <ThemedInput
          placeholder="Name"
          value={inquiryData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          error={errors.name}
        />
        <ThemedInput
          type="tel"
          placeholder="Mobile"
          value={inquiryData.mobile}
          onChange={(e) => onInputChange("mobile", e.target.value)}
          error={errors.mobile}
        />
      </div>

      <ThemedInput
        type="email"
        placeholder="Email Address"
        value={inquiryData.email}
        onChange={(e) => onInputChange("email", e.target.value)}
        error={errors.email}
      />

      <ThemedTextarea
        placeholder="Message"
        value={inquiryData.message}
        onChange={(e) => onInputChange("message", e.target.value)}
        error={errors.message}
        rows={4}
      />

      <ThemedButton
        onClick={onSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
        className="w-full"
      >
        Send Now
      </ThemedButton>
    </div>
  </div>
);
