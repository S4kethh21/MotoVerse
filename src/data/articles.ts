import type { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'how-to-choose-first-performance-bike',
    title: 'How to Choose Your First Performance Bike',
    slug: 'how-to-choose-first-performance-bike',
    category: 'Buying Guide',
    readTime: '6 min read',
    date: 'March 14, 2026',
    author: 'Alex Vance',
    image: '/images/categories/adventure.jpg',
    summary: 'Moving from commuter motorcycles to your first real performance machine is an exhilarating step. Here is what you need to evaluate before signing the papers.',
    content: [
      'Transitioning into the performance motorcycling realm requires balancing ambition with rider safety and manageable ergonomics. While a 1,000cc litre-class superbike sounds alluring on paper, real-world throttle modulation, weight management, and chassis feedback demand a progressive learning curve.',
      '1. Assess Power-to-Weight Ratio: A motorcycle producing 40 to 50 horsepower (such as a KTM 390 Duke, Yamaha R3, or Aprilia RS 457) weighs between 165 and 175 kg. This delivers a 0-100 km/h acceleration under 6 seconds while remaining forgiving when you encounter unexpected gravel or sudden braking maneuvers.',
      '2. Riding Ergonomics Matter More Than Looks: Supersports with extreme clip-ons look track-gorgeous, but if your daily riding involves stop-and-go city traffic, the wrist strain and aggressive neck angle can quickly sap your enthusiasm. Naked streetfighters and sports tourers often provide the optimal geometry for 90% of real-world road time.',
      '3. Factor in Running Costs & Safety Tech: High-performance radial tires, sintered brake pads, high-octane fuel, and insurance premiums are part of the equation. Prioritize bikes equipped with dual-channel ABS, slipper clutches, and traction control.'
    ]
  },
  {
    id: 'sport-bikes-vs-naked-bikes',
    title: 'Sport Bikes vs Naked Bikes: Which Fits Your Style?',
    slug: 'sport-bikes-vs-naked-bikes',
    category: 'Comparison',
    readTime: '5 min read',
    date: 'March 08, 2026',
    author: 'Elena Rossi',
    image: '/images/categories/sport.jpg',
    summary: 'Aerodynamic wind protection or raw upright street aggression? We break down the key differences in riding dynamics, daily comfort, and maintenance.',
    content: [
      'The timeless dilemma for performance enthusiasts: do you choose the sculpted aerodynamic fairing of a supersport, or the muscular, stripped-back agility of a naked roadster?',
      'Supersport Advantage: Fairings redirect aerodynamic turbulence away from the rider\'s chest and helmet at triple-digit highway speeds. Lower clip-ons lock your body into the tank, optimizing front-end contact patch feel during deep corner apexes.',
      'Naked Roadster Advantage: Stripped of expensive fairing plastics, nakeds offer superior cooling in city traffic, tighter turning radii, wide handlebars with immense leverage, and zero risk of cracking costly fairings during minor parking lot tip-overs.',
      'Verdict: If your weekends are dedicated to racetrack track-days or long fast highway runs, the sport bike wins. For commuting, weekend canyon twisties, and real urban agility, the naked streetfighter takes the crown.'
    ]
  },
  {
    id: 'things-to-check-before-buying-a-motorcycle',
    title: 'Things to Check Before Buying a Motorcycle',
    slug: 'things-to-check-before-buying-a-motorcycle',
    category: 'Checklist',
    readTime: '7 min read',
    date: 'February 26, 2026',
    author: 'Marcus Sterling',
    image: '/images/categories/street.jpg',
    summary: 'A comprehensive pre-delivery and pre-purchase checklist covering engine sound, frame alignment, tire wear, fluid leaks, and electrical diagnostics.',
    content: [
      'Whether you are purchasing a brand-new showroom motorcycle or a pre-owned machine, skipping a rigorous mechanical check can turn a dream purchase into a wallet nightmare.',
      '1. Frame and Fork Alignment: Stand the motorcycle straight and verify that the front wheel, fork tubes, and rear tire track in a completely true line. Inspect the steering headstock for any hairline cracks, repainting, or impact markings.',
      '2. Cold Start Inspection: Insist on starting the engine completely cold. Touch the exhaust header before turning the key to ensure the seller didn\'t pre-warm the bike to mask hard-starting or valve chatter.',
      '3. Chain, Sprockets, and Suspension Seals: Check drive chain slack and look for hooked sprocket teeth. Run your fingers along the front fork stanchions — any film of hydraulic fork oil signals blown dust/oil seals.',
      '4. Electronics & Brake Discs: Inspect brake rotors for deep circumferential grooves or blue heat discoloration. Test ABS warning light sequencing upon ignition cycle.'
    ]
  },
  {
    id: 'understanding-motorcycle-engine-performance',
    title: 'Understanding Motorcycle Engine Performance',
    slug: 'understanding-motorcycle-engine-performance',
    category: 'Engineering',
    readTime: '8 min read',
    date: 'February 19, 2026',
    author: 'Dr. Dev Sharma',
    image: '/images/categories/naked.jpg',
    summary: 'Demystifying the difference between horsepower and torque, power delivery bands, and how engine configurations shape character on the road.',
    content: [
      'Specification sheets are loaded with numbers: 45 bhp, 39 Nm, 9,000 RPM. But what do these figures really communicate about how a motorcycle will behave when you twist the throttle in third gear?',
      'Torque vs Horsepower: Torque is rotational muscle — the twisting force that catapults you forward when exiting a low-speed hairpin. Horsepower is how fast that twisting force can be applied over time (Torque × RPM / 5252). Horsepower determines top speed, while torque determines roll-on acceleration.',
      'Engine Architectures:',
      '• Singles: Massive low-end torque thump, lightweight packaging, but limited high-RPM rev capability.',
      '• Parallel Twins with 270° Cranks: The modern sweet spot (Yamaha MT-07, RS 457, RE 650) replicating V-Twin pulses with smooth balance.',
      '• Inline-3 (Triples): The Triumph benchmark combining twin-cylinder low-end pull with inline-four screamer top end.',
      '• Inline-4 & V4: High-RPM screaming race pedigree, providing explosive top-end power reserves on track.'
    ]
  },
  {
    id: 'beginners-guide-to-motorcycle-maintenance',
    title: 'Beginner’s Guide to Motorcycle Maintenance',
    slug: 'beginners-guide-to-motorcycle-maintenance',
    category: 'Maintenance',
    readTime: '5 min read',
    date: 'February 10, 2026',
    author: 'Samira Patel',
    image: '/images/categories/touring.jpg',
    summary: 'The five fundamental maintenance habits every motorcycle owner must master to keep their machine running safely, smoothly, and reliably.',
    content: [
      'A well-maintained motorcycle is not only faster and more fuel-efficient — it is fundamentally safer. You don\'t need a full mechanic workshop to keep your bike in prime condition.',
      '1. The Weekly Chain Ritual: Clean and lubricate your drive chain every 500-700 km (or after every rainy ride). A dry, grit-encrusted chain robs 3-5 horsepower and can snap under load.',
      '2. Cold Tire Pressure Checks: Always gauge tire pressure when tires are stone cold before riding. Under-inflation leads to sluggish steering, rim damage, and overheating rubber.',
      '3. Engine Oil Sight Glass: Stand the bike vertical on level ground and confirm the oil level sits between the min and max markers. Inspect for dark amber vs pitch black coloration.',
      '4. Cable Slack & Brake Fluid Clarity: Check throttle play and clutch lever free-play (should have 2-3mm of initial travel). Inspect the translucent master cylinder reservoir for honey-gold fluid.'
    ]
  },
  {
    id: 'which-motorcycle-category-is-right-for-you',
    title: 'Which Motorcycle Category Is Right for You?',
    slug: 'which-motorcycle-category-is-right-for-you',
    category: 'Guide',
    readTime: '6 min read',
    date: 'January 28, 2026',
    author: 'Alex Vance',
    image: '/images/categories/cruiser.jpg',
    summary: 'From cruisers to supersports, adventure tourers to street commuters, explore which motorcycle category aligns with your anatomy and journey ambitions.',
    content: [
      'The motorcycle industry is divided into distinct categories, each engineered around specific rider ergonomic triangles, suspension geometry, and road surfaces.',
      'Cruisers: Best for riders who love relaxed posture, low seat heights, highway stability, and relaxed torquey pacing without tucking their knees into their chest.',
      'Adventure / Dual-Sport: The Swiss Army knives of motorcycling. Long suspension travel swallows potholes and speed bumps with ease, while wide handlebars provide effortless commanding road vision.',
      'Naked Streetfighters: The most balanced everyday all-rounder. Agile, communicative chassis dynamics, great mid-range torque, and upright visibility for dense traffic.',
      'Sport Bikes: For pure apex chasers and track enthusiasts who prioritize aerodynamic precision and high-speed cornering stability above all else.'
    ]
  }
];
