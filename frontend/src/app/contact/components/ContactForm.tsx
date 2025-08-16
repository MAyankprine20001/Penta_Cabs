"use client";
import React, { useState } from "react";
import { theme } from "@/styles/theme";
import Image from "next/image";
export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Illustration */}
          <div className="animate-slide-in-left order-2 lg:order-1">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: theme.colors.accent.gold,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main illustration placeholder */}
              <div
                className="rounded-2xl p-8 lg:p-12 border text-center"
                style={{
                  background: theme.gradients.primary,
                  borderColor: theme.colors.border.gold + "20",
                }}
              >
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: theme.gradients.gold }}
                >
                  <Image
                    src="/images/contact-icon/gmail.png"
                    alt="Email"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: theme.colors.text.primary }}
                >
                  Ready to Connect?
                </h3>
                <p style={{ color: theme.colors.text.secondary }}>
                  We&apos;re excited to hear from you and help with all your
                  transportation needs.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right order-1 lg:order-2">
            <h2
              className="text-3xl lg:text-4xl font-display font-bold mb-8"
              style={{ color: theme.colors.text.primary }}
            >
              Send us message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: theme.colors.background.tertiary,
                      borderColor: theme.colors.border.gold + "30",
                      color: theme.colors.text.primary,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        theme.colors.border.gold;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        theme.colors.border.gold + "30";
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: theme.colors.background.tertiary,
                      borderColor: theme.colors.border.gold + "30",
                      color: theme.colors.text.primary,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        theme.colors.border.gold;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        theme.colors.border.gold + "30";
                    }}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text.primary }}
                >
                  Mobile number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300"
                  style={{
                    backgroundColor: theme.colors.background.tertiary,
                    borderColor: theme.colors.border.gold + "30",
                    color: theme.colors.text.primary,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      theme.colors.border.gold + "30";
                  }}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: theme.gradients.gold,
                  color: theme.colors.primary.black,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.boxShadow = `0 20px 40px ${theme.colors.shadow.gold}`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div
                      className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                      style={{
                        borderColor: theme.colors.primary.black,
                        borderTopColor: "transparent",
                      }}
                    />
                    <span>Sending...</span>
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div
                  className="p-4 border rounded-lg text-center"
                  style={{
                    backgroundColor: theme.colors.status.success + "20",
                    borderColor: theme.colors.status.success + "30",
                    color: "#4ade80",
                  }}
                >
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className="p-4 border rounded-lg text-center"
                  style={{
                    backgroundColor: theme.colors.status.error + "20",
                    borderColor: theme.colors.status.error + "30",
                    color: "#f87171",
                  }}
                >
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
