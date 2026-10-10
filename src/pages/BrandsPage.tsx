import React, { useState } from 'react';
import { Search, Sparkles, Filter, Smartphone } from 'lucide-react';
import { BRANDS_DATA } from '../data/brandsData';
import { BrandCard } from '../components/common/BrandCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const BrandsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'popular'>('all');

  const filteredBrands = BRANDS_DATA.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.headquarters.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' ? true : brand.popular;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'All Brands' }]} />

      {/* Header Banner with brand logo mosaic */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden shadow-xl">
        {/* Glow orbs */}
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-stretch">
          {/* Text */}
          <div className="flex-1 p-6 sm:p-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
              <Smartphone className="w-3.5 h-3.5" />
              <span>18 Major Smartphone Brands Catalogued</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Mobile Brand Directory</h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Select a brand to explore its phone models, hardware schematics, and complete 39-part component catalogues.
            </p>
          </div>

          {/* Brand logo mosaic */}
          <div className="relative p-6 flex flex-wrap items-center justify-center gap-3 md:w-80 lg:w-96">
            {BRANDS_DATA.filter((b) => b.popular).slice(0, 9).map((brand) => (
              <div
                key={brand.id}
                title={brand.name}
                className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center p-2 hover:bg-white/20 transition-colors"
              >
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="w-full h-full object-contain brightness-0 invert"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    (el.parentElement as HTMLElement).innerHTML = `<span style="font-size:9px;font-weight:900;color:white">${brand.name.slice(0, 3)}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search brand name, tagline, headquarters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All 18 Brands
          </button>
          <button
            onClick={() => setFilterType('popular')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterType === 'popular'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Tier</span>
          </button>
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No brands found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            No brands matched your search query "{searchTerm}". Try clearing your filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
