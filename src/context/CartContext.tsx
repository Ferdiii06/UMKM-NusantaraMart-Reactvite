import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products'; 

export type CartItem = {
  product: Product;
  quantity: number;
};

// Tipe definisi konteks keranjang belanja
type CartContextType = {
  cartItems: CartItem[];
  totalCount: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      // ignore errors reading localStorage
      return [];
    }
  });

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Fungsi  menambahkan produk ke keranjang
  function addToCart(product: Product, qty = 1) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }

  function removeFromCart(productId: number) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }
// Fungsi  mengosongkan keranjang
  function clearCart() {
    setCartItems([]);
  }

  // persist
  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch {
      // ignore write errors
    }
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, totalCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
