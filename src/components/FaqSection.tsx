import React, { useState } from 'react';
import { FAQS, CLINIC_INFO } from '../data/dentalData';
import { ChevronDown, PhoneCall, ShieldAlert } from 'lucide-react';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Heading & Emergency Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
                Questions & Transparency
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance">
                Everything you need to know before stepping into our clinic.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Clear clinical expectations and zero financial surprises. If you have a specific condition not 
                listed here, our clinical coordinators are available daily.
              </p>
            </div>

            {/* Emergency Hotline Card */}
            <div className="bg-[#F5F5F7] rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4" />
                <span>Urgent & Emergency Dental Care</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experiencing severe pulpitis, facial swelling, or knocked-out/cracked tooth trauma? We triage dental 
                emergencies immediately.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={`tel:${CLINIC_INFO.emergencyPhone}`}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Emergency Line: (415) 890-3539</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 overflow-hidden transition-all bg-[#FBFBFD]"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-950">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-slate-950' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 text-center sm:text-left">
              <button
                onClick={onOpenBooking}
                className="text-xs font-semibold text-[#0071E3] hover:underline cursor-pointer"
              >
                Still have questions? Book a personalized consultation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
