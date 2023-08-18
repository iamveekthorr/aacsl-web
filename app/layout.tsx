import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import Provider from './provider';
import StyledComponentsRegistry from '@/lib/registry';

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
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </main>
        </Provider>
      </body>
    </html>
  );
}
