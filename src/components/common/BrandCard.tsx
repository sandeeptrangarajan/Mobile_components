import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import { MobileBrand } from '../../types';

interface BrandCardProps {
  brand: MobileBrand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);

  return (
    <Link
      to={`/brand/${brand.id}`}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
    >
      {/* ── Hero Phone Image Panel ─────────────────────────── */}
      <div
        className="relative h-40 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: `${brand.accentColor}12` }}
      >
        {/* Background soft radial gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${brand.accentColor}60, transparent 70%)`,
          }}
        />

        {/* Phone hero image */}
        {!heroError ? (
          <img
            src={brand.heroImageUrl}
            alt={`${brand.name} flagship phone`}
            className="h-36 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
            onError={() => setHeroError(true)}
          />
        ) : (
          /* Fallback illustration */
          <div className="relative z-10 flex flex-col items-center gap-1 text-slate-400">
            <svg viewBox="0 0 24 24" className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.2}>
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <circle cx="12" cy="18.5" r="0.75" fill="currentColor" />
              <rect x="9" y="4" width="6" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </div>
        )}

        {/* Top-left accent color bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: brand.accentColor }}
        />

        {/* Models count badge */}
        <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-sm text-slate-700">
          {brand.totalModelsSample} Models
        </span>
      </div>

      {/* ── Brand Info Panel ───────────────────────────────── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Real Brand Logo */}
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-1.5 shrink-0 overflow-hidden group-hover:shadow-md transition-shadow">
            {!logoError ? (
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span
                className="text-base font-black"
                style={{ color: brand.accentColor }}
              >
                {brand.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors truncate leading-tight">
              {brand.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{brand.headquarters.split(',').slice(-1)[0].trim()}</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {brand.tagline}
        </p>

        {/* Footer row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-md"
            style={{ backgroundColor: `${brand.accentColor}15`, color: brand.accentColor }}
          >
            {brand.marketShareInfo}
          </span>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
            Explore <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
