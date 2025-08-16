// src/config/stats.ts

export interface StatConfig {
  value: number;
  label: string;
  color: string;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export const statsConfig: StatConfig[] = [
  {
    value: 1500,
    label: 'Trusted Clients',
    color: 'text-orange-500',
    suffix: '+',
    description: 'Happy customers who trust us for their transportation needs'
  },
  {
    value: 7500,
    label: 'Comfort Rides',
    color: 'text-cyan-500', 
    suffix: '+',
    description: 'Successful rides completed with premium service'
  },
  {
    value: 10,
    label: 'Years of Service',
    color: 'text-purple-500',
    prefix: '+',
    description: 'Years of reliable and professional transportation service'
  }
];

export const trustIndicators = [
  {
    icon: '🛡️',
    label: 'Safe & Secure',
    description: 'All vehicles equipped with safety features'
  },
  {
    icon: '⚡',
    label: 'Quick Response',
    description: 'Average response time under 5 minutes'
  },
  {
    icon: '💯',
    label: '100% Reliable',
    description: 'On-time performance guaranteed'
  },
  {
    icon: '🕐',
    label: '24/7 Available',
    description: 'Round the clock service availability'
  }
] as const;