import type { Motorcycle } from '../types';

export interface DomeImageItem {
  src: string;
  alt: string;
  bikeId: string;
  bikeUrl: string;
  brand: string;
}

export const DOME_BRAND_ORDER = [
  'BMW Motorrad',
  'Royal Enfield',
  'TVS',
  'Yamaha',
  'Kawasaki',
  'Triumph',
  'Aprilia',
  'KTM',
  'Ducati',
  'Honda',
  'Suzuki',
  'Harley-Davidson',
];

/**
 * Curates a non-repeating pool of authentic motorcycle photos across all 12 brands.
 * Interleaves brands round-robin (BMW -> RE -> TVS -> Yamaha -> Kawasaki -> Triumph ->
 * Aprilia -> KTM -> Ducati -> Honda -> Suzuki -> Harley) to guarantee that adjacent
 * dome tiles represent distinct motorcycles and different manufacturer brands.
 */
export function getCuratedDomeImages(
  motorcycles: Motorcycle[],
  targetCount: number = 185
): DomeImageItem[] {
  const brandMap = new Map<string, DomeImageItem[]>();
  for (const b of DOME_BRAND_ORDER) {
    brandMap.set(b, []);
  }

  for (const bike of motorcycles) {
    const list = brandMap.get(bike.brand);
    if (!list) continue;

    const seenBikeImgs = new Set<string>();

    const addImage = (src?: string, suffix?: string) => {
      if (!src || seenBikeImgs.has(src)) return;
      seenBikeImgs.add(src);
      list.push({
        src,
        alt: suffix ? `${bike.brand} ${bike.name} - ${suffix}` : `${bike.brand} ${bike.name}`,
        bikeId: bike.id,
        bikeUrl: `/bikes/${bike.id}`,
        brand: bike.brand,
      });
    };

    // 1. Action & studio gallery photography
    if (bike.gallery) {
      for (const img of bike.gallery) {
        addImage(img);
      }
    }

    // 2. High-res multi-angle shots
    if (bike.images) {
      for (const img of bike.images) {
        addImage(img);
      }
    }

    // 3. Colourway-specific real photography
    if (bike.colours) {
      for (const colour of bike.colours) {
        if (colour.gallery) {
          for (const img of colour.gallery) {
            addImage(img, colour.name);
          }
        }
        if (colour.image) {
          addImage(colour.image, colour.name);
        }
      }
    }

    // 4. Primary hero image
    if (bike.image) {
      addImage(bike.image);
    }
  }

  // Interleave round-robin across the 12 brands
  const pool: DomeImageItem[] = [];
  const globalSeen = new Set<string>();
  const pointers = new Map<string, number>();
  for (const b of DOME_BRAND_ORDER) {
    pointers.set(b, 0);
  }

  while (pool.length < targetCount) {
    let addedInRound = false;

    for (const brand of DOME_BRAND_ORDER) {
      const items = brandMap.get(brand) || [];
      let ptr = pointers.get(brand) || 0;

      while (ptr < items.length) {
        const candidate = items[ptr++];
        pointers.set(brand, ptr);

        if (!globalSeen.has(candidate.src)) {
          globalSeen.add(candidate.src);
          pool.push(candidate);
          addedInRound = true;
          break;
        }
      }

      if (pool.length >= targetCount) break;
    }

    if (!addedInRound) break;
  }

  return pool;
}
