// src/styles/theme.ts
export const theme = {
  colors: {
    // Primary Colors
    primary: {
      black: '#000000',
      darkGray: '#1a1a1a',
      charcoal: '#2a2a2a',
      white: '#ffffff',
    },
    
    // Gold/Bronze Accent Colors
    accent: {
      gold: '#d4af37',
      bronze: '#cd7f32',
      warmGold: '#f4e4bc',
      darkGold: '#b8941f',
      lightGold: '#f5e6a3',
    },
    
    // Secondary Colors
    secondary: {
      warmYellow: '#ffb84d',
      amber: '#ffbf00',
      orange: '#ff8c00',
      lightAmber: '#ffd700',
      darkAmber: '#ff8000',
    },
    
    // Text Colors
    text: {
      primary: '#ffffff',
      secondary: '#e5e5e5',
      muted: '#b3b3b3',
      dark: '#333333',
      gold: '#d4af37',
    },
    
    // Background Colors
    background: {
      primary: '#000000',
      secondary: '#1a1a1a',
      tertiary: '#2a2a2a',
      card: '#1f1f1f',
      overlay: 'rgba(0, 0, 0, 0.8)',
      gradient: {
        primary: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        gold: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
        accent: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        hero: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)',
        goldOverlay: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 148, 31, 0.1) 100%)',
      }
    },
    
    // Border Colors
    border: {
      primary: '#333333',
      secondary: '#555555',
      gold: '#d4af37',
      muted: '#2a2a2a',
      light: 'rgba(255, 255, 255, 0.1)',
      goldLight: 'rgba(212, 175, 55, 0.3)',
    },
    
    // Status Colors (keeping theme consistent)
    status: {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    },
    
    // Shadow Colors
    shadow: {
      primary: 'rgba(0, 0, 0, 0.5)',
      gold: 'rgba(212, 175, 55, 0.3)',
      card: 'rgba(0, 0, 0, 0.2)',
      elevated: 'rgba(0, 0, 0, 0.8)',
    }
  },
  
  // Gradient Presets
  gradients: {
    primary: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    gold: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
    goldToAmber: 'linear-gradient(135deg, #d4af37 0%, #ffbf00 100%)',
    darkToGold: 'linear-gradient(135deg, #1a1a1a 0%, #d4af37 100%)',
    blackToCharcoal: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
    goldOverlay: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 148, 31, 0.1) 100%)',
    heroGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)',
  },
  
  // Animation Easings
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Spacing Scale
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Fira Code', 'monospace'],
      display: ['Playfair Display', 'serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  }
} as const;

// Export individual color palettes for easy access
export const colors = theme.colors;
export const gradients = theme.gradients;
export const spacing = theme.spacing;
export const typography = theme.typography;

// CSS Custom Properties for use in CSS files
export const cssVariables = `
  :root {
    --color-primary-black: ${theme.colors.primary.black};
    --color-primary-dark-gray: ${theme.colors.primary.darkGray};
    --color-primary-charcoal: ${theme.colors.primary.charcoal};
    --color-primary-white: ${theme.colors.primary.white};
    
    --color-accent-gold: ${theme.colors.accent.gold};
    --color-accent-bronze: ${theme.colors.accent.bronze};
    --color-accent-warm-gold: ${theme.colors.accent.warmGold};
    --color-accent-dark-gold: ${theme.colors.accent.darkGold};
    
    --color-secondary-warm-yellow: ${theme.colors.secondary.warmYellow};
    --color-secondary-amber: ${theme.colors.secondary.amber};
    --color-secondary-orange: ${theme.colors.secondary.orange};
    
    --gradient-primary: ${theme.gradients.primary};
    --gradient-gold: ${theme.gradients.gold};
    --gradient-hero: ${theme.gradients.heroGradient};
    
    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};
  }
`;

// Utility functions for theme usage
export const getGradient = (gradientName: keyof typeof theme.gradients) => {
  return theme.gradients[gradientName];
};

export const getColor = (colorPath: string) => {
  const path = colorPath.split('.');
  let color: any = theme.colors;
  
  for (const key of path) {
    color = color[key];
  }
  
  return color;
};

// Theme variants for different contexts
export const themeVariants = {
  luxury: {
    primary: theme.colors.primary.black,
    accent: theme.colors.accent.gold,
    text: theme.colors.text.primary,
    background: theme.gradients.heroGradient,
  },
  
  elegant: {
    primary: theme.colors.primary.darkGray,
    accent: theme.colors.accent.bronze,
    text: theme.colors.text.secondary,
    background: theme.gradients.primary,
  },
  
  premium: {
    primary: theme.colors.primary.charcoal,
    accent: theme.colors.secondary.amber,
    text: theme.colors.text.primary,
    background: theme.gradients.goldOverlay,
  }
};

export default theme;