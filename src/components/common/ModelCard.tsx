import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ChevronRight, Cpu, Battery } from 'lucide-react';
import { MobileModel } from '../../types';
import { getBrandById } from '../../data/brandsData';

interface ModelCardProps {
  model: MobileModel;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const [imgError, setImgError] = useState(false);
  const brand = getBrandById(model.brandId);
  const accentColor = brand?.accentColor ?? '#2563eb';

  return (
    <Link
      to={`/model/${model.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden hover:-translate-y-1 active:scale-[0.99] cursor-pointer"
    >
      {/* ── Phone Photo Panel ────────────────────────────── */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          height: '200px',
          background: `linear-gradient(135deg, ${accentColor}10 0%, ${accentColor}06 50%, #f8fafc 100%)`,
        }}
      >
        {/* Soft glow blob */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${accentColor}55, transparent 65%)`,
          }}
        />

        {/* Real phone image */}
        {model.imageUrl && !imgError ? (
          <img
            src={model.imageUrl}
            alt={`${model.name} phone`}
            className="h-44 object-contain drop-shadow-2xl group-hover:scale-105 group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] transition-all duration-500 relative z-10"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Stylised fallback mockup */
          <div className="relative z-10 w-24 h-40 rounded-[18px] bg-white border-2 border-slate-200 shadow-xl flex flex-col items-center justify-between p-2 group-hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-1.5 bg-slate-700 rounded-full" />
            <div
              className="w-full flex-1 my-1.5 rounded-xl flex flex-col items-center justify-center gap-1 text-white text-[7px] font-bold"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
            >
              <Smartphone className="w-5 h-5 opacity-80" />
              <span className="text-center leading-tight px-1 truncate max-w-full">{model.name}</span>
            </div>
            <div className="w-4 h-0.5 bg-slate-200 rounded-full" />
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/60 shadow-sm">
          {model.releaseYear}
        </div>

        {/* Brand logo overlay (small) */}
        {brand?.logoUrl && (
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg border border-white/60 shadow-sm flex items-center justify-center p-1">
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      {/* ── Model Details ────────────────────────────────── */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              {model.brandName}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              39 Parts
            </span>
          </div>

          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
            {model.name}
          </h3>

          {/* Key specs */}
          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-start gap-2">
              <Smartphone className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />
              <span className="line-clamp-1">{model.displayInfo}</span>
            </div>
            <div className="flex items-start gap-2">
              <Cpu className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />
              <span className="line-clamp-1">{model.processorInfo}</span>
            </div>
            <div className="flex items-start gap-2">
              <Battery className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />
              <span>{model.batteryCapacity}</span>
            </div>
          </div>
        </div>

        {/* Color dots */}
        {model.colorOptions.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400 font-medium">Colors:</span>
            {model.colorOptions.slice(0, 4).map((color) => (
              <span
                key={color}
                title={color}
                className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-full"
              >
                {color}
              </span>
            ))}
          </div>
        )}

        {/* CTA button inside link */}
        <div
          className="mt-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow-md text-white group-hover:brightness-105"
          style={{ backgroundColor: accentColor }}
        >
          <span>View 39 Components</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
