// src/components/navbar/MobileMenuButton.tsx
'use client';
import React from 'react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick = () => {},
  className = ''
}) => {
  return (
    <button
      className={`lg:hidden relative flex items-center justify-center w-10 h-10 text-yellow-200 hover:text-yellow-100 transition-all duration-300 group ${className}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
      aria-expanded={isOpen}
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-yellow-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
     
      {/* Hamburger Icon */}
      <div className="relative z-10 w-6 h-6 flex flex-col justify-center items-center">
        <div className="w-full relative">
          {/* Top line */}
          <div
            className={`h-0.5 bg-current transition-all duration-300 ${
              isOpen
                ? 'rotate-45 translate-y-1.5'
                : 'translate-y-0'
            }`}
          />
         
          {/* Middle line */}
          <div
            className={`h-0.5 bg-current transition-all duration-300 mt-1 ${
              isOpen
                ? 'opacity-0'
                : 'opacity-100'
            }`}
          />
         
          {/* Bottom line */}
          <div
            className={`h-0.5 bg-current transition-all duration-300 mt-1 ${
              isOpen
                ? '-rotate-45 -translate-y-1.5'
                : 'translate-y-0'
            }`}
          />
        </div>
      </div>
     
      {/* Pulse effect when opening */}
      {isOpen && (
        <div className="absolute inset-0 bg-yellow-500/20 rounded-lg animate-ping" />
      )}
    </button>
  );
};

export default MobileMenuButton;