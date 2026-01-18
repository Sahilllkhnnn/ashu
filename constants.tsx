import { Tent, Flower2, Lightbulb, Music, Utensils, CalendarDays, Star, Crown, Heart, Camera, Gift, Truck } from 'lucide-react';
import { Service, GalleryItem, Testimonial, BusinessInfo, SiteContent } from './types';

// Map for dynamic icon rendering
export const ICON_MAP: Record<string, any> = {
  Tent,
  Flower2,
  Lightbulb,
  Music,
  Utensils,
  CalendarDays,
  Star,
  Crown,
  Heart,
  Camera,
  Gift,
  Truck
};

export const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  name: "Azad Tent House",
  address: "Ward No 4, Near Lal Masjid, Chopra Molalla, Chandia, Umariya-484660, MP",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "contact@azadtenthouse.com",
  instagram: "https://www.instagram.com/azadtenthousechandia",
  mapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.0!2d80.0!3d23.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM5JzAwLjAiTiA4MMKwNDEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  rating: 4.6
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    tagline: "The Art of Celebration",
    title_line1: "Royal Weddings",
    title_line2: "& Unforgettable Events",
    description: "Azad Tent House brings cinematic elegance to Chandia. From grand German hangars to intimate floral mandaps, we craft experiences that linger in memory."
  },
  about: {
    title_start: "We Don't Just Plan Events, We Design",
    title_highlight: "Experiences",
    description: "Azad Tent House stands as a beacon of luxury and reliability in Chandia. We specialize in transforming ordinary spaces into breathtaking venues.",
    years_experience: "25+",
    clients_count: "1k+"
  }
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'tents',
    title: 'Wedding Tent & Mandap',
    description: 'Luxurious waterproof German hangars, traditional mandaps, and elegant piping setups.',
    iconName: 'Tent'
  },
  {
    id: 'decor',
    title: 'Wedding Decoration',
    description: 'Premium stage decor, entrance gates, and themed setups for your big day.',
    iconName: 'Crown'
  },
  {
    id: 'floral',
    title: 'Floral Decoration',
    description: 'Fresh and artificial flower arrangements for cars, stages, and venues.',
    iconName: 'Flower2'
  },
  {
    id: 'lighting',
    title: 'Lighting & Draping',
    description: 'Spectacular LED walls, chandeliers, fairy lights, and colorful fabric draping.',
    iconName: 'Lightbulb'
  },
  {
    id: 'party',
    title: 'Birthday & Parties',
    description: 'Balloon decor, cartoon themes, and fun setups for birthdays and anniversaries.',
    iconName: 'Music'
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description: 'Professional setups for conferences, meetings, and political gatherings.',
    iconName: 'CalendarDays'
  },
  {
    id: 'management',
    title: 'Event Management',
    description: 'End-to-end planning and execution so you can enjoy your function stress-free.',
    iconName: 'Star'
  },
  {
    id: 'catering',
    title: 'Catering Services',
    description: 'Delicious vegetarian menus, sweet packs, fruit stalls, and professional waiters.',
    iconName: 'Utensils'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', category: 'Wedding', imageUrl: 'https://picsum.photos/seed/wed1/600/400', title: 'Royal Stage' },
  { id: '2', category: 'Tent', imageUrl: 'https://picsum.photos/seed/tent1/600/400', title: 'Entrance Walkway' },
  { id: '3', category: 'Lighting', imageUrl: 'https://picsum.photos/seed/light1/600/400', title: 'Night Ambience' },
  { id: '4', category: 'Wedding', imageUrl: 'https://picsum.photos/seed/wed2/600/400', title: 'Mandap Setup' },
  { id: '5', category: 'Party', imageUrl: 'https://picsum.photos/seed/party1/600/400', title: 'Birthday Theme' },
  { id: '6', category: 'Tent', imageUrl: 'https://picsum.photos/seed/tent2/600/400', title: 'Dining Area Tent' },
  { id: '7', category: 'Lighting', imageUrl: 'https://picsum.photos/seed/light2/600/400', title: 'LED Passage' },
  { id: '8', category: 'Wedding', imageUrl: 'https://picsum.photos/seed/wed3/600/400', title: 'Floral Wall' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Rahul Sharma",
    rating: 5,
    text: "Excellent decoration and timely service. The team made my sister's wedding look like a royal event. Very professional!",
    date: "Dec 2023"
  },
  {
    id: '2',
    name: "Amit Patel",
    rating: 4,
    text: "Great tent arrangements for our community program. The pricing is also very reasonable compared to others in Umariya.",
    date: "Jan 2024"
  },
  {
    id: '3',
    name: "Priya Singh",
    rating: 5,
    text: "Loved the floral decor for my engagement. They listened to all my requirements and delivered perfectly.",
    date: "Feb 2024"
  }
];