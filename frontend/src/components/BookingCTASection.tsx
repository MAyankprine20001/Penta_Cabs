// src/components/BookingCTASection.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { theme, themeVariants } from "@/styles/theme";

const BookingCTASection: React.FC = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Complete support",
      description:
        "assisting you from the initial inquiry to drop-off service.",
    },
    {
      icon: "💳",
      title: "Easy payment and return policy",
      description:
        "along with our transparent Terms & Conditions, ensure a hassle-free experience.",
    },
    {
      icon: "📧",
      title: "Rest assured, there are no hidden charges",
      description:
        "Your invoice will be promptly shared via email and mobile, ensuring complete transparency.",
    },
  ];

  const trustIndicators = [
    { icon: "🛡️", label: "Secure Booking", desc: "SSL Protected" },
    { icon: "💳", label: "Easy Payment", desc: "Multiple Options" },
    { icon: "📞", label: "24/7 Support", desc: "Always Available" },
    { icon: "⭐", label: "5-Star Rated", desc: "Customer Choice" },
  ];

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: theme.gradients.blackToCharcoal,
      }}
    >
      {/* Background decoration using theme colors */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.warmYellow,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
            animationDelay: "1000ms",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2  items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="mb-8">
              <h2
                className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6"
                style={{
                  fontFamily: theme.typography.fontFamily.display.join(", "),
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize["5xl"],
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Book with us for a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    background: theme.gradients.goldToAmber,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  stress-free journey!
                </span>
              </h2>

              <div
                className="space-y-4 leading-relaxed"
                style={{
                  color: theme.colors.text.secondary,
                  lineHeight: theme.typography.lineHeight.relaxed,
                }}
              >
                <p>
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mr-3"
                    style={{
                      background: theme.gradients.gold,
                      color: theme.colors.primary.black,
                    }}
                  >
                    P
                  </span>
                  one-stop solution in Ahmedabad for one-way and round-trip
                  journeys, efficient airport pickups and drops, and convenient
                  local car rentals.{" "}
                  <span
                    className="px-2 py-1 rounded font-semibold"
                    style={{
                      backgroundColor: theme.colors.status.error,
                      color: theme.colors.text.primary,
                    }}
                  >
                    Penta Cab
                  </span>{" "}
                  a trusted car rental company in Ahmedabad, has been serving
                  customers for over a decade. We offer a{" "}
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.gold }}
                  >
                    hassle-free booking process
                  </span>
                  , letting you provide the flexibility to select from a diverse
                  range of cars, including Premium options, all within your
                  budget. Our helpful representatives assist in planning your
                  trip. Popular services include{" "}
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.gold }}
                  >
                    corporate car rentals
                  </span>{" "}
                  and{" "}
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.gold }}
                  >
                    outstation cabs
                  </span>
                  . Book with us for a stress-free journey!
                </p>
              </div>
            </div>

            {/* Why This Trip Will Be Better */}
            <div>
              <h3
                className="text-2xl font-bold mb-6"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                  fontSize: theme.typography.fontSize["2xl"],
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Know Why this trip will be better ?
              </h3>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
                      style={{
                        backgroundColor: theme.colors.background.card,
                        borderColor: theme.colors.accent.gold,
                      }}
                    >
                      <Image
                        src="/images/stats/zero-cancellation.png"
                        alt="Check"
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className="leading-relaxed"
                        style={{
                          color: theme.colors.text.secondary,
                          lineHeight: theme.typography.lineHeight.relaxed,
                        }}
                      >
                        <span
                          className="font-semibold"
                          style={{ color: theme.colors.text.primary }}
                        >
                          {benefit.title}
                        </span>
                        , {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center p-4">
            <Image
              src="/cabtwo.png"
              alt="Penta Cab - Premium Taxi Service"
              width={600}
              height={500}
              priority
            />
          </div>
        </div>

        {/* Bottom Trust Indicators - themed */}
        <div
          className="mt-16 pt-12 border-t"
          style={{
            borderColor: `${theme.colors.accent.gold}20`,
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustIndicators.map((item, index) => (
              <div
                key={index}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                    fontWeight: theme.typography.fontWeight.semibold,
                  }}
                >
                  {item.label}
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTASection;
