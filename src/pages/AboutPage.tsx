import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ButterflyMonogram } from '../components/MonarchLogo';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, openProductDetail } = useCart();

  return (
    <div className="bg-[#E1C9B0] text-[#262621] pt-24 md:pt-32">
      {/* SECTION 01: HERO */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b border-[#262621]/15">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#262621]/30" />
            <ButterflyMonogram size={24} color="#262621" />
            <span className="h-[1px] w-8 bg-[#262621]/30" />
          </div>

          <p className="text-[11px] font-sans tracking-[0.32em] uppercase text-[#AD6230] font-medium">
            BOTANICAL SPIRITS · EST. 2026
          </p>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase font-normal text-[#262621] text-balance">
            The Art of Transformation.
          </h1>

          <p className="font-sans text-sm md:text-base text-[#262621]/80 max-w-2xl mx-auto leading-relaxed">
            MONARCH is an independent botanical gin house rooted in the wild flora of South Africa’s West Coast and mountain escarpments. We craft spirits that celebrate renewal, stillness, and what comes next.
          </p>
        </div>
      </section>

      {/* SECTION 02: OUR PHILOSOPHY */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-b border-[#262621]/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#646A42] font-semibold">
                OUR PHILOSOPHY
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#262621] font-normal leading-[1.05]">
                Nature is never standing still.
              </h2>

              <p className="font-sans text-sm text-[#262621]/80 leading-relaxed">
                Conventional distilleries often obsess over replication—producing uniform batches year after year. At MONARCH, we embrace the dynamic pulse of the natural world. Rainfall shifts, solar intensities wax and wane, and botanical oils change character with the seasons.
              </p>

              <p className="font-sans text-sm text-[#262621]/80 leading-relaxed">
                Our approach combines 19th-century botanical field archives with low-temperature vacuum extraction and traditional copper pot alembic distillation. We do not mask nature; we distill its most sublime state of transition.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="bg-[#F6EDE3] p-4 border border-[#262621]/15 shadow-xl max-w-md w-full">
                <img
                  src="/assets/brand/brand-world.webp"
                  alt="Monarch Botanical World"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="mt-3 text-[10px] font-sans tracking-widest uppercase text-[#262621]/60 text-center">
                  Cactus Botanicals · Red Protea · Coastal Karoo Biome
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: THE SYMBOL */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#EAD8C5] border-b border-[#262621]/15">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <ButterflyMonogram size={56} color="#262621" />
          </div>

          <p className="text-[10px] font-sans tracking-[0.32em] uppercase text-[#262621]/60">
            THE BUTTERFLY EMBLEM
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#262621] font-normal max-w-3xl mx-auto">
            A symbol of becoming.
          </h2>

          <div className="max-w-2xl mx-auto space-y-4 text-sm font-sans text-[#262621]/85 leading-relaxed text-left sm:text-center">
            <p>
              The Monarch butterfly is celebrated across continents as a testament to resilience, beauty, and perpetual renewal. Guided by light and wind, it embarks on monumental migrations, never remaining rooted in the past.
            </p>
            <p>
              Embedded into our initial monogram, the butterfly serves as a quiet reminder of life’s cycles: from seed to blossom, from harvest to still, and from spirit to shared memory.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 04: BOTANICAL HERITAGE */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-b border-[#262621]/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#AD6230] font-semibold">
              BOTANICAL ARCHIVES
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#262621] font-normal">
              Curated Botanical Heritage
            </h2>
            <p className="text-xs font-sans text-[#262621]/70 leading-relaxed">
              Every botanical in our archive is selected for aromatic distinction and sustainable origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F6EDE3] p-8 border border-[#262621]/12 space-y-3">
              <span className="text-xs font-serif font-bold text-[#AD6230] uppercase">01 / Arid Flora</span>
              <h3 className="font-serif text-xl uppercase text-[#262621]">Kalahari Prickly Pear</h3>
              <p className="text-xs font-sans text-[#262621]/75 leading-relaxed">
                Hand-harvested in the early morning desert mist. The vibrant cactus pads and sweet fruit impart crisp mineral sweetness and delicate vegetative clarity.
              </p>
            </div>

            <div className="bg-[#F6EDE3] p-8 border border-[#262621]/12 space-y-3">
              <span className="text-xs font-serif font-bold text-[#646A42] uppercase">02 / Mountain Florals</span>
              <h3 className="font-serif text-xl uppercase text-[#262621]">Highveld Lavender</h3>
              <p className="text-xs font-sans text-[#262621]/75 leading-relaxed">
                Grown on elevated granite soils where cool nights concentrate essential floral volatiles without cloying soapiness, yielding velvet floral aromatics.
              </p>
            </div>

            <div className="bg-[#F6EDE3] p-8 border border-[#262621]/12 space-y-3">
              <span className="text-xs font-serif font-bold text-[#794338] uppercase">03 / Stream Herbal</span>
              <h3 className="font-serif text-xl uppercase text-[#262621]">Indigenous Spearmint</h3>
              <p className="text-xs font-sans text-[#262621]/75 leading-relaxed">
                Foraged along pure Cape mountain streams. Provides crisp cooling menthol freshness and a crystalline herbal finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: THE COLLECTION SPOTLIGHT */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-b border-[#262621]/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#262621] font-normal mb-2">
              The Current Releases
            </h2>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#262621]/60">
              Limited 600-Bottle Cellar Editions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                onClick={() => openProductDetail(product.id)}
                className="group cursor-pointer bg-[#F6EDE3] p-8 border border-[#262621]/15 hover:border-[#262621]/40 transition-all duration-300"
              >
                <div className="aspect-[4/3] flex items-center justify-center p-4 bg-[#EAD8C5]/50 mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl uppercase tracking-tight text-[#262621]">
                      {product.name}
                    </h3>
                    <p className="text-xs font-sans text-[#AD6230] uppercase tracking-wider">
                      {product.expression}
                    </p>
                  </div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#262621]/60 group-hover:text-[#262621]">
                    Inspect →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: CLOSING CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center bg-[#262621] text-[#E1C9B0]">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#E1C9B0]/60">
            EXPERIENCE MONARCH
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl uppercase tracking-tight font-normal text-[#E1C9B0]">
            Discover a Different Spirit.
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#E1C9B0]/80 max-w-md mx-auto leading-relaxed">
            Order directly from our distillery reserve with complimentary insured delivery across South Africa.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-8 py-3.5 bg-[#E1C9B0] text-[#262621] text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-white transition-colors"
            >
              Enter the Shop →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
