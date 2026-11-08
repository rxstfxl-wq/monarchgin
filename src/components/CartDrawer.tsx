import React from 'react';
import { useCart } from '../context/CartContext';
import { ButterflyMonogram } from './MonarchLogo';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotalZAR,
    formatPrice,
    setCurrentPage,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setCurrentPage('shop');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-[#262621]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#E1C9B0] border-l border-[#262621]/15 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 md:p-8 border-b border-[#262621]/12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ButterflyMonogram size={22} color="#262621" />
              <div>
                <h2
                  id="cart-drawer-title"
                  className="font-serif text-xl tracking-tight text-[#262621] uppercase"
                >
                  Your Selection
                </h2>
                <span className="text-[10px] font-sans tracking-[0.2em] text-[#262621]/60 uppercase">
                  {cart.length === 1 ? '1 item' : `${cart.length} items`}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#262621]/70 hover:text-[#262621] focus:outline-none text-xs font-sans tracking-widest uppercase"
              aria-label="Close cart"
            >
              ✕ Close
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ButterflyMonogram size={38} color="#262621" className="opacity-30 mb-4" />
                <p className="font-serif text-2xl text-[#262621] mb-2">Your bag is empty</p>
                <p className="text-xs font-sans text-[#262621]/70 max-w-xs mb-6">
                  Experience the transformation of wild botanical spirits crafted on the West Coast.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="px-6 py-3 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#1A1A17] transition-colors"
                >
                  Discover the Shop
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-6 border-b border-[#262621]/10 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-28 bg-[#F6EDE3] border border-[#262621]/10 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between h-28">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-base tracking-wide text-[#262621] uppercase">
                          {item.product.name}
                        </h3>
                        <span className="font-sans font-medium text-xs tabular-nums text-[#262621]">
                          {formatPrice(item.product.priceZAR * item.quantity)}
                        </span>
                      </div>
                      <p className="text-[10px] font-sans tracking-wider text-[#262621]/60 uppercase">
                        {item.product.expression} · {item.product.bottleSize}
                      </p>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#262621]/20 bg-[#F6EDE3]">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2.5 py-1 text-xs text-[#262621] hover:bg-[#262621]/10 transition-colors"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-xs font-sans tabular-nums text-[#262621]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2.5 py-1 text-xs text-[#262621] hover:bg-[#262621]/10 transition-colors"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[10px] font-sans tracking-wider uppercase text-[#794338] hover:text-[#262621] underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 md:p-8 border-t border-[#262621]/12 bg-[#EAD8C5]/50 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#262621]/70">
                  Subtotal
                </span>
                <span className="font-serif text-2xl tracking-tight text-[#262621] tabular-nums">
                  {formatPrice(cartSubtotalZAR)}
                </span>
              </div>

              <div className="text-[11px] font-sans text-[#262621]/60 leading-relaxed">
                Complimentary insured delivery throughout South Africa on orders above R 1,200. International duties & courier calculated at checkout.
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-[#1A1A17] transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full text-center text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 hover:text-[#262621] py-1"
              >
                Continue Browsing Collection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
