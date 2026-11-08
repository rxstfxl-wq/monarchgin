import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ButterflyMonogram } from './MonarchLogo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotalZAR,
    formatPrice,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Western Cape',
    postalCode: '',
    country: 'South Africa',
    legalAgeConfirmed: false,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    date: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.legalAgeConfirmed) {
      alert('You must confirm you are of legal drinking age (18+) to complete this order.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed({
        orderId: `MNC-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#262621]/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#E1C9B0] border border-[#262621]/20 p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-xs font-sans tracking-widest uppercase text-[#262621]/70 hover:text-[#262621]"
          aria-label="Close checkout"
        >
          ✕ Close
        </button>

        {orderConfirmed ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <ButterflyMonogram size={48} color="#262621" />
            </div>
            <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#AD6230] mb-2 font-medium">
              Order Confirmed
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#262621] mb-3">
              Thank You for Your Order
            </h2>
            <p className="text-xs font-sans text-[#262621]/80 max-w-md mx-auto mb-6 leading-relaxed">
              Your acquisition <span className="font-semibold text-[#262621]">#{orderConfirmed.orderId}</span> has been securely logged. Our cellar concierge is preparing your bottle with signature botanical tissue wrapping.
            </p>

            <div className="bg-[#F6EDE3] border border-[#262621]/10 p-6 text-left max-w-md mx-auto mb-8 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#262621]/60">Dispatch Window:</span>
                <span className="font-medium text-[#262621]">24–48 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#262621]/60">Delivery Address:</span>
                <span className="font-medium text-[#262621] text-right">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#262621]/60">Recipient:</span>
                <span className="font-medium text-[#262621]">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between border-t border-[#262621]/10 pt-2 font-serif text-sm">
                <span>Total Amount:</span>
                <span className="font-semibold">{formatPrice(cartSubtotalZAR)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#1A1A17] transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ButterflyMonogram size={28} color="#262621" />
              <div>
                <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#262621]/60">
                  Concierge Checkout
                </p>
                <h2
                  id="checkout-modal-title"
                  className="font-serif text-2xl md:text-3xl text-[#262621] tracking-tight uppercase"
                >
                  Delivery & Order Details
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order summary bar */}
              <div className="bg-[#F6EDE3] p-4 border border-[#262621]/10 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-medium text-[#262621]">{cart.length} items</span> in your selection
                </div>
                <div className="font-serif text-lg font-medium text-[#262621]">
                  Total: {formatPrice(cartSubtotalZAR)}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Mobile Phone * (for courier delivery)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 (0)82 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, house / apartment number"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Province / State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#262621]/70 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#F6EDE3] border border-[#262621]/20 px-3.5 py-2.5 text-xs text-[#262621] focus:outline-none focus:border-[#262621]"
                  />
                </div>
              </div>

              {/* Legal Age Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.legalAgeConfirmed}
                    onChange={(e) =>
                      setFormData({ ...formData, legalAgeConfirmed: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded border-[#262621]/30 text-[#262621] focus:ring-0"
                  />
                  <span className="text-[11px] font-sans text-[#262621]/80 leading-normal">
                    I confirm that I am 18 years of age or older and legally eligible to purchase alcoholic spirits in South Africa and my jurisdiction. ID verification will be requested by courier upon delivery.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#262621]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-[#262621]/60">
                  Secure Dispatch Guarantee · Insured Fragile Courier
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#262621] text-[#E1C9B0] text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-[#1A1A17] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Securing Bottle Selection...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
