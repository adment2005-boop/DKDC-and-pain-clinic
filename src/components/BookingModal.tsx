import React, { useState, useEffect } from 'react';
import { DENTAL_SERVICES, DOCTORS } from '../data/dentalData';
import { Appointment } from '../types/dental';
import { Calendar, Clock, User, CheckCircle2, X, Download, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onBookingSuccess?: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('dr-dhruti-krishna');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientType, setPatientType] = useState<'new' | 'returning'>('new');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Available time slots
  const availableSlots = [
    '08:30 AM', '09:45 AM', '11:00 AM', 
    '01:15 PM', '02:30 PM', '03:45 PM', '05:00 PM'
  ];

  // Generate upcoming dates (excluding Sundays)
  const getUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // start tomorrow

    while (dates.length < 7) {
      if (current.getDay() !== 0) { // skip Sunday
        dates.push({
          fullDate: current.toISOString().split('T')[0],
          dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
          monthDay: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const dates = getUpcomingDates();

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      // Auto-assign doctor based on service category
      const s = DENTAL_SERVICES.find(srv => srv.id === preselectedServiceId);
      if (s) {
        if (s.category === 'endodontics') setSelectedDoctorId('dr-ananya-sen');
        else if (s.category === 'orthodontics') setSelectedDoctorId('dr-rohan-mehta');
        else setSelectedDoctorId('dr-dhruti-krishna');
      }
    } else if (!selectedServiceId && DENTAL_SERVICES.length > 0) {
      setSelectedServiceId(DENTAL_SERVICES[0].id);
    }
    if (!selectedDate && dates.length > 0) {
      setSelectedDate(dates[0].fullDate);
    }
    if (!selectedTimeSlot) {
      setSelectedTimeSlot('09:45 AM');
    }
  }, [preselectedServiceId, isOpen]);

  if (!isOpen) return null;

  const currentService = DENTAL_SERVICES.find((s) => s.id === selectedServiceId) || DENTAL_SERVICES[0];
  const currentDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientEmail.trim() || !patientPhone.trim()) {
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `DKDC-2026-${randomSuffix}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      referenceNumber,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      patientType,
      serviceId: currentService.id,
      serviceName: currentService.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes: patientNotes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('dkdc_appointments');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newAppointment);
      localStorage.setItem('dkdc_appointments', JSON.stringify(list));
    } catch {
      // ignore storage errors
    }

    setConfirmedAppointment(newAppointment);
    setStep(5); // Confirmation screen
    if (onBookingSuccess) {
      onBookingSuccess(newAppointment);
    }
  };

  const downloadCalendarFile = () => {
    if (!confirmedAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DKDC//Dhruti Krishna Dental Care//EN
BEGIN:VEVENT
SUMMARY:${confirmedAppointment.serviceName} at DKDC
DESCRIPTION:Appointment with ${confirmedAppointment.doctorName} at DKDC (Dhruti Krishna Dental Care). Ref: ${confirmedAppointment.referenceNumber}
LOCATION:450 Sutter Medical Pavilion, Suite 1800, San Francisco, CA
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DKDC_Appointment_${confirmedAppointment.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedAppointment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
              DKDC · Dhruti Krishna Dental Care
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 mt-0.5">
              {step === 5 ? 'Appointment Confirmed' : 'Reserve Your Clinical Visit'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetAndClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all cursor-pointer shadow-2xs"
              title="Return to DKDC main site"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
            <button
              onClick={resetAndClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Dots (Steps 1 to 4) */}
        {step < 5 && (
          <div className="py-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step
                      ? 'w-8 bg-[#0071E3]'
                      : i < step
                      ? 'w-4 bg-slate-900'
                      : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[11px] text-slate-400">Step {step} of 4</span>
          </div>
        )}

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="py-4 space-y-4">
            <div className="text-sm font-semibold text-slate-900">
              Select treatment or clinical consultation:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {DENTAL_SERVICES.map((s) => {
                const isSelected = selectedServiceId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedServiceId(s.id);
                      if (s.category === 'endodontics') setSelectedDoctorId('dr-ananya-sen');
                      else if (s.category === 'orthodontics') setSelectedDoctorId('dr-rohan-mehta');
                      else setSelectedDoctorId('dr-dhruti-krishna');
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0071E3] bg-[#0071E3]/5 ring-1 ring-[#0071E3]'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wider font-semibold text-[#0071E3]">
                      {s.category}
                    </div>
                    <div className="text-sm font-bold text-slate-950 mt-0.5">{s.name}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{s.tagline}</div>
                    <div className="mt-2 text-[11px] font-mono text-slate-400 tabular-nums">
                      {s.duration} · {s.priceEstimate}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Site</span>
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Choose Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Choose Doctor */}
        {step === 2 && (
          <div className="py-4 space-y-4">
            <div className="text-sm font-semibold text-slate-900">
              Select attending specialist:
            </div>
            <div className="space-y-3">
              {DOCTORS.map((d) => {
                const isSelected = selectedDoctorId === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDoctorId(d.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'border-[#0071E3] bg-[#0071E3]/5 ring-1 ring-[#0071E3]'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-950">{d.name}</div>
                      <div className="text-xs text-[#0071E3] font-medium">{d.title} · {d.degrees}</div>
                      <div className="text-xs text-slate-500 mt-1">{d.specialty}</div>
                      <div className="text-[11px] text-slate-400 mt-2 font-mono">
                        Available: {d.availability}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      isSelected ? 'border-[#0071E3] bg-[#0071E3] text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Select Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Select Date & Time Slot */}
        {step === 3 && (
          <div className="py-4 space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-900 block mb-2">
                Available Dates:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.fullDate;
                  return (
                    <button
                      key={d.fullDate}
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0071E3] bg-[#0071E3] text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className={`text-[11px] uppercase ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {d.dayName}
                      </div>
                      <div className="text-sm font-bold mt-0.5">{d.monthDay}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-900 block mb-2">
                Preferred Time Slot:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold font-mono tabular-nums transition-all cursor-pointer ${
                        isSelected
                          ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#F5F5F7] rounded-xl p-3 text-xs text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0071E3] shrink-0" />
              <span>We allow a dedicated 15-minute buffer between patients for clinical suite HEPA air sterilization.</span>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Patient Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Patient Details */}
        {step === 4 && (
          <form onSubmit={handleConfirmBooking} className="py-4 space-y-4">
            <div className="flex items-center gap-3 p-1 bg-slate-100 rounded-xl mb-3">
              <button
                type="button"
                onClick={() => setPatientType('new')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  patientType === 'new' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
                }`}
              >
                New Patient Visit
              </button>
              <button
                type="button"
                onClick={() => setPatientType('returning')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  patientType === 'returning' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
                }`}
              >
                Existing Patient
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="(415) 555-0192"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Primary Concern or Dental History Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="Tell us about sensitivity, aesthetic goals, or past dental anxiety..."
                  className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                />
              </div>
            </div>

            {/* Summary card */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>{currentService.name}</span>
                <span>{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Attending: {currentDoctor.name}</span>
                <span>{selectedDate}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-7 py-3 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Confirmation Success Pass */}
        {step === 5 && confirmedAppointment && (
          <div className="py-6 text-center space-y-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                Booking Confirmed
              </div>
              <h4 className="text-2xl font-bold tracking-tight text-slate-950 mt-1">
                We look forward to welcoming you, {confirmedAppointment.patientName}.
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                A calendar invitation and clinical preparation guide have been prepared.
              </p>
            </div>

            {/* Apple Wallet / Digital Pass Card */}
            <div className="bg-[#F5F5F7] rounded-3xl p-6 border border-slate-200 text-left max-w-md mx-auto shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <span className="text-xs font-bold text-slate-950">DKDC Clinical Pass</span>
                <span className="font-mono text-xs font-bold text-[#0071E3]">
                  {confirmedAppointment.referenceNumber}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Treatment</span>
                  <span className="font-semibold text-slate-900 text-sm">{confirmedAppointment.serviceName}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Specialist</span>
                    <span className="font-medium text-slate-900">{confirmedAppointment.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Date & Time</span>
                    <span className="font-medium text-slate-900 tabular-nums">{confirmedAppointment.date} @ {confirmedAppointment.timeSlot}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Facility</span>
                  <span className="text-slate-700">Suite 1800, 450 Sutter Medical Pavilion, SF</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={downloadCalendarFile}
                className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Apple / Google Calendar (.ics)</span>
              </button>
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Site</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
