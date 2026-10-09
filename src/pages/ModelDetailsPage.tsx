import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Smartphone,
  Search,
  Scale,
  Cpu,
  Battery,
  Camera,
  ChevronLeft,
  ArrowUpDown,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { getModelById } from '../data/modelsData';
import { getBrandById } from '../data/brandsData';
import { getComponentsForModel } from '../data/componentsService';
import { CATEGORIES_DATA } from '../data/componentsMeta';
import { ComponentCard } from '../components/common/ComponentCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';

export const ModelDetailsPage: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = getModelById(modelId || '');
  const { addRecentlyViewedModel, setCompareModel1Id } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [componentSearch, setComponentSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('number');
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (model) addRecentlyViewedModel(model.id);
  }, [model]);

  if (!model) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Model Not Found</h2>
        <p className="text-sm text-slate-500">The requested phone model could not be located.</p>
        <Link to="/models" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700">
          <ChevronLeft className="w-4 h-4" /><span>Back to Models</span>
        </Link>
      </div>
    );
  }

  const brand = getBrandById(model.brandId);
  const accentColor = brand?.accentColor ?? '#2563eb';

  const allComponents = useMemo(() => getComponentsForModel(model.id), [model.id]);

  const filteredComponents = useMemo(() => {
    let result = allComponents.filter((comp) => {
      const matchesCategory = selectedCategory === 'all' ? true : comp.categorySlug === selectedCategory;
      const matchesSearch =
        comp.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        comp.partNumber.toLowerCase().includes(componentSearch.toLowerCase()) ||
        comp.basicFunction.toLowerCase().includes(componentSearch.toLowerCase()) ||
        comp.category.toLowerCase().includes(componentSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'price-asc') result.sort((a, b) => a.priceINR - b.priceINR);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.priceINR - a.priceINR);
    else if (sortBy === 'difficulty') {
      const order = { Beginner: 1, Moderate: 2, Advanced: 3, Expert: 4 };
      result.sort((a, b) => order[a.repairDifficulty] - order[b.repairDifficulty]);
    } else result.sort((a, b) => a.componentNumber - b.componentNumber);

    return result;
  }, [allComponents, selectedCategory, componentSearch, sortBy]);

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'All Brands', path: '/brands' },
          { label: model.brandName, path: `/brand/${model.brandId}` },
          { label: model.name },
        ]}
      />

      {/* ══════════════════════════════════════════════════
          MODEL HERO BANNER — Real Phone Image
      ══════════════════════════════════════════════════ */}
      <div
        className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative"
        style={{
          background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}0a 50%, #0f172a 100%)`,
        }}
      >
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle, ${accentColor}80, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row relative z-10">

          {/* ── Left: Phone Image ── */}
          <div
            className="relative flex items-end justify-center lg:w-72 xl:w-80 shrink-0 overflow-hidden"
            style={{ minHeight: '280px' }}
          >
            {/* Radial glow behind phone */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 90%, ${accentColor}90, transparent 65%)` }}
            />

            {model.imageUrl && !imgError ? (
              <img
                src={model.imageUrl}
                alt={`${model.brandName} ${model.name}`}
                className="relative z-10 h-60 lg:h-72 xl:h-80 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Stylised fallback */
              <div className="relative z-10 w-28 h-52 rounded-[22px] bg-slate-800 border-2 border-slate-600 shadow-2xl flex flex-col items-center justify-between p-2 mb-4">
                <div className="w-10 h-1.5 bg-slate-900 rounded-full" />
                <div className="w-full flex-1 my-2 rounded-lg flex flex-col items-center justify-center gap-1 text-white"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>
                  <Smartphone className="w-8 h-8 opacity-80" />
                  <span className="text-[8px] font-bold text-center px-1">{model.name}</span>
                </div>
                <div className="w-6 h-0.5 bg-slate-600 rounded-full" />
              </div>
            )}
          </div>

          {/* ── Right: Model Info ── */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 text-white">

            {/* Top: Brand + Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Brand logo */}
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-1.5 overflow-hidden backdrop-blur-sm">
                  {brand?.logoUrl && !logoError ? (
                    <img src={brand.logoUrl} alt={model.brandName}
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)} />
                  ) : (
                    <span className="text-xs font-black text-white">{model.brandName.slice(0, 2)}</span>
                  )}
                </div>

                <Link to={`/brand/${model.brandId}`}
                  className="text-xs font-extrabold uppercase tracking-widest hover:underline"
                  style={{ color: accentColor === '#1d1d1f' ? '#60a5fa' : accentColor }}>
                  {model.brandName}
                </Link>

                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
                  style={{ color: accentColor === '#1d1d1f' ? '#60a5fa' : accentColor, borderColor: `${accentColor}50`, backgroundColor: `${accentColor}20` }}>
                  {model.releaseYear} Edition
                </span>

                <span className="text-[11px] font-mono text-slate-400">{model.modelCode}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {model.name}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Full 39-component spare parts breakdown with part numbers, compatibility validation, repair difficulty ratings, and pricing in ₹.
              </p>
            </div>

            {/* Spec Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Smartphone className="w-3.5 h-3.5 text-blue-400" />, label: model.displayInfo.split(',')[0] },
                { icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" />, label: model.processorInfo.split('(')[0].trim() },
                { icon: <Battery className="w-3.5 h-3.5 text-emerald-400" />, label: model.batteryCapacity },
                { icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, label: model.chargingSpeed },
                { icon: <Camera className="w-3.5 h-3.5 text-pink-400" />, label: model.cameraSetup.split('+')[0].trim() },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200 backdrop-blur-sm">
                  {icon}<span className="truncate max-w-[200px]">{label}</span>
                </span>
              ))}
            </div>

            {/* Color swatches */}
            {model.colorOptions.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-400 font-medium">Available Colors:</span>
                {model.colorOptions.map((c) => (
                  <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300">{c}</span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/compare"
                onClick={() => setCompareModel1Id(model.id)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl"
              >
                <Scale className="w-4 h-4" />
                <span>Compare with Another Model</span>
              </Link>
              <div className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
                39 Parts Catalogued
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          FILTER & CATEGORY TOOLBAR
      ══════════════════════════════════════════════════ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search components for ${model.name} (e.g. screen, battery, camera)…`}
              value={componentSearch}
              onChange={(e) => setComponentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer">
              <option value="number">Part # Order (1 – 39)</option>
              <option value="name">Alphabetical (A – Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="difficulty">Repair Difficulty</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              All 39 Components ({allComponents.length})
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const count = allComponents.filter((c) => c.categorySlug === cat.slug).length;
              return (
                <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat.slug ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <strong className="text-slate-900 font-bold">{filteredComponents.length}</strong> components for{' '}
          <strong className="text-blue-600">{model.brandName} {model.name}</strong>
          {selectedCategory !== 'all' && ` in "${CATEGORIES_DATA.find((c) => c.slug === selectedCategory)?.name}"`}
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>All 39 standard component categories available</span>
        </div>
      </div>

      {/* Components Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} component={component} showModelInfo={false} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No components match your search</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">No parts matching "{componentSearch}" were found.</p>
          <button onClick={() => { setSelectedCategory('all'); setComponentSearch(''); }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700">
            Reset Filters
          </button>
        </div>
      )}

      {/* Compatibility Note */}
      <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-blue-900">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm">Technician Compatibility Note</span>
            <span className="text-blue-800/80 leading-relaxed">
              Components for {model.brandName} {model.name} are matched to chassis code {model.modelCode}. Always verify flex connectors and pinouts before ordering replacements.
            </span>
          </div>
        </div>
        <Link to="/compare" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0 hover:bg-blue-700 transition-colors">
          Verify Compatibility
        </Link>
      </div>
    </div>
  );
};
