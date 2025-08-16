
// src/components/UI/ThemedTextarea.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';

interface ThemedTextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  className?: string;
}

export const ThemedTextarea: React.FC<ThemedTextareaProps> = ({
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  className = ''
}) => (
  <div className={className}>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-3 rounded-lg transition-all duration-300 outline-none resize-none"
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
        className="text-sm mt-1"
        style={{ color: theme.colors.status.error }}
      >
        {error}
      </p>
    )}
  </div>
);






