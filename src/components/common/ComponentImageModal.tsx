import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, ShieldCheck, Cpu } from 'lucide-react';
import { ComponentItem } from '../../types';
import { ComponentIcon } from './ComponentIcon';

interface ComponentImageModalProps {
  component: ComponentItem;
  isOpen: boolean;
  onClose: () => void;
}

export const ComponentImageModal: React.FC<ComponentImageModalProps> = ({
  component,
  isOpen,
  onClose
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                Part #{component.partNumber}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {component.category}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {component.name} — Visual Schematic
            </h3>
            <p className="text-xs text-slate-500">
              Compatible with {component.compatibleBrand} {component.compatibleModel}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Visual Canvas */}
        <div className="relative h-80 sm:h-96 bg-gradient-to-br from-slate-900 via-slate-850 to-navy-950 flex items-center justify-center overflow-hidden p-8 select-none">
          {/* Blueprint grid background lines */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Visual display with dynamic zoom and rotate */}
          <div
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s ease-out'
            }}
            className="relative flex flex-col items-center justify-center p-3 sm:p-6 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-2xl backdrop-blur-md max-w-sm sm:max-w-md w-full"
          >
            {component.imageUrl ? (
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden bg-white shadow-xl relative flex items-center justify-center">
                <img
                  src={component.imageUrl}
                  alt={component.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                <ComponentIcon name={component.iconName} className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
            )}
            
            <div className="mt-3 text-center">
              <p className="text-white font-extrabold text-sm sm:text-base tracking-wide">
                {component.name}
              </p>
              <p className="text-xs font-mono text-blue-300 mt-0.5">
                {component.partNumber}
              </p>
            </div>

            {/* Precision alignment pins indicator */}
            <div className="absolute -top-3 left-6 px-2 py-0.5 bg-blue-500 text-[10px] font-mono text-white rounded font-bold uppercase tracking-wider">
              {component.imageUrl ? 'Genuine OEM Photograph' : 'OEM Spec Alignment'}
            </div>
            <div className="absolute -bottom-3 right-6 px-2 py-0.5 bg-emerald-500 text-[10px] font-mono text-white rounded font-bold uppercase tracking-wider">
              {component.qualityGrade}
            </div>
          </div>

          {/* Canvas Floating Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-1.5 rounded-xl shadow-lg">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Rotate 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-slate-700 mx-1" />
            <span className="text-[11px] font-mono text-slate-400 px-1.5">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Diagnostic CAD Overlay</span>
          </div>
        </div>

        {/* Modal Details Footer */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-medium">
              Sample Estimated Market Price: <span className="text-slate-900 font-extrabold text-sm">₹{component.priceINR.toLocaleString()}</span> (Demonstration)
            </p>
            <p className="text-xs text-slate-400">
              Warranty: {component.warrantyPeriod} • Estimated Repair Time: {component.estimatedTimeMins} minutes
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
