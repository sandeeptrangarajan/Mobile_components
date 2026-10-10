import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Search, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');
  const { favourites } = useApp();
  const navigate = useNavigate();

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      navigate(`/components?search=${encodeURIComponent(navSearchInput.trim())}`);
      setNavSearchInput('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Brands', path: '/brands' },
    { label: 'Mobile Models', path: '/models' },
    { label: 'Components', path: '/components' },
    { label: 'Compare', path: '/compare' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro bar for technicians */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">Mobile Spare Parts & Diagnostic Directory</span>
          <span className="hidden md:inline text-slate-400">| 18 Major Smartphone Brands Catalogued</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="hidden sm:inline bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">
            Technician Reference Mode
          </span>
          <span className="text-amber-300/90 font-medium">Sample Demo Data</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Mobile<span className="text-blue-600">Components</span>
                </span>
                <span className="hidden xs:inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  Finder
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">
                Genuine Spare Parts & Hardware Specs
              </p>
            </div>
          </Link>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search bar & Action Buttons (Right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick search input (Medium screens and up) */}
            <form onSubmit={handleNavSearch} className="relative hidden md:block w-48 lg:w-60 xl:w-72">
              <input
                type="text"
                placeholder="Quick part search..."
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* Compare Quick Link */}
            <Link
              to="/compare"
              className="p-2 sm:px-3 sm:py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Compare Components"
            >
              <Scale className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Compare</span>
            </Link>

            {/* Favourites with Badge */}
            <Link
              to="/favourites"
              className="relative p-2 sm:px-3 sm:py-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Saved Favourites"
            >
              <Heart className={`w-4 h-4 ${favourites.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Saved</span>
              {favourites.length > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-rose-600 rounded-full">
                  {favourites.length}
                </span>
              )}
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
          {/* Mobile search bar */}
          <form onSubmit={handleNavSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search brand, model, or component..."
              value={navSearchInput}
              onChange={(e) => setNavSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>

          {/* Mobile Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}
            <Link
              to="/favourites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>Saved Favourites</span>
              </div>
              <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {favourites.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
