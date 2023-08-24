import React from 'react'; // Update the path accordingly
import { AppProps } from 'next/app';
import RootLayout from './layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
