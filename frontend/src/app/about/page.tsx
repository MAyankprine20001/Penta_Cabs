// src/app/about/page.tsx
"use client";
import React from "react";
import { theme } from "@/styles/theme";
import { AboutThks } from "./components/AboutThks";
import { AboutValue } from "./components/AboutValue";
import { AboutVision } from "./components/AboutVision";
import { AboutWhy } from "./components/AboutWhy";
import { AboutMission } from "./components/AboutMission";
import { HeroSection } from "./components/HeroSection";
import { AboutStory } from "./components/AboutStory";

const AboutPage: React.FC = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.primary.black }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Our Story Section */}
      <AboutStory />

      {/* Our Mission Section */}
      <AboutMission />

      {/* Why Choose Us Section */}
      <AboutWhy />

      {/* Our Vision Section */}
      <AboutVision />

      {/* Thank You Section */}
      <AboutThks />

      {/* Values Section */}
      <AboutValue />
    </div>
  );
};

export default AboutPage;
