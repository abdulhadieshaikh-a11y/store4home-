'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CheckoutContext = createContext(null);
const COMPLETED_KEY = 's4h-completed-order';

export function CheckoutProvider({ children }) {
  const [shipping, setShipping] = useState(null);
  const [payment, setPayment] = useState(null);
  const [completedOrder, setCompletedOrderState] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Keep the placed order for this tab so refreshing the confirmation page still shows it.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(COMPLETED_KEY);
      if (saved) setCompletedOrderState(JSON.parse(saved));
    } catch (e) {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  function setCompletedOrder(order) {
    setCompletedOrderState(order);
    try {
      if (order) sessionStorage.setItem(COMPLETED_KEY, JSON.stringify(order));
      else sessionStorage.removeItem(COMPLETED_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  return (
    <CheckoutContext.Provider value={{ shipping, setShipping, payment, setPayment, completedOrder, setCompletedOrder, hydrated }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
