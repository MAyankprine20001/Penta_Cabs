// src/styles/colors.ts
export const colors = {
  // Primary Colors
  primary: {
    black: '#1a1a1a',
    charcoal: '#2a2a2a',
    gold: '#d4af37',
    amber: '#ffa500',
    warmGold: '#ffb347',
    bronze: '#cd7f32',
    copper: '#b87333'
  },
  
  // Supporting Colors
  secondary: {
    darkGray: '#2a2a2a',
    mediumGray: '#4a4a4a',
    lightGray: '#6a6a6a',
    cream: '#f5f5dc',
    offWhite: '#fafafa',
    white: '#ffffff'
  },
  
  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  
  // Gradients
  gradients: {
    goldToAmber: 'linear-gradient(135deg, #d4af37 0%, #ffa500 100%)',
    darkToCharcoal: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    goldShimmer: 'linear-gradient(90deg, #d4af37 0%, #ffb347 50%, #d4af37 100%)'
  }
} as const;

// Tailwind CSS custom colors extension
export const tailwindColors = {
  'penta-black': colors.primary.black,
  'penta-charcoal': colors.primary.charcoal,
  'penta-gold': colors.primary.gold,
  'penta-amber': colors.primary.amber,
  'penta-warm-gold': colors.primary.warmGold,
  'penta-bronze': colors.primary.bronze,
  'penta-copper': colors.primary.copper,
  'penta-dark-gray': colors.secondary.darkGray,
  'penta-medium-gray': colors.secondary.mediumGray,
  'penta-light-gray': colors.secondary.lightGray,
  'penta-cream': colors.secondary.cream,
  'penta-off-white': colors.secondary.offWhite
} as const;