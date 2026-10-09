import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Scale, 
  ShieldAlert, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Sparkles, 
  Tag, 
  Cpu, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { getComponentById } from '../data/componentsService';
import { getModelById } from '../data/modelsData';
import { ComponentIcon } from '../components/common/ComponentIcon';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ComponentImageModal } from '../components/common/ComponentImageModal';
import { useApp } from '../context/AppContext';

export const ComponentDetailsPage: React.FC = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite, setCompareModel1Id } = useApp();

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [copiedPartNumber, setCopiedPartNumber] = useState(false);

  const component = getComponentById(componentId || '');
  const isFav = component ? isFavourite(component.id) : false;

  if (!component) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Component Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested mobile component identifier does not match any entry in our demonstration database.
        </p>
        <Link
          to="/components"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Components</span>
        </Link>
      </div>
    );
  }

  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>(component?.imageUrl ? 'photo' : 'schematic');

  const model = getModelById(component.compatibleModelId);

  const handleCopyPartNumber = () => {
    navigator.clipboard.writeText(component.partNumber);
    setCopiedPartNumber(true);
    setTimeout(() => setCopiedPartNumber(false), 2000);
  };

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

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Components', path: '/components' },
          { label: component.compatibleBrand, path: `/brand/${model?.brandId || ''}` },
          { label: component.compatibleModel, path: `/model/${component.compatibleModelId}` },
          { label: component.name }
        ]}
      />

      {/* Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate(`/model/${component.compatibleModelId}`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 font-semibold text-xs sm:text-sm shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {component.compatibleModel} Components</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Favourites Toggle */}
          <button
            onClick={() => toggleFavourite(component.id)}
            className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              isFav
                ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:text-rose-600 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFav ? 'Saved in Favourites' : 'Save to Favourites'}</span>
          </button>

          {/* Compare Button */}
          <Link
            to="/compare"
            onClick={() => setCompareModel1Id(component.compatibleModelId)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Compare</span>
          </Link>
        </div>
      </div>

      {/* Main Component Presentation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Left Column: Visual Illustration & Schematic Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-white flex flex-col justify-between">
            <div>
              {/* Photo vs CAD View Mode Selector */}
              {component.imageUrl && (
                <div className="flex items-center justify-center p-1 bg-slate-200/80 rounded-xl mb-4 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode('photo')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'photo'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Product Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('schematic')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'schematic'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    CAD Blueprint
                  </button>
                </div>
              )}

              {/* Graphic container */}
              <div 
                onClick={() => setShowPreviewModal(true)}
                className="relative aspect-square rounded-3xl bg-slate-900 flex flex-col items-center justify-center cursor-pointer group shadow-md overflow-hidden border border-slate-800"
                title="Click to open interactive zoom modal"
              >
                {viewMode === 'photo' && component.imageUrl ? (
                  <div className="w-full h-full relative">
                    <img
                      src={component.imageUrl}
                      alt={component.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
                      <div className="text-white">
                        <span className="text-[11px] font-mono text-blue-300 uppercase tracking-wider block">
                          OEM Component Photo
                        </span>
                        <p className="font-bold text-sm">{component.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Tech blueprint background grid */}
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Animated visual component badge */}
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform duration-300 relative z-10">
                      <ComponentIcon name={component.iconName} className="w-16 h-16" />
                    </div>

                    <div className="mt-5 text-center relative z-10">
                      <p className="text-white font-extrabold text-base tracking-wide">
                        {component.name}
                      </p>
                      <p className="text-xs font-mono text-blue-300 mt-1">
                        {component.partNumber}
                      </p>
                    </div>
                  </>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-xs flex items-center justify-center gap-2 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <Eye className="w-4 h-4" />
                  <span>Click for Full Screen Preview & Zoom</span>
                </div>

                {/* Quality Grade Tag */}
                <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                  {component.qualityGrade}
                </span>

                {/* Component Number badge */}
                <span className="absolute bottom-3 right-3 bg-slate-900/90 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700 z-10">
                  Part #{component.componentNumber} of 39
                </span>
              </div>

              {/* Quick schematic actions */}
              <button
                onClick={() => setShowPreviewModal(true)}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Open High-Resolution Inspection & Zoom</span>
              </button>
            </div>

            {/* Quality & Warranty Metadata Box */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="text-slate-500">Quality Specification:</span>
                <span className="font-bold text-blue-900">{component.qualityGrade}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="text-slate-500">Service Testing Warranty:</span>
                <span className="font-bold text-slate-800">{component.warrantyPeriod}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="text-slate-500">Packaging Type:</span>
                <span className="font-bold text-slate-800">Anti-Static Sealed ESD Pouch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Specifications & Technical Data (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Header: Category & Part Number */}
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                  {component.category}
                </span>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-500">
                    ID: {component.partNumber}
                  </span>
                  <button
                    onClick={handleCopyPartNumber}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    title="Copy part number"
                  >
                    {copiedPartNumber ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {component.name}
              </h1>

              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span>Compatible with:</span>
                <Link
                  to={`/model/${component.compatibleModelId}`}
                  className="font-bold text-slate-800 hover:text-blue-600 underline hover:no-underline"
                >
                  {component.compatibleBrand} {component.compatibleModel}
                </Link>
                <span>({model?.modelCode})</span>
              </div>
            </div>

            {/* Price & Availability Banner */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Demonstration Estimated Price
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    ₹{component.priceINR.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">INR (Approx.)</span>
                </div>
                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium inline-block mt-1">
                  Sample Price • Not Actual Market Rate
                </span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Stock Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {component.availability} (Demo)
                </span>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Overview
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {component.shortDescription}
              </p>
            </div>

            {/* Basic Function of the Component */}
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Basic Function of this Component</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {component.basicFunction}
              </p>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Technical Specifications & Tolerances
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(component.technicalSpecs).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
                  >
                    <span className="text-slate-400 text-[11px] font-medium">{key}</span>
                    <span className="font-bold text-slate-800 mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 9: MANDATORY COMPONENT COMPATIBILITY */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hardware Compatibility Verification</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <div>
                  <span className="text-slate-400 block text-[11px]">Brand:</span>
                  <span className="font-bold text-white text-sm">{component.compatibleBrand}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Model:</span>
                  <span className="font-bold text-white text-sm">{component.compatibleModel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Component:</span>
                  <span className="font-bold text-white text-sm">{component.name}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Compatibility Status:</strong>{' '}
                {component.compatibilityNote}
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                * Note: Mobile Components Finder follows strict repair safety principles. Do not automatically assume that components are compatible across different models, even when dimensions appear similar. If cross-model verification is unavailable, we designate it strictly as single-model exclusive.
              </p>
            </div>

            {/* Repair Guide & Required Tools */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Technician Workshop Guide
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    Repair Difficulty
                  </span>
                  <span className={`inline-block px-2.5 py-0.5 rounded font-bold border text-xs ${getDifficultyBadge(component.repairDifficulty)}`}>
                    {component.repairDifficulty} Level
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Estimated Benchmark Time
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    ~{component.estimatedTimeMins} minutes
                  </span>
                </div>
              </div>

              {/* Required Tools */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Recommended Disassembly & Installation Tools:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {component.requiredTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Installation Tip */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-900 text-xs space-y-1">
                <strong className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Technician Installation Caution
                </strong>
                <p className="leading-relaxed text-amber-950/80">
                  {component.installationTip}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate(`/model/${component.compatibleModelId}`)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Components Catalogue</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600"
              >
                Back to Top ↑
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Demonstration Disclaimer Banner */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-slate-500 shrink-0" />
        <p>
          <strong className="text-slate-800">Demonstration Data Notice:</strong> All part numbers, INR (₹) prices, and availability figures shown on this page are generated sample demonstration values for prototyping and diagnostic structuring. They do not constitute commercial stock quotes or official factory guarantees.
        </p>
      </div>

      {/* Interactive CAD Preview Modal */}
      <ComponentImageModal
        component={component}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </div>
  );
};
