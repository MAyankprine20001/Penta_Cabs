// src/app/page.tsx
import React from "react";
import type { Metadata } from "next";
import { theme } from "@/styles/theme";

// Import your themed components
import StatsSection from "@/components/StatsSection";
import IntroductionSection from "@/components/IntroductionSection";
import ServicesSection from "@/components/ServicesSection";
import BookingCTASection from "@/components/BookingCTASection";
import BookingWidget from "@/components/BookingWidget";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Penta Cab",
  description:
    "Experience luxury transportation with Penta Cab. Professional drivers, premium vehicles, and 24/7 service. Book your taxi now for a comfortable and reliable journey.",
};

export const ThemedPageWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.primary.black,
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.sans.join(", "),
      }}
    >
      {children}
    </div>
  );
};

// If you prefer to use the wrapper approach, your page would look like:

export default function HomePage() {
  return (
    <ThemedPageWrapper>
      <HeroSection />
      <section
        id="booking-widget"
        className="py-16 lg:py-20"
        style={{ background: theme.gradients.heroGradient }}
      >
        <BookingWidget />
      </section>
      <StatsSection />
      <IntroductionSection />
      <ServicesSection />
      <BookingCTASection />
    </ThemedPageWrapper>
  );
}
