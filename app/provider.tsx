'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Provider({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
