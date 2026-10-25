import React from 'react';
import { CLINIC_TECHNOLOGIES } from '../data/dentalData';
import { Microscope, Zap, Shield, Sparkles, Check } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
            The DKDC Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance">
            Microscopic instrumentation. Zero guesswork.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed text-balance">
            By operating at magnifications up to 25× and utilizing 3D photonics, our clinical team works at the 
            cellular scale—preserving natural dentin that traditional aggressive dentistry would cut away.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Zeiss Microscope (Large 8 cols) */}
          <div className="md:col-span-8 bg-[#FBFBFD] rounded-3xl border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold text-[#0071E3] uppercase tracking-wider">
                  Optical Engineering
                </span>
                <span className="text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight font-sans tabular-nums">
                  25×
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-3">
                Carl Zeiss Extaro Micro-Surgical Suite
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Human vision can distinguish structures down to 0.2 mm. Our optical microscopes expand resolution to 
                0.008 mm with true coaxial fluorescent illumination. This allows Dr. Ananya Sen and Dr. Krishna to 
                locate hidden fourth and fifth root canals, detect micro-fractures before symptoms appear, and place 
                veneers with hairline margins.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Coaxial Shadowless Illumination
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> True Fluorescence Tooth Differentiation
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> HD Live Patient Screen Feed
              </span>
            </div>
          </div>

          {/* Card 2: 3D CBCT (4 cols) */}
          <div className="md:col-span-4 bg-[#FBFBFD] rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold text-emerald-600 uppercase tracking-wider">
                  Radiological Safety
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight font-sans tabular-nums">
                  -75%
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-950 mb-2">
                Green CBCT 3D Tomography
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Produces volumetric 3D bone and nerve reconstructions in 5.9 seconds. Exposes patients to up to 75% 
                less radiation than standard dental CTs.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-slate-500 font-mono">
              0.05 mm Voxel Resolution
            </div>
          </div>

          {/* Card 3: Waterlase (4 cols) */}
          <div className="md:col-span-4 bg-[#FBFBFD] rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold text-purple-600 uppercase tracking-wider">
                  Hydro-Photonics
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight font-sans tabular-nums">
                  0 Needles
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-950 mb-2">
                Waterlase® Erbium Laser
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Excites energized water droplets to gently vaporize decayed enamel and sculpt soft tissues without 
                friction, micro-cracks, or painful drilling vibrations.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-slate-500 font-mono">
              Zero Heat Damage to Pulp
            </div>
          </div>

          {/* Card 4: Hospital-grade Sterilization (8 cols) */}
          <div className="md:col-span-8 bg-[#FBFBFD] rounded-3xl border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
                  Bio-Security Suite
                </span>
                <span className="text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight font-sans tabular-nums">
                  100%
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-3">
                Class-B Autoclave & Surgical HEPA Air Exchange
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Every clinical operatory features independent 12 air changes per hour (ACH) through surgical HEPA 
                filtration, exceeding Swiss and CDC infection standards. All micro-instruments are vacuum-sealed in 
                traceable sterilization cassettes and broken open only in your presence.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Fractionated Triple-Pulse Vacuum Autoclave
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Medical Distilled Water Lines with Daily UV Testing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
