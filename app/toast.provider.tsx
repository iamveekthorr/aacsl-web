'use client';

import React, { createContext, useContext, useState } from 'react';

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastContext {
  toast: string | null;
  showToast: (message: string) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContext>({
  toast: '',
  showToast: () => null,
  dismissToast: () => null,
});

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    console.log(message, 'toast message');
    setMessage(message);
  };

  const dismissToast = () => {
    setMessage(null);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
