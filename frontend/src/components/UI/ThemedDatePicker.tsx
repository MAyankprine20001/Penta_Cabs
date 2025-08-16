// src/components/UI/ThemedDatePicker.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';
import { BsCalendar } from 'react-icons/bs';

interface ThemedDatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  min?: string; // For setting minimum date
  max?: string; // For setting maximum date
}

export const ThemedDatePicker: React.FC<ThemedDatePickerProps> = ({
  value,
  onChange,
  error,
  className = '',
  min,
  max
}) => {
  // Convert DD-MM-YY format to YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return '';
    
    // Handle DD-MM-YY format (like "03-06-25")
    if (dateStr.includes('-') && dateStr.length <= 8) {
      const [day, month, year] = dateStr.split('-');
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    // If already in YYYY-MM-DD format, return as is
    return dateStr;
  };

  // Convert YYYY-MM-DD back to DD-MM-YY format
  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const [year, month, day] = dateStr.split('-');
    const shortYear = year.slice(-2);
    return `${day}-${month}-${shortYear}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value; // YYYY-MM-DD format
    const displayDate = formatDateForDisplay(inputDate);
    
    // Create a new event with the formatted date
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: displayDate
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  // Get today's date as minimum date
  const today = new Date().toISOString().split('T')[0];
  const minDate = min || today;

  return (
    <div className={className}>
      <div className="relative">
        <input
          type="date"
          value={formatDateForInput(value)}
          onChange={handleDateChange}
          min={minDate}
          max={max}
          className="w-full p-3 sm:p-3.5 rounded-lg transition-all duration-300 outline-none cursor-pointer text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
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
        {/* Calendar icon overlay */}
        <div 
          className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm sm:text-base"
          style={{ color: theme.colors.text.muted }}
        >
          <BsCalendar className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
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
};
