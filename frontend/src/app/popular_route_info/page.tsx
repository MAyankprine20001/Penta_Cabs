// src/app/popular_route_info/page.tsx
"use client";

import React from "react";
import { BsCarFront, BsClock } from "react-icons/bs";
import { theme } from "@/styles/theme";

interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  description: string;
}

const popularRoutes: PopularRoute[] = [
  {
    id: "1",
    from: "Ahmedabad",
    to: "Mumbai",
    distance: "530 km",
    duration: "8-9 hours",
    description:
      "Premium intercity service with comfortable seating and professional drivers.",
  },
  {
    id: "2",
    from: "Ahmedabad",
    to: "Pune",
    distance: "650 km",
    duration: "10-11 hours",
    description: "Reliable long-distance travel with multiple vehicle options.",
  },
  {
    id: "3",
    from: "Ahmedabad",
    to: "Surat",
    distance: "280 km",
    duration: "4-5 hours",
    description: "Quick and efficient service for business and leisure travel.",
  },
  {
    id: "4",
    from: "Ahmedabad",
    to: "Vadodara",
    distance: "110 km",
    duration: "2-3 hours",
    description: "Frequent service with flexible departure times.",
  },
  {
    id: "5",
    from: "Ahmedabad",
    to: "Rajkot",
    distance: "200 km",
    duration: "3-4 hours",
    description:
      "Comfortable journey with modern vehicles and experienced drivers.",
  },
  {
    id: "6",
    from: "Ahmedabad",
    to: "Bhavnagar",
    distance: "180 km",
    duration: "3-4 hours",
    description:
      "Reliable service with competitive pricing and excellent customer support.",
  },
];

const PopularRouteInfo: React.FC = () => {
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

  // Handle call button click
  const handleCallClick = () => {
    window.location.href = "tel:+917600839900";
  };

  // Handle WhatsApp button click
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi, I need information about cab booking for popular routes."
    );
    window.open(`https://wa.me/917600839900?text=${message}`, "_blank");
  };

  // Handle booking button click
  const handleBookNowClick = () => {
    // If not on homepage, navigate first
    if (window.location.pathname !== "/") {
      window.location.href = "/";
      setTimeout(() => {
        scrollToBookingWidget();
      }, 500);
    } else {
      // If already on homepage, just scroll
      scrollToBookingWidget();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black
                    text-white"
    >
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/routes.jpg')",
            filter: "brightness(0.3)",
          }}
        ></div>

        <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: theme.colors.text.primary }}
            >
              Popular Routes
            </h1>
            <p
              className="text-xl mb-8"
              style={{ color: theme.colors.text.secondary }}
            >
              Discover our most frequently booked routes with competitive
              pricing and reliable service
            </p>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                         backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                         hover:transform hover:scale-105 transition-all duration-300
                         hover:border-gray-600/50"
              >
                <div className="mb-4">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    {route.from} → {route.to}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: theme.colors.text.muted }}
                  >
                    {route.description}
                  </p>

                  {/* Route Stats */}
                  <div className="grid grid-cols-2 gap-3 py-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BsCarFront className="w-4 h-4 text-blue-400 mr-1" />
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        Distance
                      </span>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: theme.colors.text.primary }}
                      >
                        {route.distance}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BsClock className="w-4 h-4 text-green-400 mr-1" />
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        Duration
                      </span>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: theme.colors.text.primary }}
                      >
                        {route.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm 
                     border border-gray-700/50 rounded-2xl p-8"
          >
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: theme.colors.text.primary }}
            >
              Ready to Book Your Journey?
            </h2>
            <p
              className="text-lg mb-6"
              style={{ color: theme.colors.text.muted }}
            >
              Contact us for the best rates and personalized service on any of
              these popular routes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCallClick}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 
                         transform hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{
                  backgroundColor: theme.colors.accent.gold,
                  color: theme.colors.primary.black,
                }}
              >
                Call Now: +91 760 083 9900
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 
                         transform hover:scale-105 border-2 cursor-pointer"
                style={{
                  borderColor: theme.colors.accent.gold,
                  color: theme.colors.accent.gold,
                }}
              >
                WhatsApp Us
              </button>
              <button
                onClick={handleBookNowClick}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 
                         transform hover:scale-105 border-2 cursor-pointer"
                style={{
                  borderColor: theme.colors.accent.gold,
                  color: theme.colors.accent.gold,
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRouteInfo;
