export type EnquiryTopic =
  | 'Leisure stay'
  | 'Business stay'
  | 'Dining'
  | 'Nearby guide'
  | 'General enquiry';

export interface EnquiryDraft {
  fullName?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  room?: string;
  topic?: EnquiryTopic;
  message?: string;
}

export interface Room {
  id: string;
  name: string;
  tagline: string;
  image: string;
  alt: string;
  size: string;
  sleeps: number;
  bed: string;
  view: string;
  features: string[];
  sampleRate: number;
  compare: {
    desk: boolean;
    shower: boolean;
    espresso: boolean;
    sofa: boolean;
    view: boolean;
  };
}

export interface Amenity {
  id: string;
  label: string;
  category: 'In room' | 'Social' | 'Work' | 'Wellness';
  description: string;
  icon: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  span: 'wide' | 'tall' | 'standard';
}

export interface DiningPeriod {
  id: string;
  label: string;
  hours: string;
  note: string;
  items: { name: string; description: string; price: string }[];
}

export interface Attraction {
  id: string;
  name: string;
  kind: string;
  distance: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'business', label: 'Business' },
  { id: 'dining', label: 'Dining' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' },
] as const;

export const rooms: Room[] = [
  {
    id: 'studio',
    name: 'Meridian Studio',
    tagline: 'A compact, considered base for one or two.',
    image: 'images/room-1.jpg',
    alt: 'Sample photograph of a compact hotel guest room',
    size: '22 m²',
    sleeps: 2,
    bed: '1 queen bed',
    view: 'Courtyard',
    features: ['Work desk', 'Rain shower', 'Espresso bar'],
    sampleRate: 185,
    compare: { desk: true, shower: true, espresso: true, sofa: false, view: false },
  },
  {
    id: 'double',
    name: 'Canal Double',
    tagline: 'More room to spread out after a day in the city.',
    image: 'images/room-2.jpg',
    alt: 'Sample photograph of a double hotel guest room',
    size: '28 m²',
    sleeps: 2,
    bed: '1 king bed',
    view: 'Street view',
    features: ['Work desk', 'Rain shower', 'Espresso bar'],
    sampleRate: 225,
    compare: { desk: true, shower: true, espresso: true, sofa: false, view: true },
  },
  {
    id: 'atelier',
    name: 'Corner Atelier',
    tagline: 'Our most flexible room, with a proper sitting corner.',
    image: 'images/room-3.jpg',
    alt: 'Sample photograph of a corner hotel guest room',
    size: '34 m²',
    sleeps: 3,
    bed: '1 king + sofa bed',
    view: 'Corner aspect',
    features: ['Work desk', 'Rain shower', 'Sofa bed', 'Espresso bar'],
    sampleRate: 275,
    compare: { desk: true, shower: true, espresso: true, sofa: true, view: true },
  },
];

export const amenities: Amenity[] = [
  { id: 'wifi', label: 'Fast Wi-Fi', category: 'In room', description: 'Sample: fibre connection in every room and shared space.', icon: 'wifi' },
  { id: 'shower', label: 'Rainfall shower', category: 'In room', description: 'Sample: walk-in shower with a fixed rainfall head.', icon: 'shower' },
  { id: 'espresso', label: 'Espresso bar', category: 'In room', description: 'Sample: coffee, tea and a small refrigerator in each room.', icon: 'coffee' },
  { id: 'tv', label: 'Smart TV', category: 'In room', description: 'Sample: cast your own accounts to the room screen.', icon: 'tv' },
  { id: 'desk', label: 'Proper work desk', category: 'In room', description: 'Sample: full-depth desk with an accessible power point.', icon: 'lamp' },
  { id: 'quiet', label: 'Quiet-hour policy', category: 'In room', description: 'Sample policy: corridors quiet from 22:00 to 07:00.', icon: 'moon' },
  { id: 'terrace', label: 'Rooftop terrace', category: 'Social', description: 'Sample: an outdoor terrace for residents and guests.', icon: 'sun' },
  { id: 'lounge', label: 'Lounge bar', category: 'Social', description: 'Sample: a small bar serving coffee by day and drinks by night.', icon: 'glass' },
  { id: 'gym', label: 'Gym access', category: 'Social', description: 'Sample: a compact fitness room with cardio and free weights.', icon: 'dumbbell' },
  { id: 'bikes', label: 'Bike hire', category: 'Social', description: 'Sample: city bicycles available on a first-come basis.', icon: 'bike' },
  { id: 'deskspace', label: 'Meeting nook', category: 'Work', description: 'Sample: a bookable six-seat room off the lobby.', icon: 'presentation' },
  { id: 'print', label: 'Print & scan', category: 'Work', description: 'Sample: front-desk printing and scanning during staffed hours.', icon: 'printer' },
  { id: 'monitor', label: 'Monitor loans', category: 'Work', description: 'Sample: a limited number of external monitors to borrow.', icon: 'monitor' },
  { id: 'yoga', label: 'Yoga mats', category: 'Wellness', description: 'Sample: mats and a stretching guide available at reception.', icon: 'sparkles' },
  { id: 'water', label: 'Filtered water', category: 'Wellness', description: 'Sample: refill stations on the ground and upper floors.', icon: 'droplets' },
  { id: 'air', label: 'Air purifiers', category: 'Wellness', description: 'Sample: purifiers in shared indoor spaces.', icon: 'air' },
];

