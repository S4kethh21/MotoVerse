import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOTORCYCLES } from '../data/motorcycles';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { BikeCard } from '../components/BikeCard';
import { Search, RotateCcw, SlidersHorizontal, Filter } from 'lucide-react';
import type { Motorcycle } from '../types';

interface ExplorePageProps {
  onToggleCompare?: (bike: Motorcycle) => void;
  comparedBikeIds?: string[];
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onToggleCompare,
  comparedBikeIds = [],
}) => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialBrand = searchParams.get('brand') || 'All';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedEngineRange, setSelectedEngineRange] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    const b = searchParams.get('brand');
    if (b !== null) setSelectedBrand(b);
    const c = searchParams.get('category');
    if (c !== null) setSelectedCategory(c);
  }, [searchParams]);

  const filteredBikes = useMemo(() => {
    let result = MOTORCYCLES.filter((bike) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = bike.name.toLowerCase().includes(q);
        const matchBrand = bike.brand.toLowerCase().includes(q);
        const matchCat = bike.category.toLowerCase().includes(q);
        const matchTag = bike.tagline.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCat && !matchTag) return false;
      }

      // Brand
      if (selectedBrand !== 'All' && bike.brand !== selectedBrand) {
        return false;
      }

      // Category
      if (selectedCategory !== 'All' && bike.category !== selectedCategory) {
        return false;
      }

      // Engine Range
      if (selectedEngineRange === 'under-200' && bike.displacement >= 200) return false;
      if (selectedEngineRange === '200-400' && (bike.displacement < 200 || bike.displacement > 400)) return false;
      if (selectedEngineRange === '400-600' && (bike.displacement < 400 || bike.displacement > 600)) return false;
      if (selectedEngineRange === '600-1000' && (bike.displacement < 600 || bike.displacement > 1000)) return false;
      if (selectedEngineRange === '1000-plus' && bike.displacement <= 1000) return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'power-desc') return b.power - a.power;
      if (sortBy === 'displacement-desc') return b.displacement - a.displacement;
      if (sortBy === 'weight-asc') return a.weight - b.weight;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [searchQuery, selectedBrand, selectedCategory, selectedEngineRange, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedBrand('All');
    setSelectedCategory('All');
    setSelectedEngineRange('all');
    setSortBy('name-asc');
  };

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedBrand !== 'All' ||
    selectedCategory !== 'All' ||
    selectedEngineRange !== 'all';

  return (
    <div className="min-h-screen bg-[#0a0c0f] pt-24 pb-24 text-white">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-[#222631]">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-500 mb-1">
            VERIFIED MOTORCYCLE FLEET
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                Explore All Machines
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Discover specs, powertrain benchmarks, and chassis details for over 70 premier motorcycles.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 bg-[#111318] px-4 py-2 rounded-lg border border-[#222631] self-start sm:self-auto">
              Showing <span className="text-white font-bold">{filteredBikes.length}</span> of {MOTORCYCLES.length} bikes
            </div>
          </div>
        </div>

        {/* Compact Filter Toolbar */}
        <div className="bg-[#111318] rounded-xl border border-[#222631] p-4 sm:p-5 mb-10 space-y-4">
          {/* Top Row: Search + Brand + Discipline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search model, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0c0f] border border-[#262a35] rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Brand Dropdown */}
            <div>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#0a0c0f] border border-[#262a35] rounded-lg px-3 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-red-500 uppercase font-mono transition-colors"
              >
                <option value="All">All Brands (12)</option>
                {BRANDS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0a0c0f] border border-[#262a35] rounded-lg px-3 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-red-500 uppercase font-mono transition-colors"
              >
                <option value="All">All Disciplines (6)</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Engine Range Dropdown */}
            <div>
              <select
                value={selectedEngineRange}
                onChange={(e) => setSelectedEngineRange(e.target.value)}
                className="w-full bg-[#0a0c0f] border border-[#262a35] rounded-lg px-3 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-red-500 uppercase font-mono transition-colors"
              >
                <option value="all">All Engine Sizes</option>
                <option value="under-200">Under 200 cc</option>
                <option value="200-400">200 – 400 cc</option>
                <option value="400-600">400 – 600 cc</option>
                <option value="600-1000">600 – 1,000 cc</option>
                <option value="1000-plus">1,000+ cc</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Sort & Reset Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0a0c0f] border border-[#262a35] rounded-md px-2.5 py-1 text-xs text-neutral-300 focus:outline-none font-mono uppercase"
              >
                <option value="name-asc">Model Name (A–Z)</option>
                <option value="power-desc">Highest Power (bhp)</option>
                <option value="displacement-desc">Highest Displacement (cc)</option>
                <option value="weight-asc">Lowest Curb Weight (kg)</option>
              </select>
            </div>

            {isFiltered && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono uppercase text-red-400 hover:text-red-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Motorcycle Grid */}
        {filteredBikes.length === 0 ? (
          <div className="py-24 text-center bg-[#111318] rounded-xl border border-[#222631]">
            <Filter className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white uppercase font-display mb-1">
              No Motorcycles Found
            </h3>
            <p className="text-neutral-400 text-xs max-w-sm mx-auto mb-6">
              Try broadening your search query or reset the filter selections.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-[#e50914] text-white font-bold text-xs uppercase rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBikes.map((bike) => (
              <BikeCard
                key={bike.id}
                bike={bike}
                onToggleCompare={onToggleCompare}
                isCompared={comparedBikeIds.includes(bike.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
