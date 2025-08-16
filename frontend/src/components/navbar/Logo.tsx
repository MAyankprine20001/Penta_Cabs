// src/components/navbar/Logo.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link 
      href="/" 
      className={`flex items-center space-x-3 group ${className}`}
      aria-label="Penta Cab - Go to homepage"
    >
      {/* Logo Container */}
      <div className="relative w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-xl bg-gradient-gold p-0.5 group-hover:scale-110 transition-all duration-300 shadow-gold">
        <div className="w-full h-full bg-penta-black rounded-lg flex items-center justify-center relative overflow-hidden">
          <Image
            src="/c.jpg"
            alt="Penta Cab Logo"
            width={40}
            height={40}
            className="w-7 h-7 lg:w-9 lg:h-9 object-contain transition-transform group-hover:scale-110 duration-300 relative z-10"
            priority
          />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] duration-1000" />
        </div>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-penta-gold font-display font-bold text-xl lg:text-2xl tracking-wide group-hover:text-penta-warm-gold transition-colors duration-300 drop-shadow-lg">
          Penta
        </span>
        <span className="text-penta-cream text-xs lg:text-sm font-medium -mt-1 group-hover:text-penta-gold transition-colors duration-300 tracking-wider">
          CAB
        </span>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-gold blur-xl -z-10" />
    </Link>
  );
};

export default Logo;