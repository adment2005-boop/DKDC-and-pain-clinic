import React, { useState } from 'react';
import { DENTAL_SERVICES } from '../data/dentalData';
import { DentalService, ServiceCategory } from '../types/dental';
import { Clock, Shield, Sparkles, Check, ArrowRight, X } from 'lucide-react';

interface ServiceGalleryProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServiceGallery: React.FC<ServiceGalleryProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<DentalService | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Treatments' },
    { id: 'endodontics', label: 'Micro-Endodontics' },
    { id: 'cosmetics', label: 'Porcelain & Whitening' },
    { id: 'orthodontics', label: 'Clear Aligners' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'preventative', label: 'Air-Flow Preventative' },
  ];

  const filteredServices = activeCategory === 'all'
    ? DENTAL_SERVICES
    : DENTAL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="treatments" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
            The Clinical Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance">
            Crafted for longevity. Performed with zero compromise.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed text-balance">
            Every procedure at DKDC follows a biologically conservative philosophy. We preserve natural tooth 
            architecture using advanced optical magnification, biocompatible ceramics, and precision digital guides.
          </p>

          {/* Interactive Category Filter Tabs (Segmented control) */}
          <div className="mt-8 flex items-center gap-1.5 p-1.5 bg-[#F5F5F7] rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-950 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Before & After Interactive Showcase Feature */}
        <div className="mb-16 bg-[#FBFBFD] rounded-3xl border border-slate-200/80 p-6 sm:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071E3]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Clinical Transformation</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                Digital Smile Architecture & Restorative Symmetry
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Drag the interactive slider to compare clinical initial state (micro-fractured edges, internal staining) 
                with our completed minimally invasive porcelain veneers and bioceramic restoration.
              </p>
              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-millimeter optical edge contouring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Natural light refraction matched to adjacent enamel</span>
                </div>
              </div>
            </div>

            {/* Slider Component */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden select-none border border-slate-200 shadow-sm bg-slate-900">
                {/* After Side (Radiant smile) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-8 text-center text-white">
                  <div className="relative flex items-center justify-center gap-1 mb-3">
                    {/* Stylized teeth arch - after */}
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-12 bg-gradient-to-b from-white via-slate-50 to-slate-200 rounded-b-xl shadow-lg border border-white/60 transition-transform"
                          style={{
                            height: i === 3 || i === 4 ? '52px' : i === 2 || i === 5 ? '46px' : '38px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-widest font-semibold text-emerald-400">
                    Completed Result
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-mono">
                    8 Lithium Disilicate Laminates · 0.3mm Prep
                  </div>
                </div>

                {/* Before Side (Clipped via slider position) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-900 to-stone-900 flex flex-col items-center justify-center text-center text-white border-r border-white/40"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="w-[480px] flex flex-col items-center justify-center p-8">
                    <div className="relative flex items-center justify-center gap-1 mb-3">
                      {/* Stylized teeth arch - before (uneven, stained) */}
                      <div className="flex items-center gap-1.5 opacity-80">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="w-8 bg-gradient-to-b from-amber-100/80 via-stone-300 to-stone-400 rounded-b-md border border-stone-500/50"
                            style={{
                              height: i === 3 ? '42px' : i === 4 ? '48px' : i === 2 ? '44px' : '36px',
                              transform: i === 3 ? 'rotate(-3deg)' : i === 4 ? 'rotate(4deg)' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold text-amber-300">
                      Initial Presentation
                    </div>
                    <div className="text-xs text-stone-300 mt-1 font-mono">
                      Moderate Attrition · Tetracycline Staining
                    </div>
                  </div>
                </div>

                {/* Slider Divider Line */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-md text-slate-800 flex items-center justify-center text-[10px] font-bold border border-slate-300">
                    ⇄
                  </div>
                </div>

                {/* Invisible input range for accessible sliding */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
                  aria-label="Drag to compare before and after treatment"
                />
              </div>

              <div className="flex items-center justify-between w-full max-w-lg mt-3 text-[11px] text-slate-500 font-medium px-1">
                <span>◀ Drag slider to compare</span>
                <span className="font-mono tabular-nums">{sliderPosition}% Visible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FBFBFD] hover:bg-white rounded-3xl border border-slate-200/80 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-2">
                  {service.category.toUpperCase()}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-950 mb-2 group-hover:text-[#0071E3] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 font-medium italic">
                  "{service.tagline}"
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Quick Spec list */}
                <div className="space-y-2 py-4 border-t border-b border-slate-200/60 text-xs text-slate-600 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duration</span>
                    </span>
                    <span className="font-medium text-slate-900">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Comfort Protocol</span>
                    </span>
                    <span className="font-medium text-slate-900 text-right truncate max-w-[160px]" title={service.comfortLevel}>
                      {service.comfortLevel.split('(')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Investment</span>
                    <span className="font-semibold text-slate-950 font-sans tabular-nums">
                      {service.priceEstimate}
                    </span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 text-xs text-slate-600">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="text-[11px] text-slate-500 font-medium">
                      {feature} {idx < service.features.length - 1 && '·'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Book This Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedServiceForModal(service)}
                  className="w-full py-2.5 px-4 text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-center"
                >
                  View Clinical Protocol
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Protocol Detail Modal */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#0071E3]">
                  DKDC Clinical Standard
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 mt-1">
                  {selectedServiceForModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-3">
                  Step-by-Step Treatment Protocol
                </h4>
                <div className="space-y-4">
                  {selectedServiceForModal.protocolSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-900 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F5F5F7] rounded-2xl p-4 space-y-2">
                <div className="text-xs font-semibold text-slate-900">Who this treatment is engineered for:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {selectedServiceForModal.idealFor.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Procedure Duration</span>
                  <span className="font-semibold text-slate-900">{selectedServiceForModal.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Recovery Time</span>
                  <span className="font-semibold text-slate-900">{selectedServiceForModal.recovery}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Price Range</span>
                  <span className="font-semibold text-slate-900">{selectedServiceForModal.priceEstimate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedServiceForModal.id;
                  setSelectedServiceForModal(null);
                  onSelectServiceForBooking(id);
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl transition-all shadow-sm"
              >
                Book This Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
