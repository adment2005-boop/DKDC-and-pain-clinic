/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceGallery } from './components/ServiceGallery';
import { TechnologySection } from './components/TechnologySection';
import { DoctorsSection } from './components/DoctorsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AppointmentLookupModal } from './components/AppointmentLookupModal';
import { SmileQuizModal } from './components/SmileQuizModal';
import { Appointment } from './types/dental';
import { CheckCircle2, ArrowUp } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleSelectDoctorForBooking = (doctorId: string) => {
    // If a doctor was selected, open booking modal
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (appointment: Appointment) => {
    setToastNotification(`Reservation confirmed: Ref #${appointment.referenceNumber}`);
    setTimeout(() => {
      setToastNotification(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col selection:bg-[#0071E3]/15 selection:text-[#0071E3]">
      {/* Toast Notification Banner */}
      {toastNotification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section with requested tooth asset and interactive anatomical layers */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Service Gallery with interactive before/after transformation viewer */}
        <ServiceGallery
          onSelectServiceForBooking={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Clinical Technology Bento Grid */}
        <TechnologySection />

        {/* Specialists & Doctors */}
        <DoctorsSection
          onSelectDoctorForBooking={(doctorId) => handleSelectDoctorForBooking(doctorId)}
        />

        {/* Patient Testimonials */}
        <TestimonialsSection />

        {/* Clinical FAQs & Emergency Care */}
        <FaqSection
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Apple-style Minimalist Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Interactive Online Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Patient Portal / Appointment Lookup & Management */}
      <AppointmentLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onBookNew={() => {
          setIsLookupOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* 1-Minute Smile Assessment Diagnostic Tool */}
      <SmileQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onProceedToBooking={(serviceId) => handleOpenBooking(serviceId)}
      />
      {/* Floating Back to Top navigation button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 bg-white/95 hover:bg-white text-slate-800 hover:text-slate-950 text-xs font-semibold rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-slate-200 backdrop-blur-md transition-all active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-200"
          title="Back to top of site"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>Back to Top</span>
        </button>
      )}
    </div>
  );
}
