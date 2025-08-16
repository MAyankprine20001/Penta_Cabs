"use client";
import React from "react";
import { theme } from "@/styles/theme";
import {
  FaShieldAlt,
  FaClock,
  FaDollarSign,
  FaCar,
  FaPhone,
  FaMobile,
  FaUserTie,
  FaLock,
  FaGem,
  FaHeart,
} from "react-icons/fa";
import {
  MdStar,
  MdSecurity,
  MdAccessTime,
  MdPayment,
  MdSupport,
} from "react-icons/md";

export const AboutWhy: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-4xl font-display font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
          >
            Why Choose Us?
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            At PentaCab, we're not just about getting you from point A to B;
            we're about providing a superior travel experience.
          </p>
        </div>

        {/* Core Value Proposition Section */}
        <div className="mb-16">
          <h3
            className="text-2xl lg:text-3xl font-bold mb-8 text-center"
            style={{ color: theme.colors.text.primary }}
          >
            The Core Value Proposition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Safety First",
                description:
                  "Your well-being is our top priority. Our drivers undergo rigorous background checks and continuous training. Plus, our in-app SOS feature and real-time ride sharing options give you peace of mind on every journey.",
                icon: FaShieldAlt,
                color: "#20B2AA",
              },
              {
                title: "Reliability You Can Count On",
                description:
                  "We value your time. Our advanced dispatch system and dedicated drivers ensure on-time arrivals and departures, so you never have to worry about missing an appointment.",
                icon: FaClock,
                color: "#FFD700",
              },
              {
                title: "Transparent & Affordable Pricing",
                description:
                  "No hidden fees, ever. Get upfront fare estimates before you book, with competitive rates that offer great value for your money.",
                icon: FaDollarSign,
                color: "#4ECDC4",
              },
              {
                title: "Comfort & Convenience",
                description:
                  "Our diverse fleet of well-maintained vehicles ensures a comfortable ride, while our easy-to-use app and website make booking a breeze. Schedule rides in advance or get an instant cab with just a few taps.",
                icon: FaCar,
                color: "#FF6B35",
              },
              {
                title: "24/7 Support",
                description:
                  "Have a question or need assistance? Our dedicated customer support team is available round-the-clock to help you.",
                icon: FaPhone,
                color: "#96CEB4",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl p-6 lg:p-8 border hover:border-opacity-40 transition-all duration-300 animate-fade-in-up"
                style={{
                  background: theme.gradients.primary,
                  borderColor: theme.colors.border.gold + "20",
                  animationDelay: `${index * 100}ms`,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.gold + "40";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.gold + "20";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: theme.gradients.gold,
                        color: theme.colors.primary.black,
                      }}
                    >
                      <item.icon style={{ color: item.color }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-3 group-hover:opacity-80 transition-colors duration-300"
                      style={{ color: theme.colors.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus on Experience and Technology Section */}
        <div className="mb-16">
          <h3
            className="text-2xl lg:text-3xl font-bold mb-8 text-center"
            style={{ color: theme.colors.text.primary }}
          >
            Focus on Experience and Technology
          </h3>
          <p
            className="text-lg text-center mb-8 max-w-3xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            Choosing PentaCab means choosing an unparalleled travel experience
            driven by technology and a commitment to excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Seamless Booking Experience",
                description:
                  "Our intuitive website and app make booking effortless. From real-time vehicle tracking to multiple payment options, we've designed every step with your convenience in mind.",
                icon: FaMobile,
                color: "#FFD700",
              },
              {
                title: "Professional & Vetted Drivers",
                description:
                  "Travel with confidence knowing that every PentaCab driver is professionally trained, thoroughly vetted, and committed to providing a courteous and efficient service.",
                icon: FaUserTie,
                color: "#20B2AA",
              },
              {
                title: "Uncompromised Safety Measures",
                description:
                  "Your safety is paramount. Benefit from features like live trip sharing, an emergency SOS button, and secure in-app communication, ensuring a safe journey every time.",
                icon: FaLock,
                color: "#FF6B35",
              },
              {
                title: "Smart & Fair Pricing",
                description:
                  "Our transparent fare structure means you always know what you're paying. Enjoy competitive pricing without sacrificing quality or comfort.",
                icon: FaGem,
                color: "#4ECDC4",
              },
              {
                title: "Dedicated to Your Satisfaction",
                description:
                  "We listen to our customers. Our responsive support team and commitment to continuous improvement mean your feedback directly contributes to an even better PentaCab experience.",
                icon: FaHeart,
                color: "#96CEB4",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl p-6 lg:p-8 border hover:border-opacity-40 transition-all duration-300 animate-fade-in-up"
                style={{
                  background: theme.gradients.primary,
                  borderColor: theme.colors.border.gold + "20",
                  animationDelay: `${index * 100}ms`,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.gold + "40";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.gold + "20";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: theme.gradients.gold,
                        color: theme.colors.primary.black,
                      }}
                    >
                      <item.icon style={{ color: item.color }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-3 group-hover:opacity-80 transition-colors duration-300"
                      style={{ color: theme.colors.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: theme.colors.text.secondary }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Short and Punchy Section */}
        <div>
          <h3
            className="text-2xl lg:text-3xl font-bold mb-8 text-center"
            style={{ color: theme.colors.text.primary }}
          >
            Short and Punchy
          </h3>
          <p
            className="text-lg text-center mb-8 max-w-2xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            Why settle for less when you can have the best? Choose PentaCab for:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {[
              {
                title: "Unmatched Safety",
                description:
                  "Rigorous driver checks and in-app safety features.",
                icon: FaShieldAlt,
                color: "#20B2AA",
              },
              {
                title: "Guaranteed Reliability",
                description: "Always on time, every time.",
                icon: FaClock,
                color: "#FFD700",
              },
              {
                title: "Transparent Fares",
                description: "No surprises, just fair pricing.",
                icon: FaDollarSign,
                color: "#4ECDC4",
              },
              {
                title: "Effortless Convenience",
                description: "Easy booking, comfortable rides.",
                icon: FaCar,
                color: "#FF6B35",
              },
              {
                title: "Superior Service",
                description: "24/7 support and professional drivers.",
                icon: MdStar,
                color: "#96CEB4",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-xl p-4 lg:p-6 border hover:border-opacity-40 transition-all duration-300 animate-fade-in-up text-center"
                style={{
                  background: theme.gradients.primary,
                  borderColor: theme.colors.border.gold + "20",
                  animationDelay: `${index * 100}ms`,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.gold + "40";
                  e.currentTarget.style.boxShadow = `0 10px 20px ${theme.colors.shadow.gold}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.colors.border.gold + "20";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: theme.gradients.gold,
                    color: theme.colors.primary.black,
                  }}
                >
                  <item.icon style={{ color: item.color }} />
                </div>
                <h4
                  className="text-lg font-bold mb-2 group-hover:opacity-80 transition-colors duration-300"
                  style={{ color: theme.colors.text.primary }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
