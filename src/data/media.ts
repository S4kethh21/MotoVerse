import type { BikeVideo } from '../types';

export interface SectionVideo {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  poster: string;
  aspectRatio: '16:9' | '9:16';
  description?: string;
}

// 1. Homepage Hero Video
export const HERO_VIDEO: SectionVideo = {
  id: 'home-hero',
  title: 'Ride Beyond Limits',
  subtitle: 'The Pure Spirit of Two-Wheeled Discovery',
  src: '/video/home page.mp4',
  poster: '/videos/home-hero-poster.jpg',
  aspectRatio: '16:9',
  description: 'Cinematic open-road motorcycle exploration across scenic routes.'
};

// 2. Official Brand Showcase Videos (Mapped to verified /video directory files)
export const BRAND_VIDEOS: Record<string, SectionVideo> = {
  'bmw': {
    id: 'bmw-brand-reel',
    title: 'BMW Motorrad — Make Life a Ride',
    subtitle: 'Bavarian Precision & Racing Heritage',
    src: '/video/BMW.mp4',
    poster: '/images/brands/bmw-motorrad.jpg',
    aspectRatio: '16:9',
    description: 'Precision German engineering defining global benchmarks across adventure travel, dynamic roadsters, and supersport racing.'
  },
  'bmw-motorrad': {
    id: 'bmw-brand-reel',
    title: 'BMW Motorrad — Make Life a Ride',
    subtitle: 'Bavarian Precision & Racing Heritage',
    src: '/video/BMW.mp4',
    poster: '/images/brands/bmw-motorrad.jpg',
    aspectRatio: '16:9',
    description: 'Precision German engineering defining global benchmarks across adventure travel, dynamic roadsters, and supersport racing.'
  },
  'ducati': {
    id: 'ducati-brand-reel',
    title: 'Ducati — Style, Sophistication, Performance',
    subtitle: 'Borgo Panigale Desmosedici Purebreds',
    src: '/video/dukati.mp4',
    poster: '/images/brands/ducati.jpg',
    aspectRatio: '16:9',
    description: 'Italian thoroughbreds forged on WorldSBK and MotoGP race tracks with ferocious Desmosedici V4 engines.'
  },
  'kawasaki': {
    id: 'kawasaki-brand-reel',
    title: 'Kawasaki — Let the Good Times Roll',
    subtitle: 'Supercharged Dominance & KRT Pedigree',
    src: '/video/kawasaki.mp4',
    poster: '/images/brands/kawasaki.jpg',
    aspectRatio: '16:9',
    description: 'Legendary Japanese engineering powerhouses, recognized worldwide for high-revving Ninja supersports.'
  },
  'yamaha': {
    id: 'yamaha-brand-reel',
    title: 'Yamaha — The Call of the Blue',
    subtitle: 'Crossplane Performance & Deltabox Agility',
    src: '/video/yamaha.mp4',
    poster: '/images/brands/yamaha.jpg',
    aspectRatio: '16:9',
    description: 'Track-derived Deltabox chassis agility and Crossplane engine technology connecting rider senses to the pavement.'
  },
  'ktm': {
    id: 'ktm-brand-reel',
    title: 'KTM — Ready to Race',
    subtitle: 'Mattighofen Trellis Purebreds',
    src: '/video/ktm.mp4',
    poster: '/images/brands/ktm.jpg',
    aspectRatio: '16:9',
    description: 'Austrian purebreds renowned for razor-sharp trellis frames, radical power-to-weight ratios, and off-road dominance.'
  },
  'triumph': {
    id: 'triumph-brand-reel',
    title: 'Triumph — For the Ride',
    subtitle: 'Hinckley British Craftsmanship',
    src: '/video/truihmp.mp4',
    poster: '/images/brands/triumph.jpg',
    aspectRatio: '16:9',
    description: 'Hinckley British craftsmanship blending iconic heritage silhouettes with cutting-edge triple-cylinder racing engines.'
  },
  'aprilia': {
    id: 'aprilia-brand-reel',
    title: 'Aprilia — Designed for Racers, Built for Riders',
    subtitle: 'Noale 54 World Championships Pedigree',
    src: '/video/aprila.mp4',
    poster: '/images/brands/aprilia.jpg',
    aspectRatio: '16:9',
    description: 'Noale Italian racing passion celebrated for benchmark twin-spar chassis and ferocious powerplants.'
  },
  'royal-enfield': {
    id: 'royal-enfield-brand-reel',
    title: 'Royal Enfield — Made Like a Gun',
    subtitle: 'Pure Motorcycling Heritage Since 1901',
    src: '/video/royal enfield.mp4',
    poster: '/images/brands/royal-enfield.jpg',
    aspectRatio: '16:9',
    description: 'The definitive lineage celebrating pure motorcycling across heritage, cruising, and modern street agility.'
  },
  'harley-davidson': {
    id: 'harley-brand-reel',
    title: 'Harley-Davidson — All for Freedom, Freedom for All',
    subtitle: 'Milwaukee V-Twin American Rumble',
    src: '/video/harley (1).mp4',
    poster: '/images/brands/harley-davidson.jpg',
    aspectRatio: '16:9',
    description: 'Iconic American freedom and heavyweight rumble, defined by Milwaukee V-twin heritage and custom cruiser culture.'
  },
  'honda': {
    id: 'honda-brand-reel',
    title: 'Honda — The Power of Dreams',
    subtitle: 'Precision Engineering & MotoGP Pedigree',
    src: '/video/honda.mp4',
    poster: '/images/brands/honda.jpg',
    aspectRatio: '16:9',
    description: 'Global benchmark of bulletproof reliability, aerodynamic innovation, and precision engineering.'
  },
  'suzuki': {
    id: 'suzuki-brand-reel',
    title: 'Suzuki — Way of Life!',
    subtitle: 'Hamamatsu Mastery & Hayabusa Legend',
    src: '/video/suzuki.mp4',
    poster: '/images/brands/suzuki.jpg',
    aspectRatio: '16:9',
    description: 'Hamamatsu engineering mastery famous for legendary GSX-R supersport agility and the iconic Hayabusa.'
  },
  'tvs': {
    id: 'tvs-brand-reel',
    title: 'TVS Motor — Racing DNA Unleashed',
    subtitle: 'Four Decades of TVS Racing Benchmark',
    src: '/video/tvs.mp4',
    poster: '/images/brands/tvs.jpg',
    aspectRatio: '16:9',
    description: 'Over 40 years of TVS Racing track pedigree shaping razor-sharp Apache supersports and urban roadsters.'
  }
};

