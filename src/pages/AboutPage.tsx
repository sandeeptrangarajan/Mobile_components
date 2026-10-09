import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  HelpCircle,
  ArrowRight,
  Layers,
  Heart
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  const audience = [
    {
      title: 'Mobile Repair Technicians',
      description: 'Quickly look up board-to-board connectors, flex cables, screw matrices, and estimated repair times for over 50+ flagship and popular handsets.',
      icon: Wrench,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Mobile Service Centers',
      description: 'Streamline diagnostic intake, catalog model-specific part numbers, and verify component availability during customer assessments.',
      icon: Building2,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: 'Spare-Parts Retailers',
      description: 'Cross-reference sample identifiers, reference price benchmarks in Indian Rupees (₹), and organize inventory across 9 standard hardware categories.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Everyday Phone Enthusiasts',
      description: 'Understand internal smartphone architectures, compare camera modules between flagship phones, and discover what makes your device tick.',
      icon: Smartphone,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    }
  ];

  return (
    <div className="space-y-12">
      <Breadcrumbs items={[{ label: 'About the Platform' }]} />

      {/* Hero Banner */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-blue-950 text-white relative overflow-hidden shadow-sm">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Repair Diagnostics Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About Mobile Components Finder
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A comprehensive, client-side digital reference platform designed to empower repair specialists, service center engineers, and curious users with detailed mobile phone component data.
          </p>
        </div>
      </div>

      {/* Mission & Purpose */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Our Purpose & Mission
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          Modern smartphones are marvels of precision engineering, packing dozens of micro-electronic assemblies into sub-8mm chassis. For independent repair shops and consumers alike, finding accurate component references, verifying physical part numbers, and identifying whether a part is compatible can be challenging.
        </p>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          <strong>Mobile Components Finder</strong> organizes smartphone hardware into an intuitive, interactive diagnostic catalogue. Whether identifying a charging flex cable for a Samsung Galaxy S24, inspecting the ceramic back panel of an Apple iPhone 16, or examining the periscope zoom module on a Xiaomi 14 Ultra, every phone model features all 39 standardized components cleanly mapped and illustrated.
        </p>
      </section>

      {/* Who Is This For */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Designed for the Mobile Ecosystem
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Tailored features to support every step of the mobile repair and diagnostics journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {audience.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 39 Catalogued Components Breakdown */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Hardware Standardization
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white">
            The 39 Catalogued Components
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Every supported device is meticulously structured into 9 core hardware groups:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Display & Body</strong>
            <p>Screens, Touch Digitizers, Back Panels, Chassis Frames</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Power & Charging</strong>
            <p>Batteries, Charging Ports, Sub-boards, Wireless Coils, USB Jacks</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Cameras</strong>
            <p>Rear Modules, Front Selfie Cams, Exterior Sapphire Lenses</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Audio & Haptics</strong>
            <p>Loudspeakers, Earpieces, MEMS Microphones, Vibration Motors</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Connectivity & RF</strong>
            <p>SIM Trays, Readers, Wi-Fi 6E/7, Bluetooth, Antennas, RF Amps</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Sensors</strong>
            <p>Fingerprint ICs, Face ID Hardware, Proximity, Accelerometers, Gyros</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Internal Hardware</strong>
            <p>Logic Motherboards, APU Processors, LPDDR RAM, Flash Storage</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Buttons & Connectors</strong>
            <p>Power, Volume Keys, Side Buttons, Board Connectors, FPC Ribbons</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1">
            <strong className="text-white block font-semibold text-sm">Other Spare Parts</strong>
            <p>Precision Screws, IP68 Waterproof Seals, Shield Brackets</p>
          </div>
        </div>
      </section>

      {/* Disclaimer on Demonstration Data */}
      <section className="bg-amber-50 rounded-3xl border border-amber-200 p-8 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Educational & Demonstration Data Policy</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          Please note that Mobile Components Finder is an interactive frontend prototype built with local demonstration data. All part identifiers, estimated repair times, and sample prices in Indian rupees (₹) are simulated demonstration benchmarks and do not represent verified wholesale inventory, contractual warranties, or real-time parts availability.
        </p>
      </section>
    </div>
  );
};
