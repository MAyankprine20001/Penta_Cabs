// src/config/footer.ts

export const footerConfig = {
  company: {
    name: 'Penta Cab',
    description: 'Premium taxi service providing reliable, safe, and comfortable transportation 24/7. Professional drivers, luxury vehicles, and exceptional customer service.',
    email: 'Info.pentacab@gmail.com',
    phone: '7600839900',
    address: {
      street: '123 Business District',
      city: 'Your City',
      state: 'Your State',
      zipCode: '12345',
      country: 'India'
    }
  },
  
  socialMedia: {
    facebook: 'https://facebook.com/pentacab',
    instagram: 'https://instagram.com/pentacab',
    twitter: 'https://twitter.com/pentacab',
    linkedin: 'https://linkedin.com/company/pentacab',
    youtube: 'https://youtube.com/pentacab'
  },
  
  legalPages: [
    {
      name: 'Privacy Policy',
      href: '/privacy-policy',
      description: 'How we protect and use your personal information'
    },
    {
      name: 'Terms and Conditions',
      href: '/terms-conditions',
      description: 'Terms of service and user agreement'
    },
    {
      name: 'Refund Policy',
      href: '/refund-policy',
      description: 'Our refund and cancellation policies'
    },
    {
      name: 'Cookie Policy',
      href: '/cookie-policy',
      description: 'How we use cookies on our website'
    }
  ],
  
  quickLinks: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ],
  
  services: [
    { name: 'Airport Transfer', href: '/services/airport' },
    { name: 'City Rides', href: '/services/city' },
    { name: 'Outstation', href: '/services/outstation' },
    { name: 'Corporate', href: '/services/corporate' },
    { name: 'Wedding', href: '/services/wedding' },
    { name: 'Emergency', href: '/services/emergency' }
  ],
  
  businessHours: {
    monday: '24/7 Available',
    tuesday: '24/7 Available',
    wednesday: '24/7 Available',
    thursday: '24/7 Available',
    friday: '24/7 Available',
    saturday: '24/7 Available',
    sunday: '24/7 Available'
  },
  
  certifications: [
    'Licensed Taxi Service',
    'Insured Vehicles',
    'Background Checked Drivers',
    'ISO 9001:2015 Certified'
  ]
} as const;