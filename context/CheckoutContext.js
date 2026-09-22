'use client';

import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [shipping, setShipping] = useState(null);
  const [payment, setPayment] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  return (
    <CheckoutContext.Provider value={{ shipping, setShipping, payment, setPayment, completedOrder, setCompletedOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
