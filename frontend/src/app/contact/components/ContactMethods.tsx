"use client";
import React from "react";
import { theme } from "@/styles/theme";
import Image from "next/image";
export const ContactMethods: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Call Us */}
          <div className="group text-center animate-fade-in-up">
            <div
              className="rounded-2xl p-8 border transition-all duration-300 h-full"
              style={{
                background: theme.gradients.primary,
                borderColor: theme.colors.border.gold + "20",
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/contact-icon/name.png"
                  alt="Phone"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3
                className="text-xl font-bold mb-4 group-hover:opacity-80 transition-colors duration-300"
                style={{ color: theme.colors.text.primary }}
              >
                Call us
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.text.secondary }}
              >
                Need immediate assistance? Our customer support team is
                available 24/7 to help you with bookings and inquiries.
              </p>
              <a
                href="tel:7600839900"
                className="inline-flex items-center space-x-2 font-semibold transition-colors duration-300"
                style={{ color: theme.colors.accent.gold }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.accent.warmGold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.accent.gold;
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>7600839900</span>
              </a>
            </div>
          </div>

          {/* Email Us */}
          <div
            className="group text-center animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div
              className="rounded-2xl p-8 border transition-all duration-300 h-full"
              style={{
                background: theme.gradients.primary,
                borderColor: theme.colors.border.gold + "20",
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/contact-icon/gmail.png"
                  alt="Email"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3
                className="text-xl font-bold mb-4 group-hover:opacity-80 transition-colors duration-300"
                style={{ color: theme.colors.text.primary }}
              >
                Email us
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.text.secondary }}
              >
                Send us detailed queries, feedback, or business inquiries.
                We&apos;ll get back to you within 24 hours.
              </p>
              <a
                href="mailto:info@pentacab.com"
                className="inline-flex items-center space-x-2 font-semibold transition-colors duration-300"
                style={{ color: theme.colors.accent.gold }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.accent.warmGold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.accent.gold;
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>info@pentacab.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div
            className="group text-center animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div
              className="rounded-2xl p-8 border transition-all duration-300 h-full"
              style={{
                background: theme.gradients.primary,
                borderColor: theme.colors.border.gold + "20",
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
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/contact-icon/whatsapp.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3
                className="text-xl font-bold mb-4 group-hover:opacity-80 transition-colors duration-300"
                style={{ color: theme.colors.text.primary }}
              >
                Social media
              </h3>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.text.secondary }}
              >
                Follow us on social media for updates, special offers, and to
                connect with our community.
              </p>
              <div className="flex justify-center space-x-3">
                {[
                  {
                    name: "Facebook",
                    href: "https://facebook.com/pentacab",
                    color: "hover:bg-blue-600",
                    icon: (
                      <Image
                        src="/images/social-media/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    ),
                  },
                  {
                    name: "Instagram",
                    href: "https://instagram.com/pentacab",
                    color: "hover:bg-pink-600",
                    icon: (
                      <Image
                        src="/images/social-media/insta.png"
                        alt="Instagram"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    ),
                  },
                  {
                    name: "Twitter",
                    href: "https://twitter.com/pentacab",
                    color: "hover:bg-blue-400",
                    icon: (
                      <Image
                        src="/images/social-media/twitter.png"
                        alt="Twitter"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                    style={{
                      backgroundColor: theme.colors.background.tertiary,
                    }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
