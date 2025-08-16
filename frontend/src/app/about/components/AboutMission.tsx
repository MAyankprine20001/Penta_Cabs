"use client";
import React from "react";
import { theme } from "@/styles/theme";
import {
  FaBullseye,
  FaRocket,
  FaHeart,
  FaUsers,
  FaShieldAlt,
  FaTachometerAlt,
  FaStar,
} from "react-icons/fa";

export const AboutMission: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: theme.colors.background.tertiary + "30" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h2
            className="text-3xl lg:text-4xl font-display font-bold mb-8 text-center"
            style={{ color: theme.colors.text.primary }}
          >
            Our Mission
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Mission Content */}
            <div
              className="rounded-2xl p-8 lg:p-12 border"
              style={{
                background: theme.gradients.primary,
                borderColor: theme.colors.border.gold + "20",
                boxShadow: `0 10px 30px ${theme.colors.shadow.gold}`,
              }}
            >
              <div className="flex items-center mb-6">
                <FaBullseye
                  className="text-4xl mr-4"
                  style={{ color: theme.colors.accent.gold }}
                />
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Core Mission
                </h3>
              </div>

              <p
                className="text-lg lg:text-xl leading-relaxed mb-6"
                style={{ color: theme.colors.text.secondary }}
              >
                To get people to their destination safely and efficiently.
                PentaCab's mission is to make{" "}
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.accent.gold }}
                >
                  travel simple and enjoyable
                </span>{" "}
                through advanced technology and unparalleled service.
              </p>

              {/* Mission Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  {
                    icon: FaRocket,
                    text: "Innovation in Service",
                    color: "#FFD700",
                  },
                  { icon: FaShieldAlt, text: "Safety First", color: "#20B2AA" },
                  { icon: FaHeart, text: "Customer Care", color: "#FF6B35" },
                  {
                    icon: FaTachometerAlt,
                    text: "Efficiency",
                    color: "#4ECDC4",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <feature.icon
                      className="text-xl"
                      style={{ color: feature.color }}
                    />
                    <span style={{ color: theme.colors.text.secondary }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Visual */}
            <div className="relative">
              <div
                className="rounded-2xl p-8 border backdrop-blur-sm"
                style={{
                  background: theme.gradients.primary,
                  border: `2px solid ${theme.colors.accent.gold}30`,
                  boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}`,
                }}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <FaUsers
                        className="text-6xl"
                        style={{ color: theme.colors.accent.gold }}
                      />
                      <FaStar
                        className="text-2xl absolute -top-2 -right-2"
                        style={{ color: "#FFA500" }}
                      />
                    </div>
                  </div>

                  <h4
                    className="text-xl font-bold mb-4"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Our Commitment
                  </h4>

                  <div className="space-y-3">
                    {[
                      "Premium Quality Service",
                      "24/7 Customer Support",
                      "Safe & Reliable Travel",
                      "Competitive Pricing",
                    ].map((commitment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center space-x-2"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: theme.colors.accent.gold }}
                        ></div>
                        <span style={{ color: theme.colors.text.secondary }}>
                          {commitment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
