import React from 'react';
import { CLINIC_INFO } from '../data/dentalData';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLookup }) => {
  return (
    <footer className="bg-[#F5F5F7] border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60">
          
          {/* Brand info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-950 font-sans">
                DKDC
              </span>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Dhruti Krishna Dental Care
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Providing biological tooth preservation, microscopic endodontics, computer-guided implantology, 
              and bespoke porcelain aesthetic dentistry in an environment of serene clarity.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Consultation</span>
              </button>
            </div>
          </div>

          {/* Clinical Focus (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Clinical Disciplines
            </div>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#treatments" className="hover:text-slate-950 transition-colors">Microscopic Endodontics (Root Canals)</a></li>
              <li><a href="#treatments" className="hover:text-slate-950 transition-colors">Handcrafted Porcelain Veneers</a></li>
              <li><a href="#treatments" className="hover:text-slate-950 transition-colors">Computer-Guided Dental Implants</a></li>
              <li><a href="#treatments" className="hover:text-slate-950 transition-colors">Invisalign® Diamond Alignment</a></li>
              <li><a href="#treatments" className="hover:text-slate-950 transition-colors">Air-Flow® Biofilm Ultrasonic Hygiene</a></li>
              <li><a href="#treatments" className="hover:text-slate-950 transition-colors">Laser Teeth Whitening</a></li>
            </ul>
          </div>

          {/* Clinic Hours & Facility (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Practice Hours</span>
            </div>
            <div className="space-y-2">
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="text-xs">
                  <div className="font-medium text-slate-800">{h.days}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{h.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Location (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>San Francisco Suite</span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>{CLINIC_INFO.address.line1}</div>
              <div>{CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} {CLINIC_INFO.address.zip}</div>
              <div className="pt-2 font-mono text-[11px]">
                <a href={`tel:${CLINIC_INFO.directPhone}`} className="hover:text-[#0071E3] block">
                  {CLINIC_INFO.directPhone}
                </a>
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-[#0071E3] block mt-0.5">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={onOpenLookup}
                className="text-xs font-semibold text-[#0071E3] hover:underline cursor-pointer"
              >
                Lookup Existing Booking →
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory & Copyright bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} DKDC · Dhruti Krishna Dental Care. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>HIPAA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>OSHA Certified Facility</span>
            <span aria-hidden="true">·</span>
            <span>PPO Concierge Billing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
