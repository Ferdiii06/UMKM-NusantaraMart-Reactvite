/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { Product } from '../data/products';
import type { ReactNode } from 'react';

// Tipe untuk item dalam order
export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

// Tipe untuk alamat pengiriman
export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

// Tipe untuk metode pembayaran
export type PaymentMethod = 'qris' | 'bca' | 'bri' | 'mandiri' | 'bni';

// Tipe untuk status order
export type OrderStatus = 'pending' | 'paid' | 'processed' | 'shipped' | 'delivered' | 'cancelled';

// Tipe untuk order
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax?: number;
  serviceFee?: number;
  total: number;
  promoCode?: string;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Tipe untuk context
export interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  cancelOrder: (id: string) => void;
  clearHistory: () => void;
}

// Buat context - pindah ke file terpisah nanti
const OrderContext = createContext<OrderContextType | null>(null);

// Provider component
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Load orders dari localStorage saat inisialisasi
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Generate nomor order unik
  const generateOrderNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV/${year}${month}${day}/${random}`;
  };

  // Hitung estimasi pengiriman (3-5 hari dari sekarang)
  const calculateEstimatedDelivery = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toISOString().split('T')[0];
  };

  // Tambah order baru
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      status: 'pending',
      estimatedDelivery: calculateEstimatedDelivery()
    };

    setOrders(prev => {
      const updatedOrders = [newOrder, ...prev];
      // Simpan ke localStorage
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  // Get order by ID
  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  // Get orders by status
  const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter(order => order.status === status);
  };

  // Update status order
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => {
      const updatedOrders = prev.map(order =>
        order.id === id ? { ...order, status } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  // Cancel order
  const cancelOrder = (id: string) => {
    setOrders(prev => {
      const updatedOrders = prev.map(order =>
        order.id === id ? { ...order, status: 'cancelled' as OrderStatus } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  // Clear history
  const clearHistory = () => {
    setOrders([]);
    localStorage.removeItem('orders');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getOrderById,
      getOrdersByStatus,
      updateOrderStatus,
      cancelOrder,
      clearHistory
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}