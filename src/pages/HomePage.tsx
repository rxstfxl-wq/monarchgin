import React from 'react';
import { HeroParallax } from '../components/HeroParallax';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ButterflyMonogram } from '../components/MonarchLogo';

export const HomePage: React.FC = () => {
  const { setCurrentPage, openProductDetail, formatPrice } = useCart();

  return (
    <div className="bg-[#E1C9B0] text-[#262621]">
      {/* SECTION 01: CINEMATIC HERO WITH GSAP PINNED PARALLAX */}
      <HeroParallax />

      {/* SECTION 02: BRAND INTRODUCTION */}
      <section
        style={{ backgroundColor: '#eae0d8' }}
        className="py-24 md:py-36 px-6 md:px-12 border-b border-[#262621]/15 bg-[#eae0d8]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Statement */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#AD6230] font-medium">
                  01 / THE PHILOSOPHY
                </span>
                <span className="h-[1px] w-12 bg-[#AD6230]/40" />
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.95] text-[#262621] text-balance font-normal">
                Rooted in nature.<br />
                <span className="italic font-light">Defined by transformation.</span>
              </h2>

              <p className="font-sans text-sm md:text-base text-[#262621]/80 leading-relaxed max-w-xl">
                MONARCH was born from a singular conviction: that spirits should not merely repeat heritage, but capture becoming. Shaped by the intense sunlight, sea fog, and resilient botanicals of the Western Cape, our distillations honor natural renewal—transforming indigenous desert succulents and high-altitude flora into spirits of quiet intensity.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="group inline-flex items-center gap-3 text-xs font-sans tracking-[0.22em] uppercase font-medium text-[#262621] hover:text-[#AD6230] transition-colors"
                >
                  <span>Discover the Monarch Story</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            {/* Right: Archival Botanical Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-md w-full">
                <div className="aspect-[4/5] overflow-hidden flex items-center justify-center">
                  <img
                    src="/Media/01 Morrow - Classic.jpg"
                    alt="Monarch Botanical Spirit — Classic"
                    className="h-full w-full object-contain transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-[9px] font-sans tracking-[0.25em] uppercase text-[#262621]/60">
                  <span>FIG. 01 — ARCHIVAL BOTANICAL STUDY</span>
                  <span>WEST COAST BIOME</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: PRODUCT COLLECTION (TWO LARGE COLUMNS) */}
      <section
        style={{ backgroundColor: '#eae0d8' }}
        className="py-24 md:py-36 px-6 md:px-12 border-b border-[#262621]/15 bg-[#eae0d8]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#262621]/15">
            <div>
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#262621]/60 mb-2">
                02 / THE COLLECTION
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#262621] font-normal">
                Two Distinct Expressions
              </h2>
            </div>
            <p className="text-xs font-sans text-[#262621]/70 max-w-sm mt-4 md:mt-0">
              Each bottle is individually numbered from small 600-bottle distillations, sealed by hand with natural cork and botanical parchment bands.
            </p>
          </div>

          {/* 2-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group bg-[#F6EDE3] border border-[#262621]/15 p-8 md:p-12 flex flex-col justify-between transition-all duration-300 hover:border-[#262621]/35 hover:shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-sans tracking-[0.25em] uppercase text-[#262621]/60 mb-6">
                    <span>PRODUCT {product.number}</span>
                    <span>{product.bottleSize} · {product.abv}</span>
                  </div>

                  {/* Bottle Shot */}
                  <div
                    onClick={() => openProductDetail(product.id)}
                    className="relative aspect-[3/4] flex items-center justify-center p-6 mb-8 cursor-pointer overflow-hidden bg-[#EAD8C5]/40"
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} — ${product.expression}`}
                      className="max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(38,38,33,0.2)]"
                    />
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-tight text-[#262621] mb-2 font-medium">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#AD6230] mb-4">
                    {product.expression}
                  </p>
                  <p className="font-sans text-xs text-[#262621]/75 leading-relaxed line-clamp-2 mb-6">
                    {product.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#262621]/12 flex items-center justify-between">
                  <span className="font-serif text-xl text-[#262621] tabular-nums">
                    {formatPrice(product.priceZAR)}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => openProductDetail(product.id)}
                      className="text-xs font-sans tracking-[0.2em] uppercase text-[#262621] hover:text-[#AD6230] transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('shop')}
              style={{ backgroundColor: '#646A48', color: '#ffffff' }}
              className="px-8 py-3.5 bg-[#646A48] text-white text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-[#52573B] transition-colors"
            >
              Explore the Full Shop
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 04: THE MONARCH SYMBOL */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#EAD8C5] border-b border-[#262621]/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Graphic Identity Panel */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-8 md:p-12 bg-[#F6EDE3] border border-[#262621]/20 shadow-xl max-w-sm w-full text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src="/logo/Monarch Logo Mark 2026 - White.svg"
                    alt="MONARCH Logo Mark"
                    style={{ filter: 'brightness(0)' }}
                    className="h-16 md:h-20 w-auto object-contain brightness-0"
                  />
                </div>
                <h3 className="font-serif text-2xl tracking-[0.2em] uppercase text-[#262621] mb-2">
                  MONARCH
                </h3>
                <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#262621]/60 mb-6">
                  THE MONOGRAM
                </p>
                <div className="h-[1px] w-16 bg-[#262621]/20 mx-auto mb-6" />
                <p className="text-xs font-sans text-[#262621]/80 leading-relaxed italic">
                  “A mark of renewal, movement and the promise of tomorrow.”
                </p>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#AD6230] font-medium">
                03 / THE SYMBOL
              </p>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#262621] font-normal leading-[1.05]">
                Every transformation begins somewhere.
              </h2>

              <p className="font-sans text-sm md:text-base text-[#262621]/80 leading-relaxed max-w-xl">
                The Monarch butterfly undergoes one of nature’s most miraculous metamorphoses: dissolving completely within the chrysalis before reforming with wings capable of traversing continents.
              </p>

              <p className="font-sans text-sm md:text-base text-[#262621]/80 leading-relaxed max-w-xl">
                In the same spirit, our distillation takes raw, spiny botanicals, bitter peels, and fragrant leaves—subjecting them to heat, pressure, and condensation until they emerge as something entirely new, luminous, and transcendent.
              </p>

              <div className="pt-4 flex items-center gap-6 text-xs font-sans tracking-[0.2em] uppercase text-[#262621]/70">
                <span>ARCHIVAL BOTANICAL</span>
                <span aria-hidden="true">×</span>
                <span>CONTEMPORARY LUXURY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: CLOSING CAMPAIGN */}
      <section className="py-28 md:py-44 px-6 md:px-12 bg-[#646A48] text-[#E1C9B0] text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          style={{ backgroundColor: '#646A48' }}
          className="absolute inset-0 bg-[#646A48] opacity-100"
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center mb-4">
            <img
              src="/Media/Monarch Promise.svg"
              alt="The Monarch Promise"
              className="h-20 sm:h-28 md:h-32 w-auto object-contain invert"
            />
          </div>

          <p
            style={{ color: '#eae0d8' }}
            className="text-xs font-sans tracking-[0.32em] uppercase text-[#eae0d8] font-light"
          >
            THE MONARCH PROMISE
          </p>

          <h2
            style={{ color: '#ffffff' }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-[0.08em] font-normal text-white text-balance"
          >
            A spirit for what comes next.
          </h2>

          <p className="font-sans text-sm md:text-base text-[#E1C9B0]/80 max-w-lg mx-auto leading-relaxed pt-2">
            Acquire your allocation from the current 600-bottle cellar run. Handcrafted in South Africa and delivered in archival presentation packaging.
          </p>

          <div className="pt-6">
            <button
              onClick={() => setCurrentPage('shop')}
              style={{ backgroundColor: '#eae0d8' }}
              className="px-10 py-4 bg-[#eae0d8] text-[#262621] text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-white transition-colors duration-200"
            >
              Explore the Collection →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
