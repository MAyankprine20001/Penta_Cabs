// src/hooks/useNavbar.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, isScrolled };
};

export const useNavbarState = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile state with proper initialization
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      console.log('📱 Mobile state updated:', mobile);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDropdownToggle = useCallback((label: string) => {
    console.log('🔥 Dropdown toggle called:', label, 'isMobile:', isMobile);
    setActiveDropdown(current => {
      const newState = current === label ? null : label;
      console.log('🔄 Setting activeDropdown from', current, 'to', newState);
      return newState;
    });
    setClickedDropdown(current => current === label ? null : label);
  }, [isMobile]);

  const handleDropdownClose = useCallback(() => {
    console.log('❌ Dropdown close called');
    setActiveDropdown(null);
    setClickedDropdown(null);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    console.log('📱 Mobile menu toggle called, current state:', isMobileMenuOpen);
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Close any open dropdowns when toggling mobile menu
    if (newState) {
      setActiveDropdown(null);
      setClickedDropdown(null);
    }
  }, [isMobileMenuOpen]);

  const handleMobileMenuClose = useCallback(() => {
    console.log('📱 Mobile menu close called');
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setClickedDropdown(null);
  }, []);

  // Handle escape key and window events
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('⌨️ Escape key pressed');
        setActiveDropdown(null);
        setClickedDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        console.log('🖥️ Switched to desktop, closing mobile menu');
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setClickedDropdown(null);
      }
    };

    // FIXED: Click outside handler with proper mobile detection
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // CRITICAL: Skip all click outside logic on mobile
      if (isMobile) {
        console.log('🚫 Ignoring click outside on mobile device');
        return;
      }
      
      // Only proceed if we have an active dropdown on desktop
      if (!activeDropdown) return;
      
      console.log('🖱️ Desktop click outside check, target:', target.tagName);
      
      // Check if click is inside navigation components
      const isInsideNav = target.closest('nav[role="navigation"]');
      const isInsideDropdown = target.closest('[data-dropdown-menu]');
      const isDropdownButton = target.closest('button[aria-haspopup="true"]');
      const isMobileButton = target.closest('.mobile-menu-button');
      
      // Close dropdown if clicking completely outside navigation area
      if (!isInsideNav && !isInsideDropdown && !isDropdownButton && !isMobileButton) {
        console.log('🌍 Click outside navigation detected, closing dropdown');
        setActiveDropdown(null);
        setClickedDropdown(null);
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    
    // Only add click outside listener for desktop with active dropdown
    let timeoutId: NodeJS.Timeout;
    if (activeDropdown && !isMobile) {
      timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        console.log('👂 Added click outside listener for desktop');
      }, 100);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown, isMobile, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      console.log('🔒 Body scroll disabled');
      
      return () => {
        document.body.style.overflow = originalStyle;
        console.log('🔓 Body scroll restored');
      };
    }
  }, [isMobileMenuOpen]);

  return {
    activeDropdown,
    isMobileMenuOpen,
    clickedDropdown,
    isMobile,
    handleDropdownToggle,
    handleDropdownClose,
    handleMobileMenuToggle,
    handleMobileMenuClose
  };
};