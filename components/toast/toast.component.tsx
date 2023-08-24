'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { useToast } from '@/app/toast.provider';
import styles from '@/styles/toast.module.css';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect.hook';

const ToastComponent = () => {
  const { toast, dismissToast } = useToast();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => setIsMounted(true), [isMounted]);

  useIsomorphicLayoutEffect(() => {
    console.log(isMounted);
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 3000); // Automatically dismiss after 3 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast, dismissToast]);

  const portalRoot = document.body;

  return isMounted && toast
    ? ReactDOM.createPortal(
        <div className={styles.toast}>
          <p>{toast}</p>
        </div>,
        portalRoot as Element
      )
    : null;
};

export default ToastComponent;
