import fs from 'fs';

console.log('====================================================');
console.log('MOTOVERSE — SECTION 13 CRITICAL BIKE CONSISTENCY AUDIT');
console.log('====================================================\n');

const motorcyclesContent = fs.readFileSync('./src/data/motorcycles.ts', 'utf8');
const jsonMatch = motorcyclesContent.match(/export const MOTORCYCLES: Motorcycle\[\] = (\[[\s\S]*\]);/);
const motorcycles = JSON.parse(jsonMatch[1]);

const { getBikeVideo } = await import('../src/utils/bikeVideos.ts');

const testCases = [
  { id: 'royal-enfield-classic-350', expectedBrand: 'Royal Enfield', expectedName: 'Royal Enfield Classic 350', expectedCategory: 'Roadster', hasVideo: true },
  { id: 'royal-enfield-hunter-350', expectedBrand: 'Royal Enfield', expectedName: 'Royal Enfield Hunter 350', expectedCategory: 'Roadster', hasVideo: true },
  { id: 'bmw-g-310-rr', expectedBrand: 'BMW Motorrad', expectedName: 'BMW G 310 RR', expectedCategory: 'Sport', hasVideo: true },
  { id: 'bmw-g-310-r', expectedBrand: 'BMW Motorrad', expectedName: 'BMW G 310 R', expectedCategory: 'Roadster', hasVideo: false },
  { id: 'tvs-apache-rr-310', expectedBrand: 'TVS', expectedName: 'TVS Apache RR 310', expectedCategory: 'Sport', hasVideo: false },
  { id: 'yamaha-r15-v4', expectedBrand: 'Yamaha', expectedName: 'Yamaha R15 V4', expectedCategory: 'Sport', hasVideo: true },
  { id: 'kawasaki-ninja-500', expectedBrand: 'Kawasaki', expectedName: 'Kawasaki Ninja 500', expectedCategory: 'Sport', hasVideo: false },
  { id: 'ktm-390-duke', expectedBrand: 'KTM', expectedName: 'KTM 390 Duke', expectedCategory: 'Naked', hasVideo: true },
];

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

for (const tc of testCases) {
  console.log(`\nTesting Model: ${tc.expectedName} (${tc.id})`);
  const bike = motorcycles.find(b => b.id === tc.id);
  assert(Boolean(bike), `Found bike with ID ${tc.id}`);
  if (!bike) continue;

  // 1. Correct Brand
  assert(bike.brand === tc.expectedBrand, `Brand is ${bike.brand} (expected: ${tc.expectedBrand})`);

  // 2. Correct Model Name
  assert(bike.name === tc.expectedName, `Model name is ${bike.name}`);

  // 3. Correct Main Image
  assert(fs.existsSync('./public' + bike.image), `Main image exists at public${bike.image}`);

  // 4. Correct Colours (at least 1 colour, swatch hex, and colour image)
  assert(Boolean(bike.colours && bike.colours.length > 0), `Has ${bike.colours?.length} verified manufacturer colourways`);
  if (bike.colours) {
    const allColoursExist = bike.colours.every(c => fs.existsSync('./public' + c.image));
    assert(allColoursExist, `All colourway images exist on disk for ${bike.name}`);
  }

  // 5. Correct Gallery
  const gallery = (bike.colours && bike.colours[0].gallery) || bike.images || [];
  assert(gallery.length >= 5, `Has 5-angle gallery (${gallery.length} photos)`);
  const allGalleryExist = gallery.every(g => fs.existsSync('./public' + g));
  assert(allGalleryExist, `All gallery photos exist on disk`);

  // 6. Video check
  const video = getBikeVideo(bike);
  if (tc.hasVideo) {
    assert(Boolean(video && video.src && fs.existsSync('./public' + video.src)), `Official video verified and available on disk (${video?.src})`);
  } else {
    assert(video === null, `No fake video assigned when authentic video does not exist yet (clean isolation)`);
  }

  // 7. Specifications
  assert(Boolean(bike.displacement && bike.power && bike.price && bike.price.displayPrice), `Key specs present: ${bike.displacement}cc, ${bike.power}bhp, ${bike.price?.displayPrice}`);

  // 8. Correct Category
  assert(bike.category === tc.expectedCategory, `Category is ${bike.category} (expected: ${tc.expectedCategory})`);
}

console.log('\n====================================================');
console.log(`SECTION 13 RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================\n');

if (failed > 0) process.exit(1);
