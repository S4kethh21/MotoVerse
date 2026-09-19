# MotoVerse

**Motorcycles. Stories. The Ride.**

MotoVerse is a modern, responsive motorcycle discovery, comparison, and showroom platform engineered with a dark automotive aesthetic. Explore 74+ verified manufacturer motorcycles across 12 iconic global marques.

## Key Features

- **Find Your Machine**: Interactive motorcycle showcase featuring video previews for flagship supersports and roadsters (BMW S 1000 RR, Yamaha R15 V4, TVS Ronin, Kawasaki Ninja H2).
- **12 Iconic Marque Showrooms**: Complete official brand portfolios for Royal Enfield, BMW Motorrad, TVS, Yamaha, Kawasaki, KTM, Honda, Suzuki, Triumph, Ducati, Aprilia, and Harley-Davidson.
- **Studio Showroom & Configurator**: Colourway switching with authentic manufacturer photography and 5-angle editorial galleries.
- **Minimal DomeGallery**: Fullscreen interactive motorcycle photography dome displaying 185 unique high-resolution bikes with zero repetitions.
- **Optimized Performance**: Route-level lazy loading (`React.lazy` + `Suspense`) and Rollup vendor code-splitting.

## Tech Stack

- **Framework**: React 19, TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Gestures**: `@use-gesture/react`
- **Linting**: Oxlint

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Verification & Testing

```bash
npm run validate:images   # Verifies all 1,700+ motorcycle asset paths on disk
npm run test:bikes         # Tests consistency, video streams, and showroom data integrity
npm run lint               # Lints source code with Oxlint
```
