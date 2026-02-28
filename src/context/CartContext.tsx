import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: number, size: number) => void;
  updateQuantity: (id: number, size: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === newItem.id && item.size === newItem.size);
      const qtyToAdd = newItem.quantity || 1;
      if (existing) {
        return prev.map(item => 
          (item.id === newItem.id && item.size === newItem.size)
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: qtyToAdd }];
    });
  };

  const removeFromCart = (id: number, size: number) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => 
      (item.id === id && item.size === size)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
