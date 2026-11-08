/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ShopPage } from './pages/ShopPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentPage } = useCart();

  return (
    <div className="min-h-screen bg-[#E1C9B0] text-[#262621] flex flex-col font-sans selection:bg-[#262621] selection:text-[#E1C9B0]">
      {/* 18+ Age Verification Modal */}
      <AgeVerificationModal />

      {/* Shared Responsive Navigation */}
      <Navigation />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Reusable Product Detail View Modal */}
      <ProductDetailModal />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer />

      {/* Concierge Checkout Modal */}
      <CheckoutModal />

      {/* Shared Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
