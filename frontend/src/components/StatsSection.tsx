// ============================================================================
// StatsSection.tsx - Another example showing theme integration
// ============================================================================

// src/components/StatsSection.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { theme } from "@/styles/theme";

interface StatItem {
  number: string;
  label: string;
  color: string;
  targetValue: number;
  suffix: string;
}

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      number: "1500+",
      label: "Trusted Clients",
      color: theme.colors.secondary.orange,
      targetValue: 1500,
      suffix: "+",
    },
    {
      number: "7500+",
      label: "Comfort Rides",
      color: theme.colors.secondary.warmYellow,
      targetValue: 7500,
      suffix: "+",
    },
    {
      number: "+10",
      label: "Years of Service",
      color: theme.colors.accent.gold,
      targetValue: 10,
      suffix: "+",
    },
  ];

  // Intersection Observer to trigger animation when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animate numbers when component becomes visible
  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.targetValue / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(increment * step, stat.targetValue);

          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.floor(current);
            return newValues;
          });

          if (step >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-6 lg:py-10 relative overflow-hidden"
      style={{
        background: theme.gradients.blackToCharcoal,
      }}
    >
      {/* Background decoration using theme colors */}
      <div className="absolute inset-0" style={{ opacity: 0.05 }}>
        <div
          className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.amber,
            animationDelay: "1000ms",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center animate-fade-in-up rounded-lg p-3 border transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 200}ms`,
                backgroundColor: `${theme.colors.background.card}80`, // Semi-transparent
                backdropFilter: "blur(10px)",
                borderColor: theme.colors.border.goldLight,
                boxShadow: `0 2px 8px ${theme.colors.shadow.card}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border.gold;
                e.currentTarget.style.boxShadow = `0 4px 16px ${theme.colors.shadow.gold}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  theme.colors.border.goldLight;
                e.currentTarget.style.boxShadow = `0 2px 8px ${theme.colors.shadow.card}`;
              }}
            >
              {/* Animated Number */}
              <div
                className="text-xl lg:text-2xl xl:text-3xl font-bold mb-1 transition-all duration-300 group-hover:scale-110"
                style={{
                  color: stat.color,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                {index === 2 ? "+" : ""}
                {animatedValues[index]}
                {index !== 2 ? "+" : ""}
              </div>

              {/* Label */}
              <div
                className="font-medium text-xs group-hover:text-opacity-100 transition-colors duration-300"
                style={{
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.text.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                }}
              >
                {stat.label}
              </div>

              {/* Decorative line */}
              <div
                className="w-8 h-0.5 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                style={{
                  background: theme.gradients.gold,
                }}
              />
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <h3
            className="text-base lg:text-lg xl:text-xl font-semibold leading-relaxed"
            style={{
              color: theme.colors.secondary.warmYellow,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
              fontSize: theme.typography.fontSize.lg,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            Safe, reliable and always on time.
          </h3>

          {/* Decorative elements */}
          <div className="flex items-center justify-center mt-3 space-x-2">
            <div
              className="w-6 h-0.5 rounded-full"
              style={{
                background: `linear-gradient(to right, transparent, ${theme.colors.secondary.warmYellow})`,
              }}
            />
            <div
              className="w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: theme.colors.secondary.warmYellow,
              }}
            />
            <div
              className="w-6 h-0.5 rounded-full"
              style={{
                background: `linear-gradient(to left, transparent, ${theme.colors.secondary.warmYellow})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: theme.gradients.gold,
        }}
      />
    </section>
  );
};

export default StatsSection;
