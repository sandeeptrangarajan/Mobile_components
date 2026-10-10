import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Smartphone, 
  Cpu, 
  Wrench, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { BRANDS_DATA } from '../data/brandsData';
import { MODELS_DATA } from '../data/modelsData';
import { CATEGORIES_DATA } from '../data/componentsMeta';
import { getFrequentlySearchedComponents } from '../data/componentsService';
import { BrandCard } from '../components/common/BrandCard';
import { ModelCard } from '../components/common/ModelCard';
import { ComponentCard } from '../components/common/ComponentCard';
import { StatsSection } from '../components/common/StatsSection';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { getRecentlyViewedModels, clearRecentlyViewed } = useApp();

  const recentlyViewed = getRecentlyViewedModels();
  const popularBrands = BRANDS_DATA.filter((b) => b.popular).slice(0, 8);
  const popularModels = MODELS_DATA.filter((m) => m.popular).slice(0, 6);
  const frequentlySearched = getFrequentlySearchedComponents();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/components?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white rounded-3xl border border-blue-100/60 shadow-xs">
        {/* Decorative background glow rings */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold mb-6 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Mobile Diagnostics & Spare Parts Intelligence</span>
            <span className="text-blue-500">•</span>
            <span className="text-blue-700">39 Detailed Components per Model</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Find the Right Mobile Components for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Every Phone.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore genuine spare parts, diagnostic hardware specifications, repair difficulty guides, and sample pricing across multiple brands and models. Designed for technicians, service workshops, and phone enthusiasts.
          </p>

          {/* Prominent Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="mt-8 sm:mt-10 max-w-2xl mx-auto relative group"
          >
            <div className="relative flex items-center shadow-lg shadow-blue-500/10 rounded-2xl bg-white border-2 border-slate-200 group-focus-within:border-blue-600 group-focus-within:ring-4 group-focus-within:ring-blue-100 transition-all overflow-hidden p-1.5 sm:p-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-3 shrink-0" />
              
              <input
                type="text"
                placeholder="Search mobile brand, model, or component..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base text-slate-900 bg-transparent placeholder:text-slate-400 focus:outline-none"
              />

              <button
                type="submit"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide transition-colors shrink-0 flex items-center gap-2 shadow-sm"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular Searches:</span>
            {['Samsung Galaxy S24', 'iPhone 16 Screen', 'Battery', 'Charging Board', 'Pixel 9 Pro Camera', 'OnePlus 12 Display'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchInput(tag);
                  navigate(`/components?search=${encodeURIComponent(tag)}`);
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors text-[11px] font-medium shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Exploded Phone Hardware Visual Showcase */}
          <div className="mt-10 sm:mt-12 relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src="/images/hero-exploded.jpg"
                alt="Exploded smartphone hardware components showing screen, frame, motherboard, and battery"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-4 text-left">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">
                      Interactive Hardware Anatomy
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                      39 Modular Spare-Part Assemblies Catalogued
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                      Explore displays, lithium batteries, multi-camera arrays, sub-charging boards, and logic circuits across 18 brands.
                    </p>
                  </div>
                  <Link
                    to="/models"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-lg transition-all"
                  >
                    <span>Browse Models</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC DASHBOARD & STATISTICS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Catalogue Overview & Statistics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live statistics generated dynamically from our comprehensive frontend dataset
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg hidden sm:inline">
            Active Dataset v2.4
          </span>
        </div>

        <StatsSection />
      </section>

      {/* POPULAR MOBILE BRANDS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leading Manufacturers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Mobile Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any brand to browse its specific phone models and corresponding component catalogues
            </p>
          </div>

          <Link
            to="/brands"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>All 18 Brands</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
          {popularBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* POPULAR MOBILE MODELS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Trending Flagships & Bestsellers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Mobile Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore all 39 hardware components for each device with interactive diagnostics
            </p>
          </div>

          <Link
            to="/models"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>All Models</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
          {popularModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      {/* COMPONENT CATEGORIES SHOWCASE */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-3xl mb-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            39 Component Types Structured
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
            Comprehensive 9 Component Categories
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Every phone model has its parts catalogued cleanly across nine standardized mechanical and electronic hardware domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.slug}
              to={`/components?category=${cat.slug}`}
              className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-400 font-mono">
                  {cat.componentCount} Parts
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FREQUENTLY SEARCHED COMPONENTS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Wrench className="w-3.5 h-3.5" />
              <span>Service Center Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Searched Components
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              High-demand repair items with sample price estimates in Indian Rupees (₹)
            </p>
          </div>

          <Link
            to="/components"
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            <span>Explore All Parts</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {frequentlySearched.map((comp) => (
            <ComponentCard key={comp.id} component={comp} showModelInfo={true} />
          ))}
        </div>
      </section>

      {/* RECENTLY EXPLORED MODELS SECTION */}
      {recentlyViewed.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Recently Explored Models
                </h2>
                <p className="text-xs text-slate-500">
                  Pick up right where you left off (persisted in your local browser storage)
                </p>
              </div>
            </div>

            <button
              onClick={clearRecentlyViewed}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
            >
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyViewed.map((model) => (
              <Link
                key={model.id}
                to={`/model/${model.id}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase">
                    {model.brandName}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {model.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {model.releaseYear} • {model.modelCode}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* TECHNICIAN BENCHMARK CALLOUT */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
            <span>Built for Mobile Technicians & Service Centers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need to compare parts across two different models?
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Use our interactive comparison engine to check camera sensor differences, battery capacities, and verify part incompatibility before ordering replacements.
          </p>
        </div>

        <Link
          to="/compare"
          className="px-6 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 transition-all shadow-md shrink-0 flex items-center gap-2 hover:scale-105"
        >
          <span>Launch Comparison Tool</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
