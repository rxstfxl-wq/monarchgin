import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CurrencyCode, PageId } from '../types';
import { CURRENCIES, PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalZAR: number;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInZAR: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAgeVerified: boolean;
  verifyAge: () => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  openProductDetail: (productId: string) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('monarch_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('monarch_currency');
      return (saved as CurrencyCode) || 'ZAR';
    } catch {
      return 'ZAR';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentPage, setCurrentPageState] = useState<PageId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('monarch_age_verified');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('monarch_cart', JSON.stringify(cart));
    } catch {
      // storage error
    }
  }, [cart]);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('monarch_currency', c);
    } catch {
      // storage error
    }
  };

  const verifyAge = () => {
    setIsAgeVerified(true);
    try {
      localStorage.setItem('monarch_age_verified', 'true');
    } catch {
      // storage error
    }
  };

  const setCurrentPage = (page: PageId) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotalZAR = cart.reduce(
    (total, item) => total + item.product.priceZAR * item.quantity,
    0
  );

  const formatPrice = (amountInZAR: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.ZAR;
    const converted = amountInZAR * config.rate;

    if (currency === 'ZAR') {
      return `R ${Math.round(converted).toLocaleString('en-ZA')}`;
    } else if (currency === 'USD') {
      return `$${converted.toFixed(2)}`;
    } else if (currency === 'GBP') {
      return `£${converted.toFixed(2)}`;
    } else if (currency === 'EUR') {
      return `€${converted.toFixed(2)}`;
    }
    return `R ${Math.round(converted)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotalZAR,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isAgeVerified,
        verifyAge,
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        openProductDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
