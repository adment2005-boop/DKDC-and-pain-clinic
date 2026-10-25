import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/dental';
import { Search, Calendar, Clock, User, X, AlertCircle, CheckCircle, Trash2, ArrowLeft } from 'lucide-react';

interface AppointmentLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNew: () => void;
}

export const AppointmentLookupModal: React.FC<AppointmentLookupModalProps> = ({
  isOpen,
  onClose,
  onBookNew,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const loadAppointments = () => {
    try {
      const data = localStorage.getItem('dkdc_appointments');
      if (data) {
        setAppointments(JSON.parse(data));
      } else {
        setAppointments([]);
      }
    } catch {
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
      setFeedbackMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      apt.referenceNumber.toLowerCase().includes(q) ||
      apt.patientName.toLowerCase().includes(q) ||
      apt.patientPhone.includes(q)
    );
  });

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map((apt) => {
      if (apt.id === id) {
        return { ...apt, status: 'cancelled' as const };
      }
      return apt;
    });
    setAppointments(updated);
    try {
      localStorage.setItem('dkdc_appointments', JSON.stringify(updated));
      setFeedbackMessage('Appointment has been successfully cancelled.');
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
              Patient Portal
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 mt-0.5">
              Manage Your Reservations
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all cursor-pointer shadow-2xs"
              title="Return to DKDC main site"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close lookup modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Reference Code (e.g. DKDC-2026-...) or Patient Name"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F5F5F7] rounded-xl border border-transparent focus:bg-white focus:border-[#0071E3] focus:outline-none transition-all"
            />
          </div>
        </div>

        {feedbackMessage && (
          <div className="mb-4 p-3 bg-slate-100 text-slate-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* List of appointments */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {filteredAppointments.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <div className="text-sm font-semibold text-slate-700">No scheduled visits found</div>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                No active bookings matching your query. Book your first clinical appointment in seconds.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl cursor-pointer"
              >
                Schedule Appointment
              </button>
            </div>
          ) : (
            filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className={`p-4 rounded-2xl border transition-all ${
                  apt.status === 'cancelled'
                    ? 'border-slate-200 bg-slate-50/60 opacity-60'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {apt.referenceNumber}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-950 mt-1">
                      {apt.serviceName}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Doctor: {apt.doctorName} · Patient: {apt.patientName}
                    </div>
                  </div>

                  {apt.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Cancel reservation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-mono tabular-nums">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.date} @ {apt.timeSlot}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Suite 1800, 450 Sutter St
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Need urgent assistance? Call (415) 890-3532</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 cursor-pointer bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Site</span>
          </button>
        </div>
      </div>
    </div>
  );
};
