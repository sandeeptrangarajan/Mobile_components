import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Layers, 
  Cpu, 
  ArrowUpDown, 
  X, 
  Sparkles, 
  Smartphone,
  Wrench,
  ShieldAlert
} from 'lucide-react';
import { BRANDS_DATA } from '../data/brandsData';
import { MODELS_DATA } from '../data/modelsData';
import { CATEGORIES_DATA } from '../data/componentsMeta';
import { getComponentsForModel } from '../data/componentsService';
import { ComponentCard } from '../components/common/ComponentCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ComponentItem } from '../types';

export const AllComponentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const queryBrand = searchParams.get('brand') || 'all';
  const queryModel = searchParams.get('model') || 'all';

  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedBrand, setSelectedBrand] = useState(queryBrand);
  const [selectedModel, setSelectedModel] = useState(queryModel);
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'price-asc' | 'price-desc' | 'difficulty'>('default');

  // Filter models based on selected brand
  const availableModels = useMemo(() => {
    if (selectedBrand === 'all') return MODELS_DATA;
    return MODELS_DATA.filter((m) => m.brandId === selectedBrand);
  }, [selectedBrand]);

  // Aggregate components from relevant models (default to top 15 models to maintain crisp high performance)
  const allLoadedComponents = useMemo(() => {
    let targetModels = MODELS_DATA;
    if (selectedBrand !== 'all') {
      targetModels = targetModels.filter((m) => m.brandId === selectedBrand);
    }
    if (selectedModel !== 'all') {
      targetModels = targetModels.filter((m) => m.id === selectedModel);
    } else {
      // Limit to 12 models if no model selected so list is snappy, or include all if filtered
      targetModels = targetModels.slice(0, 10);
    }

    const items: ComponentItem[] = [];
    for (const m of targetModels) {
      items.push(...getComponentsForModel(m.id));
    }
    return items;
  }, [selectedBrand, selectedModel]);

  // Filter and sort the components
  const filteredComponents = useMemo(() => {
    let result = allLoadedComponents.filter((comp) => {
      const matchesSearch =
        searchTerm === '' ||
        comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.compatibleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.compatibleBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || comp.categorySlug === selectedCategory;

      return matchesSearch && matchesCat;
    });

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'difficulty') {
      const diffOrder = { Beginner: 1, Moderate: 2, Advanced: 3, Expert: 4 };
      result.sort((a, b) => diffOrder[a.repairDifficulty] - diffOrder[b.repairDifficulty]);
    }

    return result;
  }, [allLoadedComponents, searchTerm, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedModel('all');
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Mobile Components Catalogue' }]} />

      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-blue-950 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <Wrench className="w-3.5 h-3.5" />
            <span>Universal Component Search & Exploration</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Mobile Components Directory
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Filter spare parts by mobile brand, phone model, component categories, repair difficulty, or search specific part numbers.
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search component name, part number, model, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="default">Default Order</option>
                <option value="name">Alphabetical (A - Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="difficulty">Repair Difficulty</option>
              </select>
            </div>

            {(searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedModel !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 flex items-center gap-1.5 transition-colors"
                title="Reset all filters"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Brand & Model Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Filter by Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel('all'); // reset model when brand changes
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Brands (18 Manufacturers)</option>
              {BRANDS_DATA.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Filter by Phone Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">
                {selectedBrand === 'all' ? 'All Sample Models' : `All ${BRANDS_DATA.find(b => b.id === selectedBrand)?.name} Models`}
              </option>
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.brandName} - {model.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Component Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All 9 Component Categories</option>
              {CATEGORIES_DATA.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Found <strong className="text-slate-900 font-bold">{filteredComponents.length}</strong> component items
          {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        </div>
        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium hidden sm:inline">
          Demonstration INR pricing and inventory
        </span>
      </div>

      {/* Components Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              showModelInfo={true}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No components match your search</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find any mobile components matching your combination of filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 shadow-sm"
          >
            Clear All Filters & Reset Search
          </button>
        </div>
      )}
    </div>
  );
};
