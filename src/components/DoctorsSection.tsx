import React from 'react';
import { DOCTORS } from '../data/dentalData';
import { Award, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorForBooking }) => {
  return (
    <section id="specialists" className="py-24 sm:py-32 bg-[#FBFBFD] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
            Clinical Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance">
            The surgeons and master ceramists behind DKDC.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed text-balance">
            Led by Dr. Dhruti Krishna, our team combines academic rigor with empathetic patient communication. 
            Each specialist focuses exclusively on their dedicated domain.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Header info */}
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#0071E3] mb-1">
                    {doc.title}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    {doc.degrees}
                  </div>
                </div>

                <div className="bg-[#F5F5F7] rounded-2xl p-4 mb-6">
                  <div className="text-xs font-semibold text-slate-800 mb-1">
                    Specialty & Focus
                  </div>
                  <div className="text-xs text-slate-600 leading-normal">
                    {doc.specialty}
                  </div>
                </div>

                {/* Bio & Philosophy */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {doc.bio}
                </p>

                {/* Philosophy Quote */}
                <div className="border-l-2 border-[#0071E3] pl-3 py-1 mb-6 text-xs italic text-slate-700">
                  "{doc.philosophy}"
                </div>

                {/* Specializations list */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-600">
                  <div className="font-semibold text-slate-900 text-xs mb-2">Core Competencies:</div>
                  {doc.specializations.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {doc.experienceYears}+ Yrs Mastery
                </span>
                <button
                  onClick={() => onSelectDoctorForBooking(doc.id)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 hover:text-white hover:bg-slate-950 border border-slate-200 hover:border-slate-950 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Book with {doc.name.split(' ')[1]}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
