import React, { useState } from 'react';
import { ButterflyMonogram } from '../components/MonarchLogo';
import { ContactSubmission } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
  });

  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam protection check
    if (honeypot) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-[#E1C9B0] text-[#262621] pt-24 md:pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#262621]/30" />
            <ButterflyMonogram size={24} color="#262621" />
            <span className="h-[1px] w-8 bg-[#262621]/30" />
          </div>

          <p className="text-[10px] font-sans tracking-[0.32em] uppercase text-[#AD6230] font-medium">
            ENQUIRIES · COLLABORATIONS · STOCKISTS
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#262621] font-normal">
            Let's Connect.
          </h1>

          <p className="text-xs sm:text-sm font-sans text-[#262621]/80 leading-relaxed max-w-md mx-auto">
            Whether inquiring about stockist allocations, sommelier tastings, or bespoke events, our cellar concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F6EDE3] p-8 border border-[#262621]/15 space-y-6">
              <div>
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#262621]/60 mb-1">
                  DIRECT CONCIERGE EMAIL
                </p>
                <a
                  href="mailto:concierge@monarchgin.com"
                  className="font-serif text-xl text-[#262621] hover:text-[#AD6230] transition-colors"
                >
                  concierge@monarchgin.com
                </a>
              </div>

              <div className="pt-4 border-t border-[#262621]/10">
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#262621]/60 mb-1">
                  INSTAGRAM DIALOGUE
                </p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-xl text-[#262621] hover:text-[#AD6230] transition-colors"
                >
                  @monarchgin ↗
                </a>
              </div>

              <div className="pt-4 border-t border-[#262621]/10">
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#262621]/60 mb-1">
                  BOTANICAL SANCTUARY & CELLAR
                </p>
                <p className="text-xs font-sans text-[#262621]/80 leading-relaxed">
                  West Coast Peninsula Reserve, Western Cape, South Africa. Private sommelier appointments available by prior reservation.
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#EAD8C5] border border-[#262621]/15 text-xs font-sans text-[#262621]/80 space-y-2">
              <span className="font-semibold text-[#262621] uppercase tracking-wider block">
                Trade & Wholesale Allocations
              </span>
              <p className="leading-relaxed">
                Licensed restaurants, luxury hotels, and independent spirits merchants receive dedicated batch reservations and custom POS display cases.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#F6EDE3] p-8 md:p-12 border border-[#262621]/15">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="flex justify-center mb-4">
                  <ButterflyMonogram size={48} color="#262621" />
                </div>
                <h3 className="font-serif text-3xl uppercase text-[#262621]">
                  Transmission Received
                </h3>
                <p className="text-xs font-sans text-[#262621]/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-[#262621]">{formData.name}</span>. Your inquiry has been routed to our distillery concierge. We will respond within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        category: 'general',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 border border-[#262621]/20 text-xs font-sans tracking-widest uppercase hover:bg-[#262621] hover:text-[#E1C9B0] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for spam prevention (hidden from view) */}
                <input
                  type="text"
                  name="user_website_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Enquiry Category */}
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.22em] uppercase text-[#262621]/70 mb-2">
                    Enquiry Category *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'general', label: 'General Enquiries' },
                      { id: 'stockists', label: 'Stockist Enquiries' },
                      { id: 'trade', label: 'Trade & Wholesale' },
                      { id: 'collaborations', label: 'Collaborations' },
                    ].map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            category: cat.id as ContactSubmission['category'],
                          })
                        }
                        className={`py-2 px-3 text-[11px] font-sans tracking-wider uppercase border text-left transition-colors ${
                          formData.category === cat.id
                            ? 'bg-[#262621] text-[#E1C9B0] border-[#262621]'
                            : 'bg-[#E1C9B0]/50 text-[#262621] border-[#262621]/20 hover:border-[#262621]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#E1C9B0]/60 border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#E1C9B0]/60 border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#E1C9B0]/60 border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your venue, inquiry, or partnership concept..."
                    className="w-full bg-[#E1C9B0]/60 border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-[#1A1A17] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting Enquiry...' : 'Send Enquiry →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
