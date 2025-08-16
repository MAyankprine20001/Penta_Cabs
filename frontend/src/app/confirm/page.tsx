// src/app/confirm/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Theme configuration (matching booking-details)
const theme = {
  colors: {
    primary: {
      black: "#000000",
      darkGray: "#1a1a1a",
    },
    accent: {
      gold: "#FFD700",
      lightGold: "#FFF700",
    },
    secondary: {
      amber: "#FFA500",
      warmYellow: "#FFB84D",
      lightAmber: "#FFCC80",
      green: "#22C55E",
      darkGreen: "#16A34A",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E5E5E5",
      muted: "#B0B0B0",
    },
    background: {
      primary: "#000000",
      dark: "#0a0a0a",
      gradient:
        "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
    },
    border: {
      gold: "#FFD700",
      goldLight: "#FFF700",
      light: "rgba(255, 255, 255, 0.1)",
    },
    shadow: {
      gold: "rgba(255, 215, 0, 0.4)",
      primary: "rgba(0, 0, 0, 0.8)",
      elevated: "rgba(0, 0, 0, 0.6)",
      green: "rgba(34, 197, 94, 0.3)",
    },
  },
  gradients: {
    heroGradient:
      "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)",
    gold: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    cardGradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    green: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    fontWeight: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

const BookingConfirmationPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowConfetti(true);
    }, 100);

    // Hide confetti after animation
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const bookingDetails = {
    bookingId: "MMRON-58473",
    transactionId: "26307f0f-a1ce-4caa-8c51-15d5e85cc3",
    email: "vey***majol.com",
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: theme.gradients.heroGradient,
        fontFamily: theme.typography.fontFamily.sans.join(", "),
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 70%, #000000 100%)`,
          }}
        />

        {/* Animated background particles */}
        <div
          className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full blur-2xl animate-pulse"
          style={{
            backgroundColor: theme.colors.accent.gold,
            opacity: 0.1,
            animationDuration: "3s",
          }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-32 h-32 rounded-full blur-3xl animate-pulse"
          style={{
            backgroundColor: theme.colors.secondary.amber,
            opacity: 0.08,
            animationDelay: "1.5s",
            animationDuration: "4s",
          }}
        />

        {/* Success celebration particles */}
        {showConfetti && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-bounce"
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? theme.colors.accent.gold
                      : theme.colors.secondary.green,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mx-auto ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Success Card */}
          <div
            className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              background: theme.gradients.cardGradient,
              border: `3px solid ${theme.colors.accent.gold}`,
              boxShadow: `0 25px 80px ${theme.colors.shadow.elevated}, 0 0 0 1px ${theme.colors.accent.gold}30`,
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 blur-3xl opacity-20 animate-pulse"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${theme.colors.accent.gold}40 0%, transparent 70%)`,
                animationDuration: "4s",
              }}
            />

            <div className="relative z-10">
              {/* Success Icon */}
              <div
                className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
                style={{
                  background: theme.gradients.green,
                  boxShadow: `0 20px 60px ${theme.colors.shadow.green}`,
                }}
              >
                {/* Icon glow */}
                <div
                  className="absolute inset-0 blur-xl opacity-40 rounded-full"
                  style={{
                    background: theme.gradients.green,
                    transform: "scale(1.5)",
                  }}
                />
                <div className="relative">
                  <svg
                    className="w-12 h-12"
                    style={{ color: theme.colors.text.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Title */}
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{
                  color: theme.colors.accent.gold,
                  textShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                Booking Successful!
              </h1>

              {/* Booking Details */}
              <div className="space-y-4 mb-8">
                <div
                  className="text-lg"
                  style={{ color: theme.colors.text.secondary }}
                >
                  <span className="font-medium">Your booking ID is: </span>
                  <span
                    className="font-bold text-xl"
                    style={{
                      color: theme.colors.accent.gold,
                      textShadow: `0 2px 10px ${theme.colors.shadow.gold}`,
                    }}
                  >
                    {bookingDetails.bookingId}
                  </span>
                </div>

                <div
                  className="text-sm"
                  style={{ color: theme.colors.text.muted }}
                >
                  <span>Transaction ID: </span>
                  <span
                    className="font-mono font-medium"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {bookingDetails.transactionId}
                  </span>
                </div>

                <div
                  className="text-sm"
                  style={{ color: theme.colors.text.muted }}
                >
                  We have sent booking details on:{" "}
                  <span
                    className="font-medium"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {bookingDetails.email}
                  </span>
                </div>
              </div>

              {/* Success Message */}
              <div
                className="bg-black bg-opacity-30 rounded-xl p-6 mb-8 border"
                style={{ borderColor: theme.colors.border.light }}
              >
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: theme.colors.text.secondary }}
                >
                  🎉 Thank you for choosing our service! Your cab has been
                  successfully booked. You will receive a confirmation call from
                  our team within the next 30 minutes. Our driver will contact
                  you 1 hour before pickup time.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoHome}
                  className="font-bold py-4 px-8 rounded-xl text-lg transition-all duration-500 hover:scale-105 transform relative overflow-hidden group"
                  style={{
                    background: theme.gradients.gold,
                    color: theme.colors.primary.black,
                    fontWeight: theme.typography.fontWeight.bold,
                    boxShadow: `0 20px 60px ${theme.colors.shadow.gold}`,
                    border: `2px solid ${theme.colors.accent.lightGold}`,
                  }}
                >
                  {/* Button glow effect */}
                  <div
                    className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: theme.gradients.gold,
                      transform: "scale(1.2)",
                    }}
                  />
                  <span className="relative z-10">🏠 Home</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="font-bold py-4 px-8 rounded-xl text-lg transition-all duration-500 hover:scale-105 transform border-2"
                  style={{
                    background: "transparent",
                    color: theme.colors.text.primary,
                    fontWeight: theme.typography.fontWeight.bold,
                    borderColor: theme.colors.accent.gold,
                  }}
                >
                  📄 Print Details
                </button>
              </div>

              {/* Additional Information */}
              <div
                className="mt-8 pt-6 border-t"
                style={{ borderColor: theme.colors.border.light }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div
                    className="flex items-center justify-center gap-2"
                    style={{ color: theme.colors.text.muted }}
                  >
                    <span>📧</span>
                    <span>Email: info@makemyride.com</span>
                  </div>
                  <div
                    className="flex items-center justify-center gap-2"
                    style={{ color: theme.colors.text.muted }}
                  >
                    <span>📞</span>
                    <span>Support: 7600839900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background: theme.gradients.gold,
        }}
      />

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingConfirmationPage;
