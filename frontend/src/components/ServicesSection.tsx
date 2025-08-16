// src/components/ServicesSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { theme, themeVariants } from "@/styles/theme";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  accentColor: string;
  href: string;
}

const ServicesSection: React.FC = () => {
  const services: ServiceCard[] = [
    {
      id: "outstation",
      title: "Outstation Travel",
      description:
        "Explore all of India with our One-way or Round-trip outstation cab services. Our skilled drivers prioritize both speed and safety, guaranteeing timely arrivals. Trust us for all your outstation car rental needs.",
      image: "/api/placeholder/400/250",
      features: [
        "One-way & Round-trip",
        "Skilled Drivers",
        "Speed & Safety",
        "Timely Arrivals",
      ],
      accentColor: theme.colors.secondary.warmYellow,
      href: "/services/outstation",
    },
    {
      id: "airport",
      title: "Airport Transfer",
      description:
        "We prioritize your flight's punctuality and safety. Whether returning from a trip, exploring as a tourist, or needing an airport drop, our prompt drivers ensure a secure journey.",
      image: "/api/placeholder/400/250",
      features: [
        "Flight Tracking",
        "Punctual Service",
        "Safe & Secure",
        "Professional Drivers",
      ],
      accentColor: theme.colors.accent.bronze,
      href: "/services/airport",
    },
    {
      id: "local",
      title: "Local Trip Rental",
      description:
        "Discover local car rentals in the city with tailored packages. Whether you need a ride to a meeting, wedding, or any event, our skilled drivers navigate traffic and rough roads, ensuring punctual arrivals.",
      image: "/api/placeholder/400/250",
      features: [
        "City Packages",
        "Event Transportation",
        "Traffic Navigation",
        "Punctual Service",
      ],
      accentColor: theme.colors.secondary.orange,
      href: "/services/local",
    },
    {
      id: "multiway",
      title: "Multiway Booking",
      description:
        "A single travel booking that allows you to visit several destinations during one trip, choose your destinations, and alter your schedule as you go. Avoid multiple bookings and check-ins.",
      image: "/api/placeholder/400/250",
      features: [
        "Multiple Destinations",
        "Flexible Schedule",
        "Single Booking",
        "No Check-ins",
      ],
      accentColor: theme.colors.accent.gold,
      href: "/services/multiway",
    },
  ];

  // Service icons component
  const ServiceIcon = ({
    serviceId,
    color,
  }: {
    serviceId: string;
    color: string;
  }) => {
    switch (serviceId) {
      case "outstation":
        return (
          <Image
            src="/images/stats/experiened-driver.png"
            alt="Outstation"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        );
      case "airport":
        return (
          <Image
            src="/images/stats/customer-support.png"
            alt="Airport"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        );
      case "local":
        return (
          <Image
            src="/images/stats/transparent-price.png"
            alt="Local"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        );
      case "multiway":
        return (
          <Image
            src="/images/stats/customer-satisfation.png"
            alt="Multiway"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        backgroundColor: theme.colors.primary.black,
      }}
    >
      {/* Background decoration using theme colors */}
      <div className="absolute inset-0" style={{ opacity: 0.05 }}>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.warmYellow,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
            animationDelay: "1000ms",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6"
            style={{
              fontFamily: theme.typography.fontFamily.display.join(", "),
              fontSize: theme.typography.fontSize["5xl"],
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                background: theme.gradients.goldToAmber,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Take a Ride Experience With Penta Cab
            </span>
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: theme.gradients.gold,
            }}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className="rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-105 h-full"
                style={{
                  background: theme.gradients.primary,
                  borderColor: theme.colors.border.goldLight,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.card}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.gold;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.goldLight;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.card}`;
                }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${service.accentColor}20, ${service.accentColor}10)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Service Icon */}
                    <div
                      className="w-20 h-20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: `${theme.colors.accent.gold}20`,
                        border: `2px solid ${theme.colors.accent.gold}30`,
                      }}
                    >
                      <ServiceIcon
                        serviceId={service.id}
                        color={theme.colors.accent.gold}
                      />
                    </div>
                  </div>

                  {/* Accent overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.accentColor}, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: theme.colors.background.card,
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3 group-hover:text-opacity-100 transition-colors duration-300"
                    style={{
                      color: theme.colors.text.primary,
                      fontFamily: theme.typography.fontFamily.sans.join(", "),
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.colors.accent.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.colors.text.primary;
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-4"
                    style={{
                      color: theme.colors.text.secondary,
                      fontFamily: theme.typography.fontFamily.sans.join(", "),
                      lineHeight: theme.typography.lineHeight.relaxed,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: service.accentColor,
                          }}
                        />
                        <span
                          className="text-xs"
                          style={{
                            color: theme.colors.text.muted,
                            fontFamily:
                              theme.typography.fontFamily.sans.join(", "),
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <div className="group/btn">
                    <Link
                      href={service.href}
                      className="inline-flex items-center space-x-2 text-sm font-semibold transition-all duration-300"
                      style={{
                        color: service.accentColor,
                        fontFamily: theme.typography.fontFamily.sans.join(", "),
                        fontWeight: theme.typography.fontWeight.semibold,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme.colors.accent.gold;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = service.accentColor;
                      }}
                    >
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div
          className="mt-16 text-center animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <div
            className="inline-flex items-center space-x-4 px-8 py-4 rounded-2xl border"
            style={{
              backgroundColor: `${theme.colors.background.card}80`,
              borderColor: theme.colors.border.goldLight,
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: theme.gradients.gold,
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: theme.colors.primary.black }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p
                className="font-semibold"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                Need a Custom Solution?
              </p>
              <p
                className="text-sm"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                }}
              >
                Call us at{" "}
                <a
                  href="tel:7600839900"
                  className="font-semibold hover:underline transition-colors duration-300"
                  style={{ color: theme.colors.accent.gold }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.colors.accent.warmGold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.colors.accent.gold;
                  }}
                >
                  7600839900
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
