'use client';
import '@/styles/globals.css';
import styles from '@/styles/login.module.css';

import { NavigationComponent } from '@/components/navigation/navigation.component';
import { HeaderComponent } from '@/components/header/header.component';
import Guard from '@/components/guard/guard.component';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Guard>
      <>
        <HeaderComponent />
        <div className={`${styles.display_flex}`}>
          <NavigationComponent />
          {children}
        </div>
      </>
    </Guard>
  );
}
