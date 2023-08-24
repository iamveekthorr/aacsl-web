import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ToastPortal.module.css'; // You can define styles for the portal container
import ToastComponent from './toast.component';

const ToastPortal = () => {
  const portalRoot = document.getElementById('toast-portal-root');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.portalContainer}>
      <ToastComponent />
    </div>,
    portalRoot
  );
};

export default ToastPortal;
