import React from 'react';
import { useCart } from '../context/CartContext';
import { ButterflyMonogram } from './MonarchLogo';

export const AgeVerificationModal: React.FC = () => {
  const { isAgeVerified, verifyAge } = useCart();

  if (isAgeVerified) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-verification-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#262621]/90 backdrop-blur-md px-6"
    >
      <div className="relative max-w-lg w-full bg-[#E1C9B0] border border-[#262621]/15 p-8 md:p-12 shadow-2xl text-center">
        {/* Archival Monogram */}
        <div className="flex justify-center mb-6">
          <ButterflyMonogram size={48} color="#262621" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.3em] font-sans text-[#262621]/70 mb-2">
          BOTANICAL SPIRITS · EST. 2026
        </p>

        <h2
          id="age-verification-heading"
          className="font-serif text-3xl md:text-4xl tracking-tight text-[#262621] mb-4 font-normal"
        >
          Are you of legal drinking age?
        </h2>

        <p className="text-sm font-sans text-[#262621]/80 leading-relaxed mb-8 max-w-sm mx-auto">
          MONARCH crafts botanical spirits intended solely for those of legal age.
          In accordance with South African alcohol regulations and international law,
          you must be 18 years or older to enter.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={verifyAge}
            className="w-full sm:w-auto px-8 py-3 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#1A1A17] transition-colors"
          >
            I am 18 or older — Enter
          </button>
          <a
            href="https://www.google.com"
            className="w-full sm:w-auto px-6 py-3 border border-[#262621]/20 text-[#262621] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#262621]/5 transition-colors text-center"
          >
            Exit Site
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[#262621]/10 text-[10px] text-[#262621]/60 tracking-wider uppercase">
          A Spirit For What Comes Next · Drink Responsibly
        </div>
      </div>
    </div>
  );
};
