"use client";
import React from "react";
import { theme } from "@/styles/theme";
import {
  FaHeart,
  FaHandshake,
  FaStar,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";

export const AboutThks: React.FC = () => {
  const router = useRouter();

  // Function to scroll to booking widget
  const scrollToBookingWidget = () => {
    setTimeout(() => {
      const bookingSection = document.getElementById("booking-widget");
      if (bookingSection) {
        bookingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Handle booking button click
  const handleBookRideClick = () => {
    // If not on homepage, navigate first
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        scrollToBookingWidget();
      }, 500);
    } else {
      // If already on homepage, just scroll
      scrollToBookingWidget();
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Thank You Card */}
          <div className="animate-fade-in-up">
            <div
              className="rounded-2xl p-8 lg:p-12"
              style={{
                background: theme.gradients.gold,
                color: theme.colors.primary.black,
              }}
            >
              <div className="flex justify-center mb-6">
                <FaHeart
                  className="text-5xl"
                  style={{ color: theme.colors.primary.black }}
                />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Thank You for Choosing Penta Cab
              </h3>
              <p className="text-lg lg:text-xl leading-relaxed mb-8">
                We look forward to serving you and being your trusted partner on
                the road ahead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBookRideClick}
                  className="px-8 py-3 rounded-lg font-bold transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.primary.black,
                    color: theme.colors.accent.gold,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.background.tertiary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.primary.black;
                  }}
                >
                  <FaStar />
                  <span>Book Your Ride</span>
                </button>
                <a
                  href="/contact"
                  className="border-2 px-8 py-3 rounded-lg font-bold transition-all duration-300 inline-block flex items-center justify-center space-x-2"
                  style={{
                    borderColor: theme.colors.primary.black,
                    color: theme.colors.primary.black,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.primary.black;
                    e.currentTarget.style.color = theme.colors.accent.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = theme.colors.primary.black;
                  }}
                >
                  <FaHandshake />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div
              className="rounded-2xl p-8 border backdrop-blur-sm"
              style={{
                background: theme.gradients.primary,
                border: `2px solid ${theme.colors.accent.gold}30`,
                boxShadow: `0 20px 60px ${theme.colors.shadow.elevated}`,
              }}
            >
              <h4
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: theme.colors.text.primary }}
              >
                Get In Touch
              </h4>

              <div className="space-y-6">
                {[
                  {
                    icon: MdLocationOn,
                    text: "Ahmedabad, Gujarat",
                    color: "#FFD700",
                  },
                  { icon: FaPhone, text: "+91 98765 43210", color: "#FFA500" },
                  {
                    icon: FaEnvelope,
                    text: "info@pentacab.com",
                    color: "#20B2AA",
                  },
                  {
                    icon: MdAccessTime,
                    text: "24/7 Available",
                    color: "#4ECDC4",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <contact.icon
                      className="text-2xl"
                      style={{ color: contact.color }}
                    />
                    <span style={{ color: theme.colors.text.secondary }}>
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div
                className="mt-8 pt-6 border-t"
                style={{ borderColor: theme.colors.border.light }}
              >
                <div className="flex justify-center space-x-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="text-xl"
                      style={{ color: theme.colors.accent.gold }}
                    />
                  ))}
                </div>
                <p
                  className="text-center mt-2 text-sm"
                  style={{ color: theme.colors.text.muted }}
                >
                  Trusted by 1000+ customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
