// src/components/navbar/PhoneButton.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { contactInfo } from "@/config/navigation";

interface PhoneButtonProps {
  isMobile?: boolean;
  className?: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({
  isMobile = false,
  className = "",
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  if (isMobile) {
    return (
      <div className={`pt-6 border-t border-penta-gold/20 ${className}`}>
        <a
          href={`tel:${contactInfo.phone}`}
          className="group relative overflow-hidden flex items-center justify-center space-x-3 bg-gradient-gold text-penta-black px-6 py-4 rounded-xl font-bold w-full hover:shadow-gold-lg transition-all duration-300"
          onClick={handlePress}
        >
          <div className="flex items-center space-x-3 relative z-10">
            <div className="relative">
              <Image
                src="/images/contact-icon/name.png"
                alt="Phone"
                width={20}
                height={20}
                className="w-5 h-5 group-hover:animate-pulse object-contain"
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            </div>
            <div className="text-left">
              <span className="block text-sm font-bold">Call Now</span>
              <span className="block text-xs opacity-80">
                {contactInfo.phoneFormatted}
              </span>
            </div>
          </div>

          {/* Ripple effect */}
          {isPressed && (
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping" />
          )}

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-shimmer-gold bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
        </a>

        {/* Quick Actions */}
        <div className="mt-3 flex space-x-2">
          <a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex-1 flex items-center justify-center space-x-2 bg-penta-charcoal hover:bg-penta-medium-gray text-penta-cream px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 border border-penta-gold/20"
          >
            <span>📧</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`hidden lg:flex items-center ${className}`}>
      <a
        href={`tel:${contactInfo.phone}`}
        className="group relative overflow-hidden bg-gradient-gold text-penta-black px-6 py-3 rounded-xl font-bold text-sm hover:shadow-gold-lg transition-all duration-300 transform hover:scale-105"
        onClick={handlePress}
        aria-label="Call Penta Cab now"
      >
        <div className="flex items-center space-x-2 relative z-10">
          <div className="relative">
            <Image
              src="/images/contact-icon/name.png"
              alt="Phone"
              width={16}
              height={16}
              className="w-4 h-4 group-hover:animate-pulse object-contain"
            />
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {/* Pulse ring */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
          <span className="font-bold">{contactInfo.phone}</span>
        </div>

        {/* Click ripple effect */}
        {isPressed && (
          <div className="absolute inset-0 bg-white/30 rounded-xl animate-ping" />
        )}

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-shimmer-gold bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />

        {/* Border glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-gold blur-sm -z-10" />
      </a>

      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-penta-black/90 text-penta-cream text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Available 24/7 • Instant booking
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-penta-black/90 rotate-45" />
      </div>
    </div>
  );
};

export default PhoneButton;
