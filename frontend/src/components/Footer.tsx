// src/components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { theme, themeVariants } from "@/styles/theme";
import { contactInfo } from "@/config/navigation";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/pentacab",
      icon: (
        <Image
          src="/images/social-media/facebook.png"
          alt="Facebook"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      ),
      hoverColor: "#1877f2",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/pentacab",
      icon: (
        <Image
          src="/images/social-media/insta.png"
          alt="Instagram"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      ),
      hoverColor: "#e4405f",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/pentacab",
      icon: (
        <Image
          src="/images/social-media/twitter.png"
          alt="Twitter"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      ),
      hoverColor: "#1da1f2",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/pentacab",
      icon: (
        <Image
          src="/images/social-media/linkedln.png"
          alt="LinkedIn"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      ),
      hoverColor: "#0077b5",
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms and Conditions", href: "/terms-conditions" },
    { name: "Refund Policy", href: "/refund-policy" },
  ];

  return (
    <footer
      className="border-t relative overflow-hidden"
      style={{
        backgroundColor: theme.colors.primary.black,
        borderColor: `${theme.colors.accent.gold}30`,
      }}
    >
      {/* Background decoration using theme */}
      <div className="absolute inset-0" style={{ opacity: 0.03 }}>
        <div
          className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl -translate-x-32 -translate-y-32"
          style={{
            backgroundColor: theme.colors.accent.gold,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-32 translate-y-32"
          style={{
            backgroundColor: theme.colors.secondary.amber,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className="relative w-12 h-12 overflow-hidden rounded-xl p-0.5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: theme.gradients.gold,
                  boxShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
                }}
              >
                <div
                  className="w-full h-full rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: theme.colors.primary.black,
                  }}
                >
                  <Image
                    src="/c.jpg"
                    alt="Penta Cab Logo"
                    width={40}
                    height={40}
                    className="w-9 h-9 object-contain transition-transform group-hover:scale-110 duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-2xl tracking-wide group-hover:text-opacity-90 transition-colors duration-300"
                  style={{
                    color: theme.colors.accent.gold,
                    fontFamily: theme.typography.fontFamily.display.join(", "),
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  Penta
                </span>
                <span
                  className="text-sm font-medium -mt-1 group-hover:opacity-80 transition-colors duration-300 tracking-wider"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  CAB
                </span>
              </div>
            </Link>

            {/* Contact Information */}
            <div className="flex flex-col items-center lg:items-start space-y-3 text-sm">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center space-x-3 group transition-colors duration-300"
                style={{
                  color: theme.colors.text.secondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.accent.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${theme.colors.accent.gold}20`,
                    borderWidth: "1px",
                    borderColor: `${theme.colors.accent.gold}30`,
                  }}
                >
                  <Image
                    src="/images/contact-icon/name.png"
                    alt="Phone"
                    width={16}
                    height={16}
                    className="w-4 h-4 group-hover:animate-pulse object-contain"
                  />
                </div>
                <span
                  className="font-medium"
                  style={{
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  {contactInfo.phone}
                </span>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center space-x-3 group transition-colors duration-300"
                style={{
                  color: theme.colors.text.secondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.accent.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text.secondary;
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${theme.colors.accent.gold}20`,
                    borderWidth: "1px",
                    borderColor: `${theme.colors.accent.gold}30`,
                  }}
                >
                  <Image
                    src="/images/contact-icon/gmail.png"
                    alt="Email"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span
                  style={{
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                >
                  info@pentacab.com
                </span>
              </a>

              {/* Address */}
              <div className="flex items-center space-x-3 group">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${theme.colors.accent.gold}20`,
                    borderWidth: "1px",
                    borderColor: `${theme.colors.accent.gold}30`,
                  }}
                >
                  <Image
                    src="/images/contact-icon/address.png"
                    alt="Address"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span
                  className="text-sm"
                  style={{
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                >
                  Ahmedabad, Gujarat, India
                </span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderWidth: "2px",
                    borderColor: `${theme.colors.accent.gold}30`,
                    color: theme.colors.text.secondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.hoverColor;
                    e.currentTarget.style.borderColor = social.hoverColor;
                    e.currentTarget.style.color = theme.colors.primary.white;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${social.hoverColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.background.card;
                    e.currentTarget.style.borderColor = `${theme.colors.accent.gold}30`;
                    e.currentTarget.style.color = theme.colors.text.secondary;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Legal */}
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <div className="text-center lg:text-right">
              <h4
                className="font-semibold mb-3"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.sans.join(", "),
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                Quick Links
              </h4>
              <div className="flex flex-col space-y-2 text-sm">
                <Link
                  href="/about"
                  className="transition-colors duration-300"
                  style={{
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.colors.accent.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.colors.text.secondary;
                  }}
                >
                  About Us
                </Link>
                {/* <Link
                  href="/services"
                  className="transition-colors duration-300"
                  style={{
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.colors.accent.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.colors.text.secondary;
                  }}
                >
                  Our Services
                </Link> */}
                <Link
                  href="/contact"
                  className="transition-colors duration-300"
                  style={{
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.sans.join(", "),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.colors.accent.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.colors.text.secondary;
                  }}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            {/* <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 whitespace-nowrap"
                    style={{
                      color: theme.colors.text.muted,
                      fontFamily: theme.typography.fontFamily.sans.join(", "),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.colors.accent.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.colors.text.muted;
                    }}
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span
                      className="hidden sm:block"
                      style={{ color: `${theme.colors.accent.gold}50` }}
                    >
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 border-t"
          style={{
            borderColor: `${theme.colors.accent.gold}30`,
          }}
        />

        {/* Copyright and Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center lg:text-left">
          <div>
            <p
              className="text-sm"
              style={{
                color: theme.colors.text.muted,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Copyright ©2015 Penta Cab. All rights reserved.
            </p>
          </div>

          <div className="lg:text-right">
            <p
              className="text-xs"
              style={{
                color: theme.colors.text.muted,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Premium taxi service • Reliable transportation • 24/7 availability
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme.colors.status.success,
                }}
              >
                <span 
                  style={{ 
                    color: theme.colors.primary.white,
                    fontSize: '8px' 
                  }}
                >
                  ✓
                </span>
              </div>
              <span 
                style={{
                  color: theme.colors.text.muted,
                  fontFamily: theme.typography.fontFamily.sans.join(', '),
                }}
              >
                SSL Secured
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme.colors.accent.gold,
                }}
              >
                <span 
                  style={{ 
                    color: theme.colors.primary.black,
                    fontSize: '8px' 
                  }}
                >
                  ★
                </span>
              </div>
              <span 
                style={{
                  color: theme.colors.text.muted,
                  fontFamily: theme.typography.fontFamily.sans.join(', '),
                }}
              >
                5-Star Service
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme.colors.status.info,
                }}
              >
                <span 
                  style={{ 
                    color: theme.colors.primary.white,
                    fontSize: '8px' 
                  }}
                >
                  🛡
                </span>
              </div>
              <span 
                style={{
                  color: theme.colors.text.muted,
                  fontFamily: theme.typography.fontFamily.sans.join(', '),
                }}
              >
                Licensed & Insured
              </span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: theme.gradients.gold,
        }}
      />
    </footer>
  );
};

export default Footer;
