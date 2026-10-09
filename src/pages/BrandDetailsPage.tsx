import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ChevronLeft, Building2, Calendar } from 'lucide-react';
import { getBrandById } from '../data/brandsData';
import { getModelsByBrand } from '../data/modelsData';
import { ModelCard } from '../components/common/ModelCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const BrandDetailsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = getBrandById(brandId || '');
  const [modelSearch, setModelSearch] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);

  if (!brand) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Brand Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested brand could not be found in the current demonstration catalogue.
        </p>
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Brands</span>
        </Link>
      </div>
    );
  }

  const models = getModelsByBrand(brand.id);
  const filteredModels = models.filter((m) =>
    m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
    m.modelCode.toLowerCase().includes(modelSearch.toLowerCase()) ||
    m.processorInfo.toLowerCase().includes(modelSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'All Brands', path: '/brands' },
          { label: brand.name }
        ]}
      />

      {/* Brand Header Card */}
      <div
        className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative"
        style={{ background: `linear-gradient(135deg, ${brand.accentColor}18, ${brand.accentColor}08 60%, #ffffff)` }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: brand.accentColor }} />

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {/* Left: Brand info */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between gap-5">
            <div className="flex items-center gap-5">
              {/* Real Brand Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center p-2.5 shrink-0 overflow-hidden">
                {!logoError ? (
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-xl font-black" style={{ color: brand.accentColor }}>
                    {brand.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {brand.name}
                  </h1>
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${brand.accentColor}18`, color: brand.accentColor }}
                  >
                    {brand.marketShareInfo}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">{brand.tagline}</p>
              </div>
            </div>

            {/* Meta stats */}
            <div className="flex items-center gap-6 text-xs text-slate-500 border-t border-slate-100/80 pt-4">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Headquarters</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3" />{brand.headquarters}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Founded</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" />{brand.foundedYear}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Catalogued</span>
                <span className="font-bold mt-0.5 block" style={{ color: brand.accentColor }}>{models.length} Models</span>
              </div>
            </div>
          </div>

          {/* Right: Flagship Phone Image */}
          <div
            className="w-full md:w-64 lg:w-80 flex items-end justify-center relative overflow-hidden"
            style={{ minHeight: '200px', background: `linear-gradient(160deg, ${brand.accentColor}20, ${brand.accentColor}08)` }}
          >
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 60% 80%, ${brand.accentColor}70, transparent 60%)` }}
            />
            {!heroError ? (
              <img
                src={brand.heroImageUrl}
                alt={`${brand.name} flagship phone`}
                className="h-48 md:h-56 lg:h-64 object-contain drop-shadow-2xl relative z-10"
                onError={() => setHeroError(true)}
              />
            ) : (
              <div className="h-48 flex items-center justify-center opacity-20">
                <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke={brand.accentColor} strokeWidth={1.5}>
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="18.5" r="0.75" fill={brand.accentColor} />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Available {brand.name} Phone Models
          </h2>
          <p className="text-xs text-slate-500">
            Click "View Components" on any model to explore its 39 dedicated spare parts
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={`Filter ${brand.name} models...`}
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Models Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 text-sm">
            No models found matching "{modelSearch}".
          </p>
        </div>
      )}

      {/* Sample data note */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
        <span>
          Note: This model list represents a curated sample catalogue for {brand.name} and can be extended dynamically.
        </span>
        <Link to="/models" className="font-bold text-amber-900 underline hover:no-underline ml-4 shrink-0">
          Browse All Brands' Models &rarr;
        </Link>
      </div>
    </div>
  );
};
