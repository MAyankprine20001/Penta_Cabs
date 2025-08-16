// src/config/navigation.ts
import { NavItem } from '@/types';
import { 
  FaHome, 
  FaCar, 
  FaRoute, 
  FaInfoCircle, 
  FaPhone,
  FaArrowRight,
  FaSync,
  FaTaxi,
  FaWhatsapp,
  FaDollarSign,
  FaClock,
  FaUserTie,
  FaMapPin
} from 'react-icons/fa';
import { 
  MdLocalTaxi,
  MdAirportShuttle,
  MdLocationOn,
  MdStar
} from 'react-icons/md';

export const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    description: 'Welcome to Penta CAB - Your trusted travel partner',
    icon: FaHome,
  },
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
    description: 'Explore our range of cab services',
    icon: FaCar,
    dropdownItems: [
      { 
        label: 'Oneway Rentals', 
        href: '/#booking-widget',
        icon: FaArrowRight,
        description: 'Single destination car rentals'
      },
      { 
        label: 'Roundway Rentals', 
        href: '/#booking-widget',
        icon: FaSync,
        description: 'Return to pickup location'
      },
      { 
        label: 'Local Rentals', 
        href: '/#booking-widget',
        icon: MdLocalTaxi,
        description: 'City and local area rentals'
      },
      { 
        label: 'Airport Rentals', 
        href: '/#booking-widget',
        icon: MdAirportShuttle,
        badge: 'Fast',
        description: 'Quick airport pickup & drop'
      },
      
    ]
  },
  {
    label: 'Popular',
    href: '/popular',
    description: 'Discover our most popular routes and cities',
    hasDropdown: true,
    icon: FaRoute,
    dropdownItems: [
      { 
        label: 'Popular Routes', 
        href: '/popular_route_info',
        icon: MdLocationOn,
        description: 'Most booked travel routes'
      },
      
    ]
  },
  { 
    label: 'About Us', 
    description: 'Learn more about our company and values',
    href: '/about',
    icon: FaInfoCircle,
  },
  { 
    label: 'Contact Us', 
    description: 'Get in touch with our support team',
    href: '/contact',
    icon: FaPhone,
  }
];

export const contactInfo = {
  phone: '7600839900',
  phoneFormatted: '+91 760 083 9900',
  email: 'Info.pentacab@gmail.com',
  whatsapp: '7600839900',
  
  // Enhanced contact options
  supportHours: '24/7 Support Available',
  emergencyPhone: '7600839900',
  bookingEmail: 'Info.pentacab@gmail.com',
  supportEmail: 'Info.pentacab@gmail.com',
  
  // Social media (optional)
  social: {
    facebook: 'https://facebook.com/pentacab',
    instagram: 'https://instagram.com/pentacab',
    twitter: 'https://twitter.com/pentacab'
  }
};

// Optional: Quick actions for mobile
export const quickActions = [
  {
    label: 'Book Now',
    href: '/book',
    icon: FaTaxi,
    primary: true
  },
  {
    label: 'Call Us',
    href: 'tel:+917600839900',
    icon: FaPhone,
    external: true
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/917600839900?text=Hi, I need a cab booking`,
    icon: FaWhatsapp,
    external: true
  },
  {
    label: 'Get Quote',
    href: '/quote',
    icon: FaDollarSign
  }
];