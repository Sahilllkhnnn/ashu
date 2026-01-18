import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string; // UUID string
  title: string;
  description: string;
  iconName: string; 
  imageUrl?: string;
  category?: string;
  active?: boolean;
}

export interface Testimonial {
  id: string; // UUID string
  name: string;
  rating: number;
  text: string;
  date: string;
  phone?: string;
  approved?: boolean;
}

export interface GalleryItem {
  id: string; // UUID string
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
