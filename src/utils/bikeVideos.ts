import type { Motorcycle, BikeColour } from '../types';

export interface ResolvedBikeVideo {
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  aspectRatio: '16:9' | '9:16' | 'auto';
  description?: string;
}
 
/**
 * Inventory of all 18 authentic motorcycle model videos verified in /video
 */
export const VERIFIED_VIDEO_FILES = [
  'royal-enfield-classic-350.mp4',
  'royal-enfield-hunter-350.mp4',
  'royal-enfield-bullet-350.mp4',
  'royal-enfield-meteor-350.mp4',
  'bmw-g-310-rr.mp4',
  'tvs-ronin.mp4',
  'kawasaki-zx-4r.mp4',
  'ktm-390-duke.mp4',
  'ktm-rc-390.mp4',
  'yamaha-mt-15.mp4',
  'yamaha-r15-v4.mp4',
  'honda-hness-cb350.mp4',
  'suzuki-hayabusa.mp4',
  'ducati-panigale-v4.mp4',
  'aprilia-rs-457.mp4',
  'triumph-speed-400.mp4',
  'harley-davidson-x440.mp4',
  'harley-davidson-nightster.mp4'
];

/**
 * Verified mapping of motorcycles to their authentic official videos.
 * When new videos are added into /video/<bike-id>.mp4 or specified in motorcycle data,
 * they automatically resolve through this system.
 */
