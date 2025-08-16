/* eslint-disable react/no-unescaped-entities */
// src/app/contact/page.tsx
'use client';
import React from 'react';
import { theme } from '@/styles/theme';
import { HeroSection } from './components/HeroSection';
import { AddressSection } from './components/AddressSection';
import { ContactMethods } from './components/ContactMethods';
import { ContactForm } from './components/ContactForm';

const ContactPage: React.FC = () => {
  

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.primary.black }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Methods Section */}
      <ContactMethods />

      {/* Address Section */}
      <AddressSection />

      {/* Contact Form Section */}
      <ContactForm/>
    </div>
  );
};

export default ContactPage; 