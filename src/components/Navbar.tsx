import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, PhoneCall, Search } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenLookup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Technology', href: '#technology' },
    { label: 'Specialists', href: '#specialists' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Clinical FAQs', href: '#faqs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBFBFD]/90 backdrop-blur-md border-b border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark with subtitle */}
          <a
            href="#"
            className="flex flex-col justify-center text-slate-900 group whitespace-nowrap shrink-0"
            aria-label="D.K. Dental Clinic and Pain Clinic - Dhruti Krishna Dental Care Home"
          >
            <span
              className="tracking-tight text-slate-950 group-hover:text-[#0071E3] transition-colors flex items-center"
              style={{
                width: '178.328px',
                height: '43px',
                fontSize: '40px',
                lineHeight: '25px',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'Plus Jakarta Sans',
                textDecorationLine: 'none',
              }}
            >
              D.K.
            </span>
            <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-500 group-hover:text-slate-800 transition-colors -mt-0.5">
              DENTAL CLINIC AND PAIN CLINIC
            </span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 tracking-normal"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenLookup}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              title="Lookup your appointment"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Lookup Booking</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-full transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FBFBFD] pt-24 px-6 pb-10 flex flex-col justify-between lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <div className="pb-4 border-b border-slate-200/60">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                Dhruti Krishna Dental Care
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium text-slate-900 hover:text-[#0071E3] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="text-left text-lg font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 pt-2"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Check My Appointment</span>
            </button>
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-200/60">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-center text-sm font-semibold text-white bg-slate-950 rounded-full"
            >
              Book Consultation
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency Hotline: (415) 890-3539</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