export const amenityCategories = ['All', 'In room', 'Social', 'Work', 'Wellness'] as const;
export type AmenityCategory = (typeof amenityCategories)[number];

export const galleryItems: GalleryItem[] = [
  { src: 'images/hero.jpg', alt: 'Sample architectural photograph used as the site hero', caption: 'The building — sample property photography', span: 'wide' },
  { src: 'images/room-1.jpg', alt: 'Sample photograph of the Meridian Studio room', caption: 'Meridian Studio — sample room image', span: 'standard' },
  { src: 'images/lounge.jpg', alt: 'Sample photograph of a hotel lounge', caption: 'The lounge — sample property photography', span: 'tall' },
  { src: 'images/dining.jpg', alt: 'Sample photograph of a hotel dining room', caption: 'Dining room — sample property photography', span: 'standard' },
  { src: 'images/room-2.jpg', alt: 'Sample photograph of the Canal Double room', caption: 'Canal Double — sample room image', span: 'standard' },
  { src: 'images/detail.jpg', alt: 'Sample photograph of an interior architectural detail', caption: 'Material detail — sample property photography', span: 'standard' },
  { src: 'images/workspace.jpg', alt: 'Sample photograph of a hotel workspace', caption: 'Workspace — sample property photography', span: 'wide' },
  { src: 'images/room-3.jpg', alt: 'Sample photograph of the Corner Atelier room', caption: 'Corner Atelier — sample room image', span: 'standard' },
  { src: 'images/interior.jpg', alt: 'Sample photograph of a hotel interior', caption: 'Interior — sample property photography', span: 'standard' },
  { src: 'images/business.jpg', alt: 'Sample photograph of a meeting or business setting', caption: 'Business space — sample property photography', span: 'standard' },
];

export const diningPeriods: DiningPeriod[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    hours: 'Demo schedule · 07:00–10:30',
    note: 'Sample menu — a small, focused breakfast service.',
    items: [
      { name: 'Open toast', description: 'Sourdough, cultured butter, seasonal jam', price: '$9 sample' },
      { name: 'Eggs your way', description: 'Two eggs, herbs, sourdough', price: '$12 sample' },
      { name: 'Granite bowl', description: 'Yoghurt, oats, fruit, toasted seeds', price: '$10 sample' },
    ],
  },
  {
    id: 'allday',
    label: 'All day',
    hours: 'Demo schedule · 11:00–17:00',
    note: 'Sample menu — coffee, light plates and something sweet.',
    items: [
      { name: 'Counter coffee', description: 'Espresso, filter or tea', price: '$4 sample' },
      { name: 'Market sandwich', description: 'Changed daily; ask the counter', price: '$14 sample' },
      { name: 'Citrus cake', description: 'House-style sponge, seasonal fruit', price: '$8 sample' },
    ],
  },
  {
    id: 'evening',
    label: 'Evening',
    hours: 'Demo schedule · 17:30–22:00',
    note: 'Sample menu — a short list designed to share.',
    items: [
      { name: 'Marinated olives', description: 'Citrus, thyme, olive oil', price: '$8 sample' },
      { name: 'Roast vegetable plate', description: 'Warm grains, herbs, lemon', price: '$18 sample' },
      { name: 'Cheese & crackers', description: 'Three cheeses, condensed milk chutney', price: '$20 sample' },
    ],
  },
];

export const attractions: Attraction[] = [
  {
    id: 'walk',
    name: 'Riverside walking route',
    kind: 'Outdoors',
    distance: '8 min walk · illustrative only',
    description: 'A generic sample entry: an easy flat route with plenty of places to stop.',
    image: 'images/detail.jpg',
    alt: 'Sample architectural detail photograph used for a neighbourhood guide',
    icon: 'footprints',
  },
  {
    id: 'gallery',
    name: 'Contemporary art annex',
    kind: 'Culture',
    distance: '12 min walk · illustrative only',
    description: 'A generic sample entry: rotating exhibitions and a small design shop.',
    image: 'images/interior.jpg',
    alt: 'Sample interior photograph used for a neighbourhood guide',
    icon: 'landmark',
  },
  {
    id: 'market',
    name: 'Old quarter market',
    kind: 'Food & shops',
    distance: '6 min walk · illustrative only',
    description: 'A generic sample entry: morning produce stalls and independent counters.',
    image: 'images/lounge.jpg',
    alt: 'Sample lounge photograph used for a neighbourhood guide',
    icon: 'store',
  },
  {
    id: 'books',
    name: 'Canal-side bookshop',
    kind: 'Independent',
    distance: '10 min walk · illustrative only',
    description: 'A generic sample entry: a quiet independent shop with a strong local list.',
    image: 'images/business.jpg',
    alt: 'Sample business-space photograph used for a neighbourhood guide',
    icon: 'book',
  },
];

export const sampleAddress = 'Sample address: 14 Meridian Lane, Old Quarter, [City]';
export const sampleEmail = 'hello@meridian-inn.example';
export const whatsappHref = 'https://wa.me/000000000000';
