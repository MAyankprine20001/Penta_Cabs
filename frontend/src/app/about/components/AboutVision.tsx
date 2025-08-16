"use client";
import React from "react";
import { theme } from "@/styles/theme";
import {
  FaEye,
  FaRocket,
  FaCity,
  FaCogs,
  FaLightbulb,
  FaGlobe,
  FaArrowUp,
} from "react-icons/fa";

export const AboutVision: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: theme.colors.background.tertiary + "30" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in-up mb-12">
          <div className="flex justify-center mb-6">
            <FaEye
              className="text-5xl"
              style={{ color: theme.colors.accent.gold }}
            />
          </div>
          <h2
            className="text-3xl lg:text-4xl font-display font-bold mb-8"
            style={{ color: theme.colors.text.primary }}
          >
            Our Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Vision Content */}
          <div
            className="rounded-2xl p-8 lg:p-12 border"
            style={{
              background: theme.gradients.primary,
              borderColor: theme.colors.border.gold + "20",
              boxShadow: `0 10px 30px ${theme.colors.shadow.gold}`,
            }}
          >
            <p
              className="text-lg lg:text-xl leading-relaxed mb-8"
              style={{ color: theme.colors.text.secondary }}
            >
              Our vision is to be the architects of intelligent urban movement,
              pioneering a dynamic ecosystem where cutting-edge technology,
              autonomous solutions, and human-centric design converge. We aim to
              create a predictive and adaptive mobility platform that constantly
              redefines convenience, safety, and efficiency for the cities of
              tomorrow.
            </p>

            {/* Vision Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: FaRocket,
                  text: "Innovation Leadership",
                  color: "#FFD700",
                },
                { icon: FaCity, text: "Smart Cities", color: "#20B2AA" },
                {
                  icon: FaCogs,
                  text: "Technology Integration",
                  color: "#FF6B35",
                },
                { icon: FaGlobe, text: "Global Impact", color: "#4ECDC4" },
              ].map((pillar, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <pillar.icon
                    className="text-xl"
                    style={{ color: pillar.color }}
                  />
                  <span style={{ color: theme.colors.text.secondary }}>
                    {pillar.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Visual */}
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
                    <FaLightbulb
                      className="text-6xl"
                      style={{ color: theme.colors.accent.gold }}
                    />
                    <FaArrowUp
                      className="text-2xl absolute -top-2 -right-2"
                      style={{ color: "#FFA500" }}
                    />
                  </div>
                </div>

                <h4
                  className="text-xl font-bold mb-4"
                  style={{ color: theme.colors.text.primary }}
                >
                  Future Goals
                </h4>

                <div className="space-y-3">
                  {[
                    "Autonomous Vehicle Integration",
                    "AI-Powered Route Optimization",
                    "Zero-Emission Fleet",
                    "Global Market Expansion",
                  ].map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center space-x-2"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.accent.gold }}
                      ></div>
                      <span style={{ color: theme.colors.text.secondary }}>
                        {goal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              number: "2025",
              label: "Autonomous Fleet",
              icon: FaRocket,
              color: "#FFD700",
            },
            {
              number: "2030",
              label: "Global Expansion",
              icon: FaGlobe,
              color: "#20B2AA",
            },
            {
              number: "100%",
              label: "Green Energy",
              icon: FaLightbulb,
              color: "#4ECDC4",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl backdrop-blur-sm border hover:scale-105 transition-all duration-300"
              style={{
                background: theme.gradients.primary,
                border: `1px solid ${theme.colors.border.light}`,
              }}
            >
              <stat.icon
                className="text-3xl mb-3"
                style={{ color: stat.color }}
              />
              <div
                className="text-2xl font-bold mb-2"
                style={{ color: theme.colors.accent.gold }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
