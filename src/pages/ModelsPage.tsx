import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Smartphone, Sparkles, X, AlertCircle } from 'lucide-react';
import { MODELS_DATA } from '../data/modelsData';
import { BRANDS_DATA } from '../data/brandsData';
import { ModelCard } from '../components/common/ModelCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const ModelsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand') || 'all';

  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [modelSearch, setModelSearch] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredModels = useMemo(() => {
    return MODELS_DATA.filter((model) => {
      const matchesBrand = selectedBrand === 'all' ? true : model.brandId === selectedBrand;
      const matchesSearch =
        model.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
        model.brandName.toLowerCase().includes(modelSearch.toLowerCase()) ||
        model.modelCode.toLowerCase().includes(modelSearch.toLowerCase()) ||
        model.processorInfo.toLowerCase().includes(modelSearch.toLowerCase());
      const matchesYear =
        selectedYear === 'all' ? true : model.releaseYear.toString() === selectedYear;

      return matchesBrand && matchesSearch && matchesYear;
    });
  }, [selectedBrand, modelSearch, selectedYear]);

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    if (brandId === 'all') {
      searchParams.delete('brand');
    } else {
      searchParams.set('brand', brandId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedBrand('all');
    setModelSearch('');
    setSelectedYear('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Mobile Models' }]} />

      {/* Header Banner with phone image strip */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden shadow-xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Text area */}
          <div className="flex-1 p-6 sm:p-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{MODELS_DATA.length} Models Across 18 Brands</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Mobile Phone Models Catalogue
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Browse every phone model — each with 39 spare part listings, repair guides, part numbers, and ₹ pricing.
            </p>
          </div>

          {/* Phone images strip */}
          <div className="relative overflow-hidden h-40 lg:h-auto lg:w-96 flex items-end justify-center gap-2 px-4 pb-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-transparent lg:bg-none pointer-events-none z-10" />
            {MODELS_DATA.filter((m) => m.popular && m.imageUrl).slice(0, 5).map((m, i) => (
              <img
                key={m.id}
                src={m.imageUrl}
                alt={m.name}
                className="h-28 lg:h-36 xl:h-44 object-contain drop-shadow-2xl relative z-0 shrink-0"
                style={{ transform: `rotate(${[-4, -2, 0, 2, 4][i]}deg) translateY(${[6, 3, 0, 3, 6][i]}px)` }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ))}
          </div>
        </div>
      </div>


      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search model name (e.g. Galaxy S24, iPhone 16, Dimensity)..."
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Year selector */}
          <div className="flex items-center gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Release Years</option>
              <option value="2024">2024 Flagships</option>
              <option value="2023">2023 Handsets</option>
              <option value="2022">2022 & Older</option>
            </select>

            {(selectedBrand !== 'all' || modelSearch !== '' || selectedYear !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 flex items-center gap-1.5 transition-colors"
                title="Reset filters"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Brand horizontal pill scroll list with logos */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleBrandChange('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedBrand === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              All ({MODELS_DATA.length})
            </button>

            {BRANDS_DATA.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                title={brand.name}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedBrand === brand.id
                    ? 'text-white shadow-sm border-transparent'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
                style={selectedBrand === brand.id ? { backgroundColor: brand.accentColor, borderColor: brand.accentColor } : {}}
              >
                {/* Brand logo thumbnail */}
                <span className={`w-5 h-5 rounded flex items-center justify-center overflow-hidden shrink-0 ${selectedBrand === brand.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="w-4 h-4 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </span>
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Model Results Counter & Sample Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900 font-bold">{filteredModels.length}</strong> mobile models
          {selectedBrand !== 'all' && ` for ${BRANDS_DATA.find((b) => b.id === selectedBrand)?.name}`}
        </span>
        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-medium hidden sm:inline">
          Demonstration dataset — expandable to full product lines
        </span>
      </div>

      {/* Models Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No mobile models match your criteria</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords or resetting your brand filter.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