const KNOWN_BIKE_VIDEO_FILES: Record<string, {
  src: string;
  poster?: string;
  title?: string;
  aspectRatio?: '16:9' | '9:16' | 'auto';
  description?: string;
}> = {
  // Royal Enfield
  'royal-enfield-classic-350': {
    src: '/video/royal-enfield-classic-350.mp4',
    poster: '/videos/royal-enfield-big4-poster.jpg',
    title: 'Royal Enfield Classic 350 — The Big 4 Heritage Film',
    aspectRatio: '9:16',
    description: 'Timeless retro styling, teardrop fuel cell, and signature exhaust rhythm in The Big 4 official film.'
  },
  'royal-enfield-hunter-350': {
    src: '/video/royal-enfield-hunter-350.mp4',
    poster: '/videos/royal-enfield-big4-poster.jpg',
    title: 'Royal Enfield Hunter 350 — Urban Agile Film',
    aspectRatio: '9:16',
    description: 'Compact chassis geometry, nimble flickability, and responsive urban street performance.'
  },
  'royal-enfield-bullet-350': {
    src: '/video/royal-enfield-bullet-350.mp4',
    poster: '/videos/royal-enfield-big4-poster.jpg',
    title: 'Royal Enfield Bullet 350 — Legacy in Motion',
    aspectRatio: '9:16',
    description: 'The unbroken lineage of motorcycling royalty, handcrafted pinstripes, and deep mechanical character.'
  },
  'royal-enfield-meteor-350': {
    src: '/video/royal-enfield-meteor-350.mp4',
    poster: '/videos/royal-enfield-big4-poster.jpg',
    title: 'Royal Enfield Meteor 350 — Highway Cruiser Reel',
    aspectRatio: '9:16',
    description: 'Effortless open road touring posture, smooth counterbalance single-cylinder cruising.'
  },

  // BMW Motorrad
  'bmw-g-310-rr': {
    src: '/video/bmw-g-310-rr.mp4',
    poster: '/videos/bmw-s1000rr-poster.jpg',
    title: 'BMW G 310 RR — M Motorsport Track Performance Film',
    aspectRatio: '9:16',
    description: 'Aerodynamic bi-directional winglets, track ergonomics, and BMW M Motorsport racing pedigree.'
  },

  // TVS Motor
  'tvs-ronin': {
    src: '/video/tvs-ronin.mp4',
    poster: '/videos/tvs-ronin-poster.jpg',
    title: 'TVS Ronin — Lightning Black Lifestyle Reel',
    aspectRatio: '9:16',
    description: 'Signature T-face LED lamp, golden inverted forks, block-tread tyres, and dual-tone roadster styling.'
  },

  // Kawasaki
  'kawasaki-zx-4r': {
    src: '/video/kawasaki-zx-4r.mp4',
    poster: '/videos/kawasaki-ninja-h2-poster.jpg',
    title: 'Kawasaki Ninja ZX-4R — Screaming In-Line Four Track Attack',
    aspectRatio: '16:9',
    description: 'High-revving 16,000 RPM screamer, ram-air induction, and WorldSBK inspired aerodynamic package.'
  },

  // KTM
  'ktm-390-duke': {
    src: '/video/ktm-390-duke.mp4',
    poster: '/images/bikes/ktm/colourways/ktm-390-duke-electronic-orange-01.jpg',
    title: 'KTM 390 Duke — The Corner Rocket Cinema',
    aspectRatio: '16:9',
    description: 'Aggressive streetfighter agility, LC4c single punch, and razor-sharp trellis chassis response.'
  },
  'ktm-rc-390': {
    src: '/video/ktm-rc-390.mp4',
    poster: '/images/bikes/ktm/colourways/ktm-rc-390-factory-racing-blue-01.jpg',
    title: 'KTM RC 390 — Moto3 Born Track Machine',
    aspectRatio: '16:9',
    description: 'Grand Prix aero fairings, clip-on racing stance, and track-honed handling.'
  },

  // Yamaha
  'yamaha-mt-15': {
    src: '/video/yamaha-mt-15.mp4',
    poster: '/images/bikes/yamaha/colourways/yamaha-mt-15-cyan-storm-01.jpg',
    title: 'Yamaha MT-15 V2 — The Dark Side of Japan Reel',
    aspectRatio: '16:9',
    description: 'Bi-functional LED eye, lightweight Deltabox frame, and Variable Valve Actuation torque.'
  },
  'yamaha-r15-v4': {
    src: '/video/yamaha-r15-v4.mp4',
    poster: '/images/bikes/yamaha/colourways/yamaha-r15-racing-blue-01.jpg',
    title: 'Yamaha YZF-R15 V4 — Supersport DNA Exhibition',
    aspectRatio: '16:9',
    description: 'Aerodynamic aerodynamic cowl, quickshifter, and M1 MotoGP racing ergonomics.'
  },

  // Honda
  'honda-hness-cb350': {
    src: '/video/honda-hness-cb350.mp4',
    poster: '/images/bikes/honda/colourways/honda-hness-cb350-precious-red-01.jpg',
    title: 'Honda H\'ness CB350 — The Classic Highness Reel',
    aspectRatio: '16:9',
    description: 'Classic chrome contours, throaty dual-tone beat, and Honda Selectable Torque Control.'
  },

  // Suzuki
  'suzuki-hayabusa': {
    src: '/video/suzuki-hayabusa.mp4',
    poster: '/images/bikes/suzuki/colourways/suzuki-hayabusa-metallic-thunder-gray-01.jpg',
    title: 'Suzuki Hayabusa — The Ultimate Hyper-Sport Legend',
    aspectRatio: '16:9',
    description: 'Aerodynamic wind-tunnel sculpt, 1340cc inline-four hyper-drive, and SIRS electronic suite.'
  },

  // Ducati
  'ducati-panigale-v4': {
    src: '/video/ducati-panigale-v4.mp4',
    poster: '/images/bikes/ducati/colourways/ducati-panigale-v4-ducati-red-01.jpg',
    title: 'Ducati Panigale V4 — The Science of Speed',
    aspectRatio: '16:9',
    description: 'Desmosedici Stradale 90° V4 engine, biplane carbon wings, and Front Frame architecture.'
  },

  // Aprilia
  'aprilia-rs-457': {
    src: '/video/aprilia-rs-457.mp4',
    poster: '/images/bikes/aprilia/colourways/aprilia-rs-457-prismatic-dark-01.jpg',
    title: 'Aprilia RS 457 — Racing Instinct Unleashed',
    aspectRatio: '16:9',
    description: 'Aluminum dual-beam frame, parallel-twin 270° crank, and Noale racing aerodynamics.'
  },

  // Triumph
  'triumph-speed-400': {
    src: '/video/triumph-speed-400.mp4',
    poster: '/images/bikes/triumph/colourways/triumph-speed-400-carnival-red-01.jpg',
    title: 'Triumph Speed 400 — Modern Classic Roadster Reel',
    aspectRatio: '16:9',
    description: 'Fin-cooled TR-Series single, sculpted tank, and timeless British roadster proportions.'
  },

  // Harley-Davidson
  'harley-davidson-x440': {
    src: '/video/harley-davidson-x440.mp4',
    poster: '/images/bikes/harley/colourways/harley-davidson-x440-mustard-yellow-01.jpg',
    title: 'Harley-Davidson X440 — Unmistakable American Thump',
    aspectRatio: '16:9',
    description: 'Long-stroke 440cc air-oil cooled powerplant, commanding upright roadster stance.'
  },
  'harley-davidson-nightster': {
    src: '/video/harley-davidson-nightster.mp4',
    poster: '/images/bikes/harley/colourways/harley-davidson-nightster-vivid-black-01.jpg',
    title: 'Harley-Davidson Nightster — Revolution Max Exhibition',
    aspectRatio: '16:9',
    description: 'Liquid-cooled Revolution Max 975T V-Twin, exposed twin rear shocks, and aggressive bobber attitude.'
  }
};

