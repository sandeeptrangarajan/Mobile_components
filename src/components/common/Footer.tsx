import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ShieldAlert, Cpu, Wrench, Layers, ExternalLink, Heart } from 'lucide-react';
import { BRANDS_DATA } from '../../data/brandsData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* Sample Data Disclaimer Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Demonstration & Sample Data Notice:</span>
          </div>
          <p className="text-center md:text-left text-slate-400 max-w-4xl">
            All prices (in INR ₹), part identifiers, repair times, and inventory statuses presented on Mobile Components Finder are simulated demonstration data designed for educational and repair workflow modeling.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Mobile<span className="text-blue-400">Components</span> Finder
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier interactive diagnostic and hardware components directory designed for mobile repair technicians, service centers, spare-parts retailers, and phone enthusiasts.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/60">
                <Wrench className="w-3.5 h-3.5" /> 39 Components per Model
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-300 border border-emerald-700/60">
                <Cpu className="w-3.5 h-3.5" /> 18 Smartphone Brands
              </span>
            </div>
          </div>

          {/* Col 2: Popular Brands */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Top Brands
            </h4>
            <ul className="space-y-2 text-sm">
              {BRANDS_DATA.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link
                    to={`/brand/${brand.id}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{brand.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{brand.totalModelsSample} models</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/brands" className="text-blue-400 hover:text-blue-300 text-xs font-semibold inline-flex items-center gap-1 pt-1">
                  View all 18 brands &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Component Sectors
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/components?category=display-and-body" className="hover:text-white transition-colors">
                  Display & Touchscreens
                </Link>
              </li>
              <li>
                <Link to="/components?category=power-and-charging" className="hover:text-white transition-colors">
                  Batteries & Charging Boards
                </Link>
              </li>
              <li>
                <Link to="/components?category=cameras" className="hover:text-white transition-colors">
                  Rear & Front Camera Modules
                </Link>
              </li>
              <li>
                <Link to="/components?category=audio" className="hover:text-white transition-colors">
                  Speakers, Receiver & Mics
                </Link>
              </li>
              <li>
                <Link to="/components?category=internal-hardware" className="hover:text-white transition-colors">
                  Logic Motherboards & SoCs
                </Link>
              </li>
              <li>
                <Link to="/components?category=sensors" className="hover:text-white transition-colors">
                  Fingerprint & Face ID
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Diagnostic Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/models" className="hover:text-white transition-colors">
                  Model Hardware Explorer
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  Side-by-Side Model Compare
                </Link>
              </li>
              <li>
                <Link to="/favourites" className="hover:text-white transition-colors">
                  Saved Parts Workbench
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Platform
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Mobile Components Finder. Built with React & TypeScript.
          </p>
          <p className="flex items-center gap-1">
            Engineered for Mobile Repair Technicians & Service Centers Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
