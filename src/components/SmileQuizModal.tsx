import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface SmileQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (serviceId: string) => void;
}

export const SmileQuizModal: React.FC<SmileQuizModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string>('cosmetic');
  const [anxiety, setAnxiety] = useState<string>('anxious');
  const [timeline, setTimeline] = useState<string>('asap');

  if (!isOpen) return null;

  // Determine recommendation
  const getRecommendation = () => {
    if (goal === 'pain') {
      return {
        serviceId: 'micro-endodontics',
        title: 'Microscopic Endodontic & Preservation Exam',
        doctor: 'Dr. Ananya Sen',
        description: 'Targeted single-visit resolution of toothache or nerve sensitivity under 25x Carl Zeiss magnification and computer-guided painless anesthesia.',
        duration: '60 minutes',
      };
    } else if (goal === 'cosmetic') {
      return {
        serviceId: 'porcelain-veneers',
        title: 'Digital Smile Simulation & Porcelain Laminates',
        doctor: 'Dr. Dhruti Krishna',
        description: 'Custom aesthetic smile architecture utilizing 3D facial photography and ultra-thin lithium disilicate ceramics preserving 98% of natural enamel.',
        duration: '2 visits (10 days)',
      };
    } else if (goal === 'alignment') {
      return {
        serviceId: 'invisalign-aligners',
        title: 'Invisalign® SmartTrack Assessment',
        doctor: 'Dr. Rohan Mehta',
        description: 'Complete 3D digital simulation showing week-by-week tooth movement without metal brackets or food restrictions.',
        duration: '4 – 8 months',
      };
    } else if (goal === 'missing') {
      return {
        serviceId: 'guided-dental-implants',
        title: '3D Guided Computer Implant Planning',
        doctor: 'Dr. Dhruti Krishna',
        description: 'CBCT 3D bone mapping and keyhole surgical placement of biocompatible titanium/zirconia root anchors.',
        duration: '45 mins placement',
      };
    } else {
      return {
        serviceId: 'airflow-prophylaxis',
        title: 'Air-Flow® Ultrasonic Biofilm Wellness Visit',
        doctor: 'DKDC Preventative Team',
        description: 'Painless warm-water erythritol cleaning removing 100% of bacterial stains and plaque without scraping.',
        duration: '45 minutes',
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
              Interactive Smile Assessment
            </span>
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
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="py-4 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-900">Question {step} of 3</span>
            <span className="font-mono text-slate-400">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
        )}

        {/* Question 1: Goal */}
        {step === 1 && (
          <div className="py-4 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              What is your primary oral health or aesthetic priority?
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'pain', label: 'Relieve pain, sensitivity, or broken tooth', sub: 'Urgent relief & microscopic tooth preservation' },
                { id: 'cosmetic', label: 'Enhance smile aesthetics, whiteness & symmetry', sub: 'Porcelain veneers, laser whitening, micro-bonding' },
                { id: 'alignment', label: 'Straighten teeth or correct bite gaps', sub: 'Discreet invisible aligners without metal' },
                { id: 'missing', label: 'Replace missing tooth or unstable dentures', sub: 'Permanent biocompatible dental implants' },
                { id: 'preventative', label: 'Gentle preventative cleaning & checkup', sub: 'Air-Flow warm-water hygiene & comprehensive exam' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGoal(opt.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    goal === opt.id
                      ? 'border-[#0071E3] bg-[#0071E3]/5 ring-1 ring-[#0071E3]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    goal === opt.id ? 'border-[#0071E3] bg-[#0071E3] text-white' : 'border-slate-300'
                  }`}>
                    {goal === opt.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Site</span>
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 2: Comfort */}
        {step === 2 && (
          <div className="py-4 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              How do you typically feel during dental visits?
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'anxious', label: 'I experience high dental anxiety or fear of needles', sub: 'We provide The Wand® computerized numbing & twilight sedation' },
                { id: 'sensitive', label: 'I have sensitive gums or gag reflex', sub: 'Warm-water Air-Flow and laser therapy eliminates scraping' },
                { id: 'relaxed', label: 'Generally comfortable, value precision and quiet environment', sub: 'Dedicated noise-canceling headphones & calm pace' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAnxiety(opt.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    anxiety === opt.id
                      ? 'border-[#0071E3] bg-[#0071E3]/5 ring-1 ring-[#0071E3]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    anxiety === opt.id ? 'border-[#0071E3] bg-[#0071E3] text-white' : 'border-slate-300'
                  }`}>
                    {anxiety === opt.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5"
              >
                <span>Final Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 3: Timeline */}
        {step === 3 && (
          <div className="py-4 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              What is your target timeline for care?
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'asap', label: 'As soon as possible (this week / urgent)', sub: 'We reserve emergency priority slots daily' },
                { id: 'month', label: 'Within the next 2 to 4 weeks', sub: 'Ideal for planned smile transformations or consultations' },
                { id: 'exploring', label: 'Gathering expert information and estimates', sub: 'Comprehensive diagnostic scan & written roadmap' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTimeline(opt.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    timeline === opt.id
                      ? 'border-[#0071E3] bg-[#0071E3]/5 ring-1 ring-[#0071E3]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    timeline === opt.id ? 'border-[#0071E3] bg-[#0071E3] text-white' : 'border-slate-300'
                  }`}>
                    {timeline === opt.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5"
              >
                <span>View Recommendation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results & Recommended Pathway */}
        {step === 4 && (
          <div className="py-4 space-y-5">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5" /> Tailored Clinical Pathway
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mt-2">
                {rec.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Recommended Attending: <span className="font-semibold text-slate-900">{rec.doctor}</span>
              </p>
            </div>

            <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-slate-200/80 text-xs text-slate-600 space-y-3">
              <p className="text-sm leading-relaxed text-slate-800">
                {rec.description}
              </p>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>Estimated Session: {rec.duration}</span>
                <span className="text-[#0071E3] font-semibold">Computer-Guided Gentle Numbing</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Retake Assessment
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedToBooking(rec.serviceId);
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <span>Schedule This Treatment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
