export type CategoryType =
  | 'Sport'
  | 'Naked'
  | 'Roadster'
  | 'Cruiser'
  | 'Adventure'
  | 'Touring'
  | 'Supersport'
  | 'Scrambler'
  | 'Cafe Racer'
  | 'Street';

export interface BikeColour {
  id?: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  image: string;
  gallery?: string[];
  video?: string;
}

export interface BikeVariant {
  id?: string;
  name: string;
  exShowroom: number;
  displayPrice: string;
  colourIds?: string[];
  colours?: BikeColour[];
  colors?: BikeColour[];
}

export interface BikePrice {
  currency: 'INR';
  exShowroom: number; // in INR
  displayPrice: string; // e.g. "₹1,49,900"
  note?: string;
}

export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  brandId?: string;
  brandName?: string;
  modelName?: string;
  officialModelUrl?: string;
  heroImage?: string;
  model3d?: string;
  category: CategoryType;
  price: BikePrice;
  variants?: BikeVariant[];
  colours: BikeColour[];
  colors?: BikeColour[];
  image: string;
  images: string[];
  gallery?: string[];
  additionalImages?: string[];
  displacement: number; // in cc
  engineType: string;
  power: number; // in bhp
  torque: number; // in Nm
  weight: number; // in kg
  fuelCapacity: number; // in L
  transmission: string;
  mileage: number; // km/l (approx)
  topSpeed: number; // km/h (approx)
  isDemoSpecs?: boolean;
  featured?: boolean;
  isImagePending?: boolean;
  tagline: string;
  description: string;
  features: string[];
  videos?: (BikeVideo | string)[];
  video?: string;
}

export interface BikeVideo {
  id: string;
  title: string;
  src: string;
  poster: string;
  type: 'hero' | 'showcase' | 'walkaround' | 'track';
  aspectRatio?: '16:9' | '9:16' | 'auto';
  colourId?: string;
  description?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  origin: string;
  founded: number;
  logo: string;
  heroImage: string;
  brandLine: string;
  tagline: string;
  description: string;
  bikeCount?: number;
  video?: string;
  videoPoster?: string;
  videoTitle?: string;
}

export interface CategoryInfo {
  id: CategoryType;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  examples: string[];
  video?: string;
  videoPoster?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  content: string[];
}

export interface GalleryItem {
  id: string;
  brand: string;
  model: string;
  category: CategoryType;
  image: string;
  caption: string;
  bikeId?: string;
}
