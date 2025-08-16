
// src/components/UI/TabGroup.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';

interface TabGroupProps {
  options: string[];
  activeOption: string;
  onOptionChange: (option: any) => void;
}

export const TabGroup: React.FC<TabGroupProps> = ({ 
  options, 
  activeOption, 
  onOptionChange 
}) => (
  <div 
    className="flex rounded-lg p-1 sm:p-1.5 mb-4"
    style={{
      backgroundColor: theme.colors.background.secondary,
    }}
  >
    {options.map((option) => (
      <button
        key={option}
        onClick={() => onOptionChange(option)}
        className="flex-1 py-3 sm:py-2.5 px-3 sm:px-4 rounded-md font-semibold transition-all duration-300 text-sm sm:text-base min-h-[44px] sm:min-h-[40px]"
        style={{
          backgroundColor: activeOption === option ? theme.colors.accent.gold : 'transparent',
          color: activeOption === option ? theme.colors.primary.black : theme.colors.text.secondary,
          fontFamily: theme.typography.fontFamily.sans.join(', '),
          fontWeight: theme.typography.fontWeight.semibold,
        }}
        onMouseEnter={(e) => {
          if (activeOption !== option) {
            e.currentTarget.style.color = theme.colors.text.primary;
          }
        }}
        onMouseLeave={(e) => {
          if (activeOption !== option) {
            e.currentTarget.style.color = theme.colors.text.secondary;
          }
        }}
      >
        {option}
      </button>
    ))}
  </div>
);



