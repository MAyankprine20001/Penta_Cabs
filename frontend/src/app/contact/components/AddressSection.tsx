"use client";
import React from "react";
import { theme } from "@/styles/theme";
import Image from "next/image";
export const AddressSection: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: theme.colors.background.tertiary + "30" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Image
              src="/images/contact-icon/address.png"
              alt="Address"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>
          <h2
            className="text-3xl lg:text-4xl font-display font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
          >
            Address
          </h2>
          <p
            className="text-lg mb-4 leading-relaxed max-w-2xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            A-1102 Kautilya 99, Nr. Taragad Underbridge, Vaishnodevi Circle S P
            Ring Road Tragad, Ahmedabad City, Ahmedabad, Gujarat, 382470
          </p>
          <p
            className="font-medium"
            style={{ color: theme.colors.accent.gold }}
          >
            Visit us at our office or send mail to this address
          </p>
        </div>
      </div>
    </section>
  );
};
