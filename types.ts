import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Changed from icon object to string name for DB storage
  active?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  approved?: boolean;
}

export interface GalleryItem {
  id: number;
  category: 'Wedding' | 'Tent' | 'Lighting' | 'Party';
  imageUrl: string;
  title: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  mapsLink: string;
  rating: number;
}

export interface SiteContent {
  hero: {
    tagline: string;
    title_line1: string;
    title_line2: string;
    description: string;
  };
  about: {
    title_start: string;
    title_highlight: string;
    description: string;
    years_experience: string;
    clients_count: string;
  };
}
