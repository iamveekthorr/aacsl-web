import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';
import '@/styles/globals.css';

import Provider from './provider';
import { ToastProvider } from './toast.provider';
import ToastComponent from '@/components/toast/toast.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AACSL',
  description: 'login page for AACSL web admin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            <main>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </main>
          </Provider>
          <ToastComponent />
        </body>
      </html>
    </ToastProvider>
  );
}
