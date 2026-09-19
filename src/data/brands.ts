import type { Brand } from '../types';

export const BRANDS: Brand[] = [
  // 1. Royal Enfield (First position as requested)
  {
    id: 'royal-enfield',
    slug: 'royal-enfield',
    name: 'Royal Enfield',
    origin: 'India / UK',
    founded: 1901,
    logo: '/images/brands/royal-enfield.svg',
    heroImage: '/images/brands/royal-enfield.jpg',
    brandLine: 'Made Like a Gun',
    tagline: 'Made Like a Gun',
    description: 'The world oldest motorcycle brand in continuous production, celebrated for timeless soul, thumping character, and pure unadulterated motorcycling.',
    bikeCount: 6,
    video: '/video/royal enfield.mp4',
    videoPoster: '/images/brands/royal-enfield.jpg',
    videoTitle: 'Royal Enfield — Pure Motorcycling Since 1901'
  },
  // 2. BMW Motorrad
  {
    id: 'bmw-motorrad',
    slug: 'bmw-motorrad',
    name: 'BMW Motorrad',
    origin: 'Germany',
    founded: 1923,
    logo: '/images/brands/bmw-motorrad.svg',
    heroImage: '/images/brands/bmw-motorrad.jpg',
    brandLine: 'Make Life a Ride',
    tagline: 'Make Life a Ride',
    description: 'Precision German engineering defining global benchmarks across adventure travel, dynamic roadsters, and supersport racing.',
    bikeCount: 7,
    video: '/video/BMW.mp4',
    videoPoster: '/images/brands/bmw-motorrad.jpg',
    videoTitle: 'BMW Motorrad — Make Life a Ride Brand Film'
  },
  // 3. TVS
  {
    id: 'tvs',
    slug: 'tvs',
    name: 'TVS',
    origin: 'India',
    founded: 1978,
    logo: '/images/brands/tvs.svg',
    heroImage: '/images/brands/tvs.jpg',
    brandLine: 'Racing DNA Unleashed',
    tagline: 'Racing DNA Unleashed',
    description: 'Over 40 years of TVS Racing track pedigree shaping razor-sharp Apache supersports, urban roadsters, and cutting-edge telemetry.',
    bikeCount: 6,
    video: '/video/tvs.mp4',
    videoPoster: '/images/brands/tvs.jpg',
    videoTitle: 'TVS Motor — Racing DNA Unleashed Film'
  },
  // 4. Yamaha
  {
    id: 'yamaha',
    slug: 'yamaha',
    name: 'Yamaha',
    origin: 'Japan',
    founded: 1955,
    logo: '/images/brands/yamaha.svg',
    heroImage: '/images/brands/yamaha.jpg',
    brandLine: 'The Call of the Blue',
    tagline: 'The Call of the Blue',
    description: 'Track-derived Deltabox chassis agility and Crossplane engine technology connecting rider senses directly to the pavement.',
    bikeCount: 6,
    video: '/video/yamaha.mp4',
    videoPoster: '/images/brands/yamaha.jpg',
    videoTitle: 'Yamaha — The Call of the Blue Heritage'
  },
  // 5. Kawasaki
  {
    id: 'kawasaki',
    slug: 'kawasaki',
    name: 'Kawasaki',
    origin: 'Japan',
    founded: 1896,
    logo: '/images/brands/kawasaki.svg',
    heroImage: '/images/brands/kawasaki.jpg',
    brandLine: 'Let the Good Times Roll',
    tagline: 'Let the Good Times Roll',
    description: 'Legendary Japanese engineering powerhouses, recognized worldwide for high-revving Ninja supersports and aggressive Sugomi streetfighters.',
    bikeCount: 7,
    video: '/video/kawasaki.mp4',
    videoPoster: '/images/brands/kawasaki.jpg',
    videoTitle: 'Kawasaki — Supercharged Dominance & KRT Heritage'
  },
  // 6. KTM
  {
    id: 'ktm',
    slug: 'ktm',
    name: 'KTM',
    origin: 'Austria',
    founded: 1934,
    logo: '/images/brands/ktm.svg',
    heroImage: '/images/brands/ktm.jpg',
    brandLine: 'Ready to Race',
    tagline: 'Ready to Race',
    description: 'Mattighofen Austrian purebreds renowned for razor-sharp trellis frames, radical power-to-weight ratios, and dominant off-road dominance.',
    bikeCount: 6,
    video: '/video/ktm.mp4',
    videoPoster: '/images/brands/ktm.jpg',
    videoTitle: 'KTM — Ready to Race Brand Reel'
  },
  // 7. Honda
  {
    id: 'honda',
    slug: 'honda',
    name: 'Honda',
    origin: 'Japan',
    founded: 1948,
    logo: '/images/brands/honda.svg',
    heroImage: '/images/brands/honda.jpg',
    brandLine: 'The Power of Dreams',
    tagline: 'The Power of Dreams',
    description: 'Global benchmark of bulletproof reliability, aerodynamic innovation, and precision engineering spanning urban commuters to MotoGP champions.',
    bikeCount: 6,
    video: '/video/honda.mp4',
    videoPoster: '/images/brands/honda.jpg',
    videoTitle: 'Honda — The Power of Dreams Showcase'
  },
  // 8. Suzuki
  {
    id: 'suzuki',
    slug: 'suzuki',
    name: 'Suzuki',
    origin: 'Japan',
    founded: 1909,
    logo: '/images/brands/suzuki.svg',
    heroImage: '/images/brands/suzuki.jpg',
    brandLine: 'Way of Life!',
    tagline: 'Way of Life!',
    description: 'Hamamatsu engineering mastery famous for legendary GSX-R supersport agility, bulletproof adventure dual-sports, and the iconic Hayabusa.',
    bikeCount: 6,
    video: '/video/suzuki.mp4',
    videoPoster: '/images/brands/suzuki.jpg',
    videoTitle: 'Suzuki — Way of Life Engineering Excellence'
  },
  // 9. Triumph
  {
    id: 'triumph',
    slug: 'triumph',
    name: 'Triumph',
    origin: 'United Kingdom',
    founded: 1902,
    logo: '/images/brands/triumph.svg',
    heroImage: '/images/brands/triumph.jpg',
    brandLine: 'For the Ride',
    tagline: 'For the Ride',
    description: 'Hinckley British craftsmanship blending iconic heritage silhouettes with cutting-edge triple-cylinder racing engines and modern electronics.',
    bikeCount: 6,
    video: '/video/truihmp.mp4',
    videoPoster: '/images/brands/triumph.jpg',
    videoTitle: 'Triumph — For the Ride British Engineering'
  },
  // 10. Ducati
  {
    id: 'ducati',
    slug: 'ducati',
    name: 'Ducati',
    origin: 'Italy',
    founded: 1926,
    logo: '/images/brands/ducati.svg',
    heroImage: '/images/brands/ducati.jpg',
    brandLine: 'Style, Sophistication, Performance',
    tagline: 'Style, Sophistication, Performance',
    description: 'Italian thoroughbreds forged on WorldSBK and MotoGP race tracks with ferocious Desmosedici V4 engines and iconic chassis dynamics.',
    bikeCount: 6,
    video: '/video/dukati.mp4',
    videoPoster: '/images/brands/ducati.jpg',
    videoTitle: 'Ducati — Style, Sophistication & Racing Heritage'
  },
  // 11. Aprilia
  {
    id: 'aprilia',
    slug: 'aprilia',
    name: 'Aprilia',
    origin: 'Italy',
    founded: 1945,
    logo: '/images/brands/aprilia.svg',
    heroImage: '/images/brands/aprilia.jpg',
    brandLine: 'Designed for racers, built for riders',
    tagline: 'Designed for racers, built for riders',
    description: 'Noale Italian racing passion with 54 world titles, celebrated for benchmark twin-spar chassis and ferocious 65-degree V4 powerplants.',
    bikeCount: 6,
    video: '/video/aprila.mp4',
    videoPoster: '/images/brands/aprilia.jpg',
    videoTitle: 'Aprilia — Noale Racing Instinct Exhibition'
  },
  // 12. Harley-Davidson
  {
    id: 'harley-davidson',
    slug: 'harley-davidson',
    name: 'Harley-Davidson',
    origin: 'United States',
    founded: 1903,
    logo: '/images/brands/harley-davidson.svg',
    heroImage: '/images/brands/harley-davidson.jpg',
    brandLine: 'All for Freedom, Freedom for All',
    tagline: 'All for Freedom, Freedom for All',
    description: 'Iconic American freedom and heavyweight rumble, defined by Milwaukee V-twin heritage and custom cruiser culture.',
    bikeCount: 6,
    video: '/video/harley (1).mp4',
    videoPoster: '/images/brands/harley-davidson.jpg',
    videoTitle: 'Harley-Davidson — Milwaukee Legend & Freedom'
  }
];
