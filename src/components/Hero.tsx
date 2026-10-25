import React from 'react';
import { CLINIC_INFO } from '../data/dentalData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz }) => {

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#FBFBFD] to-[#F5F5F7]">
      {/* Subtle ambient light gradient */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-tr from-sky-100/40 via-blue-50/20 to-transparent blur-3xl pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Eyebrow & Headline - Apple Minimalist Typography */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider uppercase text-slate-500">
            <span>DKDC</span>
            <span aria-hidden="true">·</span>
            <span>Dhruti Krishna Dental Care</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.08] text-balance mb-6">
            Precision dental medicine, designed around you.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-balance max-w-2xl mx-auto">
            Where biological artistry meets microscopic clinical perfection. Experience painless endodontics, 
            custom porcelain smile design, and serene patient care in San Francisco.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 group"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="px-6 py-3.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100/80 border border-slate-200 rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#0071E3]" />
              <span>1-Min Smile Assessment</span>
            </button>
          </div>
        </div>

        {/* 4-Zone Metric Strip in full-width container below hero */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-200/60">
          {CLINIC_INFO.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-sans tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mt-1.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
