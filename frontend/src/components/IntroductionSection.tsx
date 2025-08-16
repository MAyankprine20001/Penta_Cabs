// src/components/IntroductionSection.tsx
"use client";
import React from "react";
import Image from "next/image";
import { theme } from "@/styles/theme";

const IntroductionSection: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: theme.gradients.blackToCharcoal,
      }}
    >
      {/* Background decoration using theme colors */}
      <div className="absolute inset-0" style={{ opacity: 0.05 }}>
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.amber,
            animationDelay: "1000ms",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="mb-16 animate-fade-in-up">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-8"
            style={{
              fontFamily: theme.typography.fontFamily.display.join(", "),
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize["4xl"],
            }}
          >
            Introduction:
          </h2>
          <div
            className="space-y-6 leading-relaxed text-lg"
            style={{
              color: theme.colors.text.secondary,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            <p>
              <span
                className="font-semibold"
                style={{ color: theme.colors.accent.gold }}
              >
                PentaCab
              </span>{" "}
              is more than just a cab service; it&apos;s a smart transportation
              solution that simplifies your travel using advanced technology.
              From our user-friendly mobile app to our GPS-enabled vehicles,
              PentaCab ensures that every journey is smooth and efficient. We
              are redefining urban mobility.
            </p>
          </div>
        </div>

        {/* Features */}
        <div
          className="mb-16 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <h2
            className="text-3xl lg:text-4xl font-bold mb-8"
            style={{
              fontFamily: theme.typography.fontFamily.display.join(", "),
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize["4xl"],
            }}
          >
            Features:
          </h2>
          <div className="space-y-12">
            {/* A. Intuitive Booking Process */}
            <div>
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: theme.colors.accent.gold }}
              >
                A. Intuitive Booking Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Pickup & Drop-off Selection */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/contact-icon/address.png"
                        alt="Location"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Pickup & Drop-off Selection
                      </p>
                      <p className="text-xs">
                        Easy input of locations, with auto-suggestions and
                        map-pinning.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Real-time Location Detection */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/number-speak/map.png"
                        alt="GPS Location"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Real-time Location Detection
                      </p>
                      <p className="text-xs">
                        Automatically detects the user&apos;s current location
                        via GPS.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/car-result/title-icons/sedan.png"
                        alt="Vehicle Selection"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Vehicle Selection
                      </p>
                      <p className="text-xs">
                        Options for different car types (Economy, Sedan, SUV,
                        Luxury, etc.) with clear pricing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fare Estimation */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/home-stars-icon/transparent-price.png"
                        alt="Fare Estimation"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Fare Estimation
                      </p>
                      <p className="text-xs">
                        Transparent, upfront fare calculation based on distance,
                        time, and vehicle type before booking.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ride Now/Schedule for Later */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/fast-book/fastbook-header.jpg"
                        alt="Schedule Ride"
                        width={16}
                        height={16}
                        className="w-4 h-4 rounded"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Ride Now/Schedule for Later
                      </p>
                      <p className="text-xs">
                        Option for immediate bookings or scheduling rides in
                        advance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Multiple Stops */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/route/image01.jpg"
                        alt="Multiple Stops"
                        width={16}
                        height={16}
                        className="w-4 h-4 rounded"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Multiple Stops
                      </p>
                      <p className="text-xs">
                        Ability to add multiple drop-off points during a single
                        trip.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Pricing */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/number-speak/kilometer.png"
                        alt="Dynamic Pricing"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Dynamic Pricing
                      </p>
                      <p className="text-xs">
                        Real-time adjustment of fares based on demand, traffic,
                        and supply.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Smart Matching Algorithm */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/home-stars-icon/experiened-driver.png"
                        alt="Smart Matching"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Smart Matching Algorithm
                      </p>
                      <p className="text-xs">
                        More intelligent matching of drivers to passengers based
                        on proximity, route, and historical preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Customer Loyalty & Rewards */}
            <div>
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: theme.colors.accent.gold }}
              >
                B. Customer Loyalty & Rewards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Referral Programs */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/number-speak/happy-customer.png"
                        alt="Referral Programs"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Referral Programs
                      </p>
                      <p className="text-xs">
                        Incentivize users to refer new customers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Loyalty Points/Rewards System */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/home-stars-icon/customer-satisfation.png"
                        alt="Loyalty Points"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Loyalty Points/Rewards System
                      </p>
                      <p className="text-xs">
                        Earn points for rides that can be redeemed for discounts
                        or exclusive benefits.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subscription Plans */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/home-stars-icon/customer-support.png"
                        alt="Subscription Plans"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Subscription Plans
                      </p>
                      <p className="text-xs">
                        Offer monthly/annual plans for regular commuters with
                        special benefits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Environmental Initiatives */}
            <div>
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: theme.colors.accent.gold }}
              >
                C. Environmental Initiatives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Green Ride Options */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/car-result/title-icons/suv.png"
                        alt="Green Ride Options"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Green Ride Options
                      </p>
                      <p className="text-xs">
                        Promote electric or hybrid vehicles.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carbon Footprint Tracking */}
                <div
                  className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.goldLight,
                    boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.goldLight;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: theme.gradients.gold,
                      }}
                    >
                      <Image
                        src="/images/number-speak/taxi-abs.png"
                        alt="Carbon Footprint"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.accent.gold }}
                      >
                        Carbon Footprint Tracking
                      </p>
                      <p className="text-xs">
                        Show users their environmental impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-8"
            style={{
              fontFamily: theme.typography.fontFamily.display.join(", "),
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize["4xl"],
            }}
          >
            Benefits:
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* A. Convenience and Ease */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.accent.gold }}
              >
                A. Convenience and Ease
              </h3>

              {/* Book Anywhere, Anytime */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/number-speak/map.png"
                      alt="Book Anywhere"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      1. Book Anywhere, Anytime
                    </p>
                    <p className="text-xs">
                      Users can book a ride 24/7 from any location with internet
                      access, eliminating the need to wait on the street or
                      haggle with drivers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Save Time */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/fast-book/fastbook-header.jpg"
                      alt="Save Time"
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      2. Save Time
                    </p>
                    <p className="text-xs">
                      With just a few clicks, users can enter pickup and
                      drop-off locations and confirm their booking, saving time
                      and allowing for efficient daily planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Transparency */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.accent.gold }}
              >
                B. Transparency
              </h3>

              {/* Upfront Fare Estimates */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/home-stars-icon/transparent-price.png"
                      alt="Upfront Fare Estimates"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      1. Upfront Fare Estimates
                    </p>
                    <p className="text-xs">
                      Before confirming a booking, users will see an estimated
                      fare for their trip, ensuring no hidden charges and
                      enabling effective budgeting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Driver & Vehicle Details */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/home-stars-icon/experiened-driver.png"
                      alt="Driver & Vehicle Details"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      2. Driver & Vehicle Details
                    </p>
                    <p className="text-xs">
                      Once a booking is confirmed, users receive necessary
                      details such as the driver&apos;s name, mobile number,
                      vehicle number, and model, to help identify the correct
                      cab.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Safety and Reliability */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.accent.gold }}
              >
                C. Safety and Reliability
              </h3>

              {/* Real-time Tracking */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/contact-icon/address.png"
                      alt="Real-time Tracking"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      1. Real-time Tracking
                    </p>
                    <p className="text-xs">
                      Users can track their booked cab live on a map, knowing
                      its exact location and estimated arrival time. During the
                      trip, live location can also be shared with trusted
                      contacts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Drivers */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/home-stars-icon/zero-cancellation.png"
                      alt="Verified Drivers"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      2. Verified Drivers
                    </p>
                    <p className="text-xs">
                      PentaCab ensures all its drivers are thoroughly vetted and
                      trained, providing a safe and secure journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* D. Multiple Options & Customization */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.accent.gold }}
              >
                D. Multiple Options & Customization
              </h3>

              {/* Vehicle Choices */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/car-result/title-icons/hatchback.png"
                      alt="Vehicle Choices"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      1. Vehicle Choices
                    </p>
                    <p className="text-xs">
                      Users can select from various vehicle types (e.g.,
                      Economy, Sedan, SUV, Luxury) to suit their specific needs
                      and budget.
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule a Ride */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/home-stars-icon/customer-support.png"
                      alt="Schedule a Ride"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      2. Schedule a Ride
                    </p>
                    <p className="text-xs">
                      Beyond instant bookings, users can schedule rides in
                      advance for future trips, ensuring punctuality for
                      important appointments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Outstation or Hourly Bookings */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/route/image02.jpg"
                      alt="Outstation Bookings"
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      3. Outstation or Hourly Bookings
                    </p>
                    <p className="text-xs">
                      The website offers options for intercity travel or booking
                      a vehicle on an hourly basis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* E. Digital Payments */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.accent.gold }}
              >
                E. Digital Payments
              </h3>

              {/* Cashless Transactions */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/contact-icon/gmail.png"
                      alt="Cashless Transactions"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      1. Cashless Transactions
                    </p>
                    <p className="text-xs">
                      Users can pay securely and conveniently using credit/debit
                      cards, UPI, or their PentaCab wallet, eliminating the need
                      to carry cash.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/number-speak/kilometer.png"
                      alt="Payment History"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      2. Payment History
                    </p>
                    <p className="text-xs">
                      Users can access a clear record of all their past payments
                      and trips on the website for easy tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* F. Enhanced Customer Support */}
            <div className="space-y-4">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.accent.gold }}
              >
                F. Enhanced Customer Support
              </h3>

              {/* Direct Support Access */}
              <div
                className="group p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: theme.gradients.gold,
                    }}
                  >
                    <Image
                      src="/images/contact-icon/whatsapp.png"
                      alt="Direct Support Access"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.accent.gold }}
                    >
                      1. Direct Support Access
                    </p>
                    <p className="text-xs">
                      Through the website, users can directly reach out to
                      PentaCab&apos;s customer support team for any issues or
                      queries, ensuring prompt resolution of their concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="mt-16 flex items-center justify-center">
          <div
            className="w-24 h-1 rounded-full"
            style={{
              background: theme.gradients.gold,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