/**
 * Resolves the single authentic motorcycle video for a given motorcycle.
 * 
 * Rules:
 * 1. If colour-specific video is provided on currentColour, use it.
 * 2. If motorcycle has explicit `videos` or `video` field in data, resolve it.
 * 3. If a mapped video file exists for this bike ID, resolve it.
 * 4. IF A BIKE DOES NOT HAVE AN AUTHENTIC VIDEO YET:
 *    Return null! NEVER show a random video or another bike's video.
 */
export function getBikeVideo(
  bike: Motorcycle,
  currentColour?: BikeColour
): ResolvedBikeVideo | null {
  if (!bike) return null;

  // 1. Colour-specific video takes priority if defined
  if (currentColour?.video) {
    return {
      src: currentColour.video,
      poster: currentColour.image || bike.image,
      title: `${bike.name} (${currentColour.name}) — Official Reel`,
      subtitle: `${bike.brand} • ${currentColour.name}`,
      aspectRatio: '16:9',
      description: `Official colourway footage for ${bike.name} in ${currentColour.name}.`
    };
  }

  // 2. Check explicit bike.videos in motorcycle data
  if (bike.videos && bike.videos.length > 0) {
    const first = bike.videos[0];
    if (typeof first === 'string') {
      return {
        src: first,
        poster: bike.image,
        title: `${bike.name} — Official Machine Reel`,
        subtitle: `${bike.brand} • ${bike.name}`,
        aspectRatio: '16:9',
        description: bike.tagline || `Official presentation footage of the ${bike.name}.`
      };
    } else if (typeof first === 'object' && first.src) {
      return {
        src: first.src,
        poster: first.poster || bike.image,
        title: first.title || `${bike.name} — Official Machine Reel`,
        subtitle: `${bike.brand} • ${bike.name}`,
        aspectRatio: first.aspectRatio || '16:9',
        description: first.description || bike.tagline
      };
    }
  }

  // 3. Check explicit bike.video (singular string)
  if (bike.video) {
    return {
      src: bike.video,
      poster: bike.image,
      title: `${bike.name} — Official Machine Reel`,
      subtitle: `${bike.brand} • ${bike.name}`,
      aspectRatio: '16:9',
      description: bike.tagline
    };
  }

  // 4. Check known mapped video files by bike ID
  const known = KNOWN_BIKE_VIDEO_FILES[bike.id];
  if (known) {
    return {
      src: known.src,
      poster: known.poster || bike.image,
      title: known.title || `${bike.name} — Official Film Reel`,
      subtitle: `${bike.brand} • ${bike.name}`,
      aspectRatio: known.aspectRatio || '16:9',
      description: known.description || bike.tagline
    };
  }

  // 5. Dynamic convention check for files placed in /video/<bike-id>.mp4
  const expectedFileName = `${bike.id}.mp4`;
  if (VERIFIED_VIDEO_FILES.includes(expectedFileName)) {
    return {
      src: `/video/${expectedFileName}`,
      poster: bike.image,
      title: `${bike.name} — Official Presentation Film`,
      subtitle: `${bike.brand} • ${bike.name}`,
      aspectRatio: '16:9',
      description: bike.tagline || `Authentic manufacturer reel for ${bike.name}.`
    };
  }

  // 6. If no authentic video exists for this bike, return null.
  // Rule: Do NOT show a random or unrelated bike's video!
  return null;
}
