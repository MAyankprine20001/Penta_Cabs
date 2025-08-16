"use client";

import React, { useState } from "react";
import Image from "next/image";
import { theme } from "@/styles/theme";
import WhatsAppChat from "./WhatsAppChat";

interface FloatingCallIconsProps {
  phoneNumber?: string;
  whatsappNumber?: string;
}

const FloatingCallIcons: React.FC<FloatingCallIconsProps> = ({
  phoneNumber = "7600839900",
  whatsappNumber = "7600839900",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);

  const handleCall = () => {
    try {
      setIsCalling(true);
      const telLink = `tel:${phoneNumber}`;
      window.location.href = telLink;

      setTimeout(() => {
        setIsCalling(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to initiate call:", error);
      setIsCalling(false);
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          alert(`Phone number ${phoneNumber} copied to clipboard!`);
        })
        .catch(() => {
          alert(`Call ${phoneNumber} to book your cab!`);
        });
    }
  };

  const handleWhatsApp = () => {
    try {
      setIsWhatsApp(true);
      setShowWhatsAppChat(true);

      setTimeout(() => {
        setIsWhatsApp(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to open WhatsApp:", error);
      setIsWhatsApp(false);
    }
  };

  const handleCloseWhatsAppChat = () => {
    setShowWhatsAppChat(false);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonStyle = {
    background: theme.gradients.goldToAmber,
    boxShadow: `0 6px 25px ${theme.colors.shadow.gold}`,
    border: `2px solid ${theme.colors.accent.gold}`,
  };

  const activeButtonStyle = {
    background: theme.gradients.gold,
    boxShadow: `0 8px 30px ${theme.colors.shadow.gold}`,
    border: `2px solid ${theme.colors.accent.gold}`,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button (Top) */}
      <div
        className={`absolute transition-all duration-300 ease-in-out ${
          isExpanded
            ? "bottom-36 opacity-100 scale-100"
            : "bottom-0 opacity-0 scale-50 pointer-events-none"
        }`}
      >
        <button
          onClick={handleWhatsApp}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
            isWhatsApp ? "scale-110 animate-pulse" : ""
          }`}
          style={isWhatsApp ? activeButtonStyle : buttonStyle}
          aria-label="WhatsApp us"
          title={`WhatsApp ${whatsappNumber}`}
        >
          <Image
            src="/images/contact-icon/whatsapp.png"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </button>
      </div>

      {/* Call Button (Middle) */}
      <div
        className={`absolute transition-all duration-300 ease-in-out ${
          isExpanded
            ? "bottom-20 opacity-100 scale-100"
            : "bottom-0 opacity-0 scale-50 pointer-events-none"
        }`}
      >
        <button
          onClick={handleCall}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
            isCalling ? "scale-110 animate-pulse" : ""
          }`}
          style={isCalling ? activeButtonStyle : buttonStyle}
          aria-label="Call us"
          title={`Call ${phoneNumber}`}
        >
          <Image
            src="/images/contact-icon/name.png"
            alt="Phone"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </button>
      </div>

      {/* Main Plus/X Button */}
      <div className="relative">
        <button
          onClick={toggleExpansion}
          className={`w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
            isExpanded ? "rotate-45" : ""
          }`}
          style={buttonStyle}
          aria-label="Toggle contact options"
          title="Contact options"
        >
          <svg
            width="28"
            height="28"
            className="md:w-8 md:h-8 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.primary.black}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isExpanded ? (
              // X icon when expanded
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              // Plus icon when collapsed
              <>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* WhatsApp Chat Modal */}
      <WhatsAppChat
        whatsappNumber={whatsappNumber}
        isOpen={showWhatsAppChat}
        onClose={handleCloseWhatsAppChat}
      />
    </div>
  );
};

export default FloatingCallIcons;
