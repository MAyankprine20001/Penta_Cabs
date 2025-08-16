"use client";
import React from "react";
import { theme } from "@/styles/theme";
import {
  FaShieldAlt,
  FaHeart,
  FaClock,
  FaSearch,
  FaRocket,
  FaHandshake,
  FaStar,
  FaUsers,
} from "react-icons/fa";

export const AboutValue: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: theme.colors.background.tertiary + "30" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FaStar
              className="text-5xl"
              style={{ color: theme.colors.accent.gold }}
            />
          </div>
          <h2
            className="text-3xl lg:text-4xl font-display font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
          >
            Our Core Values
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            Focused on Service and Trust - These values guide every decision we
            make and every interaction we have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: FaShieldAlt,
              title: "Safety First",
              description:
                "We prioritize the well-being of our passengers and drivers above all else, implementing rigorous safety protocols and continuous improvements.",
              color: "#20B2AA",
            },
            {
              icon: FaHeart,
              title: "Customer Centricity",
              description:
                "Our customers are at the heart of everything we do. We are dedicated to understanding their needs and consistently exceeding their expectations with exceptional service.",
              color: "#FF6B35",
            },
            {
              icon: FaClock,
              title: "Reliability & Punctuality",
              description:
                "We are committed to being consistently dependable, ensuring timely arrivals and departures, because we value your time.",
              color: "#FFD700",
            },
            {
              icon: FaSearch,
              title: "Transparency",
              description:
                "We believe in clear communication and honest dealings, from upfront pricing to detailed trip information, building trust with every interaction.",
              color: "#4ECDC4",
            },
            {
              icon: FaRocket,
              title: "Innovation",
              description:
                "We continuously seek new and better ways to enhance the mobility experience, embracing technology to provide smarter and more convenient solutions.",
              color: "#96CEB4",
            },
            {
              icon: FaHandshake,
              title: "Integrity",
              description:
                "We conduct business with honesty, fairness, and ethical practices, building lasting relationships based on trust and mutual respect.",
              color: "#FECA57",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                style={{ background: theme.gradients.gold }}
              >
                <value.icon style={{ color: value.color }} />
              </div>
              <h3
                className="text-xl font-bold mb-3 group-hover:opacity-80 transition-colors duration-300"
                style={{ color: theme.colors.text.primary }}
              >
                {value.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: theme.colors.text.secondary }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values Summary */}
        <div className="mt-16 text-center">
          <div
            className="rounded-2xl p-8 border backdrop-blur-sm"
            style={{
              background: theme.gradients.cardGradient,
              border: `2px solid ${theme.colors.accent.gold}30`,
              boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}`,
            }}
          >
            <div className="flex justify-center mb-6">
              <FaUsers
                className="text-4xl"
                style={{ color: theme.colors.accent.gold }}
              />
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: theme.colors.text.primary }}
            >
              Committed to Excellence
            </h3>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: theme.colors.text.secondary }}
            >
              Every journey with PentaCab is guided by our unwavering commitment
              to these core values, ensuring you receive nothing but the best in
              transportation services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
