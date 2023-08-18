'use client';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import styles from '@/styles/login.module.css';

import { SideNavigationComponent } from '@/components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from '@/components/header/header.component';
import Guard from '@/components/guard/guard.component';
import Provider from '../provider';

const metadata: Metadata = {
  title: 'AACSL Wb Admin',
  description: 'AACSL Wb Admin',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <Guard>
        <>
          <TopNavigationComponent />
          <div className={`${styles.display_flex}`}>
            <SideNavigationComponent />
            {children}
          </div>
        </>
      </Guard>
    </Provider>
  );
}
