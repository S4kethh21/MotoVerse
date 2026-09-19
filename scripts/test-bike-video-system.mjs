import http from 'http';
import fs from 'fs';
import path from 'path';

function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      resolve({ status: res.statusCode, headers: res.headers });
    });
    req.on('error', (err) => resolve({ error: err.message }));
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('MOTOVERSE — BIKE VIDEO SYSTEM VERIFICATION SUITE');
  console.log('====================================================\n');

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

  // 1. Check video endpoints on web server
  console.log('--- 1. Web Server Video Asset Availability ---');
  const videoUrls = [
    // 18 Motorcycle model videos
    '/video/royal-enfield-classic-350.mp4',
    '/video/royal-enfield-hunter-350.mp4',
    '/video/royal-enfield-bullet-350.mp4',
    '/video/royal-enfield-meteor-350.mp4',
    '/video/bmw-g-310-rr.mp4',
    '/video/tvs-ronin.mp4',
    '/video/kawasaki-zx-4r.mp4',
    '/video/ktm-390-duke.mp4',
    '/video/ktm-rc-390.mp4',
    '/video/yamaha-mt-15.mp4',
    '/video/yamaha-r15-v4.mp4',
    '/video/honda-hness-cb350.mp4',
    '/video/suzuki-hayabusa.mp4',
    '/video/ducati-panigale-v4.mp4',
    '/video/aprilia-rs-457.mp4',
    '/video/triumph-speed-400.mp4',
    '/video/harley-davidson-x440.mp4',
    '/video/harley-davidson-nightster.mp4',
    // 12 Brand videos
    '/video/BMW.mp4',
    '/video/dukati.mp4',
    '/video/kawasaki.mp4',
    '/video/yamaha.mp4',
    '/video/ktm.mp4',
    '/video/truihmp.mp4',
    '/video/aprila.mp4',
    '/video/royal enfield.mp4',
    encodeURI('/video/harley (1).mp4'),
    '/video/honda.mp4',
    '/video/suzuki.mp4',
    '/video/tvs.mp4',
    // 1 Homepage hero video
    encodeURI('/video/home page.mp4')
  ];

  for (const vUrl of videoUrls) {
    const res = await checkUrl(vUrl);
    assert(res.status === 200, `Video asset available at http://localhost:3000${vUrl} (HTTP ${res.status})`);
  }

  // 2. Data model audit
  console.log('\n--- 2. Centralized Motorcycle Data Video Connection ---');
  const motorcyclesContent = fs.readFileSync('./src/data/motorcycles.ts', 'utf8');
  const jsonMatch = motorcyclesContent.match(/export const MOTORCYCLES: Motorcycle\[\] = (\[[\s\S]*\]);/);
  assert(Boolean(jsonMatch), 'MOTORCYCLES array parsed successfully from src/data/motorcycles.ts');

  const motorcycles = JSON.parse(jsonMatch[1]);

  const all18BikeIds = [
    'royal-enfield-classic-350',
    'royal-enfield-hunter-350',
    'royal-enfield-bullet-350',
    'royal-enfield-meteor-350',
    'bmw-g-310-rr',
    'tvs-ronin',
    'kawasaki-zx-4r',
    'ktm-390-duke',
    'ktm-rc-390',
    'yamaha-mt-15',
    'yamaha-r15-v4',
    'honda-hness-cb350',
    'suzuki-hayabusa',
    'ducati-panigale-v4',
    'aprilia-rs-457',
    'triumph-speed-400',
    'harley-davidson-x440',
    'harley-davidson-nightster'
  ];

  for (const bId of all18BikeIds) {
    const b = motorcycles.find(m => m.id === bId);
    assert(Boolean(b && b.videos && b.videos.length > 0 && b.videos[0].includes(bId)),
      `Motorcycle "${bId}" has authentic video mapped in centralized data (${b?.videos?.[0]})`);
  }

  // 3. Missing Video Isolation (No Random Videos)
  console.log('\n--- 3. Missing Video Isolation (No Random Videos) ---');
  const duke200 = motorcycles.find(b => b.id === 'ktm-200-duke');
  assert(Boolean(duke200 && !duke200.videos),
    'KTM 200 Duke (no video yet) does not have any videos attached in centralized data');

  const panigaleV2 = motorcycles.find(b => b.id === 'ducati-panigale-v2');
  assert(Boolean(panigaleV2 && !panigaleV2.videos),
    'Ducati Panigale V2 (no video yet) does not have any videos attached in centralized data');

  // 4. Test resolver utility
  console.log('\n--- 4. Resolver Utility (getBikeVideo) Logic ---');
  const { getBikeVideo } = await import('../src/utils/bikeVideos.ts');

  const resolvedClassic = getBikeVideo(motorcycles.find(b => b.id === 'royal-enfield-classic-350'));
  assert(Boolean(resolvedClassic && resolvedClassic.src === '/video/royal-enfield-classic-350.mp4'),
    'Resolver correctly identifies Classic 350 video URL');

  const resolvedBMW = getBikeVideo(motorcycles.find(b => b.id === 'bmw-g-310-rr'));
  assert(Boolean(resolvedBMW && resolvedBMW.src === '/video/bmw-g-310-rr.mp4'),
    'Resolver correctly identifies BMW G 310 RR video URL');

  const resolvedMissing = getBikeVideo(duke200);
  assert(resolvedMissing === null,
    'Resolver returns NULL for bike without video (strictly prevents random video assignment)');

  // 5. Check UI Structure & Video Integration in BikeDetailPage.tsx
  console.log('\n--- 5. UI Structure & Video Integration in BikeDetailPage.tsx ---');
  const bikeDetailContent = fs.readFileSync('./src/pages/BikeDetailPage.tsx', 'utf8');

  const stageIndex = bikeDetailContent.indexOf('id="showroom-stage"');
  const specsIndex = bikeDetailContent.indexOf('id="specifications-section"');
  const galleryIndex = bikeDetailContent.indexOf('id="gallery-section"');
  const lowerVideoSection = bikeDetailContent.indexOf('id="video-section"');

  assert(stageIndex !== -1, 'Showroom Stage & Configurator exists');
  assert(specsIndex !== -1, 'Specifications & Features section exists');
  assert(galleryIndex !== -1, '5-Angle Gallery section exists');
  assert(stageIndex < specsIndex, 'Stage comes before Specifications');
  assert(specsIndex < galleryIndex, 'Specifications comes before 5-Angle Gallery');
  assert(lowerVideoSection === -1, 'Lower duplicate #video-section is completely REMOVED from bike detail page');

  const videoPlayerMatches = bikeDetailContent.match(/<VideoPlayer/g) || [];
  assert(videoPlayerMatches.length === 1,
    `Only ONE single VideoPlayer instance in BikeDetailPage (count: ${videoPlayerMatches.length}, integrated in upper Showroom Stage)`);
  assert(bikeDetailContent.includes("stageMode === 'video' && bikeVideo"),
    'Upper showroom stage seamlessly toggles between VideoPlayer and Studio Photo');

  // 6. Global Video Brightness & MotorcycleVideo Component
  console.log('\n--- 6. Global Video Brightness & MotorcycleVideo Component ---');
  const indexCss = fs.readFileSync('./src/index.css', 'utf8');
  assert(indexCss.includes('filter: brightness(1.16)') || indexCss.includes('filter: brightness(1.'),
    'Universal video brightness rule defined in index.css for global showroom fidelity');

  const motorcycleVideoExists = fs.existsSync('./src/components/MotorcycleVideo.tsx');
  assert(motorcycleVideoExists, 'MotorcycleVideo.tsx component created and available');

  const heroContent = fs.readFileSync('./src/components/Hero.tsx', 'utf8');
  assert(!heroContent.includes('brightness-[0.45]'), 'Hero video dark filter (brightness 0.45) removed');
  assert(heroContent.includes('brightness(1.15)'), 'Hero video enhanced with natural brightness');

  const brandDetailContent = fs.readFileSync('./src/pages/BrandDetailPage.tsx', 'utf8');
  assert(!brandDetailContent.includes('brightness-[0.42]'), 'Brand page dark filter (brightness 0.42) removed');

  const categoryDetailContent = fs.readFileSync('./src/pages/CategoryDetailPage.tsx', 'utf8');
  assert(!categoryDetailContent.includes('brightness-[0.28]'), 'Category page dark filter (brightness 0.28) removed');

  console.log('\n====================================================');
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
