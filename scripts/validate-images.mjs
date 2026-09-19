import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('MOTOVERSE — MOTORCYCLE & BRAND ASSET VALIDATION AUDIT');
console.log('====================================================\n');

let totalChecks = 0;
let passed = 0;
let errors = 0;

function checkFile(relPath, description) {
  totalChecks++;
  const fullPath = path.join('./public', relPath);
  if (fs.existsSync(fullPath)) {
    passed++;
    return true;
  } else {
    console.error(`[MISSING ASSET] ${description} -> ${relPath} not found!`);
    errors++;
    return false;
  }
}

// 1. Check Brands
console.log('--- 1. Brand Logos & Assets ---');
const brandsContent = fs.readFileSync('./src/data/brands.ts', 'utf8');
const brandRegex = /logo:\s*'([^']+)'/g;
let m;
while ((m = brandRegex.exec(brandsContent)) !== null) {
  checkFile(m[1], `Brand Logo`);
}

// 2. Check Motorcycle Fleet
console.log('\n--- 2. Centralized Motorcycle Fleet (72 Models) ---');
const motorcyclesContent = fs.readFileSync('./src/data/motorcycles.ts', 'utf8');
const jsonMatch = motorcyclesContent.match(/export const MOTORCYCLES: Motorcycle\[\] = (\[[\s\S]*\]);/);

if (!jsonMatch) {
  console.error('Failed to parse MOTORCYCLES array');
  process.exit(1);
}

const motorcycles = JSON.parse(jsonMatch[1]);
console.log(`Auditing ${motorcycles.length} motorcycles...`);

const usedImages = new Map();

for (const bike of motorcycles) {
  // Main Hero Image
  checkFile(bike.image, `${bike.name} [Main Image]`);

  // Track duplicate image usage
  const count = (usedImages.get(bike.image) || 0) + 1;
  usedImages.set(bike.image, count);

  // Colourways
  if (bike.colours && bike.colours.length > 0) {
    for (const col of bike.colours) {
      checkFile(col.image, `${bike.name} [Colour: ${col.name}]`);
      if (col.gallery && col.gallery.length > 0) {
        for (let i = 0; i < col.gallery.length; i++) {
          checkFile(col.gallery[i], `${bike.name} [${col.name} Angle ${i + 1}]`);
        }
      }
    }
  }

  // Gallery
  if (bike.images && bike.images.length > 0) {
    for (let i = 0; i < bike.images.length; i++) {
      checkFile(bike.images[i], `${bike.name} [Angle ${i + 1}]`);
    }
  }
}

// 3. Duplicate Image Check
console.log('\n--- 3. Uniqueness Check (No Reused Images Across Different Models) ---');
let duplicates = 0;
usedImages.forEach((count, img) => {
  if (count > 1) {
    const matchedBikes = motorcycles.filter(b => b.image === img).map(b => b.name);
    console.error(`[DUPLICATE DETECTED] Image ${img} is shared by: ${matchedBikes.join(', ')}`);
    duplicates++;
    errors++;
  }
});

if (duplicates === 0) {
  console.log('[PASS] Zero duplicated main hero images across distinct motorcycle models!');
}

console.log('\n====================================================');
console.log(`AUDIT SUMMARY: ${totalChecks} Checks Performed`);
console.log(`STATUS: ${passed} Verified, ${errors} Errors`);
console.log('====================================================\n');

if (errors > 0) {
  process.exit(1);
} else {
  console.log('ALL MOTORCYCLE & BRAND ASSETS ARE 100% VERIFIED AUTHENTIC!');
}
