import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ButterflyMonogram } from './MonarchLogo';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductId,
    setSelectedProductId,
    addToCart,
    formatPrice,
    openProductDetail,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'botanicals' | 'ritual' | 'origin'>('botanicals');

  if (!selectedProductId) return null;

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const relatedProduct = PRODUCTS.find((p) => p.id !== product.id) || PRODUCTS[1];

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  const handleClose = () => {
    setSelectedProductId(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#262621]/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
    >
      <div className="relative w-full max-w-5xl bg-[#E1C9B0] border border-[#262621]/20 shadow-2xl my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 text-xs font-sans tracking-[0.2em] uppercase text-[#262621]/70 hover:text-[#262621] p-2"
          aria-label="Close product view"
        >
          ✕ Close
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Dominant Product Photography */}
          <div className="lg:col-span-6 bg-[#F6EDE3] p-8 md:p-12 flex flex-col justify-between items-center relative border-b lg:border-b-0 lg:border-r border-[#262621]/12">
            <div className="w-full flex justify-between items-center text-[10px] tracking-[0.25em] uppercase text-[#262621]/60">
              <span>EDITION {product.number}</span>
              <span>{product.details.batchSize}</span>
            </div>

            <div className="my-8 relative group max-w-sm flex items-center justify-center">
              <img
                src={product.image}
                alt={`${product.name} — ${product.expression}`}
                className="max-h-[460px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(38,38,33,0.25)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="w-full text-center">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#262621]/60">
                <ButterflyMonogram size={16} color="#262621" />
                <span>HAND-CRAFTED WEST COAST DISTILLATION</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module & Botanical Narrative */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.25em] font-sans uppercase text-[#AD6230]">
                <span>PRODUCT {product.number}</span>
                <span aria-hidden="true">·</span>
                <span>{product.bottleSize}</span>
                <span aria-hidden="true">·</span>
                <span>{product.abv}</span>
              </div>

              <h2
                id="product-modal-title"
                className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#262621] uppercase mb-2"
              >
                {product.name}
              </h2>

              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#262621]/75 mb-4">
                {product.expression}
              </p>

              <div className="text-2xl font-serif text-[#262621] tabular-nums mb-6">
                {formatPrice(product.priceZAR)}
              </div>

              <p className="text-sm font-sans text-[#262621]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Purchase Module: Quantity Stepper & Add to Bag */}
              <div className="p-4 bg-[#F6EDE3] border border-[#262621]/15 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#262621]/25 bg-[#E1C9B0]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-sm text-[#262621] hover:bg-[#262621]/10 transition-colors"
                      aria-label="Decrease bottle quantity"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-xs font-sans tabular-nums text-[#262621] font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-sm text-[#262621] hover:bg-[#262621]/10 transition-colors"
                      aria-label="Increase bottle quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-6 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.22em] uppercase font-medium hover:bg-[#1A1A17] transition-colors"
                  >
                    Add to Bag · {formatPrice(product.priceZAR * quantity)}
                  </button>
                </div>
                <div className="mt-2.5 text-[10px] text-[#262621]/60 flex items-center justify-between">
                  <span>In Stock · Cellar Reserve</span>
                  <span>Free SA Courier Over R 1,200</span>
                </div>
              </div>

              {/* Specification Tabs */}
              <div className="border-b border-[#262621]/15 flex gap-6 mb-6">
                {(['botanicals', 'ritual', 'origin'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-xs font-sans tracking-[0.2em] uppercase transition-colors relative ${
                      activeTab === tab
                        ? 'text-[#262621] font-semibold'
                        : 'text-[#262621]/60 hover:text-[#262621]'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#262621]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              {activeTab === 'botanicals' && (
                <div className="space-y-3 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.botanicals.map((b) => (
                      <div key={b.name} className="p-2.5 bg-[#F6EDE3]/60 border border-[#262621]/8">
                        <div className="text-xs font-serif font-medium text-[#262621]">{b.name}</div>
                        <div className="text-[11px] font-sans text-[#262621]/70 leading-snug">{b.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ritual' && (
                <div className="space-y-4 mb-8 text-xs font-sans text-[#262621]/85">
                  <div>
                    <span className="font-semibold text-[#262621] uppercase tracking-wider block mb-1">
                      The Perfect Serve
                    </span>
                    <p className="leading-relaxed bg-[#F6EDE3]/70 p-3 border border-[#262621]/10">
                      {product.servingSuggestion.perfectServe}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#262621] uppercase tracking-wider block mb-1">
                      Glassware & Garnish
                    </span>
                    <p className="leading-relaxed">
                      {product.servingSuggestion.glass} garnished with {product.servingSuggestion.garnish}.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'origin' && (
                <div className="space-y-3 mb-8 text-xs font-sans text-[#262621]/80">
                  <div className="flex justify-between py-1.5 border-b border-[#262621]/10">
                    <span className="text-[#262621]/60">Origin</span>
                    <span className="font-medium text-[#262621]">{product.details.origin}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#262621]/10">
                    <span className="text-[#262621]/60">Distillation</span>
                    <span className="font-medium text-[#262621] text-right max-w-xs">{product.details.distillation}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#262621]/10">
                    <span className="text-[#262621]/60">Serving Temp</span>
                    <span className="font-medium text-[#262621]">{product.details.temperature}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Related Product Link */}
            <div className="pt-6 border-t border-[#262621]/15 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[#262621]/60 block text-[10px] tracking-wider uppercase">
                  Explore Alternate Expression
                </span>
                <span className="font-serif text-sm font-medium text-[#262621] uppercase">
                  {relatedProduct.name} ({relatedProduct.expression})
                </span>
              </div>
              <button
                onClick={() => openProductDetail(relatedProduct.id)}
                className="text-xs font-sans tracking-widest uppercase text-[#AD6230] hover:text-[#262621] underline"
              >
                View Expression →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