// 3. Category Showcase Videos
export const CATEGORY_VIDEOS: Partial<Record<string, SectionVideo>> = {
  'Supersport': BRAND_VIDEOS['bmw'],
  'Sport': BRAND_VIDEOS['kawasaki'],
  'Roadster': BRAND_VIDEOS['tvs'],
  'Cruiser': BRAND_VIDEOS['royal-enfield']
};

// 4. Motorcycle-Specific Media Mapping
export const MOTORCYCLE_VIDEOS: Record<string, BikeVideo[]> = {
  'bmw-g-310-rr': [
    {
      id: 'bmw-m-motorsport-reel',
      title: 'BMW Motorrad — M Motorsport Track Performance Film',
      src: '/videos/bmw-s1000rr.mp4',
      poster: '/videos/bmw-s1000rr-poster.jpg',
      type: 'track',
      aspectRatio: '9:16',
      description: 'BMW M Motorsport racing DNA, aerodynamic winglets, and track-focused performance engineering.'
    }
  ],
  'kawasaki-zx-4r': [
    {
      id: 'kawasaki-krt-reel',
      title: 'Kawasaki Racing Team — WSBK & Supercharged Heritage Exhibition',
      src: '/videos/kawasaki-ninja-h2.mp4',
      poster: '/videos/kawasaki-ninja-h2-poster.jpg',
      type: 'track',
      aspectRatio: '16:9',
      description: 'Championship-winning aerodynamic engineering and high-revving racetrack paddock walkaround.'
    }
  ],
  'royal-enfield-hunter-350': [
    {
      id: 'hunter-350-big4-reel',
      title: 'Royal Enfield Hunter 350 — The Big 4 Urban Film',
      src: '/videos/royal-enfield-big4.mp4',
      poster: '/videos/royal-enfield-big4-poster.jpg',
      type: 'walkaround',
      aspectRatio: '9:16',
      description: 'Urban agile geometry from the official Royal Enfield J-series Big 4 showcase.'
    }
  ],
  'royal-enfield-classic-350': [
    {
      id: 'classic-350-big4-reel',
      title: 'Royal Enfield Classic 350 — The Big 4 Heritage Film',
      src: '/videos/royal-enfield-big4.mp4',
      poster: '/videos/royal-enfield-big4-poster.jpg',
      type: 'showcase',
      aspectRatio: '9:16',
      description: 'Timeless styling, teardrop tank, and signature exhaust rhythm in The Big 4 official film.'
    }
  ],
  'royal-enfield-bullet-350': [
    {
      id: 'bullet-350-big4-reel',
      title: 'Royal Enfield Bullet 350 — The Big 4 Legacy Film',
      src: '/videos/royal-enfield-big4.mp4',
      poster: '/videos/royal-enfield-big4-poster.jpg',
      type: 'showcase',
      aspectRatio: '9:16',
      description: 'Handcrafted pinstriping and unbroken legacy showcased in The Big 4 film.'
    }
  ],
  'royal-enfield-meteor-350': [
    {
      id: 'meteor-350-big4-reel',
      title: 'Royal Enfield Meteor 350 — The Big 4 Highway Film',
      src: '/videos/royal-enfield-big4.mp4',
      poster: '/videos/royal-enfield-big4-poster.jpg',
      type: 'showcase',
      aspectRatio: '9:16',
      description: 'Effortless open highway cruising highlighted in The Big 4 official reel.'
    }
  ],
  'tvs-ronin': [
    {
      id: 'tvs-ronin-walkaround',
      title: 'TVS Ronin — Lightning Black Walkaround Reel',
      src: '/videos/tvs-ronin.mp4',
      poster: '/videos/tvs-ronin-poster.jpg',
      type: 'walkaround',
      aspectRatio: '9:16',
      colourId: 'ronin-magma-red',
      description: 'Signature T-face LED headlamp, block-pattern tyres, golden USD forks, and ribbed custom seat.'
    }
  ]
};
