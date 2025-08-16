
// src/components/UI/ThemedInput.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';

interface ThemedInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  className = ''
}) => (
  <div className={className}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 sm:p-3.5 rounded-lg transition-all duration-300 outline-none text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
      style={{
        backgroundColor: theme.colors.background.card,
        color: theme.colors.text.primary,
        border: `2px solid ${error ? theme.colors.status.error : theme.colors.border.muted}`,
        fontFamily: theme.typography.fontFamily.sans.join(', '),
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = theme.colors.accent.gold;
        e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.border.goldLight}`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = error ? theme.colors.status.error : theme.colors.border.muted;
        e.currentTarget.style.boxShadow = 'none';
      }}
    />
    {error && (
      <p 
        className="text-xs sm:text-sm mt-1 px-1"
        style={{ color: theme.colors.status.error }}
      >
        {error}
      </p>
    )}
  </div>
);
