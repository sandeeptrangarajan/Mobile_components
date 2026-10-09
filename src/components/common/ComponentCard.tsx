import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Sparkles,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { ComponentItem } from '../../types';
import { ComponentIcon } from './ComponentIcon';
import { useApp } from '../../context/AppContext';
import { ComponentImageModal } from './ComponentImageModal';

interface ComponentCardProps {
  component: ComponentItem;
  showModelInfo?: boolean;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  showModelInfo = true
}) => {
  const { isFavourite, toggleFavourite } = useApp();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const isFav = isFavourite(component.id);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Expert':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'Limited Stock':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'Special Order':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500'
        };
      default:
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500'
        };
    }
  };

  const avail = getAvailabilityBadge(component.availability);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
        
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 group-hover:h-2 transition-all" />

        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {/* Header Row: Number + Category + Favourite */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                #{component.componentNumber}
              </span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                {component.category}
              </span>
            </div>

            <button
              onClick={() => toggleFavourite(component.id)}
              className={`p-2 rounded-xl transition-all ${
                isFav
                  ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                  : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
              }`}
              title={isFav ? 'Remove from Favourites' : 'Save to Favourites'}
              aria-label="Toggle favourite"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Visual Product Image / Icon Illustration + Title */}
          <div className="flex items-start gap-3.5 mb-4">
            <div 
              onClick={() => setShowPreviewModal(true)}
              className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 group-hover:border-blue-400 transition-all cursor-pointer relative shrink-0 shadow-xs overflow-hidden"
              title="Click to preview schematic CAD and photos"
            >
              {component.imageUrl ? (
                <img
                  src={component.imageUrl}
                  alt={component.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-100 to-blue-50 text-blue-600 group-hover:scale-105 transition-transform">
                  <ComponentIcon name={component.iconName} className="w-8 h-8" />
                </div>
              )}
              <span className="absolute bottom-1 right-1 bg-slate-900/80 backdrop-blur-xs p-1 rounded-md text-white opacity-80 group-hover:opacity-100">
                <Eye className="w-3 h-3" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <Link 
                to={`/component/${component.id}`}
                className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors block line-clamp-1"
              >
                {component.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-mono text-slate-500 truncate">
                  Part: {component.partNumber}
                </span>
                <span className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                  Demo
                </span>
              </div>
            </div>
          </div>

          {/* Compatible Phone Model Info */}
          {showModelInfo && (
            <div className="mb-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px] block">Compatible Model:</span>
              <span className="font-semibold text-slate-800">
                {component.compatibleBrand} {component.compatibleModel}
              </span>
            </div>
          )}

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed flex-1">
            {component.shortDescription}
          </p>

          {/* Metadata badges row */}
          <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Wrench className="w-3.5 h-3.5 text-slate-400" />
              <span className={`px-2 py-0.5 rounded font-medium border text-[10px] ${getDifficultyBadge(component.repairDifficulty)}`}>
                {component.repairDifficulty}
              </span>
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${avail.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
                {component.availability}
              </span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                  ₹{component.priceINR.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">sample</span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                {component.qualityGrade}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100"
                title="Preview Schematic"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              <Link
                to={`/component/${component.id}`}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-xs group-hover:shadow-md"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image / Schematic Preview Modal */}
      <ComponentImageModal
        component={component}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </>
  );
};
