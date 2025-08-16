// src/components/UI/ThemedTimePicker.tsx
'use client';

import React from 'react';
import { theme } from '@/styles/theme';
import { BsClock } from 'react-icons/bs';

interface ThemedTimePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  min?: string; // For setting minimum time
  max?: string; // For setting maximum time
}

export const ThemedTimePicker: React.FC<ThemedTimePickerProps> = ({
  value,
  onChange,
  error,
  className = '',
  min,
  max
}) => {
  // Convert 12-hour format (like "11:00 PM") to 24-hour format for input[type="time"]
  const formatTimeForInput = (timeStr: string): string => {
    if (!timeStr) return '';
    
    // Handle 12-hour format with AM/PM
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':');
      let hour24 = parseInt(hours);
      
      if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      
      return `${hour24.toString().padStart(2, '0')}:${minutes}`;
    }
    
    // If already in 24-hour format, return as is
    return timeStr;
  };

  // Convert 24-hour format back to 12-hour format with AM/PM
  const formatTimeForDisplay = (timeStr: string): string => {
    if (!timeStr) return '';
    
    const [hours, minutes] = timeStr.split(':');
    const hour24 = parseInt(hours);
    let hour12 = hour24;
    let period = 'AM';
    
    if (hour24 === 0) {
      hour12 = 12;
      period = 'AM';
    } else if (hour24 === 12) {
      hour12 = 12;
      period = 'PM';
    } else if (hour24 > 12) {
      hour12 = hour24 - 12;
      period = 'PM';
    }
    
    return `${hour12}:${minutes} ${period}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = e.target.value; // 24-hour format
    const displayTime = formatTimeForDisplay(inputTime);
    
    // Create a new event with the formatted time
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: displayTime
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <div className={className}>
      <div className="relative">
        <input
          type="time"
          value={formatTimeForInput(value)}
          onChange={handleTimeChange}
          min={min}
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
        {/* Clock icon overlay */}
        <div 
          className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm sm:text-base"
          style={{ color: theme.colors.text.muted }}
        >
          <BsClock className="w-4 h-4 sm:w-5 sm:h-5" />
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
