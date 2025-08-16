"use client";
import React from "react";
import { theme } from "@/styles/theme";
import { FaCar, FaStar, FaShieldAlt, FaClock } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/about-us/about-banner.jpg"
          alt="About Penta Cab"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: theme.colors.accent.gold + "10" }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: theme.colors.secondary.amber + "10" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000"
          style={{ backgroundColor: theme.colors.accent.warmGold + "05" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span style={{ color: theme.colors.text.primary }}>About </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: theme.gradients.gold }}
            >
              Penta Cab
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ color: theme.colors.text.secondary }}
          >
            Revolutionizing transportation with premium service, cutting-edge
            technology, and unwavering commitment to excellence.
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: FaCar, label: "Premium Fleet", color: "#FFD700" },
              { icon: FaStar, label: "5-Star Service", color: "#FFA500" },
              { icon: FaShieldAlt, label: "Safe Travel", color: "#20B2AA" },
              { icon: FaClock, label: "24/7 Available", color: "#FF6B35" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm border hover:scale-105 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: `1px solid ${feature.color}30`,
                }}
              >
                <feature.icon
                  className="text-3xl mb-2"
                  style={{ color: feature.color }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: theme.colors.text.primary }}
                >
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <MdLocationOn
                className="text-2xl"
                style={{ color: theme.colors.accent.gold }}
              />
              <span style={{ color: theme.colors.text.secondary }}>
                Ahmedabad, Gujarat
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MdPhone
                className="text-2xl"
                style={{ color: theme.colors.accent.gold }}
              />
              <span style={{ color: theme.colors.text.secondary }}>
                +91 98765 43210
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
