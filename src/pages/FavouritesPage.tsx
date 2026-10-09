import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Wrench, Search, Sparkles, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ComponentCard } from '../components/common/ComponentCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const FavouritesPage: React.FC = () => {
  const { favourites, getFavouriteComponents, clearFavourites } = useApp();
  const [searchFilter, setSearchFilter] = useState('');

  const savedComponents = getFavouriteComponents();

  const filteredItems = savedComponents.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.compatibleModel.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.partNumber.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const totalEstimatedCost = savedComponents.reduce((sum, item) => sum + item.priceINR, 0);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Saved Favourites' }]} />

      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-navy-950 text-white relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-3 border border-rose-400/30">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>Personal Spare-Parts Workbench</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Saved Favourite Components
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Quickly monitor required spare parts, check sample price estimates, and keep track of pending repairs.
            </p>
          </div>

          {savedComponents.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right shrink-0">
              <span className="text-xs text-rose-200 block">Total Sample Estimate</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                ₹{totalEstimatedCost.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block">
                {savedComponents.length} saved parts
              </span>
            </div>
          )}
        </div>
      </div>

      {savedComponents.length > 0 ? (
        <div className="space-y-6">
          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search within saved components..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              onClick={clearFavourites}
              className="px-4 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Favourites</span>
            </button>
          </div>

          {/* Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((comp) => (
                <ComponentCard key={comp.id} component={comp} showModelInfo={true} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">
                No saved components match your query "{searchFilter}".
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Favourite Components Saved Yet</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Click the heart icon on any component card or details page to bookmark it for quick access and quotation calculation.
          </p>
          <div className="pt-2">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md"
            >
              <span>Explore Mobile Components Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
