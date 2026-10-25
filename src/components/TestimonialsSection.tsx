import React, { useState, useEffect } from 'react';
import { INITIAL_TESTIMONIALS } from '../data/dentalData';
import { PatientTestimonial, ServiceCategory } from '../types/dental';
import { Star, CheckCircle, MessageSquarePlus, X, Check } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<PatientTestimonial[]>(INITIAL_TESTIMONIALS);
  const [filterCategory, setFilterCategory] = useState<ServiceCategory>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [treatment, setTreatment] = useState('Porcelain Veneers');
  const [category, setCategory] = useState<ServiceCategory>('cosmetics');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [outcomeNote, setOutcomeNote] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dkdc_user_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTestimonials([...parsed, ...INITIAL_TESTIMONIALS]);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !quote.trim()) return;

    const newReview: PatientTestimonial = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      location: location.trim() || 'San Francisco, CA',
      treatment,
      category,
      rating,
      date: 'Just now',
      quote: quote.trim(),
      outcomeNote: outcomeNote.trim() || 'Verified patient treatment completion.',
      verified: true,
    };

    const updated = [newReview, ...testimonials];
    setTestimonials(updated);

    try {
      const stored = localStorage.getItem('dkdc_user_reviews');
      const userReviews = stored ? JSON.parse(stored) : [];
      userReviews.unshift(newReview);
      localStorage.setItem('dkdc_user_reviews', JSON.stringify(userReviews));
    } catch {
      // ignore
    }

    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setIsSubmitModalOpen(false);
      setAuthorName('');
      setLocation('');
      setQuote('');
      setOutcomeNote('');
    }, 1500);
  };

  const filtered = filterCategory === 'all'
    ? testimonials
    : testimonials.filter((t) => t.category === filterCategory);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Reviews' },
    { id: 'endodontics', label: 'Root Canals' },
    { id: 'cosmetics', label: 'Porcelain Veneers' },
    { id: 'orthodontics', label: 'Invisalign®' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'preventative', label: 'Air-Flow Cleaning' },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#FBFBFD] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
              Patient Voices
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance">
              The confidence of lasting oral health.
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Read uncensored treatment stories from patients who experienced our pain-free clinical care, 
              microscopic surgery, and aesthetic smile transformations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#0071E3]" />
              <span>Share Experience</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl overflow-x-auto no-scrollbar max-w-full mb-10">
          {categories.map((c) => {
            const isSelected = filterCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating Stars & Verified tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                </div>

                {/* Treatment kicker */}
                <div className="text-xs font-semibold text-[#0071E3] mb-2 uppercase tracking-wide">
                  {item.treatment}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-950">{item.author}</div>
                    <div className="text-xs text-slate-500">{item.location}</div>
                  </div>
                  {item.verified && (
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verified Patient</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-[11px] text-slate-500 bg-[#F5F5F7] p-2 rounded-xl">
                  <span className="font-medium text-slate-700">Outcome:</span> {item.outcomeNote}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0071E3]">
                  DKDC Patient Stories
                </span>
                <h3 className="text-xl font-bold tracking-tight text-slate-950 mt-0.5">
                  Share Your Treatment Experience
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedFeedback ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-950">Thank you for sharing your journey!</h4>
                <p className="text-xs text-slate-500">Your review is now published to the patient wall.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="py-4 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Rachel K."
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      City / Neighborhood
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Nob Hill, SF"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Treatment Received
                    </label>
                    <input
                      type="text"
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      placeholder="e.g. Invisalign® Clear Aligners"
                      className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            num <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-slate-500 ml-2">{rating} out of 5 stars</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Describe your care experience, doctor's gentle approach, or results..."
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Clinical Outcome Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={outcomeNote}
                    onChange={(e) => setOutcomeNote(e.target.value)}
                    placeholder="e.g. Completed in 3 months; zero post-op sensitivity"
                    className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-[#0071E3] rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
