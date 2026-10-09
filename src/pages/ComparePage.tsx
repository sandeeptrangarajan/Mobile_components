import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Smartphone, 
  Cpu, 
  Battery, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { MODELS_DATA, getModelById } from '../data/modelsData';
import { getComponentsForModel } from '../data/componentsService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { ComponentIcon } from '../components/common/ComponentIcon';

export const ComparePage: React.FC = () => {
  const { compareModel1Id, compareModel2Id, setCompareModel1Id, setCompareModel2Id } = useApp();

  const [model1Id, setModel1Id] = useState<string>(compareModel1Id || 'samsung-galaxy-s24');
  const [model2Id, setModel2Id] = useState<string>(compareModel2Id || 'apple-iphone-16');

  const model1 = getModelById(model1Id) || MODELS_DATA[0];
  const model2 = getModelById(model2Id) || MODELS_DATA[5];

  const model1Components = useMemo(() => getComponentsForModel(model1.id), [model1.id]);
  const model2Components = useMemo(() => getComponentsForModel(model2.id), [model2.id]);

  const handleModel1Change = (id: string) => {
    setModel1Id(id);
    setCompareModel1Id(id);
  };

  const handleModel2Change = (id: string) => {
    setModel2Id(id);
    setCompareModel2Id(id);
  };

  // Compare key common components
  const commonComponentsToCompare = [
    'display-screen',
    'battery',
    'rear-camera',
    'charging-board',
    'charging-port',
    'motherboard',
    'processor',
    'fingerprint-sensor',
    'back-panel',
    'waterproof-seals'
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Hardware Model Comparison' }]} />

      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Dual Model Hardware Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Component & Hardware Comparison Tool
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Select two smartphone models to compare hardware specifications, replacement part costs, and verify component non-interchangeability.
          </p>
        </div>
      </div>

      {/* Model Selection Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        {/* Model 1 Select */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span>Select Model 1 (Primary)</span>
          </label>
          <select
            value={model1Id}
            onChange={(e) => handleModel1Change(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-500"
          >
            {MODELS_DATA.map((m) => (
              <option key={m.id} value={m.id}>
                {m.brandName} — {m.name} ({m.releaseYear})
              </option>
            ))}
          </select>
        </div>

        {/* Model 2 Select */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span>Select Model 2 (Comparative)</span>
          </label>
          <select
            value={model2Id}
            onChange={(e) => handleModel2Change(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
          >
            {MODELS_DATA.map((m) => (
              <option key={m.id} value={m.id}>
                {m.brandName} — {m.name} ({m.releaseYear})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* High-Level Specification Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Model 1 Card */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {model1.brandName}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Code: {model1.modelCode}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            {model1.name}
          </h2>

          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Display:</span>
              <span className="font-bold text-slate-800 text-right">{model1.displayInfo}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">SoC Platform:</span>
              <span className="font-bold text-slate-800 text-right">{model1.processorInfo}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Battery:</span>
              <span className="font-bold text-slate-800 text-right">{model1.batteryCapacity}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Charging:</span>
              <span className="font-bold text-slate-800 text-right">{model1.chargingSpeed}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Dimensions:</span>
              <span className="font-bold text-slate-800 text-right">{model1.dimensions}</span>
            </div>
          </div>

          <Link
            to={`/model/${model1.id}`}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors block text-center"
          >
            <span>Explore All 39 {model1.name} Components</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Model 2 Card */}
        <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              {model2.brandName}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Code: {model2.modelCode}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            {model2.name}
          </h2>

          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Display:</span>
              <span className="font-bold text-slate-800 text-right">{model2.displayInfo}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">SoC Platform:</span>
              <span className="font-bold text-slate-800 text-right">{model2.processorInfo}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Battery:</span>
              <span className="font-bold text-slate-800 text-right">{model2.batteryCapacity}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Charging:</span>
              <span className="font-bold text-slate-800 text-right">{model2.chargingSpeed}</span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-slate-500">Dimensions:</span>
              <span className="font-bold text-slate-800 text-right">{model2.dimensions}</span>
            </div>
          </div>

          <Link
            to={`/model/${model2.id}`}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors block text-center"
          >
            <span>Explore All 39 {model2.name} Components</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Side-by-side Component Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Direct Spare-Part Comparison & Interchangeability Check
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review sample part prices and pinout compatibility between {model1.name} and {model2.name}
            </p>
          </div>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Not Cross-Compatible
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {commonComponentsToCompare.map((slug) => {
            const comp1 = model1Components.find((c) => c.slug === slug);
            const comp2 = model2Components.find((c) => c.slug === slug);

            if (!comp1 || !comp2) return null;

            return (
              <div key={slug} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-slate-50/70 transition-colors">
                
                {/* Col 1: Component Identity (3 cols) */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ComponentIcon name={comp1.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {comp1.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {comp1.category}
                    </span>
                  </div>
                </div>

                {/* Col 2: Model 1 Part Info (4 cols) */}
                <div className="lg:col-span-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">
                      {model1.name} Part
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      ₹{comp1.priceINR.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-600">
                    {comp1.partNumber}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    {comp1.shortDescription}
                  </div>
                </div>

                {/* Col 3: Model 2 Part Info (4 cols) */}
                <div className="lg:col-span-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">
                      {model2.name} Part
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      ₹{comp2.priceINR.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-600">
                    {comp2.partNumber}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    {comp2.shortDescription}
                  </div>
                </div>

                {/* Col 4: Cross-fit Verification (1 col) */}
                <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-center block">
                    No Fit
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <p>
          <strong>Technician Safety Rule:</strong> Although mobile components often share similar physical shapes or functions across different smartphone models, PCB connector pinouts, ribbon lengths, bus protocols, and hardware authentication locks strictly prevent cross-installation. Always order the exact part number specified for your device's motherboard.
        </p>
      </div>
    </div>
  );
};
