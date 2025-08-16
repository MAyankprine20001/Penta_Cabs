// src/components/UI/ThemedButton.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';

interface ThemedButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  children,
  className = '',
  variant = 'primary'
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`py-3 px-6 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    style={{
      background: theme.gradients.gold,
      color: theme.colors.primary.black,
      fontFamily: theme.typography.fontFamily.sans.join(', '),
      fontWeight: theme.typography.fontWeight.bold,
      boxShadow: `0 4px 20px ${theme.colors.shadow.gold}`,
    }}
    onMouseEnter={(e) => {
      if (!disabled && !loading) {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 32px ${theme.colors.shadow.gold}`;
      }
    }}
    onMouseLeave={(e) => {
      if (!disabled && !loading) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.shadow.gold}`;
      }
    }}
  >
    {loading ? (
      <span className="flex items-center justify-center space-x-2">
        <div 
          className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
          style={{ 
            borderColor: theme.colors.primary.black,
            borderTopColor: 'transparent'
          }}
        />
        <span>Loading...</span>
      </span>
    ) : (
      children
    )}
  </button>
);
