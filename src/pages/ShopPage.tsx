import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ButterflyMonogram } from '../components/MonarchLogo';

export const ShopPage: React.FC = () => {
  const { openProductDetail, addToCart, formatPrice, currency } = useCart();

  return (
    <div className="bg-[#E1C9B0] text-[#262621] pt-24 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#262621]/30" />
            <ButterflyMonogram size={24} color="#262621" />
            <span className="h-[1px] w-8 bg-[#262621]/30" />
          </div>

          <p className="text-[10px] font-sans tracking-[0.32em] uppercase text-[#AD6230] font-medium">
            THE MONARCH COLLECTION
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#262621] font-normal">
            Botanical Spirits.
          </h1>

          <p className="font-sans text-xs sm:text-sm tracking-[0.24em] uppercase text-[#262621]/70">
            A COLLECTION OF DISTINCT EXPRESSIONS.
          </p>

          <p className="text-xs font-sans text-[#262621]/80 max-w-lg mx-auto pt-2 leading-relaxed">
            Distilled in limited batches on the West Coast. Hand-numbered bottles presented in custom archival paper boxes. Currently viewing prices in{' '}
            <span className="font-semibold text-[#262621]">{currency}</span>.
          </p>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-[#F6EDE3] border border-[#262621]/15 p-8 md:p-12 flex flex-col justify-between transition-all duration-300 hover:border-[#262621]/40 hover:shadow-2xl"
            >
              <div>
                {/* Clean Unboxed Metadata Header (Anti-Pill compliant) */}
                <div className="flex items-center justify-between text-xs text-[#262621]/70 mb-6">
                  <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-wider">
                    <span>EDITION {product.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.bottleSize}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.abv}</span>
                  </div>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#646A42] font-medium">
                    IN STOCK · 600 RUN
                  </span>
                </div>

                {/* Dominant Product Photograph */}
                <div
                  onClick={() => openProductDetail(product.id)}
                  className="relative aspect-[3/4] flex items-center justify-center p-6 mb-8 cursor-pointer overflow-hidden bg-[#EAD8C5]/40 transition-colors group-hover:bg-[#EAD8C5]/60"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} — ${product.expression}`}
                    className="max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_15px_30px_rgba(38,38,33,0.22)]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/3 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-2.5 bg-[#262621] text-[#E1C9B0] text-[10px] font-sans tracking-[0.2em] uppercase font-medium">
                      Inspect Bottle
                    </span>
                  </div>
                </div>

                {/* Product Title & Expression */}
                <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-[#262621] mb-1.5 font-medium">
                  {product.name}
                </h2>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#AD6230] mb-4">
                  {product.expression}
                </p>

                <p className="font-sans text-xs text-[#262621]/80 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Key Botanicals Preview */}
                <div className="pt-4 border-t border-[#262621]/10 mb-6">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/60 block mb-2">
                    Key Botanicals
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-serif text-[#262621]/90 italic">
                    {product.botanicals.slice(0, 4).map((b, i) => (
                      <span key={b.name}>
                        {b.name}
                        {i < 3 && <span className="text-[#262621]/40 ml-3">/</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase & Details Footer */}
              <div className="pt-6 border-t border-[#262621]/15 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#262621]/60">
                    Bottle Price
                  </span>
                  <span className="font-serif text-2xl text-[#262621] tabular-nums font-normal">
                    {formatPrice(product.priceZAR)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => openProductDetail(product.id)}
                    className="py-3 px-4 border border-[#262621]/30 text-[#262621] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#262621]/5 transition-colors text-center"
                  >
                    View Product
                  </button>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="py-3 px-4 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#1A1A17] transition-colors text-center"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Service Notice */}
        <div className="mt-16 p-8 bg-[#EAD8C5] border border-[#262621]/15 max-w-3xl mx-auto text-center space-y-2">
          <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#262621]/70 font-semibold">
            SOUTH AFRICAN ALCOHOL DISTRIBUTION STANDARDS
          </p>
          <p className="text-xs font-sans text-[#262621]/80 leading-relaxed">
            All bottles dispatched under Western Cape liquor licensing. Recipient must present valid photo identification confirming minimum legal drinking age (18+) upon delivery handover.
          </p>
        </div>
      </div>
    </div>
  );
};
