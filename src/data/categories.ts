import type { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Sport',
    slug: 'sport',
    title: 'Sport',
    subtitle: 'Track-bred aerodynamics, aggressive posture and razor-sharp clip-on agility.',
    description: 'Track-focused aerodynamics, aggressive clip-on ergonomics, high-revving powerbands, and deep lean angles engineered for the circuit and spirited twisties.',
    image: '/images/categories/sport.jpg',
    examples: ['BMW G 310 RR', 'Kawasaki Ninja 500', 'Yamaha R15 V4', 'KTM RC 390', 'Aprilia RS 457'],
    video: '/videos/kawasaki-ninja-h2.mp4',
    videoPoster: '/videos/kawasaki-ninja-h2-poster.jpg'
  },
  {
    id: 'Supersport',
    slug: 'supersport',
    title: 'Supersport & Superbike',
    subtitle: 'Extreme 200+ bhp performance, aerodynamic winglets and race-winning DNA.',
    description: 'Uncompromising engineering crafted for national and world championships. Titanium valves, electronic IMU traction control, aerodynamic downforce winglets, and apex dominance.',
    image: '/images/categories/sport.jpg',
    examples: ['Ducati Panigale V4', 'BMW S 1000 RR', 'Kawasaki Ninja ZX-10R', 'Aprilia RSV4', 'Ducati Panigale V2'],
    video: '/videos/bmw-s1000rr.mp4',
    videoPoster: '/videos/bmw-s1000rr-poster.jpg'
  },
  {
    id: 'Naked',
    slug: 'naked',
    title: 'Naked Streetfighter',
    subtitle: 'Exposed frames, raw muscular torque and pure street aggression.',
    description: 'Stripped of fairings for upright commanding handlebars, punchy mid-range torque delivery, and lightning agility across urban twisties.',
    image: '/images/categories/naked.jpg',
    examples: ['KTM 390 Duke', 'Kawasaki Z900', 'Triumph Street Triple 765', 'Yamaha MT-15', 'BMW G 310 R']
  },
  {
    id: 'Roadster',
    slug: 'roadster',
    title: 'Roadster',
    subtitle: 'Timeless silhouette, retro-modern agility and pure everyday character.',
    description: 'Pure motorcycling essence combining classic roadster tank lines, compact geometry, engaging chassis balance, and punchy single/twin thrum.',
    image: '/images/categories/street.jpg',
    examples: ['Royal Enfield Hunter 350', 'Triumph Speed 400', 'TVS Ronin', 'Honda CB350RS', 'Triumph Speed Twin 900'],
    video: '/videos/tvs-ronin.mp4',
    videoPoster: '/videos/tvs-ronin-poster.jpg'
  },
  {
    id: 'Cruiser',
    slug: 'cruiser',
    title: 'Cruiser',
    subtitle: 'Low-slung saddle comfort, lazy deep rumble and open highway freedom.',
    description: 'Relaxed forward foot controls, swept-back bars, bass-heavy torque output, and timeless retro aesthetic designed for trans-state journeys.',
    image: '/images/categories/cruiser.jpg',
    examples: ['Harley-Davidson Sportster S', 'Royal Enfield Meteor 350', 'Harley Fat Boy', 'Honda H\'ness CB350'],
    video: '/videos/royal-enfield-big4.mp4',
    videoPoster: '/videos/royal-enfield-big4-poster.jpg'
  },
  {
    id: 'Adventure',
    slug: 'adventure',
    title: 'Adventure',
    subtitle: 'All-terrain endurance, long-travel suspension and transcontinental range.',
    description: '19 to 21-inch front wheels, rugged bash plates, generous ground clearances, and Dakar rally-bred chassis ready to conquer gravel and mountain passes.',
    image: '/images/categories/adventure.jpg',
    examples: ['BMW R 1300 GS', 'Royal Enfield Himalayan 450', 'Triumph Tiger 900', 'Suzuki V-Strom SX']
  },
  {
    id: 'Touring',
    slug: 'touring',
    title: 'Touring & Sport-Touring',
    subtitle: 'Aerodynamic wind protection, long-distance luxury and cross-country pace.',
    description: 'Sculpted windscreens, expansive fuel capacity, plush two-up seating, and effortless high-speed highway stability mile after mile.',
    image: '/images/categories/touring.jpg',
    examples: ['BMW F 900 XR', 'Suzuki Hayabusa', 'Ducati Multistrada V2', 'Kawasaki Ninja 650']
  },
  {
    id: 'Scrambler',
    slug: 'scrambler',
    title: 'Scrambler',
    subtitle: 'Rugged dual-sport poise, high-mounted exhaust and dirt-track soul.',
    description: 'Wide handlebars, wire-spoke or cast alloy dual-purpose rubber, bash plate protection, and go-anywhere attitude from urban asphalt to gravel trails.',
    image: '/images/categories/adventure.jpg',
    examples: ['Triumph Scrambler 400 X', 'Ducati Scrambler', 'Royal Enfield Scram 411']
  },
  {
    id: 'Cafe Racer',
    slug: 'cafe-racer',
    title: 'Cafe Racer',
    subtitle: 'Low clip-ons, sculpted single seat cowls and 1960s British cafe racing heritage.',
    description: 'Dedicated racer tuck ergonomics, rear-set footpegs, sculpted knee recesses, and high-speed Ton-Up culture re-imagined for modern tarmac.',
    image: '/images/categories/street.jpg',
    examples: ['Royal Enfield Continental GT 650', 'Triumph Thruxton RS']
  },
  {
    id: 'Street',
    slug: 'street',
    title: 'Street & Urban',
    subtitle: 'Nimble lightweight flickability, daily efficiency and city agility.',
    description: 'Featherlight curb weights, low seat heights, effortless clutch action, and superior fuel economy engineered for daily urban traffic slicing.',
    image: '/images/categories/street.jpg',
    examples: ['TVS Apache RTR 160 4V', 'Yamaha FZ-S FI', 'Honda SP 125', 'TVS Raider 125']
  }
];
