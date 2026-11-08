import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ButterflyMonogram } from './MonarchLogo';
import { PageId } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useCart();
  const [modalContent, setModalContent] = useState<{
    title: string;
    text: string;
  } | null>(null);

  const openLegalModal = (title: string, text: string) => {
    setModalContent({ title, text });
  };

  return (
    <footer
      style={{ backgroundColor: '#646A48' }}
      className="bg-[#646A48] text-[#E1C9B0] border-t border-[#E1C9B0]/15 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E1C9B0]/15">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo/Monarch Logo Mark 2026 - White.svg"
                alt="MONARCH GIN"
                style={{
                  borderColor: '#e1c9b0',
                  color: '#e1c9b0',
                  filter: 'brightness(0) saturate(100%) invert(86%) sepia(13%) saturate(547%) hue-rotate(350deg) brightness(96%) contrast(89%)',
                }}
                className="h-9 md:h-10 w-auto object-contain shrink-0 border-[#e1c9b0]"
              />
              <div className="flex flex-col">
                <span
                  style={{ color: '#e1c9b0' }}
                  className="font-serif tracking-[0.24em] font-medium text-2xl uppercase text-[#e1c9b0]"
                >
                  MONARCH
                </span>
                <span className="text-[9px] font-sans tracking-[0.32em] uppercase text-[#E1C9B0]/70">
                  BOTANICAL GIN
                </span>
              </div>
            </div>

            <p className="font-serif italic text-lg text-[#E1C9B0]/90 max-w-sm pt-2">
              “A spirit for what comes next.”
            </p>

            <p className="text-xs font-sans text-[#E1C9B0]/70 leading-relaxed max-w-sm">
              Shaped by nature, inspired by transformation, and distilled on the West Coast. Handcrafted in small 600-bottle editions.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] font-sans tracking-[0.28em] uppercase text-[#E1C9B0]/50 mb-3">
              EXPLORE
            </p>
            <ul className="space-y-2.5 text-xs font-sans tracking-[0.2em] uppercase">
              {(['home', 'about', 'shop', 'contact'] as PageId[]).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className="text-[#E1C9B0]/80 hover:text-white transition-colors"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Inquiries & Social */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[10px] font-sans tracking-[0.28em] uppercase text-[#E1C9B0]/50 mb-3">
              COMMUNICATION
            </p>
            <p className="text-xs font-sans text-[#E1C9B0]/80">
              Direct Inquiries & Cellar Reserve:
            </p>
            <a
              href="mailto:concierge@monarchgin.com"
              className="block font-serif text-base text-[#E1C9B0] hover:underline"
            >
              concierge@monarchgin.com
            </a>
            <div className="pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-sans tracking-[0.2em] uppercase text-[#E1C9B0]/75 hover:text-white transition-colors"
              >
                Instagram · @monarchgin ↗
              </a>
            </div>
            <p className="text-[11px] font-sans text-[#E1C9B0]/60 pt-2 leading-relaxed">
              Distillery & Botanical Tasting Reserve: West Coast, Western Cape, South Africa.
            </p>
          </div>
        </div>

        {/* Responsible Drinking & Legal Notice */}
        <div className="py-8 border-b border-[#E1C9B0]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-sans text-[#E1C9B0]/70">
          <div className="flex items-center gap-3">
            <span className="inline-block px-2 py-0.5 border border-[#E1C9B0]/40 text-[10px] font-bold tracking-widest text-[#E1C9B0]">
              18+
            </span>
            <span className="text-[11px] leading-relaxed">
              Not for sale to persons under the age of 18. Alcohol abuse is dangerous to your health. Please savour responsibly.
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase shrink-0">
            <button
              onClick={() =>
                openLegalModal(
                  'Responsible Drinking Code',
                  'MONARCH advocates for the appreciation of fine craft spirits with discernment and moderation. In accordance with South African liquor legislation (Act 59 of 2003) and industry regulatory bodies (AWARE.org), sales are restricted to adults over 18 years of age. Never drink and drive.'
                )
              }
              className="hover:underline"
            >
              Responsible Drinking
            </button>
            <button
              onClick={() =>
                openLegalModal(
                  'Privacy Policy',
                  'We safeguard your digital footprint with absolute discretion. Personal details collected during order placement or concierge inquiry are utilized solely for dispatch fulfillment, courier coordination, and private cellar invitations.'
                )
              }
              className="hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() =>
                openLegalModal(
                  'Terms & Conditions',
                  'All bottle transactions are subject to batch availability and age confirmation upon delivery. Damaged or defective goods will be replaced upon photo receipt within 7 days of delivery.'
                )
              }
              className="hover:underline"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#E1C9B0]/50 tracking-wider">
          <p>© 2026 MONARCH GIN. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">ARCHIVAL BOTANICAL × CONTEMPORARY LUXURY</p>
        </div>
      </div>

      {/* Legal Info Modal */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-xs"
        >
          <div className="bg-[#E1C9B0] text-[#262621] p-8 max-w-lg w-full border border-[#262621]/20 shadow-2xl">
            <h3 className="font-serif text-2xl mb-4 text-[#262621] uppercase">
              {modalContent.title}
            </h3>
            <p className="text-xs font-sans text-[#262621]/80 leading-relaxed mb-6">
              {modalContent.text}
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="px-6 py-2.5 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-widest uppercase hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
