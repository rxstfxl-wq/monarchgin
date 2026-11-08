import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ButterflyMonogram } from './MonarchLogo';
import { CURRENCIES } from '../data/products';
import { CurrencyCode, PageId } from '../types';

export const Navigation: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    setIsCartOpen,
    currency,
    setCurrency,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  const isSolid = !isHome || isScrolled;

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isSolid
            ? 'bg-[#E1C9B0] border-b border-[#262621]/12 text-[#262621] py-3.5 shadow-sm'
            : 'bg-transparent text-[#E1C9B0] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Butterfly Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className={`group flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-1 ${
              isSolid ? 'focus-visible:ring-[#262621]' : 'focus-visible:ring-[#E1C9B0]'
            }`}
            aria-label="MONARCH Home"
          >
            <img
              src="/logo/Monarch Logo Mark 2026 - White.svg"
              alt="MONARCH GIN"
              className={`h-8 md:h-9 w-auto object-contain shrink-0 transition-all duration-300 group-hover:scale-105 ${
                isSolid ? 'brightness-0' : ''
              }`}
            />
            <div className="flex flex-col">
              <span
                className={`font-serif tracking-[0.24em] font-medium text-base md:text-lg leading-tight uppercase whitespace-nowrap shrink-0 ${
                  isSolid ? 'text-[#262621]' : 'text-white'
                }`}
                style={!isSolid ? { color: '#ffffff' } : undefined}
              >
                MONARCH
              </span>
              <span
                className={`text-[8px] font-sans tracking-[0.32em] uppercase leading-none mt-0.5 whitespace-nowrap shrink-0 ${
                  isSolid ? 'text-[#262621]/70' : 'text-white'
                }`}
                style={!isSolid ? { color: '#ffffff' } : undefined}
              >
                BOTANICAL GIN
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-10"
          >
            {(['about', 'shop', 'contact'] as PageId[]).map((page) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  style={!isSolid ? { color: '#ffffff' } : undefined}
                  className={`text-xs font-sans tracking-[0.24em] uppercase transition-all duration-200 relative py-1 focus:outline-none whitespace-nowrap shrink-0 ${
                    isActive
                      ? isSolid ? 'text-[#262621] font-semibold' : 'text-white font-semibold'
                      : isSolid ? 'text-[#262621]/70 hover:text-[#262621]' : 'text-white hover:text-white/80'
                  }`}
                >
                  {page}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isSolid ? 'bg-[#262621]' : 'bg-[#E1C9B0]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Currency Switcher & Bag Trigger */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {/* Multi-currency dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className={`text-xs font-sans tracking-[0.16em] uppercase px-2 py-1 rounded transition-colors flex items-center gap-1 focus:outline-none whitespace-nowrap shrink-0 ${
                  isSolid
                    ? 'text-[#262621]/80 hover:text-[#262621]'
                    : 'text-[#E1C9B0]/90 hover:text-white'
                }`}
                aria-label="Change currency"
                aria-expanded={isCurrencyDropdownOpen}
              >
                <span>{currency}</span>
                <span className="text-[9px] opacity-60">▼</span>
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#E1C9B0] border border-[#262621]/20 shadow-lg py-1 z-50">
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code as CurrencyCode);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-sans tracking-wider transition-colors ${
                        currency === c.code
                          ? 'bg-[#262621] text-[#E1C9B0] font-medium'
                          : 'text-[#262621] hover:bg-[#262621]/10'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Bag action */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`group flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase py-1 px-1 focus:outline-none whitespace-nowrap shrink-0 ${
                isSolid
                  ? 'text-[#262621] hover:text-[#262621]'
                  : 'text-[#E1C9B0] hover:text-white'
              }`}
              aria-label={`View shopping bag with ${cartCount} items`}
            >
              <span className="hidden sm:inline">BAG</span>
              <span className="inline-flex items-center justify-center font-medium">
                ({cartCount})
              </span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-1.5 focus:outline-none ${isSolid ? 'text-[#262621]' : 'text-[#E1C9B0]'}`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full transition-transform duration-300 ${
                    isSolid ? 'bg-[#262621]' : 'bg-[#E1C9B0]'
                  } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                />
                <span
                  className={`h-0.5 w-full transition-opacity duration-300 ${
                    isSolid ? 'bg-[#262621]' : 'bg-[#E1C9B0]'
                  } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`h-0.5 w-full transition-transform duration-300 ${
                    isSolid ? 'bg-[#262621]' : 'bg-[#E1C9B0]'
                  } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-30 bg-[#E1C9B0] md:hidden flex flex-col justify-between p-8 pt-28"
        >
          <div className="flex flex-col space-y-8">
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#262621]/50">
              NAVIGATION
            </p>
            {(['home', 'about', 'shop', 'contact'] as PageId[]).map((page) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`text-left font-serif text-4xl tracking-tight uppercase transition-colors ${
                  currentPage === page ? 'text-[#AD6230]' : 'text-[#262621]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="border-t border-[#262621]/15 pt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#262621]/70">
              <span>CURRENCY</span>
              <div className="flex gap-3">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code as CurrencyCode)}
                    className={`font-sans ${
                      currency === c.code
                        ? 'font-bold text-[#262621] underline'
                        : 'text-[#262621]/60'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[11px] font-sans tracking-widest text-[#262621]/50 uppercase">
              A SPIRIT FOR WHAT COMES NEXT · EST. 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
};
