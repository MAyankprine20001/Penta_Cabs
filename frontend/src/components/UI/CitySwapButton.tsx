
// src/components/UI/CitySwapButton.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';
import { BsArrowDownUp } from 'react-icons/bs';

interface CitySwapButtonProps {
  onSwap: () => void;
  className?: string;
}

export const CitySwapButton: React.FC<CitySwapButtonProps> = ({
  onSwap,
  className = ''
}) => (
  <div className={`flex justify-center ${className}`}>
    <button
      type="button"
      onClick={onSwap}
      className="p-2 sm:p-2.5 rounded-full transition-all duration-300 hover:scale-110 min-h-[44px] sm:min-h-[48px] min-w-[44px] sm:min-w-[48px]"
      style={{
        backgroundColor: theme.colors.background.card,
        border: `2px solid ${theme.colors.border.goldLight}`,
        color: theme.colors.accent.gold,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.accent.gold;
        e.currentTarget.style.color = theme.colors.primary.black;
        e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)';
        e.currentTarget.style.boxShadow = `0 4px 16px ${theme.colors.shadow.gold}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.background.card;
        e.currentTarget.style.color = theme.colors.accent.gold;
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
      title="Swap cities"
    >
      <BsArrowDownUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  </div>
);